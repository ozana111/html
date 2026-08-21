(function () {
  const micBtn = document.getElementById("mic-btn");
  const langSelect = document.getElementById("mic-lang");
  const searchInput = document.getElementById("search");
  if (!micBtn || !searchInput) return;

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const LANG_STORAGE_KEY = "voiceSearchLang";
  const DEFAULT_LANG = "ru-RU";

  if (!SpeechRecognition) {
    micBtn.disabled = true;
    micBtn.title = "Căutarea vocală nu este acceptată de acest browser (folosiți Google Chrome)";
    if (langSelect) langSelect.disabled = true;
    return;
  }

  // Speech recognition requires a secure context (https:// or localhost).
  if (!window.isSecureContext) {
    micBtn.disabled = true;
    micBtn.title = "Căutarea vocală necesită o conexiune HTTPS";
    if (langSelect) langSelect.disabled = true;
    return;
  }

  let savedLang = DEFAULT_LANG;
  try {
    savedLang = localStorage.getItem(LANG_STORAGE_KEY) || DEFAULT_LANG;
  } catch (err) {
    // localStorage unavailable (e.g. private mode); fall back to default.
  }

  if (langSelect) {
    langSelect.value = savedLang;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = savedLang;
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  let listening = false;

  function setListening(state) {
    listening = state;
    micBtn.classList.toggle("listening", state);
    micBtn.setAttribute("aria-pressed", String(state));
  }

  function applyToSearch(text) {
    searchInput.value = text;
    searchInput.dispatchEvent(new Event("input", { bubbles: true }));
  }

  recognition.addEventListener("start", () => setListening(true));
  recognition.addEventListener("end", () => setListening(false));
  recognition.addEventListener("error", () => setListening(false));

  recognition.addEventListener("result", (event) => {
    let transcript = "";
    for (let i = 0; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    applyToSearch(transcript);
  });

  micBtn.addEventListener("click", () => {
    if (listening) {
      recognition.stop();
      return;
    }
    try {
      recognition.start();
    } catch (err) {
      // start() throws if already started; ignore.
    }
  });

  if (langSelect) {
    langSelect.addEventListener("change", () => {
      recognition.lang = langSelect.value;
      try {
        localStorage.setItem(LANG_STORAGE_KEY, langSelect.value);
      } catch (err) {
        // ignore storage failures
      }
      if (listening) {
        recognition.stop();
      }
    });
  }
})();
