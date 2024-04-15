#!/bin/bash

source ./scripts/config.sh

if [ $# -lt 2 ]; then
    echo "USAGE: $0 <name> <model>"
    echo -e "name: name of the migration file"
    echo -e "model: Model for which the migration file needs to be generated"
    exit 1
fi

name=$1
model=$2
mkdir -p "$MIGRATIONS_PATH/$model"
npx sequelize-cli migration:generate --name $name --migrations-path "$MIGRATIONS_PATH/$model"
