import { LitElement, html, css } from 'lit';

export class FoxPhotoCard extends LitElement {
  static properties = {
    image: { type: Object },
  };

  static styles = css`
    :host {
      display: block;
      max-width: 400px;
      margin: 1rem auto;
      background: var(--card-bg, #fff);
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      transition: transform 0.3s;
    }

    :host(:hover) {
      transform: scale(1.02);
    }

    img {
      width: 100%;
      display: block;
      object-fit: cover;
    }

    .info {
      padding: 0.75rem 1rem;
      text-align: center;
      font-family: Arial, sans-serif;
      color: #333;
    }

    @media (prefers-color-scheme: dark) {
      :host {
        --card-bg: #1f1f1f;
        color: #eee;
      }
    }
  `;

  constructor() {
    super();
    this.image = {};
  }

  render() {
    return html`
      <img src="${this.image.image}" alt="Random Fox" />
      <div class="info">
        <p>🦊 A Random Fox</p>
      </div>
    `;
  }
}

customElements.define('fox-photo-card', FoxPhotoCard);