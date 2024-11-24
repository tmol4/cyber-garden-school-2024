import { Button, CircularProgress, MaterialSymbol } from "@star4/react";
import { createFileRoute, useNavigate, useRouteContext, useRouter } from "@tanstack/react-router";
import { queryOptions, useMutation, useQuery, useSuspenseQuery, type QueryClient, type UseMutationResult } from "@tanstack/react-query";

import styles from "./index.module.sass";
import { createContext, memo, Suspense, useContext, useEffect, useMemo } from "react";
import { API_ENDPOINT, type APIEndingSession, type APIEvent, type APIEventSession, type APIIntroSession, type APISession } from "~/utils";
import introImage from "~/assets/images/person.jpg";
import homeImage from "~/assets/images/home.jpeg";
import shopImage from "~/assets/images/shop.jpeg";
import streetImage from "~/assets/images/street.jpeg";

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
              next: mutation,
              deleteUser: undefined,
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
  next: UseMutationResult<APISession, Error, string | undefined, unknown>;
  deleteUser: undefined;
}
const GameContext = createContext<GameContext | undefined>(undefined);
const useGame = () => {
  const context = useContext(GameContext);
  if(!context) throw new Error("No game context found!");
  return context;
}


function GameComponent() {
  const { session } = useGame();
  console.log(session.type)
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
  const { next } = useGame();
  const navigate = useNavigate({
    from: "/play",
  });
  return (
    <div className={styles["intro"]}>
      <div className={styles["intro__background"]}>
        <img
          className={styles["intro__image"]}
          src={introImage}
          alt="Шаурмист" />
      </div>
      <div className={styles["intro__content"]}>
        <div className={styles["intro__header"]}>
          <h1 className={styles["intro__headline"]}>
            Начало игры
          </h1>
          <p className={styles["intro_supporting-text"]}>
            Вам предстоит играть за начинающего бизнесмена-шаурмиста в суровых реалях России.
          </p>
        </div>
        <div className={styles["intro__actions"]}>
          <Button
            onClick={() => navigate({ to: "/" })}
            variant="outlined"
            label="Отмена" />
          <Button
            className={styles["intro__continue-button"]}
            variant="filled"
            icon={<MaterialSymbol name="rocket_launch" />}
            label="Поехали"
            onClick={() => next.mutate(undefined)} />
        </div>
      </div>
    </div>
  );
}

function StatsComponent() {
  const { session } = useGame();
  const user = session.data.user;
  return (
    <div className={styles["stats"]}>
      <div className={styles["stats__item"]}>
        <MaterialSymbol name="credit_card" />
        <div className={styles["stats__content"]}>
          <span className={styles["stats__headline"]}>Кредит</span>
          <span className={styles["stats__supporting-text"]}>{user.credit}</span>
        </div>
      </div>
      <div className={styles["stats__item"]}>
        <MaterialSymbol name="currency_ruble" />
        <div className={styles["stats__content"]}>
          <span className={styles["stats__headline"]}>Баланс</span>
          <span className={styles["stats__supporting-text"]}>{user.money}</span>
        </div>
      </div>
    </div>
  )
}
const Stats = memo(StatsComponent);

const Intro = memo(IntroComponent);

const IMAGES = {
  home: homeImage,
  shop: shopImage,
  street: streetImage,
} as const;

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
  const { next } = useGame();
  const answers = Object.values(session.data.event.answers);
  const image = useMemo(
    () => {
      const key = session.data.event.image;
      if(key in IMAGES) return IMAGES[key as keyof typeof IMAGES];
      return undefined;
    },
    [session.data.event.image],
  );
  const event = session.data.event;
  return (
    <div className={styles["question"]}>
      <Stats />
      <div className={styles["question__background"]}>
        <img
          className={styles["question__image"]}
          src={image}
          alt="Изображение" />
      </div>
      <div className={styles["question__content"]}>
        <div className={styles["question__header"]}>
          <h1 className={styles["question__description"]}>
            {event.description}
          </h1>
        </div>
        <div className={styles["question__actions"]}>
          {answers.map(
            (answer, index) => (
              <Button
                key={index}
                variant="elevated"
                onClick={() => next.mutate(answer.id)}
                label={answer.text} />
            )
          )}
        </div>
      </div>
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
  {
    session
  }: Ending.Props,
) {
  const answers = session.data.result === "lose"
    ? session.data.analytic
    : [];
  return (
    <div>
      {session.data.result === "win" && (
        <h1>
          Победа!
        </h1>
      )}
      {session.data.result === "lose" && (
        <h1>
          Поражение...
        </h1>
      )}
      <div>
        {answers.map(
          (answer, index) => (
            <div className={styles["ending__answer"]}>
              {answer}
            </div>
          )
        )}
      </div>
    </div>
  )
}
const Ending = memo(EndingComponent);
