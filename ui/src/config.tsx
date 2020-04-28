import uuidv4 from "uuid/v4";
import * as jwt from "jsonwebtoken";

export const isLocalDev = process.env.NODE_ENV === 'development';

let host = window.location.host.split('.')

export const ledgerId = isLocalDev ? "asset-servicing" : host[0];

let apiUrl = host.slice(1)
apiUrl.unshift('api')

export const httpBaseUrl = isLocalDev ? undefined : ('https://' + apiUrl.join('.') + (window.location.port ? ':' + window.location.port : '') + '/data/' + ledgerId + '/');

// Unfortunately, the development server of `create-react-app` does not proxy
// websockets properly. Thus, we need to bypass it and talk to the JSON API
// directly in development mode.
export const wsBaseUrl = isLocalDev ? 'ws://localhost:7575/' : undefined;

const applicationId = uuidv4();

export const createToken = (party : string) => jwt.sign({ "https://daml.com/ledger-api": { ledgerId, applicationId, admin: true, actAs: [party], readAs: [party] } }, "secret")

let loginUrl = host.slice(1)
loginUrl.unshift('login')

export const dablLoginUrl = loginUrl.join('.') + (window.location.port ? ':' + window.location.port : '') + '/auth/login?ledgerId=' + ledgerId;

export const getRole = (party : string) => party === "CSD" ? "CSD" : "BANK";

// Temporary for allowing this app to run on DABL while providing the non-DABL party name
export const partyMap = new Map();
partyMap.set("PrivateBank", "ledger-party-75f6f48d-b1fb-44bf-a7cb-5f6fe6f29463");
partyMap.set("CSD", "ledger-party-c639bfd9-7915-4594-8eea-425b5dfa50bb");
partyMap.set("SNB", "ledger-party-a27a8900-ba9c-47f8-ace8-675c10f48c4c");
partyMap.set("Alice", "ledger-party-5f231e4f-8b70-49a5-89b0-27769af8cafd");
partyMap.set("Bob", "ledger-party-d6be0849-70b9-4443-9a7d-eb71cc5afff6");