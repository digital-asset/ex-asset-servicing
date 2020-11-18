import React from "react";
import { useStreamQueries, useParty } from "@daml/react";
import { AssetDeposit, AssetCategorization } from "@daml.js/dsp-0.0.1/lib/DA/Finance/Asset";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import { CreateEvent } from "@daml/ledger";
import useStyles from "./styles";

const Balance : React.FC = () => {
  const classes = useStyles();

  const party = useParty();
  const categories = useStreamQueries(AssetCategorization).contracts;
  const deposits = useStreamQueries(AssetDeposit).contracts;
  const assets = deposits.filter(d => d.payload.account.owner === party);
  const liabilities = deposits.filter(d => d.payload.account.provider === party);

  const group = (contracts : CreateEvent<AssetDeposit>[]) => {
    const grouped = contracts.reduce((g : Map<string, CreateEvent<AssetDeposit>[]>, a : CreateEvent<AssetDeposit>) => {
      const key = a.payload.asset.id.label + "@" + a.payload.asset.id.version;
      const list = g.get(key) || [];
      list.push(a);
      g.set(key, list);
      return g;
    }, new Map());
    return grouped;
  };

  const gAssets = group(assets);
  const gLiabilities = group(liabilities);

  const keys = Array.from(gAssets.keys())
    .concat(Array.from(gLiabilities.keys()))
    .filter((v, i, a) => a.indexOf(v) === i);

  const entries = keys.map(k => {
    const [ label, version ] = k.split("@");
    const category = categories.find(c => c.payload.id.label === label)?.payload;
    const assetClass = category?.assetClass || "";
    const assetType = category?.assetType || "";
    const totalAssets = gAssets.get(k)?.reduce((p, ad) => p + parseFloat(ad.payload.asset.quantity), 0) || 0;
    const totalLiabilities = gLiabilities.get(k)?.reduce((p, ad) => p + parseFloat(ad.payload.asset.quantity), 0) || 0;
    const totalNet = totalAssets - totalLiabilities;
    return { assetClass, assetType, label, version, assets: totalAssets, liabilities: totalLiabilities, net: totalNet };
  }).sort((a, b) => { return a.assetClass + a.assetType + a.label < b.assetClass + b.assetType + b.label ? -1 : 1; });

  return (
    <>
      <Table>
        <TableHead>
          <TableRow className={classes.tableRow}>
            <TableCell key={0} className={classes.tableCell}>Class</TableCell>
            <TableCell key={1} className={classes.tableCell}>Type</TableCell>
            <TableCell key={2} className={classes.tableCell}>Label</TableCell>
            <TableCell key={3} className={classes.tableCell}>Version</TableCell>
            <TableCell key={4} className={classes.tableCell} align={"right"}>Total Assets</TableCell>
            <TableCell key={5} className={classes.tableCell} align={"right"}>Total Liabilities</TableCell>
            <TableCell key={6} className={classes.tableCell} align={"right"}>Net</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.map((e, i) => (
            <TableRow key={i} className={classes.tableRow}>
              <TableCell key={0} className={classes.tableCell}>{e.assetClass}</TableCell>
              <TableCell key={1} className={classes.tableCell}>{e.assetType}</TableCell>
              <TableCell key={2} className={classes.tableCell}>{e.label}</TableCell>
              <TableCell key={3} className={classes.tableCell}>{e.version}</TableCell>
              <TableCell key={4} className={classes.tableCell} align={"right"}>{e.assets === 0 ? "" : e.assets}</TableCell>
              <TableCell key={5} className={classes.tableCell} align={"right"}>{e.liabilities === 0 ? "" : e.liabilities}</TableCell>
              <TableCell key={6} className={classes.tableCell} align={"right"}>{e.net}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default Balance;
