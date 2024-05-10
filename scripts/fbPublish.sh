#!/bin/bash

rsync -av --delete --exclude=.svn \
  --exclude=index.html \
  --exclude=favicon.ico \
  --safe-links \
  build/ ~/flybase-server/htdocs/report-data-table/