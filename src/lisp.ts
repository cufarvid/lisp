import grammar, { LispSemantics } from './lisp.ohm-bundle';
import Env from './Env';
import Def from './Def';
import Fn from './Fn';
import Macro from './Macro';
import List from './List';
import Quote from './Quote';
import Quasiquote from './Quasiquote';
import Sym from './Sym';
import { Dict } from 'ohm-js';
import { AnyValue, Element } from './types';

const semantics: LispSemantics = grammar.createSemantics();

semantics.addOperation('toAST', {
  Program(sexps) {
    return sexps.children.map((c) => c.toAST());
  },
  Sexp(_, stmt, __) {
    return stmt.toAST();
  },
  Stmt_list(args) {
    return new List(args.asIteration().children.map((c) => c.toAST()));
  },
  Stmt_fn(_, args, body) {
    return new Fn(args.toAST(), body.toAST());
  },
  Stmt_def(_, name, arg) {
    return new Def(name.sourceString, arg.toAST());
  },
  Stmt_macro(_, args, body) {
    return new Macro(args.toAST(), body.toAST());
  },
  Stmt_quote(_, node) {
    return new Quote(node.toAST());
  },
  Stmt_quasiquote(_, any) {
    return new Quasiquote(any.toAST());
  },
  argList(_, args, __) {
    return args.asIteration().children.map((c) => c.toAST());
  },
  symbol(_) {
    return new Sym(this.sourceString);
  },
  number(_) {
    return parseInt(this.sourceString);
  },
  string(_, text, __) {
    return text.sourceString;
  },
});

export const runLisp = (expr: string, env: Env) => {
  const match = grammar.match(expr);
  let result;

  if (match.failed()) {
    throw new Error(match.message);
  }

  const adapter: Dict = semantics(match);
  const ast: Element[] = adapter.toAST();

  ast.forEach((ast: Element) => {
    result = ast.eval(env);
  });

  return result;
};

export const createEnv = () => {
  const env = new Env();

  const multiArgOp =
    (callback: AnyValue) =>
    (...args: AnyValue[]) => {
      if (args.length === 1) {
        return args[0];
      }

      return args.slice(1).reduce(callback, args[0]);
    };

  env.bind('str', (...args: AnyValue[]) =>
    args.map((arg) => arg.toString()).join(' ')
  );

  env.bind('log', (...text: string[]) => console.log('lisp>', ...text));

  env.bind(
    '+',
    multiArgOp((a: number, b: number) => a + b)
  );
  env.bind(
    '-',
    multiArgOp((a: number, b: number) => a - b)
  );
  env.bind(
    '*',
    multiArgOp((a: number, b: number) => a * b)
  );
  env.bind(
    '/',
    multiArgOp((a: number, b: number) => a / b)
  );

  env.bind('first', (xs: AnyValue[]) => xs[0]);
  env.bind('second', (xs: AnyValue[]) => xs[1]);
  env.bind('nth', (idx: number, xs: AnyValue[]) => xs[idx]);

  return env;
};
