export type Pos = {
  x: number;
  y: number;
}

export type AnimationItem = {
  loc: Pos[]
  width?: number;
  height?: number;
}

export type AnimationStateName = 'idle' | 'jump' | 'fall' | 'run' | 'dizzy' | "sit" | 'roll' | 'bite' | 'ko' | 'gethit';

export type AnimationStateItem = {
  name: AnimationStateName;
  frames: number;
}
