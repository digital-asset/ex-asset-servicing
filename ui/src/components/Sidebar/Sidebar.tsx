import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import classNames from "classnames";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { Theme } from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { useTheme } from "@material-ui/styles";
import { useLayoutState, useLayoutDispatch, toggleSidebar } from "../../context/LayoutContext";
import SidebarLink from "./components/SidebarLink/SidebarLink";
import { SidebarEntry } from "./SidebarEntry";
import useStyles from "./styles";

type SidebarProps = {
  entries : SidebarEntry[]
}

function Sidebar({ entries, location } : RouteComponentProps & SidebarProps) {
  var classes = useStyles();
  var theme = useTheme() as Theme;

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBack classes={{ root: classNames(classes.headerIcon, classes.headerIconCollapse) }} />
        </IconButton>
      </div>
      <List>
        {entries.map(e =>
          <>
            <SidebarLink key={e.label} level={0} location={location} isSidebarOpened={isSidebarOpened} {...e} />
            {!!e.divider && <Divider />}
          </>
        )}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
