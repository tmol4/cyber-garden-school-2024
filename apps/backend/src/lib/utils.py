from lib.classes import Event, User
from lib.db import HISTORY_EVENT_SEP, HISTORY_ANSWER_SEP
from lib.events import events

from random import randrange


def get_latest_event_from_history(history: str) -> Event | None:
    if not history:
        return None
    
    _id = history.split(HISTORY_EVENT_SEP)[-1].split(HISTORY_ANSWER_SEP)[0]
    
    return events.get(_id)

def make_analytic_text_from_history(history: str):
    result = []
    history = history.split(HISTORY_EVENT_SEP)

    for pair in history:
        ids = pair.split(HISTORY_ANSWER_SEP)
        if len(ids) == 2:
            event_id, answer_id = ids
            
            analytic_text = events.get(event_id).answers.get(answer_id).analytic_text
            
            if analytic_text:
                result.append()

    return result



def get_events_from_history(history: str):
    if not history:
        return []
        
    result = []
    
    pairs = history.split(HISTORY_EVENT_SEP)
    
    for pair in pairs:
        event = pair.split(HISTORY_ANSWER_SEP)[0]
        result.append(event)
        
    return result


def get_history_length(user: User):
    return len(user.history.split(HISTORY_EVENT_SEP))


def get_random_event(history: str):
    history_events = get_events_from_history(history)
    event_ids = list(events.keys())
    
    print(f"events_ids: {event_ids}")
    print(f"history_events: {history_events}")
    
    for h_event_id in history_events:
        event_ids.remove(h_event_id)
    
    rand_index = randrange(0, len(event_ids))
    return events.get(event_ids[rand_index])


def make_on_event_json_response(db, user: User) -> dict:
    if user.money <= 0:
        _type = "end"
        return {"type": _type, "data": {"result": "lose"}}
    
    if get_history_length(user) >= 10:
        _type = "end"
        return {"type": _type, "data": {"result": "win"}}
    
    event = get_random_event(user.history)
    
    print(f"returned event: {event.to_json()}")

    db.add_event_to_user_history(_id=user._id, event_id=event._id)
    
    user = db.get_user(user._id)
    
    _type = "event"
    data = {"event": event.to_json(), "user": user.to_json()}
    
    return {"type": _type, "data": data}



def return_last_data(user: User):
    last_event = get_latest_event_from_history(user.history)
    
    if last_event is None:
        _type = "intro"
        data = {"user": user.to_json()}
        
        return {"type": _type, "data": data}

    _type = "event"
    data = {"event": last_event.to_json(), "user": user.to_json()}
        
    return {"type": _type, "data": data}
