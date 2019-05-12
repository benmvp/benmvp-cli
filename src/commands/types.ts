export type Command = 'create' | 'test' | 'start' | 'build'
export type ModuleFormat = 'type' | 'esm' | 'cjs'
export type TestMode = 'type' | 'lint' | 'unit'

export interface Result {
  readonly code?: number;
  readonly error?: Error;
  readonly message?: string;
}
