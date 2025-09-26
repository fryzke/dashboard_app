# Dashboard Project

## 개요
이 프로젝트는 회사별 CO2 배출량 데이터를 시각화하고 관리할 수 있는 **대시보드 웹 애플리케이션**입니다.  
사용자는 각 회사의 월별 배출량 차트를 확인하고, 관련 포스트를 추가하거나 수정할 수 있습니다.

주요 기술 스택:
- **Next.js (App Router, React 18+)**
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
/components          # 재사용 가능한 컴포넌트 (ChartRender, TabList, PostModal, SideBar 등)
/lib                 # API 호출
/store               # Zustand 상태 관리
/data                # 타입 정의 및 더미 데이터

상태 관리 (Zustand)

useAppStore: 회사, 포스트, 로딩 상태 관리, 데이터 fetch 및 저장

useUIStore: Sidebar 상태 관리

useCompanyStore: 회사 리스트 fetch 및 관리

차트 및 포스트 관리

ChartRender에서 Recharts 사용

월별 포스트 추가/수정 시 모달 사용

PostModal 컴포넌트

postId가 있으면 수정, 없으면 새 글 작성

yearMonth 선택 가능

필수 입력 체크 및 로딩 상태 처리