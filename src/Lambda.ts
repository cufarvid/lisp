import { evalLisp } from './util';
import Env from './Env';
import List from './List';
import { AnyValue, Element } from './types';

export default class Lambda {
  private readonly _bindNames: Element[];
  private readonly _body: AnyValue;
  public isMacro: boolean;

  constructor(bindNames: Element[], body: AnyValue, isMacro = false) {
    this._bindNames = bindNames;
    this._body = body;
    this.isMacro = isMacro;
  }

  eval(env: Env, args: AnyValue[] = []) {
    const localEnv = env.duplicate();

    args.forEach((arg, i) => {
      const bindName = this._bindNames[i].toString();
      const value = this.isMacro ? arg : evalLisp(arg, env);

      localEnv.bind(bindName, value);
    });

    const evaled = this._body.eval(localEnv, args);

    if (!this.isMacro) {
      return evaled;
    }

    const list = new List(evaled);
    const stringified = list.toString();

    return evalLisp(stringified, env);
  }
}
