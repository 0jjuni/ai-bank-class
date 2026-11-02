// 수업에서 쓰는 스킬 목록. 새 스킬은 이 배열에 한 항목씩 추가한다.
// tools: 설치 가능한 도구 ("codex", "claude")
// commands: 링크로 맡기는 대신 직접 칠 수 있는 공식 명령어가 있을 때만 적는다.
//   app을 적으면 그 앱을 골랐을 때만 보인다.
window.CLASS_SKILLS = [
  {
    id: "hyperframes",
    name: "HyperFrames",
    use: "영상",
    summary: "장면, 움직임, 자막을 엮어 설명 영상을 만듭니다.",
    repo: "https://github.com/heygen-com/hyperframes",
    site: "https://hyperframes.heygen.com",
    tools: ["codex", "claude"],
    commands: [
      { label: "터미널에서 설치 (Node.js 필요)", code: "npx skills add heygen-com/hyperframes" }
    ]
  },
  {
    id: "ui-ux-pro-max",
    name: "UI UX Pro Max",
    use: "디자인",
    summary: "화면 종류에 맞는 색상, 글꼴, 배치 기준을 찾아 줍니다.",
    repo: "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill",
    tools: ["codex", "claude"],
    commands: []
  },
  {
    id: "taste-skill",
    name: "Taste Skill",
    use: "디자인",
    summary: "흔한 AI 디자인 습관을 걸러 내고 화면을 다듬습니다.",
    repo: "https://github.com/Leonxlnx/taste-skill",
    site: "https://tasteskill.dev",
    tools: ["codex", "claude"],
    commands: []
  },
  {
    id: "im-not-ai",
    name: "im-not-ai",
    use: "글쓰기",
    summary: "번역투와 딱딱한 표현을 평소 말투의 한국어로 고칩니다.",
    repo: "https://github.com/epoko77-ai/im-not-ai",
    tools: ["codex", "claude"],
    commands: [
      { app: "claude", label: "Claude Code 입력창에 차례로", code: "/plugin marketplace add epoko77-ai/im-not-ai\n/plugin install humanize-korean@im-not-ai" }
    ]
  }
];
