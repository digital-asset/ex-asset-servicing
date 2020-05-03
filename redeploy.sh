#!/bin/bash
  if [ "$1" == "" ] || [ "$2" == "" ]; then
    echo "Invalid arguments: $@"
    echo "Usage: redeploy.sh <project-name> <ledger-name>"
    exit 1
  fi

DAR_FILE=deploy/asset-servicing-0.0.1.dar
UI_FILE=deploy/asset-servicing-ui.zip

PROJECT_NAME=$1
LEDGER_NAME=$2

# Get ids
PROJECT_ID=$(dabl project get | jq -r '.projects[] | select(.name=="'$1'").project_id')
LEDGER_ID=$(dabl ledger get | jq -r '.projects[] | select(.project_id=="'$PROJECT_ID'" and .ledger_name=="'$2'").ledger_id')
echo "Got project id $PROJECT_ID and ledger id $LEDGER_ID"

# Inject token
TOKEN=$(dabl ledger token $LEDGER_ID)
echo "export const adminToken = \"$TOKEN\";" > ui/src/token.ts
echo "Injected ledger admin token"
make incremental package > /dev/null
echo "Rebuilt (incremental) and packaged project"

# Deploy UI
dabl ledger upload $LEDGER_ID $UI_FILE
echo "Deployed $UI_FILE"

# Wait for website
dabl ledger await website $LEDGER_ID

# Open website
#URL="https://$LEDGER_ID.projectdabl.com"
#open $URL
#echo "Opened $URL"
echo "All done."
