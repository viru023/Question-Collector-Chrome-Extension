// background.js - manages stored questions and export
let bucket = [];

// restore on load
chrome.storage.local.get(["questionBucket"], res => {
  if (Array.isArray(res.questionBucket)) bucket = res.questionBucket;
});

function fingerprint(q) {
  return (q.question || "").slice(0,200) + "||" + (q.options || []).slice(0,3).join("|");
}

function addIfNew(q) {
  const fp = fingerprint(q);
  if (!bucket.some(item => item._fp === fp)) {
    q._fp = fp;
    bucket.push(q);
    chrome.storage.local.set({ questionBucket: bucket });
    return true;
  }
  return false;
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg?.action === "saveQuestion" && msg.data) {
    const added = addIfNew(msg.data);
    sendResponse({ ok: true, total: bucket.length, added });
    return true;
  }

  if (msg?.action === "exportQuestions") {
    const lines = [];
    bucket.forEach((q, i) => {
      lines.push(`Q${i+1}. ${q.question}`);
      (q.options || []).forEach(opt => lines.push(`   ${opt}`));
      if (q.correct) lines.push(`   Correct: ${q.correct}`);
      lines.push("");
    });
    const txt = lines.join("\n");
    const url = "data:text/plain;charset=utf-8," + encodeURIComponent(txt);
    chrome.downloads.download({ url, filename: "questions.txt", saveAs: true }, dlId => {
      sendResponse({ ok: true, count: bucket.length, dlId });
    });
    return true; // will call sendResponse asynchronously
  }

  if (msg?.action === "clearQuestions") {
    bucket = [];
    chrome.storage.local.set({ questionBucket: bucket }, () => sendResponse({ ok: true }));
    return true;
  }
});
