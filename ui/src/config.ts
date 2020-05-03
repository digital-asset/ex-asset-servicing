import uuidv4 from "uuid/v4";
import * as jwt from "jsonwebtoken";
import { adminToken } from "./token";

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

export async function getParty(name : string) {
  const partyUrl = "https://api.projectdabl.com/api/ledger/" + ledgerId + "/parties";
  const res = await fetch(partyUrl, { headers: { Authorization: "Bearer " + adminToken } });
  const json = await res.json();
  const party = json.parties.find((p : any) => p.partyName === name);
  return party.party as string;
}

export async function getToken(party : string) {
  const tokenUrl = "https://api.projectdabl.com/api/ledger/" + ledgerId + "/party/" + party + "/token";
  const res = await fetch(tokenUrl, { method: "POST", headers: { Authorization: "Bearer " + adminToken } });
  const json = await res.json();
  return json.access_token as string;
}
