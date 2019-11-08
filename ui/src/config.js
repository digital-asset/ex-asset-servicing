import uuidv4 from "uuid/v4";
import * as jwt from "jsonwebtoken";

const continuousUpdate = false;
const ledgerId = "testLedger"
const applicationId = uuidv4();
const createToken = party => jwt.sign({ ledgerId, applicationId, party }, "secret")
const parties = [ "PrivateBank", "CSD", "InvestmentBank" ];

const config = {
  continuousUpdate,
  tokens: {}
}
parties.map(p => config.tokens[p.toString()] = createToken(p));

export default config;
