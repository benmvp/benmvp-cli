#!/usr/bin/env bash

TEST_ARGS=$*

# Create temp directory where we'll copy integration tests in order to run them
TEMP_INTEGRATION_PATH=`mktemp -d`

echo -e "Created temp integration path: $TEMP_INTEGRATION_PATH\n"

TARBALL_FILE_PATH="$TEMP_INTEGRATION_PATH/test-package.tgz"

# yarn pack to tarball library into file path
echo -e "yarn pack --filename $TARBALL_FILE_PATH\n"
yarn pack --filename $TARBALL_FILE_PATH

if [ ! -f $TARBALL_FILE_PATH ]; then
  echo -e "Unable to create archive $TARBALL_FILE_PATH"
  rm -rf $TEMP_INTEGRATION_PATH
  exit 1
fi

# copy the integration tests "app" over to $TEMP_INTEGRATION_PATH
echo -e "cp -r ./integration-tests/* $TEMP_INTEGRATION_PATH\n"
cp -r ./integration-tests/* $TEMP_INTEGRATION_PATH

pushd $TEMP_INTEGRATION_PATH

# Add .tgz file as dependency
# This will also install all missing dependencies from `yarn.lock`
echo -e "yarn add --dev file:$TARBALL_FILE_PATH\n"
yarn add --dev "file:$TARBALL_FILE_PATH"

# Verify node modules were installed
if [ ! -d "$TEMP_INTEGRATION_PATH/node_modules" ]; then
  echo -e "Node modules not successfully installed at $TEMP_INTEGRATION_PATH"
  popd
  rm -rf $TEMP_INTEGRATION_PATH
  exit 1
fi

# Run `npx benmvp test` in $tempIntegration to use @benmvp/cli
# to run the integration tests
# NOTE: For integration test *for* @benmvp/cli this will use the .tgz version
# that would've been added above
# TODO: Figure out how to use the same version of @benmvp/cli already installed
echo -e "npx benmvp test $TEST_ARGS\n"
(npx benmvp test $TEST_ARGS)

# capture test result to pass as exit code of script
TEST_RESULT=$?

# return to CWD
popd

# clean up temp directory
echo -e "rm -rf $TEMP_INTEGRATION_PATH\n"
rm -rf $TEMP_INTEGRATION_PATH

exit $TEST_RESULT
