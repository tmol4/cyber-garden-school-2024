import { Button, CircularProgress } from "@star4/react";
import { createFileRoute, useRouteContext, useRouter } from "@tanstack/react-router";
import { queryOptions, useMutation, useQuery, useSuspenseQuery, type QueryClient, type UseMutationResult } from "@tanstack/react-query";

import styles from "./index.module.sass";
import { createContext, memo, Suspense, useContext, useEffect } from "react";
import { API_ENDPOINT, type APIEndingSession, type APIEvent, type APIEventSession, type APIIntroSession, type APISession } from "~/utils";

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const createSession = async () => {
  // const url = new URL("/event", API_ENDPOINT);
  // const response = await fetch(
  //   url,
  //   {
  //     method: "POST",
  //     credentials: "include",
  //     headers: {
  //       "Accept": "application/json",
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({}),
  //   },
  // ).then(response => response.json());
  // return response;
  const url = new URL("/create_user", API_ENDPOINT);
  const response = await fetch(
    url,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    },
  );
  const json = await response.json() as APISession;

  return json;
}

const fetchNextEvent = async (id?: string) => {
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
      body: JSON.stringify({
        clickedId: id,
      }),
    }
  );
  const json = await response.json() as APISession;
  return json;
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
    const { queryClient, sessionQueryOptions } = useRouteContext({
      from: "/play/",
    });

    const { data, status } = useQuery(sessionQueryOptions);

    const mutation = useMutation({
      mutationFn: fetchNextEvent,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["session"] })
      },
    });

    return (
      <main>
        {JSON.stringify(data)}
        {status === "pending" && (
            <div className={styles["loading-indicator"]}>
              <CircularProgress />
              <span className={styles["loading-indicator__label"]}>Загрузка...</span>
            </div>
        )}
        {status === "success" && (
          <GameContext.Provider
            value={{
              queryClient,
              session: data!,
              mutation,
            }}>
              <Game />
          </GameContext.Provider>
        )}
      </main>
    );
  },
});

type GameContext = {
  queryClient: QueryClient;
  session: APISession;
  mutation: UseMutationResult<APISession, Error, string | undefined, unknown>;
}
const GameContext = createContext<GameContext | undefined>(undefined);
const useGame = () => {
  const context = useContext(GameContext);
  if(!context) throw new Error("No game context found!");
  return context;
}


function GameComponent() {
  const { session } = useGame();
  return (
    <>
      {session.type === "intro" && <Intro session={session} />}
      {session.type === "event" && <Question session={session} />}
      {session.type === "end" && <Ending session={session} />}
    </>
  );
}

const Game = memo(GameComponent);

namespace Intro {
  export type Props = {
    session: APIIntroSession;
  }
}

function IntroComponent(
  {
    session
  }: Intro.Props,
) {
  const { mutation } = useGame();
  return (
    <div>
      {JSON.stringify(session)}
      <Button variant="filled" label="Далее" onClick={() => mutation.mutate(undefined)} />
    </div>
  );
}
const Intro = memo(IntroComponent);
namespace Question {
  export type Props = {
    session: APIEventSession;
  }
}

function QuestionComponent(
  {
    session
  }: Question.Props,
) {
  const { mutation } = useGame();
  const answers = Object.values(session.data.event.answers);
  return (
    <div>
      {answers.map(
        answer => (
          <Button
            variant="elevated"
            onClick={() => mutation.mutate(answer.id)}
            label={answer.text} />
        )
      )}
    </div>
  );
}

const Question = memo(QuestionComponent);

namespace Ending {
  export type Props = {
    session: APIEndingSession;
  }
}

const EndingComponent = function(
  {}: Ending.Props,
) {
  return (
    <div>

    </div>
  )
}
const Ending = memo(EndingComponent);
