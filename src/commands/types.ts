export type Command = 'create' | 'test' | 'start' | 'build' | 'integrate'
export type ModuleFormat = 'type' | 'esm' | 'cjs'
export type TestMode = 'type' | 'lint' | 'spec'

export interface Result {
  readonly code?: number;
  readonly error?: Error;
  readonly message?: string;
}
