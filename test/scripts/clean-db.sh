#!/bin/bash

if [ -z "$1" ] ; then
  echo "Enter a database name"
  exit 1
fi

mongoimport --jsonArray --drop --db $1 --collection users --file ../../db/users.json
mongoimport --jsonArray --drop --db $1 --collection items --file ../../db/items.json
mongoimport --jsonArray --drop --db $1 --collection gifts --file ../../db/gifts.json
mongoimport --jsonArray --drop --db $1 --collection messages --file ../../db/messages.json
mongoimport --jsonArray --drop --db $1 --collection winks --file ../../db/winks.json
mongoimport --jsonArray --drop --db $1 --collection proposals --file ../../db/proposals.json

