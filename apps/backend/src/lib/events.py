from lib.classes import Event, Answer

events_good = {
    "1": Event(
        _id="1",
        description="У вас есть немного лишних денег, что Вы предпримете для улучшения своего бизнеса?",
        delta_money=0,
        answers={
            "1": Answer(_id="1", text="Заплатить профессиональному повару, чтобы он разработал новые вариации шаурмы", chance_bad=20, delta_money=-5000),
            "2": Answer(_id="2", text="Потратить их на скины в DOTA 2", chance_bad=80),
            "3": Answer(_id="3", text="Начать использовать более дорогие и качественные продукты", chance_bad=0, delta_money=-7000)
        }
    ),
    "2": Event(
        _id="2",
        description="Появился новый поставщик шаурмы с более низкой ценой на мясо (ходят слухи что это собачатина). Согласны ли Вы перейти на нового поставщика?",
        delta_money=0,
        answers={
            "1": Answer(_id="1", text="Перейти на нового поставщика", chance_bad=80, delta_money=2000),
            "2": Answer(_id="2", text="Остаться с текущим поставщиком", chance_bad=0)
        }
    ),
    "3": Event(
        _id="3",
        description="К сожалению, ваше арендное помещение нуждается в ремонте, Вам нужно решить как справиться с непредвиденными расходами:",
        delta_money=0,
        answers={
            "1": Answer(_id="1", text="Взять кредит", chance_bad=20),
            "2": Answer(_id="2", text="Сэкономить на зарплате работников", chance_bad=70)
         }
    ),
    "4": Event(
        _id="4",
        description="О вашей шаурмечной никто не знает, ваше предприятие нужнается в рекламе: ",
        delta_money=0,
        answers={
            "1": Answer(_id="1", text="Заказать рекламу у популярного блогера", chance_bad=0, delta_money=-5000),
            "2": Answer(_id="2", text="Принять участие в городской ярмарке", chance_bad=20)
        }
    ),
    "5": Event(
        _id="5",
        description="О вашей шаурмечной никто не знает, ваше предприятие нужнается в рекламе: ",
        delta_money=0,
        answers={
            "1": Answer(_id="1", text="Заказать рекламу у популярного блогера", chance_bad=0, delta_money=-5000),
            "2": Answer(_id="2", text="Принять участие в городской ярмарке", chance_bad=20)
        }
    ),
    "6": Event(
        _id="6",
        description="Был разработан новый соус, все ваши конкуренты уже используют его, но у вас недостаточно денег, что Вы будете делать? ",
        delta_money=0,
        answers={
            "1": Answer(_id="1", text="Взять микрозайм для покупки соуса", chance_bad=20, delta_money=5000),
            "2": Answer(_id="2", text="Ничего не делать", chance_bad=70)
        }
    ),
    "7": Event(
        _id="7",
        description="Вы заметили, что ваш персонал слишком часто отлынивает от работы, что Вы предпримете?",
        delta_money=0,
        answers={
            "1": Answer(_id="1", text="Платить им больше зп", chance_bad=0, delta_money=-5000),
            "2": Answer(_id="2", text="Нанять польностью новый персонал", chance_bad=30)
        }
    ),
    "8": Event(
        _id="8",
        description="Вы обнаружили, что у вас есть немного лишних своих денег. Что Вы с ними сделаете?",
        delta_money=0,
        answers={
            "1": Answer(_id="1", text="Инвестируете их в акции компании Z", chance_bad=10),
            "2": Answer(_id="2", text="Купить аркану в DOTA 2", chance_bad=80),
            "3": Answer(_id="3", text="Положить их на сберегательный счёт",chance_bad=0)
        }
    ),
    "9": Event(
        _id="9",
        description="Вы понимаете, что ваш бизнес потихоньку работает себе в убыток, ваши дальнейшие действия:",
        delta_money=0,
        answers={
            "1": Answer(_id="1", text="Взять кредит", chance_bad=20),
            "2": Answer(_id="2", text="Ограничить ненужные расходы", chance_bad=0),
            "3": Answer(_id="3", text="Сэкономить на производстве", chance_bad=80)
        }
    ),
    "10": Event(
        _id="10",
        description="Открылась новая шаурмечная неподалеку, предлагающая более низкие цены. Ваши действия:",
        delta_money=0,
        answers={
            "1": Answer(_id="1", text="Тоже понизить цену на шаурму", chance_bad=40),
            "2": Answer(_id="2", text="Провести маркетинговую кампанию", chance_bad=0, delta_money=-5000),
        }
    ),
}
events_bad = {

}

events = {**events_good, **events_bad}
