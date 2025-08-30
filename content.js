// content.js - extracts the currently visible question+options
(() => {
  const text = el => (el ? el.innerText.replace(/\u00A0/g, " ").trim() : "");
  const visible = el => !!(el && el.offsetParent !== null);

  function getVisibleContainer() {
    const candidates = [...document.querySelectorAll(".qosblock.singleqid, .singlequestion")];
    for (const c of candidates) {
      if (!visible(c)) continue;
      if (c.querySelector(".qblock .eqt") && c.querySelectorAll(".oblock .qoptions .opt").length) return c;
    }
    // fallback: first candidate with qblock
    return candidates.find(c => c.querySelector(".qblock .eqt")) || null;
  }

  function extractVisibleQuestion() {
    try {
      const container = getVisibleContainer();
      if (!container) return { error: "No visible question container found." };

      const qNode = container.querySelector(".qblock .eqt") || container.querySelector(".qblock");
      const question = text(qNode) || "Question not found";

      const optionEls = [...container.querySelectorAll(".oblock .qoptions .opt")];
      const options = optionEls.map(opt => {
        const label = text(opt.querySelector(".left")) || "";
        const value = text(opt.querySelector(".rightopt .eqt")) || text(opt.querySelector(".rightopt")) || "";
        const correct = opt.classList.contains("correct") ? " ✅" : "";
        return `${label}. ${value}${correct}`.trim();
      }).filter(Boolean);

      const correctLabel = optionEls.find(o => o.classList.contains("correct"))?.querySelector(".left")?.innerText || null;

      return { question, options: options.length ? options : ["Options not found"], correct: correctLabel };
    } catch (err) {
      return { error: "Extraction error: " + (err && err.message) };
    }
  }

  chrome.runtime.onMessage.addListener((req, _sender, sendResponse) => {
    if (req?.action === "collectQuestion") {
      sendResponse(extractVisibleQuestion());
    }
    if (req?.action === "getVisible") {
      sendResponse({ has: !!getVisibleContainer() });
    }
  });
})();
