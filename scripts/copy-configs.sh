#!/usr/bin/env bash

OUTPUT_DIR=$1

if [ "$OUTPUT_DIR" == "" ]; then
  OUTPUT_DIR="lib"
fi

# These files need to be copied after building so they get included
# in the built assets so that `benmvp create` can copy them to the
# destination library.

CONFIGS_PATH="$PWD/$OUTPUT_DIR/configs"
CONFIGS_VSCODE_PATH="$CONFIGS_PATH/.vscode"
CONFIGS_GITHUB_PATH="$CONFIGS_PATH/.github"

echo -e "\n\nCopying over configs into build folder..."

mkdir -p $CONFIGS_PATH
mkdir -p $CONFIGS_VSCODE_PATH
mkdir -p $CONFIGS_GITHUB_PATH

cp .gitignore $CONFIGS_PATH/
cp .nvmrc $CONFIGS_PATH/
cp .prettier* $CONFIGS_PATH/
cp CHANGELOG.md $CONFIGS_PATH/
cp CONTRIBUTING.md $CONFIGS_PATH/
cp LICENSE $CONFIGS_PATH/
cp .vscode/settings.json $CONFIGS_VSCODE_PATH/
cp .github/pull_request_template.md $CONFIGS_GITHUB_PATH/
cp -r .github/ISSUE_TEMPLATE $CONFIGS_GITHUB_PATH/
cp -r .github/workflows $CONFIGS_GITHUB_PATH/

echo -e "Done.\n\n"
