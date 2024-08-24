import React from "react";
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";
import Doctors from "examples/Icons/Doctors";
import Receptions from "examples/Icons/Receptions";
import Patients from "examples/Icons/Patients";
import { useLocation } from "react-router-dom";
import Patient from "layouts/patient";
import CreatePatient from "layouts/patient/CreatePatient";
import ChatBot from "layouts/interaction";
import CalendarComponent from "layouts/interaction/calender";
import Package from "layouts/package";
import CallHistory from "layouts/CallHistory";
import ForgotPassword from "layouts/authentication/forgotPassword";
import Interaction from "layouts/interaction";
import {
  CalendarMonth,
  ChaletSharp,
  History,
  HomeSharp,
  Layers,
  ManageAccounts,
  Person4,
  SmartToy,
  Textsms,
  ThreeP,
} from "@mui/icons-material";
import Call from "layouts/Call";
import { getSession } from "helper/authHelper";
import MediaInteraction from "layouts/mediaInteraction";

const useRoutes = () => {
  const location = useLocation();
  const { pathname } = location;
  const userInfo = getSession();
  const collapseName = pathname;
  return [
    {
      type: "collapse",
      name: "Dashboard",
      key: "dashboard",
      route: "/dashboard",
      icon: <HomeSharp size="12px" />,
      component: <Dashboard />,
      noCollapse: true,
      isProtected: true,
      isActive: collapseName === "/dashboard",
      isShow: true,
    },
    {
      type: "collapse",
      name: "Patients Management",
      key: "patients",
      noCollapse: true,
      isProtected: true,
      icon: <ManageAccounts size="12px" />,
      isActive: collapseName === "/patients" || collapseName === "/create-patients",
      collapse: [
        {
          name: "Patient List",
          key: "patient-list",
          route: "/patients",
          component: <Patient />,
          noCollapse: true,
          isProtected: true,
          isActive: collapseName === "/patients",
          isShow: userInfo?.role == "care_home",
        },
        {
          name: "Create Patient",
          key: "create-patient",
          route: "/create-patients",
          component: <CreatePatient />,
          noCollapse: true,
          isProtected: true,
          isActive: collapseName === "/create-patients",
          isShow: userInfo?.role == "care_home",
        },
        {
          name: "Update Patient",
          key: "update-patient",
          route: "/update-patient/:id",
          component: <CreatePatient />,
          noCollapse: true,
          isProtected: true,
          isActive: collapseName === "/update-patient/:id",
          isShow: false,
        },
      ],
      isShow: userInfo?.role == "care_home",
    },
    {
      type: "collapse",
      name: "Patient Interaction",
      key: "chatbot",
      noCollapse: true,
      isProtected: true,
      icon: <Textsms size="12px" />,
      isActive: collapseName === "/chatbot" || collapseName === "/call-calender",
      collapse: [
        {
          name: "Chatbot",
          key: "chatbot",
          route: "/chatbot",
          component: <Interaction />,
          noCollapse: true,
          isProtected: true,
          isActive: collapseName === "/chatbot",
          isShow: userInfo?.role == "care_home",
        },
        {
          name: "Call Calender",
          key: "call-calender",
          route: "/call-calender",
          component: <CalendarComponent />,
          noCollapse: true,
          isProtected: true,
          isActive: collapseName === "/call-calender",
          isShow: userInfo?.role == "care_home",
        },
      ],
      isShow: userInfo?.role == "care_home",
    },

    {
      type: "collapse",
      name: "Package",
      key: "package",
      route: "/package",
      icon: <Layers size="12px" />,
      component: <Package />,
      noCollapse: true,
      isProtected: true,
      isActive: collapseName === "/package",
      isShow: userInfo?.role == "care_home" || userInfo?.role == "family_member",
    },
    {
      type: "collapse",
      name: "Profile",
      key: "profile",
      route: "/profile",
      icon: <Person4 size="12px" />,
      component: <Profile />,
      noCollapse: true,
      isProtected: true,
      isActive: collapseName === "/profile",
      isShow: userInfo?.role == "care_home",
    },
    {
      type: "collapse",
      name: "Bot Interaction",
      key: "chatbot",
      route: "/chatbot",
      component: <Interaction />,
      noCollapse: true,
      isProtected: true,
      icon: <SmartToy size="12px" />,
      isActive: collapseName === "/chatbot",
      isShow: userInfo?.role == "patient",
    },
    {
      type: "collapse",
      name: "Call",
      key: "call",
      route: "/call",
      component: <Call />,
      noCollapse: true,
      isProtected: true,
      icon: <Patients size="12px" />,
      isActive: false,
      isShow: false,
    },
    {
      type: "collapse",
      name: "Call History",
      key: "call-history",
      route: "/call-history",
      icon: <History size="12px" />,
      component: <CallHistory />,
      noCollapse: true,
      isProtected: true,
      isActive: collapseName === "/call-history",
      isShow: userInfo?.role == "family_member",
    },
    {
      type: "collapse",
      name: "Media and Instructions",
      key: "media-instruction",
      route: "/media-instruction",
      icon: <History size="12px" />,
      component: <MediaInteraction />,
      noCollapse: true,
      isProtected: true,
      isActive: collapseName === "/media-instruction",
      isShow: userInfo?.role == "family_member",
    },
    {
      type: "collapse",
      name: "Call Calender",
      key: "call-calender",
      route: "/call-calender",
      icon: <CalendarMonth size="12px" />,
      component: <CalendarComponent />,
      noCollapse: true,
      isProtected: true,
      isActive: collapseName === "/call-calender",
      isShow: userInfo?.role == "patient",
    },
    {
      type: "collapse",
      name: "Sign In",
      key: "sign-in",
      route: "/authentication/sign-in",
      icon: <Document size="12px" />,
      component: <SignIn />,
      noCollapse: true,
      isProtected: false,
    },
    // {
    //   type: "collapse",
    //   name: "Sign Up",
    //   key: "sign-up",
    //   route: "/authentication/sign-up",
    //   icon: <SpaceShip size="12px" />,
    //   component: <SignUp />,
    //   noCollapse: true,
    //   isProtected: false,
    // },
    {
      type: "collapse",
      name: "Forgot Password",
      key: "forgot-password",
      route: "/authentication/forgot-password",
      icon: <SpaceShip size="12px" />,
      component: <ForgotPassword />,
      noCollapse: true,
      isProtected: false,
    },
  ];
};

export default useRoutes;
