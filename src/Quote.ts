import { Element } from './types';

export default class Quote {
  private readonly _value: Element | Element[];

  constructor(value: Element | Element[]) {
    this._value = value;
  }

  eval() {
    return this._value;
  }

  toString(): string {
    return `(quote ${this._value})`;
  }
}
