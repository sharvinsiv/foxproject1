import { LitElement, html, css } from 'lit';
import './fox-photo-card.js';

export class FoxPhotoGallery extends LitElement {
  static properties = {
    photo: { type: Object },
  };

  static styles = css`
    :host {
      display: block;
      text-align: center;
      padding: 1rem;
      background-color: #fafafa;
      min-height: 100vh;
    }

    button {
      padding: 0.5rem 1rem;
      border: 1px solid #999;
      background: #fff;
      border-radius: 5px;
      cursor: pointer;
    }

    button:hover {
      background: #eee;
    }
  `;

  constructor() {
    super();
    this.photo = null;
  }

  connectedCallback() {
    super.connectedCallback();
    // choose random fox on load
    this.loadRandomFox();
  }

  async loadRandomFox() {
    try {
      // Sometimes randomfox.ca breaks, so add fallback
      const res = await fetch('https://randomfox.ca/floof/');
      const data = await res.json();
      this.photo = {
        id: Date.now(),
        name: "Fox",
        thumbnail: data.image,
        full: data.image,
        author: { name: "Random Fox" }
      };
    } catch (err) {
      console.log("Error fetching fox, loading fallback");
      this.photo = {
        id: 1,
        name: "Fox",
        thumbnail: "https://randomfox.ca/images/1.jpg",
        full: "https://randomfox.ca/images/1.jpg",
        author: { name: "Fallback" }
      };
    }
  }

  refreshFox() {
    // gets new fox
    this.loadRandomFox();
  }

  render() {
    if (!this.photo) {
      return html`<p>Loading fox...</p>`;
    }

    return html`
      <fox-photo-card .image=${this.photo}></fox-photo-card>
      <div style="margin-top: 1rem;">
        <button @click=${this.refreshFox}>Show Another Fox</button>
      </div>
    `;
  }
}

customElements.define('fox-photo-gallery', FoxPhotoGallery);
