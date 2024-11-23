import { createIdentifiableElement } from "@star4/react";
import { createContext, memo, useContext, type ReactNode } from "react"

export type AppContext = {

}

const AppContext = createContext<AppContext | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if(!context) throw new Error(
    "useApp used without an <AppContextProvider> ancestor"
  );
  return context;
}

export namespace AppContextProvider {
  export type Props = {
    children: ReactNode;
  }
}

const AppContextProviderComponent = function AppContextProvider(
  {
    children
  }: AppContextProvider.Props
) {
  return (
    <AppContext.Provider
      value={{

      }}
      children={children} />
  );
}

export const AppContextProvider = Object.assign(
  memo(AppContextProviderComponent),
  createIdentifiableElement("IS_APP_CONTEXT_PROVIDER"),
);
