import Lambda from './Lambda';
import { AnyValue } from './types';

export default class Fn {
  private readonly _bindNames: AnyValue[];
  private readonly _body: AnyValue;

  constructor(bindNames: AnyValue[], body: AnyValue) {
    this._bindNames = bindNames;
    this._body = body;
  }

  eval(): Lambda {
    return new Lambda(this._bindNames, this._body);
  }

  toString(): string {
    const argsList = this._bindNames.map((b) => b.toString()).join(' ');
    return `(fn (${argsList}) ${this._body.toString()}))`;
  }
}
