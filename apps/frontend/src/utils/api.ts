export type APIIntroSession = {
  type: "intro";
  data: {
    user: APIUser;
  };
}

export type APIEventSession = {
  type: "event";
  data: {
    event: APIEvent;
    user: APIUser;
  };
}

export type APIEndingSession = {
  type: "end";
  data:
    | {
      result: "win";
      user: APIUser;
    }
    | {
      result: "lose";
      analytic: string[],
      user: APIUser;
    };
}

export type APIEvent = {
  id: string;
  description: string;
  delta_money: number;
  image: string;
  answers: Record<string, APIAnswer>;
}
export type APIAnswer = {
  id: string;
  text: string;
  analytic_text: string;
  chance_bad: number;
  credit: number;
  delta_money: number;
}

export type APIUser = {
  _id: string;
  credit: number;
  money: number;
  history: string;
}

export type APISession = APIIntroSession | APIEventSession | APIEndingSession;



export const API_ENDPOINT = import.meta.env.DEV
  ? new URL("http://localhost:5000")
  : new URL("http://93.183.80.138:8080")
