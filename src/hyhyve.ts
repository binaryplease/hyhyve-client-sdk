import { WhitelabelSettings } from "./types"

export type HyHyveOptions = {
  spaceId?: string
  eventId?: string
  embedded?: boolean
  whitelabelSettings?: WhitelabelSettings
  auth?: AuthOptions
  baseUrl?: string
}

export type AuthOptions =
  | {
    tag: "complete"
    profile: {
      name: string
      avatar: string
      color: string
      picture: string
      socials: string[]
      headline: string
      distance: number
      emoji: string
      status: string
    }
  } | {
    tag: "jwt"
    /** JWT token signed with your client API key (HS256) */
    token: string
    /** Your HyHyve client ID */
    clientId: string
  }

/**
 * HyHyve Web Component
 * A custom web component that creates an iframe for HyHyve spaces
 */
class HyHyveComponent extends HTMLElement {
  private iframe: HTMLIFrameElement | null = null;
  private pendingOptions: HyHyveOptions | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.setupMessageListener();
  }

  connectedCallback() {
    this.render();
  }

  /**
   * Set up message listener for SDK communication
   */
  private setupMessageListener() {
    window.addEventListener("message", (event) => {
      // Only handle messages from our iframe
      if (event.source !== this.iframe?.contentWindow) {
        return;
      }

      if (typeof event.data !== "string") {
        return;
      }

      switch (event.data) {
        case "sdk:ready": {
          // Send initialization options to the iframe when it's ready
          if (this.pendingOptions && this.iframe?.contentWindow) {
            this.iframe.contentWindow.postMessage(
              { tag: "sdk:init", opts: this.pendingOptions },
              "*"
            );
          }
          break;
        }
      }
    });
  }

  private render() {
    // Add host styling via Shadow DOM
    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: block;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      iframe {
        width: 100%;
        height: 100%;
        border: none;
        display: block;
      }
    `;

    // Create iframe element - use configurable base URL
    const baseUrl = this.pendingOptions?.baseUrl || "https://app.hyhyve.com"
    this.iframe = document.createElement('iframe');
    this.iframe.src = `${baseUrl}/?sdk`;
    this.iframe.allow = 'autoplay; encrypted-media; picture-in-picture; camera; microphone; display-capture; fullscreen';

    // Clear shadow root and append style and iframe
    this.shadowRoot!.innerHTML = '';
    this.shadowRoot!.appendChild(style);
    this.shadowRoot!.appendChild(this.iframe);
  }

  /**
   * Get the iframe element (if rendered)
   */
  get iframeElement(): HTMLIFrameElement | null {
    return this.iframe;
  }

  /**
   * Attach the component to a specific DOM element
   * @param targetElement - The DOM element to attach to (can be selector string or HTMLElement)
   * @param opts - Configuration options for the HyHyve component
   */
  attach(targetElement?: string | HTMLElement, opts?: HyHyveOptions): void {
    let target: HTMLElement | null = null;

    // Store options for when iframe is ready
    this.pendingOptions = opts || null;

    // Determine target element
    if (typeof targetElement === 'string') {
      target = document.querySelector(targetElement);
    } else if (targetElement instanceof HTMLElement) {
      target = targetElement;
    } else {
      // Default to #hyhyve if no target specified
      target = document.querySelector('#hyhyve');
    }

    if (!target) {
      console.error('HyHyve: Target element not found');
      return;
    }

    // Append this component to the target element
    target.appendChild(this);
  }

  /**
   * Destroy the component and clean up resources
   */
  destroy(): void {
    if (this.iframe) {
      this.iframe.remove();
      this.iframe = null;
    }
    this.pendingOptions = null;
    this.remove();
  }
}

// Register the custom element
customElements.define('hy-hyve', HyHyveComponent);

// Export for module usage
export { HyHyveComponent };
export default HyHyveComponent;