(() => {
  const noticeConfig = {
    enabled: true,
    message: `This website is currently under development and review.
Final deployment is pending completion of closure procedures.
Some features may be incomplete or restricted.
Please use with caution.`,
  };

  if (!noticeConfig.enabled) {
    return;
  }

  const injectStyles = () => {
    const style = document.createElement("style");
    style.textContent = `
            .site-notice-overlay {
                position: fixed;
                inset: 0;
                background: rgba(7, 14, 24, 0.72);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                padding: 24px;
            }
            .site-notice-card {
                background: #ffffff;
                color: #0f1b2d;
                max-width: 560px;
                width: 100%;
                border-radius: 16px;
                box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
                padding: 32px;
                font-family: 'Montserrat', system-ui, -apple-system, sans-serif;
            }
            .site-notice-card h2 {
                font-family: 'Cinzel', serif;
                font-size: 1.4rem;
                margin: 0 0 12px;
                color: #0b223a;
            }
            .site-notice-card p {
                margin: 0 0 20px;
                line-height: 1.6;
                font-size: 0.98rem;
                white-space: pre-line;
            }
            .site-notice-card button {
                background: #0b223a;
                color: #ffffff;
                border: none;
                padding: 10px 20px;
                border-radius: 999px;
                font-weight: 600;
                cursor: pointer;
            }
            .site-notice-card button:focus {
                outline: 3px solid rgba(11, 34, 58, 0.4);
                outline-offset: 2px;
            }
        `;
    document.head.appendChild(style);
  };

  const renderNotice = () => {
    injectStyles();

    const overlay = document.createElement("div");
    overlay.className = "site-notice-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Development notice");

    const card = document.createElement("div");
    card.className = "site-notice-card";

    const title = document.createElement("h2");
    title.textContent = "Notice";

    const message = document.createElement("p");
    message.textContent = noticeConfig.message;

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "I understand";

    button.addEventListener("click", () => {
      overlay.remove();
    });

    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        overlay.remove();
      }
    });

    card.append(title, message, button);
    overlay.appendChild(card);
    document.body.appendChild(overlay);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderNotice);
  } else {
    renderNotice();
  }
})();
