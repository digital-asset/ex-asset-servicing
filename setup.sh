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

function allocateParty {
  PARTY_ID=$(dabl ledger party add $LEDGER_ID "$1")
  PARTY_TOKEN=$(dabl ledger party token $LEDGER_ID $PARTY_ID)
  echo "  [ \"$PARTY_ID\", \"$PARTY_TOKEN\" ]," >> ui/src/tokens.ts
  echo "  [ \"$1\", \"$PARTY_ID\" ]," >> ui/src/parties.ts
  echo "  [ \"$PARTY_ID\", \"$1\" ]," >> ui/src/names.ts
}

# Allocate parties
echo "Allocating parties.."
echo "export const tokens : Map<string, string> = new Map([" > ui/src/tokens.ts
echo "export const parties : Map<string, string> = new Map([" > ui/src/parties.ts
echo "export const names : Map<string, string> = new Map([" > ui/src/names.ts
allocateParty CSD
allocateParty BANK
allocateParty Yuval
allocateParty Eric
allocateParty Shaul

PARTY_ID=$(dabl ledger party id $LEDGER_ID "Georg Schneider")
PARTY_TOKEN=$(dabl ledger party token $LEDGER_ID $PARTY_ID)
echo "  [ \"$PARTY_ID\", \"$PARTY_TOKEN\" ]," >> ui/src/tokens.ts
echo "  [ \"Georg Schneider\", \"$PARTY_ID\" ]," >> ui/src/parties.ts
echo "  [ \"$PARTY_ID\", \"Georg Schneider\" ]," >> ui/src/names.ts

echo "]);" >> ui/src/tokens.ts
echo "]);" >> ui/src/parties.ts
echo "]);" >> ui/src/names.ts
echo "Allocated all parties"

# Package project
make clean build package > /dev/null
echo "Rebuilt and packaged project"

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
