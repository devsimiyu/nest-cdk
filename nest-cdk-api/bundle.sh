#!/bin/bash

echo 'INSTALL DEPENDENCIES'
npm ci

echo 'RUN BUILD'
rm -rf ./dist
npx nest build

echo 'COPY ARTIFACTS FOR DISTRIBUTION'
cp -r ./node_modules /asset-output/node_modules
cp -r ./dist /asset-output/dist

echo 'CLEANUP'
rm -rf ./npm-cache
