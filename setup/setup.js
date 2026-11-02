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
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(saved)); } catch (e) {}
  }
  boxes.forEach(function (b) {
    b.checked = !!saved[b.dataset.step];
    b.addEventListener("change", function () {
      saved[b.dataset.step] = b.checked;
      save();
      renderCount();
      if (boxes.every(function (x) { return x.checked; })) toast("설치와 스킬 추가를 마쳤습니다.");
    });
  });
  renderCount();

  // 설치할 앱 고르기. 같은 버튼을 다시 누르면 선택을 풀고 둘 다 보여 준다.
  var choiceBtns = Array.prototype.slice.call(document.querySelectorAll("[data-choose]"));
  function applyApp(app) {
    if (app) document.body.dataset.app = app;
    else delete document.body.dataset.app;
    choiceBtns.forEach(function (b) {
      b.setAttribute("aria-checked", String(b.dataset.choose === app));
    });
  }
  choiceBtns.forEach(function (b) {
    b.addEventListener("click", function () {
      var app = saved.app === b.dataset.choose ? "" : b.dataset.choose;
      saved.app = app;
      save();
      applyApp(app);
      if (app) document.getElementById("install").scrollIntoView({ block: "start" });
    });
  });
  applyApp(saved.app || "");

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
      var only = c.app ? ' data-app-only="' + esc(c.app) + '"' : "";
      return '<div' + only + '><p class="cmd-label">' + esc(c.label) + '</p>' +
        '<div class="code"><pre><code>' + esc(c.code) + '</code></pre>' +
        '<button class="copy" type="button" data-copy-prev>복사</button></div></div>';
    }).join("");
    return '<li class="skill">' +
      '<div class="skill-top"><h4>' + esc(skill.name) + '</h4><span class="tag">' + esc(skill.use) + '</span></div>' +
      '<p>' + esc(skill.summary) + ' <span class="tools">' + esc(tools) + '에서 쓸 수 있습니다.</span></p>' +
      '<a class="repo" href="' + esc(skill.repo) + '" target="_blank" rel="noopener">' + esc(skill.repo.replace("https://", "")) + '</a>' +
      cmds +
      '<div class="skill-actions">' +
        '<button class="btn btn-primary" type="button" data-copy="' + esc(promptFor(skill)) + '">설치 요청 복사</button>' +
        (skill.intro ? '<button class="btn btn-ghost" type="button" data-intro="' + esc(skill.id) + '">스킬 소개</button>' : '') +
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

  // 스킬 소개 팝업
  var introEl = document.getElementById("intro");
  var introBody = document.getElementById("intro-body");
  var lastOpener = null;

  function list(items) {
    return '<ul>' + items.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join("") + '</ul>';
  }

  function openIntro(skill, opener) {
    var it = skill.intro;
    var prompts = it.prompts.map(function (p) {
      return '<div class="code code-prompt"><pre><code>' + esc(p) + '</code></pre>' +
        '<button class="copy" type="button" data-copy-prev>복사</button></div>';
    }).join("");
    introBody.innerHTML =
      '<div class="intro-head">' +
        '<div><span class="tag">' + esc(skill.use) + '</span><h3 id="intro-title">' + esc(skill.name) + '</h3></div>' +
        '<button class="intro-close" type="button" data-close aria-label="닫기"><i class="ph ph-x" aria-hidden="true"></i></button>' +
      '</div>' +
      '<div class="intro-scroll">' +
        '<h4>어떤 스킬인가요</h4><p>' + esc(it.what) + '</p>' +
        '<h4>이럴 때 씁니다</h4>' + list(it.when) +
        '<h4>이렇게 요청해 보세요</h4>' + prompts +
        '<h4>알아 둘 것</h4>' + list(it.notes) +
      '</div>' +
      '<div class="intro-foot">' +
        '<button class="btn btn-primary" type="button" data-copy="' + esc(promptFor(skill)) + '">설치 요청 복사</button>' +
        '<a class="repo" href="' + esc(skill.repo) + '" target="_blank" rel="noopener">GitHub에서 원문 보기</a>' +
      '</div>';
    lastOpener = opener;
    if (introEl.showModal) introEl.showModal(); else introEl.setAttribute("open", "");
    introBody.querySelector(".intro-scroll").scrollTop = 0;
  }

  function closeIntro() {
    if (introEl.close) introEl.close(); else introEl.removeAttribute("open");
  }

  listEl.addEventListener("click", function (e) {
    var b = e.target.closest("[data-intro]");
    if (!b) return;
    var skill = skills.filter(function (s) { return s.id === b.dataset.intro; })[0];
    if (skill) openIntro(skill, b);
  });
  introEl.addEventListener("click", function (e) {
    // 팝업 바깥(배경)을 누르거나 닫기 버튼을 누르면 닫는다
    if (e.target === introEl || e.target.closest("[data-close]")) closeIntro();
  });
  introEl.addEventListener("close", function () {
    if (lastOpener) lastOpener.focus();
  });
})();
