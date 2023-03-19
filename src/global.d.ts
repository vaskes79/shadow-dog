import { DOMAttributes } from 'react';
import { Game } from './Game'
import './Game';

type CustomEvents<K extends string> = { [key in K]: (event: CustomEvent) => void };
type CustomElement<T> = Partial<T & DOMAttributes<T> & { children: any }>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['ypr-game']: CustomElement<Game>;
    }
  }
}
