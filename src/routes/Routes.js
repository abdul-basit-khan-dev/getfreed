import React from "react";
const Record = React.lazy(() => import("../pages/Record/Record.tsx"));

export const R_ROOT = "/";
export const R_RECORD = "record";

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
  }
];

