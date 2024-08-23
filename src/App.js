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
import DoctorImg from "../src/assets/images/welcomeImage.jpg";

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
import Loader from "components/Loader";
import { useSelector } from "react-redux";
import Calling from "components/Calling"; // index.js or App.js
import * as serviceWorker from "./serviceWorker";
import { getSession } from "helper/authHelper";

// Register the service worker

export default function App() {
  const { authLoader } = useSelector((state) => state.auth);
  const { patientLoader } = useSelector((state) => state.patient);
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();
  const userInfo = getSession();
  const isShowWelcome = JSON.parse(localStorage.getItem("welcomeShown"));
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const routes = useRoutes();
  serviceWorker.register();

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

  return (
    <ThemeProvider theme={theme}>
      {(authLoader || patientLoader) && <Loader />}
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
            <h1>Welcome to Convo.AI!</h1>
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
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Routes>
        {getRoutes(routes)}
        <Route
          path="*"
          element={<Navigate to={`${userInfo ? "/dashboard" : "authentication/sign-in"}`} />}
        />
      </Routes>{" "}
      {/* {userInfo && <Calling />} */}
    </ThemeProvider>
  );
}
