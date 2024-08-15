import { useState, useEffect, useMemo } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import theme from "assets/theme";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import DoctorImg from "../src/assets/images/doctor.png";

import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";
import brand from "assets/images/logo-ct.png";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import "./App.css"; // Import your CSS file for animations
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useRoutes from "routes";
import SoftTypography from "components/SoftTypography";
import { Image } from "@mui/icons-material";
export default function App() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const isShowWelcome = JSON.parse(localStorage.getItem("welcomeShown"));
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const routes = useRoutes();
  useEffect(() => {
    if (userInfo && !isShowWelcome) {
      setShowWelcomeMessage(true);
      localStorage.setItem("welcomeShown", "true"); // Set the flag to true
      setTimeout(() => {
        setShowWelcomeMessage(false);
      }, 5000);
    }
  }, [userInfo]);

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes?.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            element={
              route.isProtected ? (
                <PrivateRoute>{route.component}</PrivateRoute>
              ) : (
                <PublicRoute>{route.component}</PublicRoute>
              )
            }
            key={route.key}
          />
        );
      }

      return null;
    });

  const configsButton = (
    <SoftBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.5rem"
      height="3.5rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="default" color="inherit">
        settings
      </Icon>
    </SoftBox>
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {showWelcomeMessage && (
        <div className={`full-screen-welcome`}>
          <IconButton
            aria-label="close"
            className="close-icon"
            onClick={() => {
              setShowWelcomeMessage(false);
            }}
          >
            <CloseIcon />
          </IconButton>{" "}
          <SoftTypography sx={{ textAlign: "center" }}>
            <img src={DoctorImg} alt="img" height="300px" />
            <h1>Welcome Back to Convo.AI!</h1>
            <p>
              We’re thrilled to have you here again. Let’s continue creating meaningful
              conversations and driving innovation together.
            </p>
          </SoftTypography>
        </div>
      )}
      {layout === "dashboard" && userInfo && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={brand}
            brandName="Convo.AI"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {/* {configsButton} */}
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Routes>
        {getRoutes(routes)}
        <Route
          path="*"
          element={<Navigate to={`${userInfo ? "/dashboard" : "authentication/sign-in"}`} />}
        />
      </Routes>
    </ThemeProvider>
  );
}
