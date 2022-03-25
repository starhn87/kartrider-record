## 📑 프로젝트 소개

WANTED & CODESTATES 프리온보딩 코스

넥슨 기업 개인 과제입니다.

<br>

### < 넥슨 >

PROJECT PERIOD: 2022.03.21 ~ 2022.03.25

<br>

## 밑의 내용은 추후 변경 예정

[배포링크](https://wanted-codestates-nexon.netlify.app/)

<br>

## ✨ 주요 기능

- 홈 페이지
  - 닉네임으로 전적으로 검색할 수 있습니다.
- 전적 검색 페이지
  - 개인전, 팀전 기록을 확인할 수 있습니다.
  - 승률, 리타이어율, 최근 경기 등수를 볼 수 있습니다.
  - 응원 한마디란에서 응원 메시지를 남길 수 있습니다.
  - 트랙/카트 탭에서 내가 많이 플레이한 트랙/카트를 알 수 있습니다.
  - 최근 200경기의 매치 기록과 같이 플레이한 유저들의 기록을 확인할 수 있습니다.
- 트랙 페이지
  - 오늘 하루 동안 스피드 개인전 트랙 순위를 볼 수 있습니다.
  - 지표 가이드로 지표가 나타내는 바를 알 수 있습니다.
  - 테이블의 지표를 통해 트랙별 베스트 라이더, 베스트 레코드 등을 확인할 수 있습니다.
- 랭킹, 카트 페이지
  - 추후 서비될 예정인 페이지 공지를 하였습니다.

<br>

### 🧔 메인

<br>

1. 홈 페이지

<img src="https://user-images.githubusercontent.com/36434219/160114581-d5736a37-e8d0-4d84-92b8-b4a4852000f8.png" alt="홈 페이지" width="700px" height="400px">

<br>

2. 전적 검색 페이지

<img src="https://user-images.githubusercontent.com/36434219/160114727-09ac79d8-8757-43bc-826c-720dae0d3af3.png" alt="전적 검색 페이지" width="700px" height="400px">

<br>

3. 트랙 페이지

<img src="https://user-images.githubusercontent.com/36434219/160115059-f819ce9d-1b2b-4265-baaa-9185ffcb9419.png" alt="트랙 페이지" width="700px" height="400px">

<br>

4. 랭킹, 카트 페이지

<img src="https://user-images.githubusercontent.com/36434219/160114878-48cd3bff-2d81-404b-886b-a007e63e4b15.png" alt="랭킹, 카트 페이지"  width="700px" height="400px">

<br>

### 그래프, 애니메이션 적용 지점

- 그래프

  - 승률, 완주율, 리타이어율
    <img src="https://user-images.githubusercontent.com/36434219/160115620-8918b4be-ea9c-4959-865c-97f4a66b3ffe.png" alt="승률, 완주율, 리타이어율" width="300px">
  - 순위변동 추이
    <img src="https://user-images.githubusercontent.com/36434219/160115880-214dc8f7-352c-4d9d-ba1f-96773e2ca681.png" alt="순위변동 추이" width="300px">

- 애니메이션
  - 홈 페이지
    - 다오, 배찌 캐릭터 / 서치 바 / 메인 글귀
      <img src="https://user-images.githubusercontent.com/36434219/160118220-0baa7d92-9d10-49ee-8414-3cc41e1f4df9.gif" alt="홈 화면 애니" width="700px">
  - 전적 검색 페이지
    - 응원 한마디
      <img src="https://user-images.githubusercontent.com/36434219/160118457-c8a6e1a4-31a1-4e62-92f4-77ba607b26f5.gif" alt="응원 한마디 애니" width="300px">
  - 트랙 페이지
    - 지표 가이드
      <img src="https://user-images.githubusercontent.com/36434219/160119175-88fa8fd0-21a4-468e-af53-2fe0f9e1ffe2.gif" alt="지표 가이드 애니" width="300px">
  - 로딩
    <img src="https://user-images.githubusercontent.com/36434219/160119994-e872596a-bf1d-4464-8229-fc402a590310.gif" alt="지표 가이드 애니" width="300px">

### 구현한 기능 목록 및 어려웠던 점

<br>

[ 이승우 ]

- 구현 내용 & 방법

  - 공통적으로 사용되는 닉네임, 매치 타입 등은 리덕스에 저장하여 사용하였습니다.
  - API는 axios와 리액트 쿼리를 사용하였습니다.
    - staleTime을 1분으로 둬서 그 안에 이전에 호출했던 주소로 호출하면 캐시에 있는 데이터를 사용하도록 하였습니다.
  - 무한 스크롤은 Observer API를 사용하여 구현하였습니다.
  - 그래프는 react-chartjs-2 라이브러리를 사용하였습니다.
  - 응원 한마디는 firebase와 연동하여 구현하였습니다.
  - 검색 기록은 로컬 스토리지와 연동하여 구현하였습니다.
  - API 호출에서 에러 발생시 alert으로 알리고 확인 클릭시 홈 화면으로 이동하게 하여 예외처리하였습니다.
  - 스타일링은 Emotion으로 하였습니다.
  - 애니메이션은 @keyframes를 사용하여 구현하였습니다.
  - 패키지 관리는 Yarn Berry로 의존성 깨짐 없이 zero-install로 관리하였습니다.
  - 전체적으로 컴포넌트 단위로 개발하였으며 UI/UX에서 디테일을 놓치지 않으려 노력하였습니다.
  - 트랙 기록을 가져올 때 운영중인 페이지처럼 주간 단위로 하면 API 호출을 너무 많이 하게 되어서 하루 기준으로 산정하였습니다.

- 구현하면서 어려웠던 점
  - API에서 가져온 데이터를 어떻게 정제하여 원하는 데이터를 추출할까를 고민하였습니다.
  - 비동기 호출을 반복할 때 에러가 발생하여 시행착오를 겪었습니다. await Promise.all()로 감싸서 모든 Promise들이 반환된 이후에 동작하게 하여야 한다는 것은 큰 수확이었습니다.
  - firebase를 처음 사용하다보니 설정과 연동, 모델 구조 설계 등에 어려움이 있었습니다.
  - Observer API가 컴포넌트가 마운트되서 동작하지 않아서 어려움을 겪었습니다. useEffect와 state를 연동하여 해결하였습니다.

<br>

## 🗂 프로젝트 구조

```
├── README.md
├── netlify.toml
├── node_modules
├── package.json
├── public
│   └── index.html
├── src
│   ├── App.tsx
│   ├── api.ts
│   ├── assets
│   │   ├── character
│   │   │   └── ...
│   │   ├── kart.json
│   │   └── track.json
│   ├── components
│   │   ├── SearchBar.tsx
│   │   ├── ToggleSwitch.tsx
│   │   ├── common
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Helmet.tsx
│   │   │   ├── Layout.tsx
│   │   │   ├── Loading.tsx
│   │   │   └── NoPage.tsx
│   │   ├── home
│   │   │   ├── Card.tsx
│   │   │   ├── Cheer.tsx
│   │   │   ├── Default.tsx
│   │   │   ├── Donut.tsx
│   │   │   ├── KartRecord.tsx
│   │   │   ├── LineCard.tsx
│   │   │   ├── Match.tsx
│   │   │   ├── More.tsx
│   │   │   ├── Tab.tsx
│   │   │   ├── TrackRecord.tsx
│   │   │   └── UserInfo.tsx
│   │   └── track
│   │       ├── IndicatorGuide.tsx
│   │       └── TrackTable.tsx
│   ├── firebase.js
│   ├── index.tsx
│   ├── interface.d.ts
│   ├── react-app-env.d.ts
│   ├── redux
│   │   ├── slice.ts
│   │   └── store.ts
│   ├── routes
│   │   ├── Home.tsx
│   │   ├── Kart.tsx
│   │   ├── Ranking.tsx
│   │   └── Track.tsx
│   ├── setupProxy.js
│   └── util.ts
├── tsconfig.json
└── yarn.lock
```

<br>

## 🛠 사용 기술

front-end

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![Chart.js](https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

dev-ops

![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)

database
![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)

package manage
![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)

community

![Discord](https://img.shields.io/badge/DISCORD-%237289DA.svg?style=for-the-badge&logo=discord&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Apple](https://img.shields.io/badge/-APPLE-black?style=for-the-badge&logo=apple)
![Ubuntu](https://img.shields.io/badge/-UBUNTU-gray?style=for-the-badge&logo=Ubuntu)
