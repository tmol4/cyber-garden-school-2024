class User:
    def __init__(self, data):
        self.id, self.money, self.chance_bad, self.text_history = data


class Event:
    def __init__(self, _id, description, answers, delta_money=0):
        self._id = _id
        self.description = description
        self.delta_money = delta_money
        self.answers = answers

    def to_json(self):
        return {
            "id": self._id,
            "description": self.description,
            "answers": {answer._id: answer.to_json() for answer in self.answers},
            "delta_money": self.delta_money
        }


class Answer:
    def __init__(self, _id, text, chance_bad, delta_money=0, analytic_text=""):
        self._id = _id
        self.text = text
        self.chance_bad = chance_bad
        self.delta_money = delta_money
        self.analytic_text = analytic_text

    def to_json(self):
        return {
            "id": self._id,
            "text": self.text,
            "chance_bad": self.chance_bad,
            "delta_money": self.delta_money,
            "analytic_text": self.analytic_text
        }




