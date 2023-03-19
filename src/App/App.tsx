import { ChangeEvent, useRef } from 'react'
import styles from './App.module.css';
import type { Game, AnimationStateName } from '../Game'

const optionsNames: AnimationStateName[] = [
  'idle', 'jump', 'ko', 'run', 'fall', 'bite', 'dizzy', 'gethit', 'sit', 'roll'
];

export function App() {
  const refContainer = useRef<HTMLDivElement>(null);
  const options = optionsNames.map(item => <option key={item} value={item}>{item.toUpperCase()}</option>)

  const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const game = refContainer.current?.querySelector('ypr-game') as Game;
    const { value } = event.target;
    game.action = value as AnimationStateName;
  }

  return (
    <div className={styles.app} ref={refContainer}>
      <select onChange={handleChangeSelect} name="animation">
        {options}
      </select>
      <ypr-game></ypr-game>
    </div>
  )
}
