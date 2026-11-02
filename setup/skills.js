// 수업에서 쓰는 스킬 목록. 새 스킬은 이 배열에 한 항목씩 추가한다.
// tools: 설치 가능한 도구 ("codex", "claude")
// commands: 링크로 맡기는 대신 직접 칠 수 있는 공식 명령어가 있을 때만 적는다.
//   app을 적으면 그 앱을 골랐을 때만 보인다.
// intro: "스킬 소개" 팝업 내용. 각 저장소 README를 근거로 정리한다.
//   what 무엇인지, when 언제 쓰는지, prompts 요청 예시(복사 버튼), notes 알아 둘 것
window.CLASS_SKILLS = [
  {
    id: "hyperframes",
    name: "HyperFrames",
    use: "영상",
    summary: "장면, 움직임, 자막을 엮어 설명 영상을 만듭니다.",
    repo: "https://github.com/heygen-com/hyperframes",
    tools: ["codex", "claude"],
    commands: [
      { label: "터미널에서 설치 (Node.js 필요)", code: "npx skills add heygen-com/hyperframes" }
    ],
    intro: {
      what: "HeyGen이 공개한 영상 제작 도구입니다. AI가 장면을 웹페이지처럼 만들고 움직임을 붙인 다음, 한 장면씩 찍어 MP4 영상으로 뽑아 줍니다. 같은 내용을 다시 뽑으면 같은 영상이 나옵니다.",
      when: [
        "상품 구조나 개념을 1~3분짜리 설명 영상으로 만들 때",
        "제목, 그래프, 자막이 움직이는 짧은 소개 영상이 필요할 때"
      ],
      prompts: [
        "HyperFrames 스킬로 설명 영상을 만들어줘. 커버드콜을 처음 듣는 사람 대상, 2분 분량이야. 먼저 대본과 장면 구성을 보여줘.",
        "3번 장면은 그래프가 천천히 그려지게 바꾸고, 자막은 한 줄씩 나오게 해줘.",
        "미리보기로 확인할 수 있게 열어줘. 괜찮으면 MP4로 뽑아줘."
      ],
      notes: [
        "대본과 장면 구성을 먼저 받아 보고 고친 다음에 영상으로 만들어 달라고 하면 다시 하는 일이 줄어듭니다.",
        "PC에 Node.js 22 이상과 FFmpeg가 있어야 영상이 나옵니다. 없으면 AI가 설치하라고 안내합니다."
      ]
    }
  },
  {
    id: "ui-ux-pro-max",
    name: "UI UX Pro Max",
    use: "디자인",
    summary: "화면 종류에 맞는 색상, 글꼴, 배치 기준을 찾아 줍니다.",
    repo: "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill",
    tools: ["codex", "claude"],
    commands: [],
    intro: {
      what: "화면 디자인 기준을 모아 둔 자료집입니다. 만들려는 화면이 어떤 종류인지 말하면 거기에 맞는 색 조합, 글꼴, 배치 방식과 피해야 할 디자인을 골라 줍니다. 버튼 크기나 글자 대비처럼 쓰기 편한 화면의 기준도 함께 챙깁니다.",
      when: [
        "웹페이지나 앱 화면을 새로 만들 때",
        "이미 만든 화면이 어딘가 어색해서 고치고 싶을 때"
      ],
      prompts: [
        "UI UX Pro Max로 은행 직원용 교육 안내 페이지 디자인 방향을 먼저 정해줘. 색, 글꼴, 배치를 정하고 이유도 짧게 알려줘.",
        "이 페이지를 UI UX Pro Max 기준으로 점검해줘. 글자 대비와 버튼 크기 위주로 봐줘."
      ],
      notes: [
        "화면을 만들어 달라고 하면 스킬이 알아서 켜집니다. 이름을 넣어 요청하면 확실하게 씁니다.",
        "자료를 찾는 데 Python을 씁니다. PC에 Python이 없으면 AI가 설치해 달라고 물어봅니다."
      ]
    }
  },
  {
    id: "taste-skill",
    name: "Taste Skill",
    use: "디자인",
    summary: "흔한 AI 디자인 습관을 걸러 내고 화면을 다듬습니다.",
    repo: "https://github.com/Leonxlnx/taste-skill",
    tools: ["codex", "claude"],
    commands: [],
    intro: {
      what: "AI가 만든 화면이 다 비슷해 보이는 문제를 줄이는 스킬입니다. 요청을 읽고 디자인 방향을 하나 정한 뒤, 실제 사진을 넣어 화면을 만들고 브라우저에서 화면 폭 세 가지로 직접 확인하며 눈에 띄는 문제를 고칩니다. 이미 있는 페이지는 먼저 점검하고 나서 손댑니다.",
      when: [
        "소개 페이지나 행사 안내 페이지를 눈에 띄게 만들고 싶을 때",
        "이미 만든 페이지가 흔한 AI 디자인처럼 보여서 다시 다듬을 때"
      ],
      prompts: [
        "Taste Skill로 지점 행사 안내 페이지를 만들어줘. 대상은 30~50대 고객이고, 차분하고 믿음이 가는 느낌이면 좋겠어.",
        "이 페이지를 Taste Skill 기준으로 먼저 점검하고, 고칠 점 세 가지만 골라서 고쳐줘."
      ],
      notes: [
        "페이지 하나를 처음부터 만들면 30~45분 정도 걸리고 사용량도 많이 듭니다. 무료 요금제라면 점검과 수정 위주로 쓰는 편이 낫습니다.",
        "Node.js 22 이상과 Chrome이나 Edge가 있어야 화면을 직접 확인할 수 있습니다."
      ]
    }
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
    ],
    intro: {
      what: "AI가 쓴 한글에서 티 나는 부분을 찾아 자연스러운 문장으로 고치는 스킬입니다. 번역투, 영어 단어 남발, \"첫째, 둘째, 셋째\" 식의 나열, \"결론적으로\" 같은 상투적인 표현을 잡아냅니다. 문체와 표현만 고치고 사실, 숫자, 고유명사, 따옴표 안 인용은 건드리지 않습니다.",
      when: [
        "AI로 쓴 대본, 안내문, 보고서 초안을 사람이 쓴 글처럼 다듬을 때",
        "고객에게 보낼 문자나 안내 문구가 딱딱하게 느껴질 때"
      ],
      prompts: [
        "이 대본을 im-not-ai로 다듬어줘. 평소 말하는 문장처럼 읽히게 해줘.",
        "이 안내문에서 AI 티 나는 부분만 고쳐줘. 숫자와 상품명은 그대로 둬.",
        "정밀 모드로 다시 봐줘."
      ],
      notes: [
        "너무 많이 고치지 않도록 바뀐 비율이 30%를 넘으면 경고하고 50%를 넘으면 멈춥니다.",
        "Codex에서는 $humanize-korean, Claude에서는 /humanize-korean으로 바로 부를 수도 있습니다."
      ]
    }
  }
];
