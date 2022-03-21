## 📑 프로젝트 소개

WANTED & CODESTATES 프리온보딩 코스

넥슨 기업 개인 과제입니다.

<br>

### < 넥슨 >

PROJECT PERIOD: 2022.03.21 ~ 2022.03.25

<br>

## 밑의 내용은 추후 변경 예정

[배포링크](https://wanted-8-4-i7.netlify.app/)

<br>

## ✨ 주요 기능

- [상단 Tab bar]는 Click을 통해 각각의 Tab으로 이동할 수 있습니다. Tab 간 이동 시 슬라이딩 애니메이션을 넣습니다.
- [공유하기] 기능은 해당 컨텐츠 링크를 새 창으로 띄웁니다.
- [새로 올라왔어요]의 Carousel View는 5초에 한번씩 바로 다음 컨텐츠로 슬라이딩 애니메이션 처리가 되면서 이동합니다.
- [더보기] 버튼을 눌렀을 때 모든 컨텐츠가 각 sector에 맞게 조회됩니다.
- 전역 데이터 관리를 도입하여 구현합니다.
- 프론트엔드 서버는 localhost:8888 으로 설정되어 있습니다.

<br>

### 🧔 메인

<br>

1. 로딩 인디케이터

<img src="https://user-images.githubusercontent.com/85816029/158819764-b613d861-4066-423d-879f-c93c1900273b.gif" width="700px" height="400px">

<br>

2. 탭 슬라이드

<img src="https://user-images.githubusercontent.com/85816029/158819686-9e027a02-a0aa-402f-a513-613544f2f78c.gif" width="700px" height="400px">

<br>

3. 알쓸B잡

<img src="https://user-images.githubusercontent.com/85816029/158819733-37964975-32ae-48cb-a1f3-95fd41249c69.gif" width="700px" height="400px">

<br>

4. 유튜브

<img src="https://user-images.githubusercontent.com/85816029/158819742-45bbac17-232b-446d-9265-c6a65e0b9583.gif" width="700px" height="400px">

<br>

5. 인사이트

<img src="https://user-images.githubusercontent.com/85816029/158819754-4e31afd2-1dab-4ca0-a656-74ee5d4ca665.gif" width="700px" height="400px">

<br>

### 구현한 기능 목록 및 어려웠던 점

<br>

[ 이승우 ]

- 구현 내용 & 방법
  - recoil 설정 및 atom, selector 정의
  - 좋아요 기능과 recoil 연동
- 구현하면서 어려웠던 점
  - recoil의 selector에서 setter를 통해 상태를 변경하려고 하는 데서 시행착오를 겪었습니다. setter는 결국 atom 상태만을 변경할 수 있고 immutable하게 작동한다는 것을 배웠습니다.

<br>

## 🗂 프로젝트 구조

```
├── README.md
├── netlify.toml
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.tsx
│   ├── api.ts
│   ├── components
│   │   ├── ContentDetail.tsx
│   │   ├── ContentList.tsx
│   │   ├── ContentListItem.tsx
│   │   ├── Header.tsx
│   │   ├── LoadingIndicator.tsx
│   │   ├── NewCards.tsx
│   │   ├── Subscribe.tsx
│   │   └── Template.tsx
│   ├── index.tsx
│   ├── setupProxy.js
│   └── store.ts
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

dev-ops

![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)

community

![Discord](https://img.shields.io/badge/DISCORD-%237289DA.svg?style=for-the-badge&logo=discord&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Apple](https://img.shields.io/badge/-APPLE-black?style=for-the-badge&logo=apple)
![Ubuntu](https://img.shields.io/badge/-UBUNTU-gray?style=for-the-badge&logo=Ubuntu)
