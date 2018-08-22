# Stickjaw

![Stickjaw logo](https://xakplant.ru/wp-content/uploads/2018/08/xakpl_stickjaw1.png)

Stickjaw — это маленькая JS библиотека для управления пропорциями блоков относительно друг-друга. Благодаря the Stickjaw вы можете делать ширину блока равную высоте и обратно, задавать пропорции или делать размер относительно другого блока. Если вы хоть раз задавались целью сделать какой-то html-блок по высоте или ширине другого или сделать высоту и ширину блока одинаковой то вы знаете что не всегда это удаётся и приходиться потратить много времени на это. (javascript-library for controlling block sizes, their proportionality).

[Документация и примеры](https://xakplant.ru/stickjaw/)

## Установка и инициализация

Скачайте Stickjaw в папку с вашим проектом и подключите в футере

Далее создайте новый скрипт после подключения Stickjaw и объявите объект с опциями

```JS
<script>
    var SJ_setiings = {
                options: {
                    hlw: true, // Высота как ширина
                    wlh: true, // Ширина как высота
                    hlt: true, // Высотка как у другого блока
                    wlt: true, // Ширина как у другого блока
                    alo: true, // Высота у всех блоков родителя одинаковая
                },
                settings: {
                    windowResize: true // Выполнять заново при изменении экрана
                }
            }
    var e = new SJ(SJ_setiings);
</script>
```

## Использование

Использовать Stickjaw просто. Нужно лишь добавить соответствующий атрибут

### Высота как ширина
Чтобы сделать высота блока равной его ширине нужно добавить атрибут:

> data-proportion-h="1"

```
<div data-proportion-h="1">Ваш контент</div>
```
Если вы хотите сделать так, чтобы ваш блок был равен ширина * 2 то просто измениет значение атрибута на 2
```
<div data-proportion-h="2">Ваш контент</div>
```

### Ширина как высота

Чтобы сделать ширину блока равную его высторе добавьте атрибут к вашему блоку.

> data-proportion-w="1"

```
<div data-proportion-w="1">Ваш контент</div>
```

Если вы хотите сделать так, чтобы ваш блок был равен высота * 2 то просто измениет значение атрибута на 2

```
<div data-proportion-w="2">Ваш контент</div>
```
