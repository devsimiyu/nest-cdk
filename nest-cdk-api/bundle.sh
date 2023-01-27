#!/bin/bash

set -e

echo 'INSTALL DEPENDENCIES AND SAVE CACHE IN "./.npm"'
npm install

echo 'RUN BUILD'
rm -rf ./dist
npx nest build $1

echo 'COPY ARTIFACTS FOR DISTRIBUTION'
cp -r ./node_modules /asset-output/node_modules
cp -r ./dist /asset-output/dist

echo 'CLEANUP NPM CACHE'
rm -rf ./.npm
