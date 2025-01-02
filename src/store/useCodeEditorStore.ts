import { CodeEditorState } from './../types/index'
import { LANGUAGE_CONFIG } from '@/app/(root)/_constants'
import { create } from 'zustand'
import { Monaco } from '@monaco-editor/react'

// Функция для получения начального состояния редактора
const getInitialState = () => {
  // Если серверное окружение, возвращаем значения по умолчанию
  if (typeof window === 'undefined') {
    return {
      language: 'javascript',
      fontSize: 16,
      theme: 'vs-dark',
    }
  }

  // Если клиентское окружение, возвращаем значения из localStorage
  const savedLanguage = localStorage.getItem('editor-language') || 'javascript'
  const savedTheme = localStorage.getItem('editor-theme') || 'vs-dark'
  const savedFontSize = localStorage.getItem('editor-font-size') || 16

  return {
    language: savedLanguage,
    theme: savedTheme,
    fontSize: Number(savedFontSize),
  }
}

export const useCodeEditorStore = create<CodeEditorState>((set, get) => {
  const initialState = getInitialState()

  return {
    ...initialState,
    output: '',
    isRunning: false,
    error: null,
    editor: null,
    executionResult: null,

    // Получение текущего кода из редактора
    getCode: () => get().editor?.getValue() || '',

    // Установка экземпляра редактора
    setEditor: (editor: Monaco) => {
      const savedCode = localStorage.getItem(`editor-code-${get().language}`)
      if (savedCode) editor.setValue(savedCode)

      set({ editor })
    },

    // Установка темы редактора
    setTheme: (theme: string) => {
      localStorage.setItem('editor-theme', theme)
      set({ theme })
    },

    // Установка размера шрифта
    setFontSize: (fontSize: number) => {
      localStorage.setItem('editor-font-size', fontSize.toString())
      set({ fontSize })
    },

    // Установка языка программирования
    setLanguage: (language: string) => {
      // Сохранение текущего кода перед сменой языка
      const currentCode = get().editor?.getValue()
      if (currentCode) {
        localStorage.setItem(`editor-code-${get().language}`, currentCode)
      }

      localStorage.setItem('editor-language', language)

      set({
        language,
        output: '',
        error: null,
      })
    },

    // Выполнение кода
    runCode: async () => {
      const { language, getCode } = get()
      const code = getCode()

      if (!code) {
        set({ error: 'Введите код для выполнения' })
        return
      }

      set({ isRunning: true, error: null, output: '' })

      try {
        const runtime = LANGUAGE_CONFIG[language].pistonRuntime
        const response = await fetch('https://emkc.org/api/v2/piston/execute', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            language: runtime.language,
            version: runtime.version,
            files: [{ content: code }],
          }),
        })

        const data = await response.json()

        console.log('Ответ от Piston:', data)

        // Обработка ошибок на уровне API
        if (data.message) {
          set({ error: data.message, executionResult: { code, output: '', error: data.message } })
          return
        }

        // Обработка ошибок компиляции
        if (data.compile && data.compile.code !== 0) {
          const error = data.compile.stderr || data.compile.output
          set({
            error,
            executionResult: {
              code,
              output: '',
              error,
            },
          })
          return
        }

        // Обработка ошибок выполнения
        if (data.run && data.run.code !== 0) {
          const error = data.run.stderr || data.run.output
          set({
            error,
            executionResult: {
              code,
              output: '',
              error,
            },
          })
          return
        }

        // Если выполнение прошло успешно
        const output = data.run.output

        set({
          output: output.trim(),
          error: null,
          executionResult: {
            code,
            output: output.trim(),
            error: null,
          },
        })
      } catch (error) {
        console.log('Ошибка выполнения кода:', error)
        set({
          error: 'Ошибка выполнения кода',
          executionResult: { code, output: '', error: 'Ошибка выполнения кода' },
        })
      } finally {
        set({ isRunning: false })
      }
    },
  }
})

// Функция для получения результата выполнения кода
export const getExecutionResult = () => useCodeEditorStore.getState().executionResult
