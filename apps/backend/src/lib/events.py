from lib.classes import Event, Answer

# home, street, shop

events_good = {
    "1": Event(
        _id="1",
        description="У вас есть немного лишних денег, что Вы предпримете для улучшения своего бизнеса?",
        delta_money=0,
        image="shop",
        answers={
            "1": Answer(_id="1", text="Заплатить профессиональному повару, чтобы он разработал новые вариации шаурмы", chance_bad=20, delta_money=1000, analytic_text=""),
            "2": Answer(_id="2", text="Потратить их на скины в DOTA 2", chance_bad=80, delta_money=-5000, analytic_text="Обнаружив, что у вас остались лишние деньги, вы решили потратить их на игры. Из-за этого ваш бизнес потерпел большие убытки."),
            "3": Answer(_id="3", text="Начать использовать более дорогие и качественные продукты", chance_bad=0, delta_money=500, analytic_text="")
        }
    ),
    "2": Event(
        _id="2",
        description="Появился новый поставщик шаурмы с более низкой ценой на мясо (ходят слухи что это собачатина). Согласны ли Вы перейти на нового поставщика?",
        delta_money=0,
        image="street",
        answers={
            "1": Answer(_id="1", text="Перейти на нового поставщика", chance_bad=80, delta_money=-3000, analytic_text="Лучше не доверять непроверенным поставщикам. Из-за вашей доверчивости от вас ушло большое количество клиентов."),
            "2": Answer(_id="2", text="Остаться с текущим поставщиком", chance_bad=0, analytic_text="")
        }
    ),
    "3": Event(
        _id="3",
        description="К сожалению, ваше арендное помещение нуждается в ремонте, Вам нужно решить как справиться с непредвиденными расходами:",
        delta_money=0,
        image="home",
        answers={
            "1": Answer(_id="1", text="Взять кредит", chance_bad=20, credit=5000, delta_money=5000,  analytic_text=""),
            "2": Answer(_id="2", text="Сэкономить на зарплате работников", chance_bad=70, delta_money=-1000, analytic_text="Из-за вашей экономии на работников много сотрудников ушли из вашего бизнеса. Дополнительные расходы ушли для поиска нового персонала")
         }
    ),
    "4": Event(
        _id="4",
        description="Ой-ой! К вам пришла санитарная инспекция. Что вы выберите?",
        delta_money=0,
        image="home",
        answers={
            "1": Answer(_id="1", text="Попробовать откупиьтся от инспекции", chance_bad=0, delta_money=-10000, analytic_text="Санитарной инспекции не понравилось ваше предложение. Вы не смогли откупиьтся. Пришлось платить большой штраф."),
            "2": Answer(_id="2", text="Провести проверку и соблюсти санитарные условия", chance_bad=20, delta_money=-100, analytic_text=""),
            "3": Answer(_id="3", text="Ничего не делать", chance_bad=20, delta_money=-6000, analytic_text="Из-за несоблюдения санитарных условий инспекция выписала вам штраф")
        }
    ),
    "5": Event(
        _id="5",
        description="О вашей шаурмечной никто не знает, ваше предприятие нужнается в рекламе: ",
        delta_money=0,
        image="street",
        answers={
            "1": Answer(_id="1", text="Заказать рекламу у популярного блогера", chance_bad=0, delta_money=-100, analytic_text=""),
            "2": Answer(_id="2", text="Принять участие в городской ярмарке", chance_bad=20, delta_money=0, analytic_text="")
        }
    ),
    "6": Event(
        _id="6",
        description="Был разработан новый соус, все ваши конкуренты уже используют его, но у вас недостаточно денег, что Вы будете делать? ",
        delta_money=0,
        image="shop",
        answers={
            "1": Answer(_id="1", text="Взять микрозайм для покупки соуса", chance_bad=20, credit=5000, delta_money=0, analytic_text="Брать микрозайм чаще всего очень плохая идея, лучше накопить денег или снять их со сберегательного счёта"),
            "2": Answer(_id="2", text="Ничего не делать", chance_bad=70, delta_money=-3000, analytic_text="Из-за того, что вы решили не использовать популярный соус ваши клиенты ушли к конкурентам. "),
            "3": Answer(_id="3", text="Продумать какие ещё улучшения вы можете сделать в вашем бизнесе и взять кредит для их выполнения", credit=5000, delta_money=3000)
        }
    ),
    "7": Event(
        _id="7",
        description="Вы заметили, что ваш персонал слишком часто отлынивает от работы, что Вы предпримете?",
        delta_money=0,
        image="shop",
        answers={
            "1": Answer(_id="1", text="Платить им больше зп", chance_bad=0, delta_money=-1000, analytic_text=""),
            "2": Answer(_id="2", text="Нанять польностью новый персонал", chance_bad=30, delta_money=-5000, analytic_text="Полностью новый персонал может вызвать ещё больше проблем, так что лучше было бы разрешать конфликты в старом составе")
        }
    ),
    "8": Event(
        _id="8",
        description="Вы обнаружили, что у вас есть немного лишних денег. Что Вы с ними сделаете?",
        delta_money=0,
        image="home",
        answers={
            "1": Answer(_id="1", text="Инвестируете их в акции компании Z", chance_bad=10, delta_money=0, analytic_text=""),
            "2": Answer(_id="2", text="Купить аркану в DOTA 2", chance_bad=80, delta_money=-1000, analytic_text="Аркана в DOTA 2 к сожалению не поможет продвижению бизнеса"),
            "3": Answer(_id="3", text="Положить их на сберегательный счёт", delta_money=3000, chance_bad=0, analytic_text="")
        }
    ),
    "9": Event(
        _id="9",
        description="Вы понимаете, что ваш бизнес потихоньку работает себе в убыток, ваши дальнейшие действия:",
        delta_money=0,
        image="shop",
        answers={
            "1": Answer(_id="1", text="Взять кредит", credit=5000, delta_money=5000, chance_bad=20),
            "2": Answer(_id="2", text="Ограничить ненужные расходы", chance_bad=0, analytic_text=""),
            "3": Answer(_id="3", text="Сэкономить на производстве", chance_bad=80, delta_money=-2000, analytic_text="Клиенты могут заметить, что вы экономите на производстве, и они уйдут к конкурентам")
        }
    ),
    "10": Event(
        _id="10",
        description="Открылась новая шаурмечная неподалеку, предлагающая более низкие цены. Ваши действия:",
        delta_money=0,
        image="street",
        answers={
            "1": Answer(_id="1", text="Тоже понизить цену на шаурму", chance_bad=40, delta_money=-1500, analytic_text="Это плохое решение, так как вы начали работаь себе в убыток"),
            "2": Answer(_id="2", text="Провести маркетинговую кампанию", chance_bad=0, delta_money=500, analytic_text=""),
        }
    ),
}
events_bad = {

}

events = {**events_good, **events_bad}
