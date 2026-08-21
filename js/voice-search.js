(function () {
  const micBtn = document.getElementById("mic-btn");
  const searchInput = document.getElementById("search");
  if (!micBtn || !searchInput) return;

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    micBtn.disabled = true;
    micBtn.title = "Căutarea vocală nu este acceptată de acest browser";
    return;
  }

  // Speech recognition requires a secure context (https:// or localhost).
  if (!window.isSecureContext) {
    micBtn.disabled = true;
    micBtn.title = "Căutarea vocală necesită o conexiune HTTPS";
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = document.documentElement.lang || navigator.language || "ro-RO";
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
})();
