#!/bin/bash

message=$1

pnpm build
git checkout master
rsync -a build/ ./

git add .
git commit -m "$message"
git push origin master

git checkout source