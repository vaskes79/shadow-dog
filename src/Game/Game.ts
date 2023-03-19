export class Game extends HTMLElement {
  protected _root: ShadowRoot;
  protected _canvas: HTMLCanvasElement;
  protected _ctx: CanvasRenderingContext2D;

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
    console.log('ctx', this._ctx)
    console.log('context', this._ctx)
  }

  disconnectedCallback() {
  }


  errorHandler = (msg: string) => {
    msg = msg || 'Error: BaseComponent';
    throw Error(msg);
  };

}

const HTML = `
<style>
  #canvas {
    width: 100%;
    height: 100%;
    border: 1px solid red;
  }
</style>
<canvas id="canvas"></canvas>
`


export default customElements.define('ypr-game', Game);

