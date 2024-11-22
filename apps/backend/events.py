from classes import Event, Answer

events = [
    Event(
        description="Зарплата",
        delta_money=1000,
        answers=[
            Answer(
                text="Да",
                chance_bad=50
            ),
            Answer(
                text="Нет",
                chance_bad=50
            )
        ]
    ),
    Event(
        description="",
        answers=[
            Answer(
                text="Да",
                chance_bad=50,
                delta_money=10
            ),
            Answer(
                text="Нет",
                chance_bad=50
            )
        ]
    )
]

