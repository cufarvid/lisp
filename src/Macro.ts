import Lambda from './Lambda';
import { AnyValue } from './types';

export default class Macro {
  private readonly _bindNames: AnyValue[];
  private readonly _body: AnyValue;

  constructor(bindNames: AnyValue[], body: AnyValue) {
    this._bindNames = bindNames;
    this._body = body;
  }

  eval(): Lambda {
    return new Lambda(this._bindNames, this._body, true);
  }

  toString(): string {
    const argsList = this._bindNames.map((b) => b.toString()).join(' ');
    return `(macro (${argsList}) ${this._body.toString()}))`;
  }
}
