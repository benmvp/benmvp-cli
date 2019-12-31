#!/usr/bin/env bash

TEST_ARGS=$*

# Create temp directory where we'll copy integration tests in order to run them
TEMP_INTEGRATION_PATH=`mktemp -d`

echo -e "Created temp integration path: $TEMP_INTEGRATION_PATH\n"

TARBALL_FILENAME="test-package.tgz"
TARBALL_FILE_PATH="$TEMP_INTEGRATION_PATH/$TARBALL_FILENAME"

# build library before packing in order to be able to reference built files
# (this step is skipped within benmvp-cli repo since the `benmvp` bin doesn't
# exist yet, but that's ok because we always `build` before `integrate`)
if [ -f "./node_modules/.bin/benmvp" ]; then
  echo -e "npx benmvp build\n"
  npx benmvp build
fi

# npm pack to tarball library into integration directory
echo -e "npm pack && mv *.tgz $TARBALL_FILE_PATH\n"
npm pack && mv *.tgz $TARBALL_FILE_PATH

if [ ! -f $TARBALL_FILE_PATH ]; then
  echo -e "Unable to create archive $TARBALL_FILE_PATH"
  rm -rf $TEMP_INTEGRATION_PATH
  exit 1
fi

# copy the prettier configs over to $TEMP_INTEGRATION_PATH
# copy this first before copying the "project" just in case
# they decide to put prettier configs within it
echo -e "cp .prettier* $TEMP_INTEGRATION_PATH\n"
cp .prettier* $TEMP_INTEGRATION_PATH

# copy the integration tests "project" over to $TEMP_INTEGRATION_PATH
echo -e "cp -r ./integration-tests/* $TEMP_INTEGRATION_PATH\n"
cp -r ./integration-tests/. $TEMP_INTEGRATION_PATH

echo -e "pushd $TEMP_INTEGRATION_PATH\n"
pushd $TEMP_INTEGRATION_PATH

# Delete node_modules if it exists
# (should only happen in local dev testing)
if [ -d "$TEMP_INTEGRATION_PATH/node_modules" ]; then
  echo -e "rm -rf $TEMP_INTEGRATION_PATH/node_modules\n"
  rm -rf $TEMP_INTEGRATION_PATH/node_modules
fi

# Add @benmvp/cli & tarball file as dependencies
# This will also install all missing dependencies from `package-lock.json`
# Note for integration tests for @benmvp/cli specifically this *should* overwrite
# @benmvp/cli dependency from registry with the tarball
echo -e "npm install\n"
npm install
echo -e "npm install --save-dev @benmvp/cli\n"
npm install --save-dev @benmvp/cli
echo -e "npm install --save-dev $TARBALL_FILENAME\n"
npm install --save-dev $TARBALL_FILENAME

# Verify @benmvp/cli binary (named "benmvp") exists
if [ ! -f "$TEMP_INTEGRATION_PATH/node_modules/.bin/benmvp" ]; then
  echo -e "@benmvp/cli binary not successfully installed at $TEMP_INTEGRATION_PATH/node_modules/.bin/benmvp"
  popd
  rm -rf $TEMP_INTEGRATION_PATH
  exit 1
fi

# Run `npx benmvp test` in $TEMP_INTEGRATION_PATH to use @benmvp/cli
# to run the integration tests
# NOTE: For integration test *for* @benmvp/cli this will use the .tgz version
# that would've been added above
# TODO: Figure out how to use the same version of @benmvp/cli already installed
# (because this will use the latest one)
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
