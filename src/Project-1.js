import { LitElement, html } from 'lit';
import './src/fox-photo.js';

export class Project1 extends LitElement {
  render() {
    return html`<fox-photo></fox-photo>`;
  }
}

customElements.define('project-1', Project1);