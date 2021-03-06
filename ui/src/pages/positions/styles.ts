import { makeStyles, createStyles } from "@material-ui/styles";

export default makeStyles((theme : any) => createStyles({
  tableCell: {
    verticalAlign: "center",
    paddingTop: 6,
    paddingBottom: 6,
    fontSize: "0.75rem"
  },
  tableCellNew: {
    verticalAlign: "center",
    paddingTop: 6,
    paddingBottom: 6,
    fontSize: "0.75rem",
    backgroundColor: "green",
  },
  tableCellButton: {
    verticalAlign: "center",
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: "0.75rem"
  },
  lcButton: {
    paddingTop: 2,
    paddingBottom: 2,
  },
  tableRow: {
    height: "auto"
  },
  heading: {
    paddingLeft: "10px",
    // fontSize: theme.typography.pxToRem(15),
    // fontWeight: theme.typography.fontWeightRegular,
  },
  buttonLifecycle: {
    width: "90%",
    // marginRight: "10px",
    // margin: "10px",
  },
}));
