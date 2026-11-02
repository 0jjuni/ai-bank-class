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

  // 페이지 안 이동. Windows에서 애니메이션 효과를 꺼 두면 CSS smooth 스크롤이 꺼져
  // 화면이 뚝 끊기듯 넘어가므로, 짧은 감속 스크롤을 직접 돌린다.
  var TOPBAR_GAP = 80;
  var glideFrame = null;
  function glideTo(el) {
    var start = window.pageYOffset;
    var end = Math.max(0, el.getBoundingClientRect().top + start - TOPBAR_GAP);
    var dist = end - start;
    if (Math.abs(dist) < 2) return;
    var duration = Math.min(700, 320 + Math.abs(dist) * 0.25);
    var t0 = null;
    if (glideFrame) cancelAnimationFrame(glideFrame);
    function step(now) {
      if (t0 === null) t0 = now;
      var p = Math.min(1, (now - t0) / duration);
      var eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      window.scrollTo({ top: start + dist * eased, behavior: "instant" });
      glideFrame = p < 1 ? requestAnimationFrame(step) : null;
    }
    glideFrame = requestAnimationFrame(step);
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a || a.getAttribute("href").length < 2) return;
    var target = document.getElementById(a.getAttribute("href").slice(1));
    if (!target) return;
    e.preventDefault();
    glideTo(target);
    history.replaceState(null, "", a.getAttribute("href"));
  });

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
      if (app) glideTo(document.getElementById("install"));
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
    // 앱에 보낼 설치 요청을 그대로 보여 준다. 복사는 아래 "설치 요청 복사" 버튼 하나로.
    var request = '<div class="code code-request"><pre><code>이 GitHub 링크의 스킬을 설치하고, 사용 방법을 알려줘.\n' +
      '<a href="' + esc(skill.repo) + '" target="_blank" rel="noopener">' + esc(skill.repo) + '</a></code></pre></div>';
    return '<li class="skill">' +
      '<div class="skill-top"><h4>' + esc(skill.name) + '</h4><span class="tag">' + esc(skill.use) + '</span></div>' +
      '<p>' + esc(skill.summary) + ' <span class="tools">' + esc(tools) + '에서 쓸 수 있습니다.</span></p>' +
      request +
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
