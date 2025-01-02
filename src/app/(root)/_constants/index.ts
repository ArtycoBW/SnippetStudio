import { Monaco } from '@monaco-editor/react'
import { Theme } from '../../../types'

type LanguageConfig = Record<
  string,
  {
    id: string
    label: string
    logoPath: string
    pistonRuntime: { language: string; version: string }
    monacoLanguage: string
    defaultCode: string
  }
>

export const LANGUAGE_CONFIG: LanguageConfig = {
  javascript: {
    id: 'javascript',
    label: 'JavaScript',
    logoPath: '/javascript.png',
    pistonRuntime: { language: 'javascript', version: '18.15.0' },
    monacoLanguage: 'javascript',
    defaultCode: `// JavaScript Playground
const numbers = [1, 2, 3, 4, 5];

// Соотнесите числа с их квадратами
const squares = numbers.map(n => n * n);
console.log('Оригинальные числа:', numbers);
console.log('Квадрат чисел:', squares);

// Отфильтровать чётные числа
const evenNumbers = numbers.filter(n => n % 2 === 0);
console.log('Чётные числа:', evenNumbers);

// Вычислите сумму с помощью reduce
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log('Сумма чисел:', sum);`,
  },
  typescript: {
    id: 'typescript',
    label: 'TypeScript',
    logoPath: '/typescript.png',
    pistonRuntime: { language: 'typescript', version: '5.0.3' },
    monacoLanguage: 'typescript',
    defaultCode: `// TypeScript Playground
interface NumberArray {
  numbers: number[];
  sum(): number;
  squares(): number[];
  evenNumbers(): number[];
}

class MathOperations implements NumberArray {
  constructor(public numbers: number[]) {}

  sum(): number {
    return this.numbers.reduce((acc, curr) => acc + curr, 0);
  }

  squares(): number[] {
    return this.numbers.map(n => n * n);
  }

  evenNumbers(): number[] {
    return this.numbers.filter(n => n % 2 === 0);
  }
}

const math = new MathOperations([1, 2, 3, 4, 5]);

console.log('Оригинальные числа:', math.numbers);
console.log('Квадрат чисел:', math.squares());
console.log('Чётные числа:', math.evenNumbers());
console.log('Сумма чисел:', math.sum());`,
  },
  python: {
    id: 'python',
    label: 'Python',
    logoPath: '/python.png',
    pistonRuntime: { language: 'python', version: '3.10.0' },
    monacoLanguage: 'python',
    defaultCode: `# Python Playground
numbers = [1, 2, 3, 4, 5]

# Map numbers to their squares
squares = [n ** 2 for n in numbers]
print(f"Оригинальные числа: {numbers}")
print(f"Квадрат чисел: {squares}")

# Filter for even numbers
even_numbers = [n for n in numbers if n % 2 == 0]
print(f"Чётные числа: {even_numbers}")

# Вычислите сумму
numbers_sum = sum(numbers)
print(f"Сумма чисел: {numbers_sum}")`,
  },
  java: {
    id: 'java',
    label: 'Java',
    logoPath: '/java.png',
    pistonRuntime: { language: 'java', version: '15.0.2' },
    monacoLanguage: 'java',
    defaultCode: `public class Main {
  public static void main(String[] args) {
      // Создайте массив
      int[] numbers = {1, 2, 3, 4, 5};
      
      // Печать оригинальных цифр
      System.out.print("Оригинальные цифры: ");
      printArray(numbers);
      
      // Вычислите и выведите квадраты
      int[] squares = new int[numbers.length];
      for (int i = 0; i < numbers.length; i++) {
          squares[i] = numbers[i] * numbers[i];
      }
      System.out.print("Квадраты чисел: ");
      printArray(squares);
      
      // Выведите чётные числа
      System.out.print("Чётные числа: ");
      for (int n : numbers) {
          if (n % 2 == 0) System.out.print(n + " ");
      }
      System.out.println();
      
      // Посчитайте и выведите сумму
      int sum = 0;
      for (int n : numbers) sum += n;
      System.out.println("Сумма чисел: " + sum);
  }
  
  private static void printArray(int[] arr) {
      for (int n : arr) System.out.print(n + " ");
      System.out.println();
  }
}`,
  },
  go: {
    id: 'go',
    label: 'Go',
    logoPath: '/go.png',
    pistonRuntime: { language: 'go', version: '1.16.2' },
    monacoLanguage: 'go',
    defaultCode: `package main

import "fmt"

func main() {
  // Создайте отрезок
  numbers := []int{1, 2, 3, 4, 5}
  
  // Напишите оригинальные числа
  fmt.Println("Оригинальные числа:", numbers)
  
  // Посчитайте квадраты
  squares := make([]int, len(numbers))
  for i, n := range numbers {
      squares[i] = n * n
  }
  fmt.Println("Квадраты чисел:", squares)
  
  // Отфильтруйте чётные числа
  var evenNumbers []int
  for _, n := range numbers {
      if n%2 == 0 {
          evenNumbers = append(evenNumbers, n)
      }
  }
  fmt.Println("Чётные числа:", evenNumbers)
  
  // Посчитайте сумму
  sum := 0
  for _, n := range numbers {
      sum += n
  }
  fmt.Println("Сумма чисел:", sum)
}`,
  },
  rust: {
    id: 'rust',
    label: 'Rust',
    logoPath: '/rust.png',
    pistonRuntime: { language: 'rust', version: '1.68.2' },
    monacoLanguage: 'rust',
    defaultCode: `fn main() {
    // Создайте вектор
    let numbers = vec![1, 2, 3, 4, 5];
    
    // Выведите оригинальные числа
    println!("Оригинальные числа: {:?}", numbers);
    
    // Вычислите квадраты
    let squares: Vec<i32> = numbers
        .iter()
        .map(|&n| n * n)
        .collect();
    println!("Квадраты чисел: {:?}", squares);
    
    // Отфильтруйте чётные числа
    let even_numbers: Vec<i32> = numbers
        .iter()
        .filter(|&&n| n % 2 == 0)
        .cloned()
        .collect();
    println!("Чётные числа: {:?}", even_numbers);
    
    // Посчитайте сумму
    let sum: i32 = numbers.iter().sum();
    println!("Сумма чисел: {}", sum);
}`,
  },
  cpp: {
    id: 'cpp',
    label: 'C++',
    logoPath: '/cpp.png',
    pistonRuntime: { language: 'cpp', version: '10.2.0' },
    monacoLanguage: 'cpp',
    defaultCode: `#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>

int main() {
    // Создайте срез
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    
    // Выведите оригинальные числа
    std::cout << "Оригинальные числа: ";
    for (int n : numbers) std::cout << n << " ";
    std::cout << std::endl;
    
    // Посчитайте квадрат
    std::vector<int> squares;
    std::transform(numbers.begin(), numbers.end(), 
                  std::back_inserter(squares),
                  [](int n) { return n * n; });
    
    std::cout << "Квадрат чисел: ";
    for (int n : squares) std::cout << n << " ";
    std::cout << std::endl;
    
    // Отфильтруйте чётные числа
    std::cout << "Чётные числа: ";
    for (int n : numbers) {
        if (n % 2 == 0) std::cout << n << " ";
    }
    std::cout << std::endl;
    
    // Вычислите сумму
    int sum = std::accumulate(numbers.begin(), numbers.end(), 0);
    std::cout << "Сумма чисел: " << sum << std::endl;
    
    return 0;
}`,
  },
  csharp: {
    id: 'csharp',
    label: 'C#',
    logoPath: '/csharp.png',
    pistonRuntime: { language: 'csharp', version: '6.12.0' },
    monacoLanguage: 'csharp',
    defaultCode: `using System;
using System.Linq;

class Program {
    static void Main() {
        // Создайте массив
        int[] numbers = { 1, 2, 3, 4, 5 };
        
        // Выведите оригинальные числа
        Console.WriteLine($"Оригинальные числа: {string.Join(" ", numbers)}");
        
        // Посчитайте квадрат
        var squares = numbers.Select(n => n * n);
        Console.WriteLine($"Квадрат чисел: {string.Join(" ", squares)}");
        
        // Отфильтруйте чётные числа
        var evenNumbers = numbers.Where(n => n % 2 == 0);
        Console.WriteLine($"Чётные числа: {string.Join(" ", evenNumbers)}");
        
        // Вычислите сумму
        var sum = numbers.Sum();
        Console.WriteLine($"Сумма чисел: {sum}");
    }
}`,
  },
  ruby: {
    id: 'ruby',
    label: 'Ruby',
    logoPath: '/ruby.png',
    pistonRuntime: { language: 'ruby', version: '3.0.1' },
    monacoLanguage: 'ruby',
    defaultCode: `# Создайте массив
numbers = [1, 2, 3, 4, 5]

# Выведите оригинальные числа
puts "Оригинальные числа: #{numbers.join(' ')}"

# Посчитайте квадрат
squares = numbers.map { |n| n * n }
puts "Квадрат чисел: #{squares.join(' ')}"

# Отфильтруйте чётные числа
even_numbers = numbers.select { |n| n.even? }
puts "Чётные числа: #{even_numbers.join(' ')}"

# Вычислите сумму
sum = numbers.sum
puts "Сумма чисел: #{sum}"`,
  },
  swift: {
    id: 'swift',
    label: 'Swift',
    logoPath: '/swift.png',
    pistonRuntime: { language: 'swift', version: '5.3.3' },
    monacoLanguage: 'swift',
    defaultCode: `// Создайте массив
let numbers = [1, 2, 3, 4, 5]

// Выведите оригинальные числа
print("Оригинальные числа: \\(numbers)")

// Посчитайте квадрат
let squares = numbers.map { $0 * $0 }
print("Квадрат чисел: \\(squares)")

// Отфильтруйте чётные числа
let evenNumbers = numbers.filter { $0 % 2 == 0 }
print("Чётные числа: \\(evenNumbers)")

// Вычислите сумму
let sum = numbers.reduce(0, +)
print("Сумма чисел: \\(sum)")`,
  },
}

export const THEMES: Theme[] = [
  { id: 'vs-dark', label: 'VS Dark', color: '#1e1e1e' },
  { id: 'vs-light', label: 'VS Light', color: '#ffffff' },
  { id: 'github-dark', label: 'GitHub Dark', color: '#0d1117' },
  { id: 'monokai', label: 'Monokai', color: '#272822' },
  { id: 'solarized-dark', label: 'Solarized Dark', color: '#002b36' },
]

export const THEME_DEFINITONS = {
  'github-dark': {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '6e7681' },
      { token: 'string', foreground: 'a5d6ff' },
      { token: 'keyword', foreground: 'ff7b72' },
      { token: 'number', foreground: '79c0ff' },
      { token: 'type', foreground: 'ffa657' },
      { token: 'class', foreground: 'ffa657' },
      { token: 'function', foreground: 'd2a8ff' },
      { token: 'variable', foreground: 'ffa657' },
      { token: 'operator', foreground: 'ff7b72' },
    ],
    colors: {
      'editor.background': '#0d1117',
      'editor.foreground': '#c9d1d9',
      'editor.lineHighlightBackground': '#161b22',
      'editorLineNumber.foreground': '#6e7681',
      'editorIndentGuide.background': '#21262d',
      'editor.selectionBackground': '#264f78',
      'editor.inactiveSelectionBackground': '#264f7855',
    },
  },
  monokai: {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '75715E' },
      { token: 'string', foreground: 'E6DB74' },
      { token: 'keyword', foreground: 'F92672' },
      { token: 'number', foreground: 'AE81FF' },
      { token: 'type', foreground: '66D9EF' },
      { token: 'class', foreground: 'A6E22E' },
      { token: 'function', foreground: 'A6E22E' },
      { token: 'variable', foreground: 'F8F8F2' },
      { token: 'operator', foreground: 'F92672' },
    ],
    colors: {
      'editor.background': '#272822',
      'editor.foreground': '#F8F8F2',
      'editorLineNumber.foreground': '#75715E',
      'editor.selectionBackground': '#49483E',
      'editor.lineHighlightBackground': '#3E3D32',
      'editorCursor.foreground': '#F8F8F2',
      'editor.selectionHighlightBackground': '#49483E',
    },
  },
  'solarized-dark': {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '586e75' },
      { token: 'string', foreground: '2aa198' },
      { token: 'keyword', foreground: '859900' },
      { token: 'number', foreground: 'd33682' },
      { token: 'type', foreground: 'b58900' },
      { token: 'class', foreground: 'b58900' },
      { token: 'function', foreground: '268bd2' },
      { token: 'variable', foreground: 'b58900' },
      { token: 'operator', foreground: '859900' },
    ],
    colors: {
      'editor.background': '#002b36',
      'editor.foreground': '#839496',
      'editorLineNumber.foreground': '#586e75',
      'editor.selectionBackground': '#073642',
      'editor.lineHighlightBackground': '#073642',
      'editorCursor.foreground': '#839496',
      'editor.selectionHighlightBackground': '#073642',
    },
  },
}

// Для определения тем в Монако
export const defineMonacoThemes = (monaco: Monaco) => {
  Object.entries(THEME_DEFINITONS).forEach(([themeName, themeData]) => {
    monaco.editor.defineTheme(themeName, {
      base: themeData.base as any,
      inherit: themeData.inherit,
      rules: themeData.rules.map((rule) => ({
        ...rule,
        foreground: rule.foreground,
      })),
      colors: themeData.colors,
    })
  })
}
