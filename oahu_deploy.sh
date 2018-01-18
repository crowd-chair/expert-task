#!/bin/bash

set -eux

echo "(1) Building cylog code..."
ruby generate_cylog_code.rb $1

echo "(2) Building js files..."
yarn build

echo "(3) Copying assets files..."
rm -r ./deploy
mkdir -p ./deploy/$1
cp -r ./src/assets ./deploy/
cp ./build/static/js/main*.js ./deploy/$1/main.js
cp ./build/static/css/main*.css ./deploy/$1/main.css

echo "(4) Deploy files..."
scp -r deploy/* oahu:/var/www/crowd4u/public/nkobayashi/feedback
