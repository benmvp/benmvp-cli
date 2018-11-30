export type Command = 'create' | 'test' | 'start' | 'build'
export type ModuleFormat = 'type' | 'esm' | 'umd' | 'dist'
export type TestMode = 'type' | 'lint' | 'unit'

export interface Result {
  readonly code?: number
  readonly error?: Error
  readonly message?: string
}
