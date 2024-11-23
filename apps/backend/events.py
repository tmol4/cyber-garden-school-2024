from classes import Event, Answer

events = {
    "1": Event(
        _id="1",
        description="Зарплата",
        delta_money=1000,
        answers={
            "1": Answer(_id="1", text="Да", chance_bad=50),
            "2": Answer(_id="2", text="Нет", chance_bad=50)
        }
    ),
}

