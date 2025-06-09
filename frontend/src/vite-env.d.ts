/// <reference types="vite/client" />
import React from "react";

declare module "*.jsx" {
  const JSX: React.FC;
  export default JSX;
}
declare module "*.css" {
  const classes: { [key: string]: string };
  export default classes;
}
