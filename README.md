# Gemini Clone Demo — VS Code Project

Ye tumhare original single-file `.jsx` code ka clean, component-wise structured version hai.
Har component ki apni `.jsx` file hai aur uske sath usi naam ki `.css` file — matlab
JS logic aur styling alag-alag, samajhna aur maintain karna dono easy.

---

## 📁 Folder Structure

```
gemini-clone/
├── index.html                     ← app ka HTML entry point
├── package.json                   ← dependencies list
├── vite.config.js                 ← Vite build tool ka config
├── README.md                      ← ye file
└── src/
    ├── main.jsx                   ← React app yahan se start hota hai
    ├── index.css                  ← global reset / body styling
    ├── App.jsx                    ← main component (sab kuch yahan jud'ta hai)
    ├── App.css
    ├── data/
    │   └── cannedReplies.js       ← demo ke fake AI replies
    └── components/
        ├── Sidebar/
        │   ├── Sidebar.jsx        ← left panel (new chat, history, theme toggle)
        │   └── Sidebar.css
        ├── ChatBody/
        │   ├── ChatBody.jsx       ← welcome screen + messages list
        │   └── ChatBody.css
        ├── ChatInput/
        │   ├── ChatInput.jsx      ← neeche wala input box + send button
        │   └── ChatInput.css
        ├── Message/
        │   ├── Message.jsx        ← ek single chat bubble
        │   └── Message.css
        └── LoadingBubble/
            ├── LoadingBubble.jsx  ← "typing..." wala shimmer effect
            └── LoadingBubble.css
```

**Structure kaise samjho:** `App.jsx` sabse upar hai — ye Sidebar, ChatBody aur
ChatInput teeno ko jodta hai aur state (chat messages, theme, loading) ko manage
karta hai. Baaki sab components sirf apna kaam karte hain aur props se data lete hain.
Isse agar kal ko sirf Sidebar ka design badalna ho, to bas `Sidebar.jsx` +
`Sidebar.css` khol kar kaam ho jayega — poori file dhundhne ki zaroorat nahi.

---

## 🚀 VS Code me kaise chalayein

### Step 1 — Node.js install karo (agar pehle se nahi hai)
https://nodejs.org se LTS version download kar lo. Terminal me check karo:
```bash
node -v
npm -v
```

### Step 2 — Project folder VS Code me kholo
Poora `gemini-clone` folder VS Code me drag-drop kar do, ya:
```bash
cd gemini-clone
code .
```

### Step 3 — Dependencies install karo
VS Code ke terminal me (Terminal → New Terminal):
```bash
npm install
```
Ye command `package.json` me likhi sab cheeze install karegi:
- **react** aur **react-dom** → React chalane ke liye
- **lucide-react** → icons ke liye (Plus, Send, Menu, Sun/Moon, etc.)
- **vite** aur **@vitejs/plugin-react** → dev server/build tool

### Step 4 — App run karo
```bash
npm run dev
```
Terminal me ek localhost link milega (jaise `http://localhost:5173`) — usko
browser me kholo, app chal jayega.

---

## 🔌 Real Gemini API connect karna (optional)

Abhi `App.jsx` me `handleSend` function ek **fake/demo reply** deta hai
(`setTimeout` + `cannedReplies.js`). Real AI response ke liye:

1. Google AI Studio se free Gemini API key le lo: https://aistudio.google.com/apikey
2. Root folder me `.env` file banao:
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```
3. `src/App.jsx` me `setTimeout` wala block hata kar ek `fetch` call se Gemini
   API ko call karo, aur response ko `setChat` me daal do.

Agar chaho to ye Gemini API integration bhi main bana kar de sakta hoon — bas
bata dena.

---

## 📱 Responsive (Laptop + Mobile dono par chalega)

- **Laptop/Desktop (screen > 640px):** App ek centered "card" jaisa dikhta hai
  (max-width 900px), sidebar hamesha visible rehti hai, aur uska icon-only /
  full collapse toggle kaam karta hai jaisa pehle tha.
- **Mobile (screen ≤ 640px):** App poori screen fill kar leta hai (full height,
  no rounded corners). Sidebar ab ek **slide-in drawer** ban jaati hai — top
  par ek hamburger menu bar dikhta hai, usse tap karke sidebar khulti hai, aur
  background me dark overlay aa jata hai jispar tap karke ya "New chat" /
  history item select karke drawer band ho jaati hai.
- Input box, chat bubbles aur font sizes bhi chhoti screen ke hisaab se
  automatically adjust ho jate hain.

Test karne ke liye: browser me `npm run dev` ke baad DevTools kholo
(F12 → device toolbar icon) aur mobile size select karo, ya seedha apne phone
ke browser me localhost link (same WiFi par) khol kar dekh sakte ho.

## ✅ Is version me kya better hai (compared to original single file)

- Har component apni file me — code dhundhna aasan
- Saare inline `style={{...}}` objects hata kar proper `.css` files me shift kiye
  gaye (theme ke colors ab bhi CSS variables `var(--fg)`, `var(--bg)` etc. se
  aa rahe hain, jo `App.jsx` me dynamically set hote hain)
- Naming clear hai (`sidebar__history-item`, `chat-input__send-btn` type BEM
  style classes) — CSS padhte hi pata chal jayega kaunsa class kahan use ho raha hai
- Demo replies ek alag `data/cannedReplies.js` file me — content aur logic separate
