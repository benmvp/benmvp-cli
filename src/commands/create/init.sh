#!/usr/bin/env bash

LIB_NAME=$1

# Create directory if $LIB_NAME is specified
if [ "$LIB_NAME" != "" ]; then
  echo -e "mkdir -p $LIB_NAME\n"

  mkdir -p $LIB_NAME
  cd $LIB_NAME
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
