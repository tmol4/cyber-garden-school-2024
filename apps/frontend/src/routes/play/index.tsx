import { CircularProgress } from "@star4/react";
import { createFileRoute, useRouteContext, useRouter } from "@tanstack/react-router";
import { queryOptions, useQuery, useSuspenseQuery } from "@tanstack/react-query";

import styles from "./index.module.sass";
import { Suspense, useEffect } from "react";
import { API_ENDPOINT } from "~/utils";

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const createSession = async () => {
  const url = new URL("/event", API_ENDPOINT);
  const response = await fetch(
    url,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({}),
    },
  ).then(response => response.json());
  return response;
  // const url = new URL("/create_user", API_ENDPOINT);
  // const response = await fetch(
  //   url,
  //   {
  //     method: "POST",
  //     credentials: "include",
  //   },
  // );
  // return {
  //   ok: response.ok,
  //   status: response.status,
  //   statusText: response.statusText,
  // };
}

export const Route = createFileRoute("/play/")({
  beforeLoad: () => ({
    sessionQueryOptions: {
      queryKey: ["session"],
      queryFn: createSession,
    },
  }),
  loader: async ({
    context: { queryClient, sessionQueryOptions },
  }) => void queryClient.prefetchQuery(sessionQueryOptions),
  component: () => {
    const sessionQueryOptions = useRouteContext({
      from: "/play/",
      select: ({ sessionQueryOptions }) => sessionQueryOptions,
    });

    const { data, status } = useQuery(sessionQueryOptions);

    return (
      <main>
        {status}
        {JSON.stringify(data)}
        {status === "pending" && (
            <div className={styles["loading-indicator"]}>
              <CircularProgress />
              <span className={styles["loading-indicator__label"]}>Загрузка...</span>
            </div>
        )}
      </main>
    );
  },
});
