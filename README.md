# 📘 Question Collector – Chrome Extension  

A simple Chrome extension that lets you **collect questions from online tests** (with options) as you browse through them, and export everything into a clean `.txt` file.  

---

## 🚀 Features  
- ✅ Collect questions (and answer options) directly from test pages  
- ✅ Choose selectively which questions to save (skip unwanted ones)  
- ✅ Works across multiple pages – questions are stored until you export  
- ✅ One-click **Export** to a text file for offline review/sharing  
- ✅ Lightweight, fast, and distraction-free  

---

## 🖼️ Demo  
![Extension Screenshot](screenshot.png)  
*(Add an actual screenshot here once ready)*  

---

## 🛠️ Installation (Developer Mode)  
1. Clone this repository or download the ZIP  
   ```bash
   git clone https://github.com/yourusername/question-collector.git
   ```  
2. Open Chrome and go to:  
   ```
   chrome://extensions/
   ```  
3. Enable **Developer Mode** (toggle in top-right corner)  
4. Click **Load Unpacked**  
5. Select the project folder  
6. The extension will now appear in your toolbar 🎉  

---

## 📂 Project Structure  
```
question-collector/
│── manifest.json        # Extension config  
│── background.js        # Background logic  
│── content.js           # Injected script to collect questions  
│── popup.html           # UI for Collect & Export  
│── popup.js             # Handles button actions  
│── icons/               # Extension icons  
│── README.md            # Documentation  
```

---

## ⚡ Usage  
1. Open a test page  
2. Click the **extension icon** → press **Collect** to save the current question  
3. Navigate to the next question and repeat if needed  
4. When ready, click **Export** → a `.txt` file will be generated with all saved questions  

---

## 📌 Roadmap  
- [ ] Add support for exporting to CSV/PDF  
- [ ] Option to auto-collect all questions on a page  
- [ ] Cloud sync (Google Drive/Dropbox)  
- [ ] Dark mode UI for popup  

---

## 🤝 Contributing  
Pull requests are welcome! If you’d like to improve this project, feel free to fork and submit a PR.  

---

## 📜 License  
MIT License © 2025 virendra 

---

👉 Perfect for **students, educators, and exam aspirants** who want a faster way to keep track of questions.  
