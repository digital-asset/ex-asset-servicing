#!/bin/bash
  if [ "$1" == "" ] || [ "$2" == "" ]; then
    echo "Invalid arguments: $@"
    echo "Usage: teardown.sh <project-name> <ledger-name>"
    exit 1
  fi

DAR_FILE=asset-servicing-0.0.1.dar
UI_FILE=asset-servicing-ui.zip

PROJECT_NAME=$1
LEDGER_NAME=$2

# Delete DAR
dabl workspace del $DAR_FILE
echo "Deleted $DAR_FILE"

# Delete UI
dabl workspace del $UI_FILE
echo "Deleted $UI_FILE"

# Delete ledger
LEDGER_ID=$(dabl ledger get | jq -r '.projects[] | select(.project_name=="'$PROJECT_NAME'" and .ledger_name=="'$LEDGER_NAME'").ledger_id')
dabl ledger del $LEDGER_ID
echo "Deleted ledger with id $LEDGER_ID"

# Delete project
PROJECT_ID=$(dabl project get | jq -r '.projects[] | select(.name=="'$PROJECT_NAME'").project_id')
dabl project del $PROJECT_ID
echo "Deleted project with id $PROJECT_ID"
