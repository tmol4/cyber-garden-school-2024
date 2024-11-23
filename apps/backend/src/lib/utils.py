from lib.classes import Event
from lib.db import HISTORY_EVENT_SEP, HISTORY_ANSWER_SEP
from lib.events import events


def get_latest_event_from_history(history: str) -> Event:
    _id = history.split(HISTORY_EVENT_SEP)[-1].split(HISTORY_ANSWER_SEP)[0]
    return events.get(_id)
