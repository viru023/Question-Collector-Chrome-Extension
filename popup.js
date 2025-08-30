const $ = id => document.getElementById(id);
const setStatus = t => { $("status").textContent = t; };

document.addEventListener("DOMContentLoaded", () => {
  $("collect").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.tabs.sendMessage(tab.id, { action: "collectQuestion" }, (res) => {
      if (chrome.runtime.lastError) {
        setStatus("Content script not active on this page.");
        return;
      }
      if (!res) { setStatus("No response from content script."); return; }
      if (res.error) { setStatus("Error: " + res.error); return; }
      // Save via background
      chrome.runtime.sendMessage({ action: "saveQuestion", data: res }, (bk) => {
        if (chrome.runtime.lastError) { setStatus("Background error"); return; }
        setStatus(`Saved. Total stored: ${bk.total} ${bk.added ? "(new)" : "(duplicate)"}\nQ: ${res.question}`);
      });
    });
  });

  $("export").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "exportQuestions" }, (r) => {
      if (chrome.runtime.lastError) { setStatus("Export failed."); return; }
      setStatus(`Export started. ${r?.count ?? 0} questions exported.`);
    });
  });

  $("clear").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "clearQuestions" }, (r) => {
      setStatus("Cleared stored questions.");
    });
  });
});
