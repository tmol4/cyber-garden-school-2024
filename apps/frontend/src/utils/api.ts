type IntroSession = {
  type: "intro";
}

type EventSession = {
  type: "event";
}

type EndingSession = {
  type: "ending";
}

type Session = IntroSession | EventSession | EndingSession;
