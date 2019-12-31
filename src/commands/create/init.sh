#!/usr/bin/env bash

LIB_NAME=$1

# Create directory if $LIB_NAME is specified
if [ "$LIB_NAME" != "" ]; then
  echo -e "mkdir -p $LIB_NAME\n"

  mkdir -p $LIB_NAME
  pushd $LIB_NAME
  pwd
fi

# Init npm, if package.json doesn't exist
if [ ! -f "package.json" ]; then
  echo -e "npm init -y\n"
  npm init -y
fi

# Install latest version of @benmvp/cli as dev dependency using npm
echo -e "npm install --save-dev @benmvp/cli@latest\n"
npm install --save-dev @benmvp/cli@latest

# Init git, if it doesn't yet exist in directory
if [ ! -d ".git" ]; then
  echo -e "git init\n"
  git init
fi

# Create index file if it doesn't already exist
mkdir -p src/
if [ ! -f "src/index.ts" ]; then
  echo -e "Creating src/index.ts file\n"
  echo -e "// Root index file for the library\n// Export top-level functions here" > src/index.ts
fi

# Copy miscellaneous config and repo files
DIRNAME=`dirname $0`
CONFIGS_PATH="$DIRNAME/../../../configs"
echo -e "cp -r $CONFIGS_PATH/. ./"
cp -r $CONFIGS_PATH/. ./
