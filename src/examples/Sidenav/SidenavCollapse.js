import PropTypes from "prop-types";
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import { useSoftUIController } from "context";
import {
  collapseItem,
  collapseIconBox,
  collapseIcon,
  collapseText,
} from "examples/Sidenav/styles/sidenavCollapse";
import { NavLink } from "react-router-dom";
import SoftTypography from "components/SoftTypography";
import React from "react";
import {
  ArrowBack,
  ArrowRight,
  ArrowRightAlt,
  ArrowRightAltSharp,
  ArrowRightOutlined,
  ArrowRightSharp,
} from "@mui/icons-material";

function SidenavCollapse({ color, icon, name, collapse, active, open, ...rest }) {
  const [controller] = useSoftUIController();
  const { miniSidenav, transparentSidenav } = controller;

  // const [isOpen, setIsOpen] = React.useState(open);

  // const handleClick = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <>
      <ListItem component="li" button>
        <SoftBox {...rest} sx={(theme) => collapseItem(theme, { active, transparentSidenav })}>
          <ListItemIcon
            sx={(theme) => collapseIconBox(theme, { active, transparentSidenav, color })}
          >
            {typeof icon === "string" ? (
              <Icon sx={(theme) => collapseIcon(theme, { active })}>{icon}</Icon>
            ) : (
              icon
            )}
          </ListItemIcon>
          <ListItemText
            primary={name}
            sx={(theme) => collapseText(theme, { miniSidenav, transparentSidenav, active })}
          />
        </SoftBox>
      </ListItem>
      <Collapse in={true} unmountOnExit>
        {collapse &&
          collapse.map(
            ({ key, name, route, icon, isActive, isShow }) =>
              isShow && (
                <SoftBox key={key} pl={6} display="flex" alignItems="center">
                  <NavLink to={route} style={{ textDecoration: "none", width: "100%" }}>
                    <SoftBox display="flex" alignItems="center">
                      <Icon>
                        <ArrowRightAlt
                          sx={{ fontSize: "13px", color: `${isActive ? "#66b5a3" : ""}` }}
                        />
                      </Icon>
                      <SoftTypography
                        variant="body2"
                        fontWeight="100"
                        py={1}
                        pl={1}
                        sx={{ fontSize: "13px", color: `${isActive ? "#66b5a3" : ""}` }}
                      >
                        {name}
                      </SoftTypography>
                    </SoftBox>
                  </NavLink>
                </SoftBox>
              )
          )}
      </Collapse>
    </>
  );
}

SidenavCollapse.defaultProps = {
  color: "#66b5a3",
  active: false,
  open: false,
};

SidenavCollapse.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  collapse: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      route: PropTypes.string.isRequired,
      icon: PropTypes.node,
    })
  ),
  active: PropTypes.bool,
  open: PropTypes.bool,
};

export default SidenavCollapse;
