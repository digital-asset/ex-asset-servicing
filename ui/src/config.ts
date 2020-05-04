import uuidv4 from "uuid/v4";
import * as jwt from "jsonwebtoken";
import { adminToken } from "./token";

export const isLocalDev = process.env.NODE_ENV === 'development';

const host = window.location.host.split('.');
const ledgerId = isLocalDev ? "asset-servicing" : host[0];
const apiUrl = host.slice(1);
apiUrl.unshift('api');

export const httpBaseUrl = isLocalDev ? undefined : ('https://' + apiUrl.join('.') + (window.location.port ? ':' + window.location.port : '') + '/data/' + ledgerId + '/');
export const wsBaseUrl = isLocalDev ? 'ws://localhost:7575/' : undefined;

const applicationId = uuidv4();
const createToken = (party : string) => jwt.sign({ "https://daml.com/ledger-api": { ledgerId, applicationId, admin: true, actAs: [party], readAs: [party] } }, "secret");

let loginUrl = host.slice(1)
loginUrl.unshift('login')
export const dablLoginUrl = loginUrl.join('.') + (window.location.port ? ':' + window.location.port : '') + '/auth/login?ledgerId=' + ledgerId;

export const getRole = (name : string) => name === "CSD" ? "CSD" : (name === "BANK" ? "BANK" : "CLIENT");

export async function getParty(name : string) {
  if (isLocalDev) return name;
  const partyUrl = "https://api.projectdabl.com/api/ledger/" + ledgerId + "/parties";
  const res = await fetch(partyUrl, { headers: { Authorization: "Bearer " + adminToken } });
  const json = await res.json();
  const party = json.parties.find((p : any) => p.partyName === name);
  return party.party as string;
}

export async function getToken(party : string) {
  if (isLocalDev) return createToken(party);
  const tokenUrl = "https://api.projectdabl.com/api/ledger/" + ledgerId + "/party/" + party + "/token";
  const res = await fetch(tokenUrl, { method: "POST", headers: { Authorization: "Bearer " + adminToken } });
  const json = await res.json();
  return json.access_token as string;
}
