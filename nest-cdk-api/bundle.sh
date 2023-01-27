#!/bin/bash

set -e

echo 'INSTALL DEPENDENCIES'
npm install

echo 'RUN BUILD'
npm run build $1

echo 'COPY ARTIFACTS FOR DISTRIBUTION'
cp -r ./node_modules /asset-output/node_modules
cp -r ./dist /asset-output/dist
