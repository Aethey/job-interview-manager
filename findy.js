function extractFindy() {
    const selector = '[class*="__messageText"]';
    const elements = [...document.querySelectorAll(selector)].filter(element => {
      const style = getComputedStyle(element);
      return element.innerText.trim() &&
        element.getClientRects().length > 0 &&
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        !element.querySelector(selector) &&
        !element.closest("a[href]");
    });
    const seen = new Set();
  
    const messages = elements
      .map(element => element.innerText.trim())
      .filter(text => {
        if (!text || seen.has(text)) return false;
        seen.add(text);
        return true;
      })
      .map((text, index) => ({ index: index + 1, text }));
  
    return {
      platform: "Findy",
      url: location.href,
      messages
    };
  }
