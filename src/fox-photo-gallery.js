import { LitElement, html, css } from 'lit';
import './fox-photo-card.js';

export class FoxPhotoGallery extends LitElement {
  static properties = {
    photos: { type: Array },
    currentIndex: { type: Number },
  };

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: var(--bg-color, #f5f5f5);
      min-height: 100vh;
    }

    .pager {
      display: flex;
      justify-content: center;
      gap: 1rem;
    }

    .pager button {
      padding: 0.5rem 1rem;
      font-size: 1rem;
      cursor: pointer;
      border-radius: 6px;
      border: 1px solid #888;
      background: var(--card-bg, #fff);
      transition: transform 0.2s;
    }

    .pager button:hover {
      transform: scale(1.05);
    }

    @media (prefers-color-scheme: dark) {
      :host {
        --bg-color: #121212;
      }
      .pager button {
        border: 1px solid #ccc;
        background: #1f1f1f;
        color: #eee;
      }
    }
  `;

  constructor() {
    super();
    this.photos = [];
    this.currentIndex = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadPhotos();
  }

  async fetchStaticJSON() {
    try {
      const res = await fetch('./fox-api.json');
      const data = await res.json();
      return data.photos.map(photo => ({
        id: photo.id,
        name: photo.name,
        thumbnail: photo.thumbnail,
        full: photo.full,
        author: photo.author,
      }));
    } catch (err) {
      console.error('Error loading JSON:', err);
      return [];
    }
  }

  async fetchRandomFox() {
    try {
      const res = await fetch('https://randomfox.ca/floof/');
      const data = await res.json();
      return {
        id: Date.now() + Math.random(),
        name: 'Fox',
        thumbnail: data.image,
        full: data.image,
        author: { name: 'Random Fox' },
      };
    } catch (err) {
      console.error('Error fetching random fox:', err);
      return null;
    }
  }

  async loadPhotos() {
    const staticPhotos = await this.fetchStaticJSON();
    const updatedPhotos = await Promise.all(
      staticPhotos.map(async (photo) => {
        const randomFox = await this.fetchRandomFox();
        return randomFox || photo;
      })
    );
    this.photos = updatedPhotos;
  }

  nextPhoto() {
    if (this.currentIndex < this.photos.length - 1) {
      this.currentIndex++;
    }
  }

  prevPhoto() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  static get haxProperties() {
    return {
      canScale: true,
      canPosition: true,
      canEditSource: false,
      gizmo: {
        title: 'Fox Photo Gallery',
        description: 'A slideshow of fox photos with likes/dislikes',
        icon: 'image:photo-library',
        color: 'orange',
        groups: ['Media'],
      }
    };
  }

  render() {
    const photo = this.photos[this.currentIndex];

    return html`
      ${photo
        ? html`<fox-photo-card .image=${photo}></fox-photo-card>`
        : html`<p>Loading random fox... 🦊</p>`}

      <div class="pager">
        <button @click=${this.prevPhoto} ?disabled=${this.currentIndex === 0}>
          ◀ Previous
        </button>
        <span>Photo ${this.currentIndex + 1} / ${this.photos.length}</span>
        <button @click=${this.nextPhoto} ?disabled=${this.currentIndex === this.photos.length - 1}>
          Next ▶
        </button>
      </div>
    `;
  }
}

customElements.define('fox-photo-gallery', FoxPhotoGallery);
