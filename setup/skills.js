// 수업에서 쓰는 스킬 목록. 새 스킬은 이 배열에 한 항목씩 추가한다.
// tools: 설치 가능한 도구 ("codex", "claude")
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
  },
  {
    id: "prompt-master",
    name: "Prompt Master",
    use: "프롬프트",
    summary: "다른 AI 도구에 넣을 요청문을 대신 써 줍니다.",
    repo: "https://github.com/nidhinjs/prompt-master",
    tools: ["codex", "claude"],
    intro: {
      what: "ChatGPT, Gemini, Midjourney, ElevenLabs처럼 다른 AI 도구에 넣을 요청문(프롬프트)을 써 주는 스킬입니다. 어떤 도구에 쓸지 먼저 알아보고, 하려는 일과 대상, 결과물 형태를 정리해 그 도구에 맞는 형식으로 바꿔 줍니다. 꼭 필요한 정보가 빠졌으면 최대 세 가지까지 되묻습니다.",
      when: [
        "이미지나 음성 AI에 무엇을 어떻게 적어야 할지 막막할 때",
        "같은 요청을 여러 번 고쳐 쓰느라 사용량이 아까울 때"
      ],
      prompts: [
        "Prompt Master로 Midjourney 프롬프트를 써줘. 은행 창구에서 고객과 상담하는 장면, 밝고 따뜻한 사진 느낌이야.",
        "ChatGPT에 넣을 프롬프트를 만들어줘. 연금 상품 설명을 고등학생도 이해하게 5문단으로 풀어 쓰는 일이야.",
        "ElevenLabs로 이 대본을 읽힐 건데, 차분한 남성 목소리가 나오게 요청문을 써줘."
      ],
      notes: [
        "설명서는 Claude 기준으로 쓰여 있습니다. Claude 앱에서는 /prompt-master로 바로 부를 수 있습니다.",
        "만들어 준 요청문은 그대로 복사해서 해당 AI 도구에 붙여 넣으면 됩니다."
      ]
    }
  },
  {
    id: "agent-browser",
    name: "agent-browser",
    use: "브라우저",
    summary: "AI가 만든 화면을 브라우저로 직접 열어 눌러 보고 확인합니다.",
    repo: "https://github.com/vercel-labs/agent-browser",
    tools: ["codex", "claude"],
    intro: {
      what: "Vercel이 만든 브라우저 자동화 도구입니다. AI가 크롬을 열어 페이지를 읽고, 버튼을 누르고, 입력칸을 채우고, 화면을 캡처합니다. AI가 만든 화면을 사람 대신 직접 열어 보기 때문에, 코드만 쓰고 \"다 됐다\"고 말하는 일이 줄어듭니다.",
      when: [
        "AI가 만든 웹페이지가 실제로 잘 열리고 버튼이 눌리는지 확인할 때",
        "입력 양식을 채워 보거나 화면을 캡처해 문제를 찾고 싶을 때"
      ],
      prompts: [
        "agent-browser로 방금 만든 페이지를 열고 첫 화면을 캡처해줘. 버튼이 눌리는지, 링크가 제대로 이동하는지도 확인하고 문제가 있으면 알려줘.",
        "이 입력 양식을 실제로 채워서 제출까지 해 보고, 막히는 곳이 있으면 화면을 캡처해서 보여줘."
      ],
      notes: [
        "스킬과 함께 명령줄 도구도 설치해야 브라우저가 움직입니다. 설치를 맡기면 AI가 npm install -g agent-browser와 agent-browser install까지 진행합니다.",
        "자동화 전용 크롬을 따로 내려받기 때문에, 평소 쓰는 크롬의 로그인이나 즐겨찾기는 건드리지 않습니다."
      ]
    }
  },
  {
    id: "find-skills",
    name: "find-skills",
    use: "스킬 찾기",
    summary: "하고 싶은 일을 말하면 쓸 만한 스킬을 찾아 추천하고 설치까지 돕습니다.",
    repo: "https://github.com/vercel-labs/skills/tree/main/skills/find-skills",
    tools: ["codex", "claude"],
    intro: {
      what: "공개된 스킬 목록(skills.sh)에서 지금 하려는 일에 맞는 스킬을 찾아 주는 스킬입니다. 무엇을 하고 싶은지 말하면 쓸 만한 스킬과 설치 수, 만든 곳을 알려 주고, 원하면 설치까지 이어서 해 줍니다.",
      when: [
        "이런 일을 도와주는 스킬이 이미 있는지 궁금할 때",
        "새 작업을 시작하기 전에 남이 만들어 둔 방법부터 찾아보고 싶을 때"
      ],
      prompts: [
        "엑셀 표를 보기 좋은 보고서로 바꾸려고 해. 쓸 만한 스킬이 이미 있는지 찾아보고, 설치 수와 만든 곳까지 같이 알려줘.",
        "발표자료 만드는 데 도움이 되는 스킬을 세 개만 추천해줘."
      ],
      notes: [
        "추천받은 스킬도 설치 전에 만든 곳과 설명을 한 번 확인하세요.",
        "직접 둘러보고 싶다면 skills.sh 사이트에서 검색할 수 있습니다."
      ]
    }
  },
  {
    id: "gsd-core",
    name: "GSD Core",
    use: "작업 관리",
    summary: "큰 작업을 단계로 나누고 결정한 내용을 파일로 남겨, 긴 작업에서도 길을 잃지 않게 합니다.",
    repo: "https://github.com/open-gsd/gsd-core",
    tools: ["codex", "claude"],
    intro: {
      what: "긴 작업에서 AI가 앞에서 정한 내용을 잊지 않게 잡아 주는 작업 관리 도구입니다. 큰 작업을 단계로 나누고, 단계마다 의논, 계획, 실행, 확인을 거치며 결정한 내용을 파일로 남깁니다. 대화가 길어지거나 끊겨도 남긴 파일을 보고 이어서 진행합니다.",
      when: [
        "앱이나 홈페이지처럼 하루에 끝나지 않는 큰 작업을 시작할 때",
        "대화가 길어지면 AI가 앞에서 한 말을 놓쳐서 곤란했을 때"
      ],
      prompts: [
        "/gsd-new-project",
        "/gsd-onboard"
      ],
      notes: [
        "다른 스킬과 설치 방식이 다릅니다. 스킬 폴더만 넣는 게 아니라 전용 설치 프로그램(npx @opengsd/gsd-core@latest)으로 명령어와 작업 기록 폴더까지 함께 설치합니다. 설치를 맡기면 AI가 이 과정을 진행합니다.",
        "설치가 끝나면 앱을 완전히 껐다가 다시 켜야 명령어가 보입니다. 새 작업은 /gsd-new-project, 이미 있는 작업에 붙일 때는 /gsd-onboard로 시작합니다."
      ]
    }
  },
  {
    id: "mcp-builder",
    name: "mcp-builder",
    use: "도구 연결",
    summary: "쓰고 싶은 서비스를 AI에 연결하는 MCP 서버를 대신 만들어 줍니다.",
    repo: "https://github.com/anthropics/skills/tree/main/skills/mcp-builder",
    tools: ["codex", "claude"],
    intro: {
      what: "Anthropic이 공식으로 공개한 스킬입니다. MCP는 AI가 바깥 서비스와 이야기할 때 쓰는 공통 규격이고, 이 규격에 맞춘 연결 프로그램을 MCP 서버라고 부릅니다. 연결하고 싶은 서비스의 공식 문서만 주면 MCP 서버를 설계하고 만들고 시험하는 과정까지 안내합니다.",
      when: [
        "자주 쓰는 서비스를 AI 안에서 바로 조회하거나 다루고 싶을 때",
        "공식 API 문서는 있는데 연결하는 방법을 모를 때"
      ],
      prompts: [
        "이 서비스를 AI에서 쓰고 싶어. 공식 API 문서 주소는 이거야. MCP 서버를 만들어 주고, 다 만든 뒤 실제로 연결되는지 확인해줘."
      ],
      notes: [
        "개발에 가까운 작업이라 처음에는 결과를 함께 확인하며 진행하는 편이 안전합니다.",
        "회사 시스템이나 고객 정보가 있는 서비스는 연결하지 마세요. 개인 실습용 서비스로 먼저 해 보세요."
      ]
    }
  }
];
