(function () {
  var STORE_KEY = "ai-bank-class-setup";
  var toastEl = document.getElementById("toast");
  var toastTimer;

  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("is-on"); }, 1800);
  }

  function copyText(text, btn) {
    var done = function () {
      var label = btn.textContent;
      btn.textContent = "복사됨";
      btn.classList.add("is-done");
      setTimeout(function () { btn.textContent = label; btn.classList.remove("is-done"); }, 1400);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text) ? done() : toast("복사하지 못했습니다. 직접 선택해 주세요."); });
    } else if (fallbackCopy(text)) {
      done();
    } else {
      toast("복사하지 못했습니다. 직접 선택해 주세요.");
    }
  }

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) {}
    ta.remove();
    return ok;
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-copy-prev], [data-copy]");
    if (!btn) return;
    var text = btn.hasAttribute("data-copy")
      ? btn.getAttribute("data-copy")
      : btn.previousElementSibling.textContent;
    copyText(text, btn);
  });

  // 준비 체크리스트
  var boxes = Array.prototype.slice.call(document.querySelectorAll("[data-step]"));
  var countEl = document.getElementById("check-count");
  var saved = {};
  try { saved = JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) {}

  function renderCount() {
    var n = boxes.filter(function (b) { return b.checked; }).length;
    countEl.textContent = n + " / " + boxes.length;
  }
  boxes.forEach(function (b) {
    b.checked = !!saved[b.dataset.step];
    b.addEventListener("change", function () {
      saved[b.dataset.step] = b.checked;
      try { localStorage.setItem(STORE_KEY, JSON.stringify(saved)); } catch (e) {}
      renderCount();
      if (boxes.every(function (x) { return x.checked; })) toast("기본 설치를 마쳤습니다. 이제 스킬을 추가하세요.");
    });
  });
  renderCount();

  // 스킬 목록
  var skills = window.CLASS_SKILLS || [];
  var listEl = document.getElementById("skill-list");
  var emptyEl = document.getElementById("skill-empty");
  var filtersEl = document.getElementById("filters");
  var TOOL_NAME = { codex: "Codex", claude: "Claude" };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function promptFor(skill) {
    return "이 GitHub 링크의 스킬을 설치하고, 사용 방법을 알려줘.\n" + skill.repo;
  }

  function card(skill) {
    var tools = skill.tools.map(function (t) { return TOOL_NAME[t]; }).join(", ");
    var cmds = (skill.commands || []).map(function (c) {
      return '<p class="cmd-label">' + esc(c.label) + '</p>' +
        '<div class="code"><pre><code>' + esc(c.code) + '</code></pre>' +
        '<button class="copy" type="button" data-copy-prev>복사</button></div>';
    }).join("");
    return '<li class="skill">' +
      '<div class="skill-top"><h4>' + esc(skill.name) + '</h4><span class="tag">' + esc(skill.use) + '</span></div>' +
      '<p>' + esc(skill.summary) + ' <span class="tools">' + esc(tools) + '에서 쓸 수 있습니다.</span></p>' +
      '<a class="repo" href="' + esc(skill.repo) + '" target="_blank" rel="noopener">' + esc(skill.repo.replace("https://", "")) + '</a>' +
      cmds +
      '<div class="skill-actions">' +
        '<button class="btn btn-primary" type="button" data-copy="' + esc(promptFor(skill)) + '">설치 요청 복사</button>' +
        (skill.site ? '<a class="btn btn-ghost" href="' + esc(skill.site) + '" target="_blank" rel="noopener">소개 페이지</a>' : '') +
      '</div>' +
    '</li>';
  }

  var uses = ["전체"].concat(skills.map(function (s) { return s.use; }).filter(function (u, i, a) { return a.indexOf(u) === i; }));
  var current = "전체";

  function render() {
    var shown = skills.filter(function (s) { return current === "전체" || s.use === current; });
    listEl.innerHTML = shown.map(card).join("");
    emptyEl.hidden = shown.length > 0;
    Array.prototype.forEach.call(filtersEl.children, function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.use === current));
    });
  }

  filtersEl.innerHTML = uses.map(function (u) {
    return '<button type="button" data-use="' + esc(u) + '" aria-pressed="false">' + esc(u) + '</button>';
  }).join("");
  filtersEl.addEventListener("click", function (e) {
    var b = e.target.closest("button[data-use]");
    if (!b) return;
    current = b.dataset.use;
    render();
  });
  render();
})();
