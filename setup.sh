#!/bin/bash
  if [ "$1" == "" ] || [ "$2" == "" ]; then
    echo "Invalid arguments: $@"
    echo "Usage: setup.sh <project-name> <ledger-name>"
    exit 1
  fi

DAR_FILE=deploy/dsp-0.0.1.dar
UI_FILE=deploy/dsp-ui.zip

PROJECT_NAME=$1
LEDGER_NAME=$2

# Create project
PROJECT_ID=$(dabl project add $PROJECT_NAME | jq -r '.project_id')
echo "Created project with id $PROJECT_ID"

# Create ledger
LEDGER_ID=$(dabl ledger add $PROJECT_ID $LEDGER_NAME | jq -r '.ledger_id')
echo "Creating ledger with id $LEDGER_ID"

# Wait for ledger
dabl ledger await $LEDGER_ID startup
echo "Ledger $LEDGER_ID started."

# Allocate parties
echo "Allocating parties.."
dabl ledger party add $LEDGER_ID CSD > /dev/null
dabl ledger party add $LEDGER_ID AGENT > /dev/null
dabl ledger party add $LEDGER_ID ISSUER > /dev/null
dabl ledger party add $LEDGER_ID INVESTOR1 > /dev/null
dabl ledger party add $LEDGER_ID INVESTOR2 > /dev/null
dabl ledger party add $LEDGER_ID INVESTOR3 > /dev/null
echo "Allocated parties."

function writeToken {
  PARTY_ID=$(dabl ledger party id $LEDGER_ID "$1")
  PARTY_TOKEN=$(dabl ledger party token $LEDGER_ID $PARTY_ID | jq -r '.accessToken')
  echo "  [ \"$PARTY_ID\", \"$PARTY_TOKEN\" ]," >> ui/src/tokens.ts
  echo "  [ \"$1\", \"$PARTY_ID\" ]," >> ui/src/parties.ts
  echo "  [ \"$PARTY_ID\", \"$1\" ]," >> ui/src/names.ts
}
echo "Writing tokens.."
echo "export const tokens : Map<string, string> = new Map([" > ui/src/tokens.ts
echo "export const parties : Map<string, string> = new Map([" > ui/src/parties.ts
echo "export const names : Map<string, string> = new Map([" > ui/src/names.ts
writeToken CSD
writeToken AGENT
writeToken ISSUER
writeToken INVESTOR1
writeToken INVESTOR2
writeToken INVESTOR3
echo "]);" >> ui/src/tokens.ts
echo "]);" >> ui/src/parties.ts
echo "]);" >> ui/src/names.ts
echo "Tokens written."

echo "Writing party config.."
dabl ledger party participants $LEDGER_ID CSD AGENT ISSUER INVESTOR1 INVESTOR2 INVESTOR3 > participants.json
dabl ledger party config $LEDGER_ID CSD AGENT ISSUER INVESTOR1 INVESTOR2 INVESTOR3 > parties.json
echo "Party config written."

echo "Packaging project.."
make build package > /dev/null 2>&1
if [ $? -ne 0 ]; then
  echo "Compilation failed!"
  exit 1
fi
echo "Project packaged."

# Deploy DAR
echo "Uploading files..."
dabl ledger upload $LEDGER_ID $DAR_FILE > /dev/null
dabl ledger upload $LEDGER_ID $UI_FILE > /dev/null
echo "Uploaded files."

# Deploy UI
echo "Deploying artifacts.."
dabl ledger deploy $LEDGER_ID $DAR_FILE > /dev/null
dabl ledger deploy $LEDGER_ID $UI_FILE > /dev/null
echo "Deployed artifacts."

# Wait for website
echo "Waiting for website.."
dabl ledger await $LEDGER_ID website
echo "Website up."

echo "Running init script.."
sleep 15
daml script --participant-config participants.json --json-api --dar deploy/dsp-0.0.1.dar --script-name Init:init --input-file parties.json > /dev/null
echo "Ran init script."

# Open website
URL="https://$LEDGER_ID.projectdabl.com"
open $URL
echo "Opened $URL"
echo "All done."
