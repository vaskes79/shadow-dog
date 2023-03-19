import playerSprite from './sprites/shadow_dog.png'
import type { AnimationItem, AnimationStateItem, AnimationStateName } from './types'


export class Game extends HTMLElement {
  private _root: ShadowRoot;
  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;
  private _CANVAS_WIDTH: number;
  private _CANVAS_HEIGHT: number;
  private _player: HTMLImageElement;
  private _spriteWidth = 575; // 6873/12;
  private _spriteHeight = 523; // 5230 / 10;
  private _xPos: number = 0;
  private _yPos: number = 0;
  private _gameFrame: number = 0;
  private _staggerFrame: number = 5;
  private _spriteAnimation: Record<AnimationStateName, AnimationItem>;
  private _animationState: AnimationStateItem[];
  actionName: AnimationStateName = 'idle';

  constructor() {
    super();

    this.attachShadow({ mode: 'open' })

    if (!this.shadowRoot) {
      this.errorHandler('shadowRoot not exist')
    }

    this._root = this.shadowRoot as ShadowRoot;
    this._root.innerHTML = HTML;
    this._canvas = this._root.getElementById('canvas') as HTMLCanvasElement;
    this._ctx = this._canvas.getContext('2d') as CanvasRenderingContext2D;
    this._CANVAS_WIDTH = this._canvas.width = 600;
    this._CANVAS_HEIGHT = this._canvas.height = 600;
    this._player = new Image();
    this._player.src = playerSprite;
    this._animationState = [
      { name: "idle", frames: 7 },
      { name: 'jump', frames: 7 },
      { name: 'fall', frames: 7 },
      { name: "run", frames: 9 },
      { name: "dizzy", frames: 11 },
      { name: "sit", frames: 5 },
      { name: "roll", frames: 7 },
      { name: "bite", frames: 7 },
      { name: "ko", frames: 12 },
      { name: "gethit", frames: 4 },
    ]
    this._spriteAnimation = {} as Record<AnimationStateName, AnimationItem>;
  }


  static get observedAttributes() {
    return ['play', 'pause', 'end'];
  }


  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'name' && oldValue !== newValue) {
      console.log({ name, oldValue, newValue });
    }
  }

  connectedCallback() {
    this._createAnimationStates();
    this.animateGame();
  }

  disconnectedCallback() {
  }


  errorHandler(msg: string) {
    msg = msg || 'Error: Game';
    throw Error(msg);
  };

  private _createAnimationStates() {
    this._animationState.forEach((state, index) => {
      let frames: AnimationItem = {
        loc: []
      }

      for (let j = 0; j < state.frames; j++) {
        let x = j * this._spriteWidth;
        let y = index * this._spriteHeight;
        frames.loc.push({ x, y })
      }

      this._spriteAnimation[state.name] = frames;

    })
  }

  set action(actionName: AnimationStateName) {
    this.actionName = actionName;
  }

  animateGame = () => {
    this._ctx.clearRect(0, 0, this._CANVAS_WIDTH, this._CANVAS_HEIGHT);
    let position = Math.floor(this._gameFrame / this._staggerFrame) % this._spriteAnimation[this.actionName].loc.length;
    let frameX = this._spriteWidth * position;
    let frameY = this._spriteAnimation[this.actionName].loc[position].y

    this._ctx.drawImage(this._player, frameX, frameY, this._spriteWidth, this._spriteHeight, this._xPos, this._yPos, this._spriteWidth, this._spriteHeight);

    this._gameFrame++;
    requestAnimationFrame(this.animateGame);
  }

}

const HTML = `
<style>
  #canvas {
    border: 1px solid black;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 600px;
  }
</style>
<canvas id="canvas"></canvas>
`


export default customElements.define('ypr-game', Game);

