import Def from './Def';
import Fn from './Fn';
import Lambda from './Lambda';
import List from './List';
import Macro from './Macro';
import Quote from './Quote';
import Quasiquote from './Quasiquote';
import Sym from './Sym';

export type AnyValue = any;
export type Value = number | string;

export type Element =
  | Def
  | Fn
  | Lambda
  | List
  | Macro
  | Quote
  | Quasiquote
  | Sym;
