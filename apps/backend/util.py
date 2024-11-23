from apps.backend.classes import Event
from apps.backend.db import HISTORY_EVENT_SEP, HISTORY_ANSWER_SEP
from events import events


def get_latest_event_from_history(history: str) -> Event:
    _id = history.split(HISTORY_EVENT_SEP)[-1].split(HISTORY_ANSWER_SEP)[0]
    return events.get(_id)
