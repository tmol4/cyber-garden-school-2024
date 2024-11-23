import { CircularProgress } from "@star4/react";
import { createFileRoute, useRouteContext, useRouter } from "@tanstack/react-router";
import { queryOptions, useQuery, useSuspenseQuery } from "@tanstack/react-query";

import styles from "./index.module.sass";
import { Suspense, useEffect } from "react";
import { API_ENDPOINT } from "~/utils";

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const createSession = async () => {
  const url = new URL("/session/new", API_ENDPOINT);
  // await fetch(
  //   url,
  //   {
  //     method: "GET",
  //   },
  // );
  await wait(2500);
  return {
    state: "intro",
  };
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
    const { queryClient, sessionQueryOptions } = useRouteContext({ from: "/play/" });

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
