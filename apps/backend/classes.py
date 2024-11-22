class User:
    def __init__(self, data):
        self.id, self.money, self.chance_bad, self.text_history = data


class Event:
    def __init__(self, description, minus_money, answers):
        self.description = description
        self.minus_money = minus_money
        self.answers = answers


class Answer:
    def __init__(self, text, chance_bad):
        self.text = text
        self.chance_bad = chance_bad




