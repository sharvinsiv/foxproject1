import { LitElement, html, css } from 'lit';
import './fox-photo-card.js';

export class FoxPhotoGallery extends LitElement {
  static properties = {
    photos: { type: Array },
  };

  static styles = css`
    :host { display: block; text-align: center; padding: 1rem; background-color: #fafafa; min-height: 100vh; }
    button { padding: 0.5rem 1rem; border: 1px solid #999; background: #fff; border-radius: 5px; cursor: pointer; }
    button:hover { background: #eee; }
    .gallery { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; margin-top: 1rem; }
  `;

  constructor() {
    super();
    this.photos = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadFoxes();
  }

  async loadFoxes() {
    try {
      const res = await fetch('/fox-api.json');
      const data = await res.json();
      const allFoxes = data.photos;

      const randomFoxes = [];
      const usedIndexes = new Set();
      while (randomFoxes.length < 6 && usedIndexes.size < allFoxes.length) {
        const index = Math.floor(Math.random() * allFoxes.length);
        if (!usedIndexes.has(index)) {
          randomFoxes.push(allFoxes[index]);
          usedIndexes.add(index);
        }
      }

      this.photos = randomFoxes;
    } catch (err) {
      console.error('Error loading foxes:', err);
      this.photos = [
        { id: 1, name: 'Fox', thumbnail: 'https://randomfox.ca/images/1.jpg', full: 'https://randomfox.ca/images/1.jpg', author: { name: 'Fallback' } }
      ];
    }
  }

  refreshFoxes() {
    this.loadFoxes();
  }

  render() {
    if (!this.photos || this.photos.length === 0) {
      return html`<p>Loading foxes...</p>`;
    }

    return html`
      <div class="gallery">
        ${this.photos.map(photo => html`<fox-photo-card .image=${photo}></fox-photo-card>`)}
      </div>
      <div style="margin-top: 1rem;">
        <button @click=${this.refreshFoxes}>Show More Foxes</button>
      </div>
    `;
  }
}

customElements.define('fox-photo-gallery', FoxPhotoGallery);
