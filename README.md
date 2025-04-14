# OXOG
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)![Recoil](https://img.shields.io/badge/Recoil-339933?style=for-the-badge&logo=Recoil&logoColor=white)![TailWindCss](https://img.shields.io/badge/TailWindCss-0067A3?style=for-the-badge&logo=TailwindCss&logoColor=white)![Vite](https://img.shields.io/badge/Vite-C49102?style=for-the-badge&logo=Vite&logoColor=white) 
> React + TypeScript + Recoil 기반의 웹 애플리케이션  
> 사용자 중심의 UI/UX와 확장 가능한 상태 관리 구조를 목표로 한 프론트엔드 프로젝트입니다.
> 게임 전적 , 채팅 솔루션 프로그램입니다.

---

## 🛠️ 기술 스택

- **React** – 컴포넌트 기반 UI 라이브러리  
- **TypeScript** – 정적 타입을 활용한 안정적인 코드 작성  
- **Recoil** – 글로벌 상태 관리 라이브러리  
- **Vite** – 빠른 번들링과 모듈 핫 리로딩  
- **Tailwind CSS** – 유틸리티 기반 스타일링  
- **React Query / Axios** – 서버 상태 및 비동기 API 핸들링

---

## 📁 폴더 구조

```bash
src/
├── assets/         # 이미지 및 공용 리소스
├── components/     # 재사용 가능한 UI 컴포넌트
├── features/       # 도메인 단위의 기능별 폴더
├── hooks/          # 커스텀 훅
├── recoil/         # Recoil 상태 정의 (atoms/selectors)
├── routes/         # 라우팅 정의
├── pages/          # 각 페이지 단위 컴포넌트
├── utils/          # 유틸리티 함수
├── types/          # 전역 타입 정의
└── main.tsx        # 진입점


## ⚙️ Recoil 상태 관리 구조

Recoil은 React를 위한 경량 상태 관리 라이브러리로, 아토믹(atomic) 상태 단위로 나누어 관리할 수 있으며, 파생 상태 계산도 간편하게 할 수 있습니다. 본 프로젝트에서는 다음과 같은 구조로 활용하고 있습니다.

---

### ✅ 아키텍처 구성

- **atoms/**  
  전역 상태의 최소 단위를 정의합니다. 각 도메인(예: user, theme, modal 등) 별로 파일을 나누어 구성합니다.

- **selectors/**  
  기존 atom 상태를 기반으로 파생된 상태를 계산합니다. 동기/비동기 셀렉터 모두를 사용할 수 있습니다.

- **hooks/**  
  Recoil 상태를 사용하는 커스텀 훅들을 정의해 상태 접근을 추상화합니다.

---

### 📦 디렉토리 구조 예시

```bash
src/
└── recoil/
    ├── atoms/
    │   └── userAtom.ts
    ├── selectors/
    │   └── userSelector.ts
    └── index.ts



