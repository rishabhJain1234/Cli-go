#!/bin/bash
source ./scripts/config.sh

if [ $# -lt 2 ]; then
    echo "USAGE: $0 <model> <migration_file_name>"
    echo -e "model: Model for which the migration file needs to be generated"
    echo -e "migration_file_name: full name of the migration file for example: \"20240229194012-create_servers_table.js\""
    exit 1
fi

model=$1
migration_file_name=$2
# Run Sequelize CLI with the specified migrations path
npx sequelize-cli db:migrate:undo --config $CONFIG_PATH --migrations-path "$MIGRATIONS_PATH/$model" --name "$migration_file_name"
