import { evalLisp } from './util';
import Env from './Env';
import { AnyValue } from './types';

export default class Def {
  public readonly name: string;
  private readonly _arg: AnyValue;

  constructor(name: string, arg: AnyValue) {
    this.name = name;
    this._arg = arg;
  }

  eval(env: Env): void {
    env.bind(this.name, evalLisp(this._arg, env));
  }

  toString(): string {
    return `(def ${this.name} ${this._arg})`;
  }
}
