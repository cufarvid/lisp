import Lambda from './Lambda';
import List from './List';
import Env from './Env';
import { AnyValue, Element } from './types';

export const evalLisp = (x: AnyValue, env: Env): AnyValue => {
  if (typeof x === 'string') {
    return x;
  }

  if (x && x.eval) {
    return x.eval(env);
  }

  return x;
};

export const macroExpand = (x: AnyValue, env: Env): AnyValue => {
  if (x instanceof Lambda && x.isMacro) {
    return x.eval(env);
  }

  return x;
};

export const unquote = (
  values: Element | Element[],
  env: Env
): Element | Element[] => {
  if (!Array.isArray(values)) {
    return values;
  }

  const result: AnyValue[] = [];

  for (const value of values) {
    if (!Array.isArray(value)) {
      result.push(unquote(value, env));
      continue;
    }

    if (value[0].name === 'unquote') {
      result.push(evalLisp(value[1], env));
    } else if (value[0].name === 'splice-unquote') {
      result.push(...evalLisp(value[1], env));
    } else {
      result.push(new List(unquote(value, env)));
    }
  }

  return result;
};
