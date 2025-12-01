import { GlossaryTerm } from '../types';

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: 'variable',
    term: 'Переменная (Variable)',
    definition: 'Именованная область памяти для хранения данных. Значение переменной может меняться в процессе выполнения программы.',
    example: 'score = 100\nplayer_name = "Alex"'
  },
  {
    id: 'function',
    term: 'Функция (Function)',
    definition: 'Блок кода, который выполняет определённую задачу и может быть вызван многократно из разных частей программы.',
    example: 'print("Hello")'
  },
  {
    id: 'string',
    term: 'Строка (String)',
    definition: 'Тип данных для представления текста. Строки заключаются в одинарные или двойные кавычки.',
    example: 'greeting = "Привет, Python!"'
  },
  {
    id: 'integer',
    term: 'Целое число (Integer / int)',
    definition: 'Числовой тип данных, представляющий целые числа без дробной части.',
    example: 'count = 42'
  },
  {
    id: 'float',
    term: 'Вещественное число (Float)',
    definition: 'Числовой тип данных, представляющий числа с плавающей точкой (дробные).',
    example: 'pi = 3.14'
  },
  {
    id: 'loop',
    term: 'Цикл (Loop)',
    definition: 'Управляющая конструкция, позволяющая выполнять блок кода многократно.',
    example: 'for i in range(5):\n    print(i)'
  },
  {
    id: 'condition',
    term: 'Условный оператор (If/Else)',
    definition: 'Конструкция, позволяющая выполнять различные блоки кода в зависимости от истинности условия.',
    example: 'if x > 0:\n    print("Положительное")\nelse:\n    print("Отрицательное")'
  },
  {
    id: 'list',
    term: 'Список (List)',
    definition: 'Упорядоченная изменяемая коллекция элементов. Может содержать элементы разных типов.',
    example: 'items = [1, "apple", 3.5]'
  },
  {
    id: 'boolean',
    term: 'Булево значение (Boolean)',
    definition: 'Логический тип данных, принимающий одно из двух значений: True (Истина) или False (Ложь).',
    example: 'is_active = True'
  }
];