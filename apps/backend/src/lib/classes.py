class User:
    def __init__(self, data):
        self._id, self.money, self.credit, self.history = data

    def to_json(self):
        return {'_id': self._id, 'money': self.money, 'credit': self.credit, 'history': self.history}


class Event:
    def __init__(self, _id, description, answers, delta_money=0, image="home"):
        self._id = _id
        self.description = description
        self.delta_money = delta_money
        self.answers = answers
        self.image = image

    def to_json(self):
        return {
            "id": self._id,
            "description": self.description,
            "answers": {_id: answer.to_json() for _id, answer in self.answers.items()},
            "delta_money": self.delta_money,
            "image": self.image
        }


class Answer:
    def __init__(self, _id, text, chance_bad=0, credit=0, delta_money=0, analytic_text=""):
        self._id = _id
        self.text = text
        self.chance_bad = chance_bad
        self.credit = credit
        self.delta_money = delta_money
        self.analytic_text = analytic_text

    def to_json(self):
        return {
            "id": self._id,
            "text": self.text,
            "chance_bad": self.chance_bad,
            "credit": self.credit,
            "delta_money": self.delta_money,
            "analytic_text": self.analytic_text
        }




