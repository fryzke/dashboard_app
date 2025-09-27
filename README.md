# Dashboard Project

## 개요
이 프로젝트는 회사별 CO2 배출량 데이터를 시각화하고 관리할 수 있는 **대시보드 웹 애플리케이션**입니다.  
사용자는 각 회사의 월별 배출량 차트를 확인하고, 관련 포스트를 추가하거나 수정할 수 있습니다.

주요 기술 스택:
- **Next.js**
- **Tailwind CSS**: 스타일링
- **Recharts**: 차트 렌더링
- **Zustand**: 전역 상태 관리

---

## 주요 기능

1. **회사 대시보드**
   - 탭에서 회사 선택 가능
   - 각 회사별 월별 CO2 배출량 차트 표시

2. **차트 및 포스트**
   - 차트 하단 또는 모달에서 포스트 확인 가능
   - 각 차트의 월별 데이터에 포스트 추가 및 수정 가능
   - 연도/월(`yearMonth`) 선택 가능
   - 필수 입력 항목 체크 및 입력되지 않으면 안내 표시

3. **UI**
   - 모달, 드롭다운 메뉴, 네비게이션 드로어
   - Tailwind CSS로 빠른 스타일링 및 반응형 레이아웃

---

## 설치 및 실행

### 1. 레포지토리 클론
```bash
git clone https://github.com/fryzke/dashboard-app.git
cd dashboard-app

2. 의존성 설치
npm install


또는

yarn

3. 개발 서버 실행
npm run dev


브라우저에서 http://localhost:3000 접속

폴더 구조
/app                 # Next.js App Router 페이지
/components          # 재사용 가능한 컴포넌트 (ChartRender, TabList, Modal, SideBar 등)
/lib                 # API 호출
/store               # Zustand 상태 관리
/data                # 타입 정의 및 더미 데이터
```
---


# 상태 관리 (Zustand)

useAppStore: 회사, 포스트, 로딩 상태 관리, 데이터 fetch 및 저장

useUIStore: Sidebar 상태 관리

useCompanyStore: 회사 리스트 fetch 및 관리

# 차트 및 포스트 관리

ChartRender에서 Recharts 사용

월별 포스트 추가/수정 시 모달 사용

# Modal 컴포넌트

postId가 있으면 수정, 없으면 새 글 작성

yearMonth 선택 가능

필수 입력 체크 및 로딩 상태 처리


## Rendering Efficiency

# TabList: activeTab 변경 시 선택된 회사만 rerender.

# ChartRender: props로 전달된 companyId 변경 시 rerender.

# PostModal: isOpen이 true일 때만 mount → 불필요한 rerender 최소화.

# Zustand store 사용 → prop drilling 최소화, 구독된 컴포넌트만 rerender.

## Tradeoffs / Shortcuts

Mock API(lib/api.ts)는 서버 없이 동작하도록 구현 → 실제 DB 연동 시에는 API 호출로 교체 필요.

_posts 배열이 메모리에 저장되므로 새로고침 시 데이터 초기화됨.

에러 처리(maybeFail)는 alert 기반 단순 처리하여 시간 단축.

form validation은 기본적인 required 체크만 구현.

## Design Rationale

# Layout

사이드바 + 헤더 + 탭 기반 구조로 직관적인 탐색 제공.

회사별 데이터를 탭으로 구분하여 스위칭 UX 단순화.

# UI Decisions

Tailwind CSS만 사용 → 의존성 최소화 및 빠른 프로토타이핑.

모바일 대응: flex-col md:flex-row 패턴으로 차트와 게시물 배치를 조정.

모달을 분리(PostModal.tsx) → 관심사 분리 및 재사용성 강화.

# figma 디자인 링크
https://www.figma.com/design/AxjyASp6584UH7l1gFdxaT/Dashboard?node-id=0-1&t=cEJJQv0nwZJnOqae-1
