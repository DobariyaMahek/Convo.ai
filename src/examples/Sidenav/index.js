import React, { useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";
import SidenavRoot from "examples/Sidenav/SidenavRoot";
import sidenavLogoLabel from "examples/Sidenav/styles/sidenav";
import { useSoftUIController, setMiniSidenav } from "context";
import { signOutUser } from "../../firebase";

function Sidenav({ color, brand, brandName, routes, ...rest }) {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentSidenav } = controller;
  const location = useLocation();
  const { pathname } = location;
  const collapseName = pathname.split("/").slice(1)[0];

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
    }

    window.addEventListener("resize", handleMiniSidenav);
    handleMiniSidenav();

    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch]);
  console.log(routes);
  const renderRoutes = routes.map(
    ({
      type,
      name,
      icon,
      title,
      noCollapse,
      key,
      route,
      href,
      collapse,
      isProtected,
      isActive,
      isShow,
    }) => {
      if (!isProtected || !isShow) return null;
      if (type === "collapse") {
        return href ? (
          <Link
            href={href}
            key={key}
            target="_blank"
            rel="noreferrer"
            sx={{ textDecoration: "none" }}
          >
            <SidenavCollapse
              color={color}
              name={name}
              icon={icon}
              active={isActive}
              noCollapse={noCollapse}
              collapse={collapse}
            />
          </Link>
        ) : (
          <NavLink to={route} key={key}>
            <SidenavCollapse
              color={color}
              name={name}
              icon={icon}
              active={isActive}
              noCollapse={noCollapse}
              collapse={collapse}
            />
          </NavLink>
        );
      } else if (type === "title") {
        return (
          <SoftTypography
            key={key}
            display="block"
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            opacity={0.6}
            pl={3}
            mt={2}
            mb={1}
            ml={1}
          >
            {title}
          </SoftTypography>
        );
      } else if (type === "divider") {
        return <Divider key={key} />;
      }

      return null;
    }
  );

  return (
    <SidenavRoot {...rest} variant="permanent" ownerState={{ transparentSidenav, miniSidenav }}>
      <SoftBox pt={3} pb={1} px={4} textAlign="center">
        <SoftBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <SoftTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </SoftTypography>
        </SoftBox>
        <SoftBox component={NavLink} to="/" display="flex" alignItems="center">
          {brand && <SoftBox component="img" src={brand} alt="Soft UI Logo" width="2rem" />}
          <SoftBox
            width={!brandName && "100%"}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <SoftTypography component="h6" variant="button" fontWeight="medium">
              {brandName}
            </SoftTypography>
          </SoftBox>
        </SoftBox>
      </SoftBox>
      <Divider />
      <List>{renderRoutes}</List>
      <SoftBox pt={2} my={2} mx={2} mt="auto">
        <SoftBox mt={2}>
          <SoftButton variant="gradient" color={color} fullWidth onClick={() => signOutUser()}>
            Logout
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </SidenavRoot>
  );
}

Sidenav.defaultProps = {
  color: "#66b5a3",
  brand: "",
};

Sidenav.propTypes = {
  color: PropTypes.string,
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      name: PropTypes.string,
      icon: PropTypes.node,
      title: PropTypes.string,
      noCollapse: PropTypes.bool,
      key: PropTypes.string.isRequired,
      route: PropTypes.string,
      href: PropTypes.string,
      collapse: PropTypes.array,
      isProtected: PropTypes.bool,
    })
  ).isRequired,
};

export default Sidenav;
