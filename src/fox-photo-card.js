import { LitElement, html, css } from 'lit';

export class FoxPhotoCard extends LitElement {
  static properties = {
    image: { type: Object },
    liked: { type: Boolean },
    disliked: { type: Boolean },
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
      font-family: Arial, sans-serif;
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
      color: #333;
    }

    .author {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }

    .actions {
      display: flex;
      justify-content: space-around;
      padding: 0.5rem;
      border-top: 1px solid #ddd;
    }

    .actions button {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1.2rem;
      transition: transform 0.2s;
    }

    .actions button:hover {
      transform: scale(1.2);
    }

    @media (prefers-color-scheme: dark) {
      :host {
        --card-bg: #1f1f1f;
        color: #eee;
      }
      .actions {
        border-top: 1px solid #444;
      }
    }
  `;

  constructor() {
    super();
    this.image = {};
    this.liked = false;
    this.disliked = false;
  }

  firstUpdated() {
    // Load likes/dislikes from localStorage
    const stored = JSON.parse(localStorage.getItem(this.image.full) || '{}');
    this.liked = stored.liked || false;
    this.disliked = stored.disliked || false;
  }

  toggleLike() {
    this.liked = !this.liked;
    if (this.liked) this.disliked = false;
    this.saveState();
  }

  toggleDislike() {
    this.disliked = !this.disliked;
    if (this.disliked) this.liked = false;
    this.saveState();
  }

  saveState() {
    localStorage.setItem(
      this.image.full,
      JSON.stringify({ liked: this.liked, disliked: this.disliked })
    );
  }

  share() {
    navigator.clipboard.writeText(this.image.full);
    alert('Image URL copied to clipboard!');
  }

  render() {
    return html`
      <img src="${this.image.thumbnail}" alt="${this.image.name}" />
      <div class="info">
        <div class="author">
          <span>🦊 ${this.image.author?.name || 'Unknown'}</span>
        </div>
        <div class="actions">
          <button @click=${this.toggleLike} title="Like">
            👍 ${this.liked ? '✓' : ''}
          </button>
          <button @click=${this.toggleDislike} title="Dislike">
            👎 ${this.disliked ? '✓' : ''}
          </button>
          <button @click=${this.share} title="Share">
            🔗
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('fox-photo-card', FoxPhotoCard);
