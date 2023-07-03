import { evalLisp, macroExpand } from './util';
import Lambda from './Lambda';
import Env from './Env';
import Sym from './Sym';
import { Element } from './types';

export default class List {
  private readonly _args: Element[];

  constructor(args: Element | Element[]) {
    this._args = Array.isArray(args) ? args : [args];
  }

  eval(env: Env): Element {
    const sym = this._args[0] as Sym;
    let args = this._args.slice(1);

    const fun = env.get(sym.name);

    const isLambda = fun instanceof Lambda;
    const isMacro = isLambda && fun.isMacro;

    if (isMacro) {
      return fun.eval(env, args);
    }

    args = args
      .map((arg) => evalLisp(arg, env))
      .map((arg) => macroExpand(arg, env));

    if (isLambda) {
      return fun.eval(env, args);
    }

    return fun(...args);
  }

  toString(): string {
    return '(' + this._args.map((arg) => arg.toString()).join(' ') + ')';
  }
}
