#!/bin/bash
  if [ "$1" == "" ] || [ "$2" == "" ]; then
    echo "Invalid arguments: $@"
    echo "Usage: setup.sh <project-name> <ledger-name>"
    exit 1
  fi

DAR_FILE=deploy/asset-servicing-0.0.1.dar
UI_FILE=deploy/asset-servicing-ui.zip

PROJECT_NAME=$1
LEDGER_NAME=$2

# Create project
PROJECT_ID=$(dabl project add $PROJECT_NAME)
echo "Created project with id $PROJECT_ID"

# Create ledger
LEDGER_ID=$(dabl ledger add $PROJECT_ID $LEDGER_NAME)
echo "Created ledger with id $LEDGER_ID"

# Wait for ledger
dabl ledger await startup $LEDGER_ID

# Wait for endpoints
dabl ledger await endpoints $LEDGER_ID

# Allocate parties
dabl ledger party add $LEDGER_ID CSD
echo "Allocated party CSD"
dabl ledger party add $LEDGER_ID BANK
echo "Allocated party BANK"
dabl ledger party add $LEDGER_ID Yuval
echo "Allocated party Yuval"
dabl ledger party add $LEDGER_ID Eric
echo "Allocated party Eric"
dabl ledger party add $LEDGER_ID Shaul
echo "Allocated party Shaul"

# Inject ledger admin token
TOKEN=$(dabl ledger token $LEDGER_ID)
echo "export const adminToken = \"$TOKEN\";" > ui/src/token.ts
echo "Injected ledger admin token"

# Package project
make build package > /dev/null
echo "Rebuilt (all) and packaged project"

# Deploy DAR
dabl ledger upload $LEDGER_ID $DAR_FILE
echo "Deployed $DAR_FILE"

# Deploy UI
dabl ledger upload $LEDGER_ID $UI_FILE
echo "Deployed $UI_FILE"

# Wait for website
dabl ledger await website $LEDGER_ID

# Open website
URL="https://$LEDGER_ID.projectdabl.com"
open $URL
echo "Opened $URL"
echo "All done."
