import Env from './Env';
import { AnyValue } from './types';

export default class Sym {
  public readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  eval(env: Env): AnyValue {
    return env.get(this.name);
  }

  toString(): string {
    return this.name;
  }
}
