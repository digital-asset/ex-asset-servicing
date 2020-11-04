import React, { useState } from "react";
import { Link } from "react-router-dom";
import { History, Location } from "history";
import classnames from "classnames";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import useStyles from "./styles";
import { SidebarEntry } from "../../SidebarEntry";

type SidebarLinkProps = {
  label : string
  level : number
  path : string
  icon : JSX.Element
  children : SidebarEntry[]
  location : Location<History.PoorMansUnknown>
  isSidebarOpened : boolean
}

export default function SidebarLink(props : SidebarLinkProps) {
  const { label, level, path, icon, children, location, isSidebarOpened } = props;
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);
  const isLinkActive = path && (location.pathname === path || location.pathname.indexOf(path) !== -1);

  function toggleCollapse(e : React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    if (isSidebarOpened) {
      //e.preventDefault();
      setIsOpen(!isOpen);
    }
  }

  return (
    <>
      <ListItem
        button={true}
        component={Link}
        onClick={children.length > 0 ? toggleCollapse: () => {}}
        to={path}
        className={classes.link}
        classes={{
          root: classnames(classes.linkRoot, {
            [classes.linkActive]: isLinkActive,
          }),
        }}
        disableRipple
      >
        {level < 2 && <ListItemIcon
          className={classnames(classes.linkIcon, {
            [classes.linkIconActive]: isLinkActive,
          })}
        >
          {icon}
        </ListItemIcon>}
        <ListItemText
          classes={{
            primary: classnames(classes.linkText, {
              [classes.linkTextActive]: isLinkActive,
              [classes.linkTextHidden]: !isSidebarOpened,
              [classes.linkTextNested]: level > 1,
            }),
          }}
          primary={label}
        />
      </ListItem>
      {children && (
        <Collapse
          in={isOpen && isSidebarOpened}
          timeout="auto"
          unmountOnExit
          className={classes.nestedList}
        >
          <List component="div" disablePadding>
            {children.map(child => (
              <SidebarLink
                key={child.label}
                level={level + 1}
                location={location}
                isSidebarOpened={isSidebarOpened}
                {...child}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );

  // ###########################################################
}
