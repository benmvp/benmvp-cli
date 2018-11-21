export type Command = 'create' | 'test' | 'start' | 'build'
export type ModuleFormat = 'type' | 'esm' | 'umd' | 'dist'
export type TestMode = 'type' | 'lint' | 'unit'

export interface Result {
  code: number
}
