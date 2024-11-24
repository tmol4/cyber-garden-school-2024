export type APIIntroSession = {
  type: "intro";
}

export type APIEventSession = {
  type: "event";
  data: {
    event: APIEvent;
    user: APIUser;
  };
}

export type APIEndingSession = {
  type: "ending";
  data: {

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