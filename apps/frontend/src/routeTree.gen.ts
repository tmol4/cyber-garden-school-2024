/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from "@tanstack/react-router";

// Import Routes

import { Route as rootRoute } from "./routes/__root";

// Create Virtual Routes

const IndexLazyImport = createFileRoute("/")();
const authAuthLazyImport = createFileRoute("/(auth)/_auth")();
const authAuthRegisterLazyImport = createFileRoute("/(auth)/_auth/register")();
const authAuthLoginLazyImport = createFileRoute("/(auth)/_auth/login")();

// Create/Update Routes

const IndexLazyRoute = IndexLazyImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => rootRoute,
} as any).lazy(() => import("./routes/index.lazy").then((d) => d.Route));

const authAuthLazyRoute = authAuthLazyImport
  .update({
    id: "/(auth)/_auth",
    getParentRoute: () => rootRoute,
  } as any)
  .lazy(() => import("./routes/(auth)/_auth.lazy").then((d) => d.Route));

const authAuthRegisterLazyRoute = authAuthRegisterLazyImport
  .update({
    id: "/register",
    path: "/register",
    getParentRoute: () => authAuthLazyRoute,
  } as any)
  .lazy(() =>
    import("./routes/(auth)/_auth.register.lazy").then((d) => d.Route),
  );

const authAuthLoginLazyRoute = authAuthLoginLazyImport
  .update({
    id: "/login",
    path: "/login",
    getParentRoute: () => authAuthLazyRoute,
  } as any)
  .lazy(() => import("./routes/(auth)/_auth.login.lazy").then((d) => d.Route));

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      id: "/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof IndexLazyImport;
      parentRoute: typeof rootRoute;
    };
    "/(auth)/_auth": {
      id: "/(auth)/_auth";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof authAuthLazyImport;
      parentRoute: typeof undefinedRoute;
    };
    "/(auth)/_auth/login": {
      id: "/(auth)/_auth/login";
      path: "/login";
      fullPath: "/login";
      preLoaderRoute: typeof authAuthLoginLazyImport;
      parentRoute: typeof authAuthLazyImport;
    };
    "/(auth)/_auth/register": {
      id: "/(auth)/_auth/register";
      path: "/register";
      fullPath: "/register";
      preLoaderRoute: typeof authAuthRegisterLazyImport;
      parentRoute: typeof authAuthLazyImport;
    };
  }
}

// Create and export the route tree

interface authAuthLazyRouteChildren {
  authAuthLoginLazyRoute: typeof authAuthLoginLazyRoute;
  authAuthRegisterLazyRoute: typeof authAuthRegisterLazyRoute;
}

const authAuthLazyRouteChildren: authAuthLazyRouteChildren = {
  authAuthLoginLazyRoute: authAuthLoginLazyRoute,
  authAuthRegisterLazyRoute: authAuthRegisterLazyRoute,
};

const authAuthLazyRouteWithChildren = authAuthLazyRoute._addFileChildren(
  authAuthLazyRouteChildren,
);

export interface FileRoutesByFullPath {
  "/": typeof authAuthLazyRouteWithChildren;
  "/login": typeof authAuthLoginLazyRoute;
  "/register": typeof authAuthRegisterLazyRoute;
}

export interface FileRoutesByTo {
  "/": typeof authAuthLazyRouteWithChildren;
  "/login": typeof authAuthLoginLazyRoute;
  "/register": typeof authAuthRegisterLazyRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  "/": typeof IndexLazyRoute;
  "/(auth)/_auth": typeof authAuthLazyRouteWithChildren;
  "/(auth)/_auth/login": typeof authAuthLoginLazyRoute;
  "/(auth)/_auth/register": typeof authAuthRegisterLazyRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths: "/" | "/login" | "/register";
  fileRoutesByTo: FileRoutesByTo;
  to: "/" | "/login" | "/register";
  id:
    | "__root__"
    | "/"
    | "/(auth)/_auth"
    | "/(auth)/_auth/login"
    | "/(auth)/_auth/register";
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute;
  authAuthLazyRoute: typeof authAuthLazyRouteWithChildren;
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  authAuthLazyRoute: authAuthLazyRouteWithChildren,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/(auth)/_auth"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/(auth)/_auth": {
      "filePath": "(auth)/_auth.lazy.tsx",
      "children": [
        "/(auth)/_auth/login",
        "/(auth)/_auth/register"
      ]
    },
    "/(auth)/_auth/login": {
      "filePath": "(auth)/_auth.login.lazy.tsx",
      "parent": "/(auth)/_auth"
    },
    "/(auth)/_auth/register": {
      "filePath": "(auth)/_auth.register.lazy.tsx",
      "parent": "/(auth)/_auth"
    }
  }
}
ROUTE_MANIFEST_END */