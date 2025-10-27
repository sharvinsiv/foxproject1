import { LitElement, html, css } from 'lit';
import './fox-photo-card.js';

export class FoxPhotoGallery extends LitElement {
  static properties = {
    fox: { type: Object },
  };

  static styles = css`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: var(--bg-color, #f5f5f5);
    }

    @media (prefers-color-scheme: dark) {
      :host {
        --bg-color: #121212;
      }
    }
  `;

  constructor() {
    super();
    this.fox = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadFox();
  }

  async loadFox() {
    try {
      const res = await fetch('https://randomfox.ca/floof/');
      const data = await res.json();
      this.fox = data;
    } catch (err) {
      console.error('Error loading fox:', err);
    }
  }

  render() {
    return html`
      ${this.fox
        ? html`<fox-photo-card .image=${this.fox}></fox-photo-card>`
        : html`<p>Loading your fox... 🦊</p>`}
    `;
  }
}

customElements.define('fox-photo-gallery', FoxPhotoGallery);