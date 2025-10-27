import { LitElement, html, css } from 'lit';

export class FoxPhotoCard extends LitElement {
  static properties = {
    image: { type: Object },
    liked: { type: Boolean },
    disliked: { type: Boolean }
  };

  static styles = css`
    :host {
      display: block;
      width: 350px;
      margin: 0 auto;
      border-radius: 10px;
      background: #fff;
      box-shadow: 0px 3px 6px rgba(0,0,0,0.1);
      overflow: hidden;
      font-family: Arial, sans-serif;
    }

    img {
      width: 100%;
      height: auto;
      display: block;
    }

    .info {
      padding: 10px;
    }

    .author {
      margin-bottom: 10px;
      font-size: 14px;
      color: #444;
    }

    .actions {
      display: flex;
      justify-content: space-around;
      border-top: 1px solid #ccc;
      padding: 8px 0;
    }

    button {
      background: none;
      border: 1px solid #aaa;
      border-radius: 5px;
      padding: 5px 10px;
      cursor: pointer;
      font-size: 14px;
    }

    button:hover {
      background-color: #f3f3f3;
    }
  `;

  constructor() {
    super();
    this.image = {};
    this.liked = false;
    this.disliked = false;
  }

  firstUpdated() {
    // load like/dislike if saved
    const saved = localStorage.getItem(this.image.full);
    if (saved) {
      const data = JSON.parse(saved);
      this.liked = data.liked || false;
      this.disliked = data.disliked || false;
    }
  }

  toggleLike() {
    this.liked = !this.liked;
    if (this.liked) this.disliked = false;
    this.save();
  }

  toggleDislike() {
    this.disliked = !this.disliked;
    if (this.disliked) this.liked = false;
    this.save();
  }

  save() {
    localStorage.setItem(this.image.full, JSON.stringify({
      liked: this.liked,
      disliked: this.disliked
    }));
  }

  share() {
    navigator.clipboard.writeText(this.image.full);
    alert('Image URL copied.');
  }

  render() {
    return html`
      <img src="${this.image.thumbnail}" alt="${this.image.name}">
      <div class="info">
        <div class="author">Author: ${this.image.author?.name || "Unknown"}</div>
        <div class="actions">
          <button @click=${this.toggleLike}>${this.liked ? 'Liked' : 'Like'}</button>
          <button @click=${this.toggleDislike}>${this.disliked ? 'Disliked' : 'Dislike'}</button>
          <button @click=${this.share}>Share</button>
        </div>
      </div>
    `;
  }
}

customElements.define('fox-photo-card', FoxPhotoCard);
