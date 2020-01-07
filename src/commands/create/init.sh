#!/usr/bin/env bash

LIB_NAME=$1

# Create directory if $LIB_NAME is specified
if [ "$LIB_NAME" != "" ]; then
  echo -e "mkdir -p $LIB_NAME\n"
  mkdir -p $LIB_NAME

  pushd $LIB_NAME
  pwd
fi

# Generate MIT license (LICENSE file)
echo -e "npx license mit > LICENSE\n"
npx license mit > LICENSE

# Set node-based .gitignore
echo -e "rm .gitignore && npx gitignore node\n"
rm .gitignore && npx gitignore node
echo -e "\n# built lib directory\nlib\n" >> .gitignore

# Set Contributor Covenant Code of Conduct (CODE_OF_CONDUCT.md file)
echo -e "npx covgen ben@benmvp.com"
npx covgen ben@benmvp.com

# Init npm, if package.json doesn't exist
if [ ! -f "package.json" ]; then
  echo -e "npm init -y\n"
  npm init -y
fi

# Install latest version of @benmvp/cli as dev dependency using npm
echo -e "npm install --save-dev @benmvp/cli@latest\n"
npm install --save-dev @benmvp/cli@latest

# Init git, if it doesn't yet exist in directory
git status || echo -e "git init\n" && git init

# Create index file if it doesn't already exist
mkdir -p src/
if [ ! -f "src/index.ts" ]; then
  echo -e "Creating dummy src/index.ts file.\n"
  echo -e "// Root index file for the library\n// Export top-level functions here" > src/index.ts
fi

# Copy miscellaneous config and repo files
echo -e "Copying repo config files.\n"
DIRNAME=`dirname $0`
CONFIGS_PATH="$DIRNAME/../../../configs"
cp -r $CONFIGS_PATH/. ./
