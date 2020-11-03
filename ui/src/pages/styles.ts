import { makeStyles, createStyles } from "@material-ui/styles";

export default makeStyles((theme : any) => createStyles({
  tableCell: {
    verticalAlign: "center",
    paddingTop: 6,
    paddingBottom: 6,
    fontSize: "0.75rem"
  },
  tableCellButton: {
    verticalAlign: "center",
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: "0.75rem"
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
    paddingTop: 2,
    paddingBottom: 2,
  },
  choiceButton: {
    paddingTop: 0,
    paddingBottom: 0,
    marginRight: 5,
  },
  newButton: {
    marginTop: 50,
  },
  inputField: {
    marginTop: 20
  },
  default: {
  },
  green: {
    fill: "#009900",
  },
  yellow: {
    fill: "#999900"
  },
  red: {
    fill: "#990000"
  },
  chipYellow: {
    color: "white",
    backgroundColor: "#999900",
    verticalAlign: "top",
  },
  chipGreen: {
    color: "white",
    backgroundColor: "#009900",
    verticalAlign: "top",
  },
}));
