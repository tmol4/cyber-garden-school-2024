from lib.classes import Event
from lib.db import HISTORY_EVENT_SEP, HISTORY_ANSWER_SEP
from lib.events import events


def get_latest_event_from_history(history: str) -> Event:
    _id = history.split(HISTORY_EVENT_SEP)[-1].split(HISTORY_ANSWER_SEP)[0]
    return events.get(_id)

def make_analytic_text_from_history(history: str):
    result = []
    history = history.split(HISTORY_EVENT_SEP)

    for pair in history:
        ids = pair.split(HISTORY_ANSWER_SEP)
        if len(ids) == 2:
            event_id, answer_id = ids
            result.append(events.get(event_id).answers.get(answer_id).analytic_text)

    return result
