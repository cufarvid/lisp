import { unquote } from './util';
import Env from './Env';
import { AnyValue, Element } from './types';

export default class Quasiquote {
  private readonly _value: Element[];

  constructor(value: Element[]) {
    this._value = value;
  }

  eval(env: Env) {
    return unquote(this._value, env);
  }

  toString(): string {
    return `(quasiquote ${this._value})`;
  }
}
