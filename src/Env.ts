import { AnyValue } from './types';

export default class Env {
  private readonly _env: Map<string, AnyValue>;

  constructor(env = new Map<string, AnyValue>()) {
    this._env = env;
  }

  bind(name: string, value: AnyValue): void {
    this._env.set(name, value);
  }

  get(name: string): AnyValue {
    if (!this._env.has(name)) {
      throw new Error(`${name} not in env`);
    }

    return this._env.get(name);
  }

  duplicate(): Env {
    return new Env(this._env);
  }
}
