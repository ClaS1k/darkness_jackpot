# jsgame_android

Игра на чистом JavaScript на андроид. 

2D платформер с рпг элементами, возможно рогалик.

Потом сам допиши что хочешь, я тоже допишу когда нормально обсудим, я canvas и drawimage изучаю и попытаюсь вы pixel studio спрайт сделать

-----------------------------------------------------

Задачи для Серёжи

1)Дополнить метод draw для класса GameObject так, чтоб была анимация.
(в anims у объекта хранятся анимации, а ключ в массиве-это название анимации;
свойство texture хранит картинку, отоброжающуюся сейчас. Её надо менять для каждого кадра анимации(то есть при каждом вызове метода draw). Свойство anim хранит текущую анимацию. Если оно =='default', то показывается статичная картинка. Переменная animated хранит булево значение(true-анимация есть, а false-анимации нету. Свойство frame хранит номер кадра анимации(начинается с 0). Колличество кадров анимации хранится в свойстве frames у объекта анимации).
