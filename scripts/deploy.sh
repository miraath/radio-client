#!/bin/bash

REMOTE=miraath_do
REMOTE_APP=/var/www/radio-client

cd build;
rsync -va . $REMOTE:$REMOTE_APP/;
