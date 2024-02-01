import React from "react";
const Record = React.lazy(() => import("../pages/Record/Record.tsx"));

export const R_ROOT = "/";
export const R_RECORD = "record";
export const R_RECORD_ID = "/record/:Id"

export const PublicRoutes = [
  {
    key: "Record Page",
    title: "Record Page",
    path: R_RECORD,
    component: Record,
  },
  {
    key: "Record Page",
    title: "Record Page",
    path: R_ROOT,
    component: Record,
  },
  {
    key: "Id Record page",
    title: "Id Record page",
    path: R_RECORD_ID,
    component: Record,
  }
];

