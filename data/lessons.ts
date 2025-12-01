import { Lesson } from '../types';

export const lessons: Lesson[] = [
  {
    id: 'intro',
    title: '1. Введение и Print',
    description: 'Первая программа на Python. Вывод информации на экран.',
    content: `
# Привет, Python!

Python — это мощный и простой в изучении язык программирования. Традиционно изучение любого языка начинается с написания программы, которая выводит на экран фразу "Hello, World!".

В Python для вывода текста используется функция \`print()\`.

**Пример:**
\`\`\`python
print("Привет, мир!")
\`\`\`

Обратите внимание, что текст должен быть заключен в кавычки (одинарные \`'\` или двойные \`"\`).
    `,
    initialCode: `# Напишите ваш код здесь\n`,
    task: 'Используйте функцию print(), чтобы вывести фразу "Hello Python!" (без кавычек в выводе).',
    videoLinks: [
      { title: 'Установка Python и первая программа', url: 'https://www.youtube.com/results?search_query=python+установка+и+первая+программа' },
      { title: 'Что такое Python (обзор)', url: 'https://www.youtube.com/results?search_query=что+такое+python+для+начинающих' }
    ]
  },
  {
    id: 'variables',
    title: '2. Переменные',
    description: 'Как хранить данные в памяти.',
    content: `
# Переменные

Переменные — это контейнеры для хранения данных. В Python не нужно объявлять тип переменной заранее, он определяется автоматически.

**Пример:**
\`\`\`python
name = "Алекс"
age = 25
print(name)
print(age)
\`\`\`

Имена переменных должны быть понятными. Используйте латинские буквы, цифры и подчеркивания. Имя не может начинаться с цифры.
    `,
    initialCode: `name = "Alice"\n# Добавьте код ниже\n`,
    task: 'Создайте переменную с именем `score`, присвойте ей значение `100` и выведите её на экран.',
    videoLinks: [
      { title: 'Переменные в Python', url: 'https://www.youtube.com/results?search_query=python+переменные+типы+данных' }
    ]
  },
  {
    id: 'math',
    title: '3. Арифметика',
    description: 'Базовые математические операции.',
    content: `
# Математика в Python

Python отлично справляется с вычислениями. Основные операторы:

*   \`+\` Сложение
*   \`-\` Вычитание
*   \`*\` Умножение
*   \`/\` Деление (всегда возвращает float)
*   \`//\` Целочисленное деление
*   \`%\` Остаток от деления
*   \`**\` Возведение в степень

**Пример:**
\`\`\`python
x = 10
y = 3
print(x + y)  # 13
print(x ** 2) # 100
\`\`\`
    `,
    initialCode: `a = 5\nb = 3\n`,
    task: 'Вычислите сумму переменных `a` и `b`, умножьте результат на 2 и выведите итоговое число.',
    videoLinks: [
      { title: 'Математические операции в Python', url: 'https://www.youtube.com/results?search_query=python+арифметика+операторы' }
    ]
  },
  {
    id: 'strings',
    title: '4. Строки',
    description: 'Работа с текстовыми данными.',
    content: `
# Операции со строками

Строки можно "складывать" (конкатенация) и дублировать.

**Конкатенация:**
\`\`\`python
first = "Hello"
second = "World"
print(first + " " + second) # Hello World
\`\`\`

**f-строки (форматирование):**
Самый удобный способ вставки переменных в текст.
\`\`\`python
name = "Bob"
print(f"Привет, {name}!")
\`\`\`
    `,
    initialCode: `fruit = "яблоко"\ncount = 5\n`,
    task: 'Используя f-строку, выведите фразу: "У меня есть 5 яблоко". Используйте переменные `fruit` и `count`.',
    videoLinks: [
      { title: 'Работа со строками в Python', url: 'https://www.youtube.com/results?search_query=python+строки+методы' },
      { title: 'f-строки форматирование', url: 'https://www.youtube.com/results?search_query=python+f-strings' }
    ]
  },
  {
    id: 'conditions',
    title: '5. Условия if/else',
    description: 'Принятие решений в коде.',
    content: `
# Условные конструкции

Чтобы программа вела себя по-разному в зависимости от данных, используйте \`if\`, \`elif\` и \`else\`.

**Важно:** В Python отступы (обычно 4 пробела) обязательны! Они определяют блоки кода.

**Пример:**
\`\`\`python
x = 10
if x > 5:
    print("Больше пяти")
else:
    print("Пять или меньше")
\`\`\`
    `,
    initialCode: `temperature = 15\n`,
    task: 'Напишите условие: если `temperature` меньше 0, выведите "Холодно", иначе выведите "Тепло".',
    videoLinks: [
      { title: 'Условный оператор if else', url: 'https://www.youtube.com/results?search_query=python+if+else+условия' }
    ]
  },
  {
    id: 'loops',
    title: '6. Циклы',
    description: 'Повторение действий.',
    content: `
# Цикл for

Цикл \`for\` часто используется с функцией \`range()\`, чтобы повторить действие определенное количество раз.

**Пример:**
\`\`\`python
# Выведет числа от 0 до 4
for i in range(5):
    print(i)
\`\`\`

Функция \`range(start, stop)\` генерирует числа от start до stop-1.
    `,
    initialCode: `# Напишите цикл здесь\n`,
    task: 'Используя цикл `for` и `range`, выведите квадраты чисел от 1 до 5 включительно (1, 4, 9, 16, 25).',
    videoLinks: [
      { title: 'Циклы for и while', url: 'https://www.youtube.com/results?search_query=python+циклы+for+while' }
    ]
  }
];