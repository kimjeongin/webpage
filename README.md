# Next.js 16 게시판 프로젝트

Feature-Based Architecture로 구축된 현대적인 게시판 웹 애플리케이션입니다.

## 🚀 기술 스택

- **Framework**: Next.js 16 (App Router) + React 19
- **Language**: TypeScript (Strict mode)
- **Database**: PostgreSQL 16 (Docker)
- **ORM**: Drizzle ORM
- **Validation**: Zod
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Package Manager**: pnpm

## 📁 프로젝트 구조

```
src/
├── app/                    # App Router (레이아웃 + 페이지)
│   ├── page.tsx           # 홈/소개 페이지
│   ├── posts/             # 게시글 리스트 & 상세
│   ├── newsletter/        # 뉴스레터 랜딩
│   └── layout.tsx         # 공통 레이아웃 + 네비게이션
│
├── features/              # 기능별 모듈
│   └── posts/
│       ├── actions/       # Server Actions
│       ├── services/      # Service Layer (비즈니스 로직)
│       ├── schemas/       # Zod 검증 스키마
│       ├── components/    # UI 컴포넌트
│       └── types/         # 타입 정의
│
├── components/ui/         # 공통 UI 컴포넌트 (shadcn/ui)
│
├── lib/                   # 공통 유틸리티
│   ├── db/               # 데이터베이스
│   │   ├── schema/       # Drizzle 테이블 스키마
│   │   ├── migrations/   # DB 마이그레이션
│   │   └── index.ts      # DB 클라이언트
│   └── utils.ts          # 유틸리티 함수
│
└── types/                # 전역 타입
```

## 🛠️ 시작하기

### 1. 의존성 설치

```bash
pnpm install
```

### 2. 환경 변수 설정

`.env.local` 파일이 이미 생성되어 있으며, 다음과 같이 채워주세요:

```env
DATABASE_URL="postgresql://boarduser:boardpass@localhost:5432/boarddb"
AUTH_GITHUB_ID="github-oauth-client-id"
AUTH_GITHUB_SECRET="github-oauth-client-secret"
AUTH_SECRET="openssl rand -base64 32 로 생성"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

> `AUTH_SECRET`는 Auth.js에서 세션을 암호화하는 키입니다. 로컬에서는 `openssl rand -base64 32` 혹은 `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`로 생성할 수 있습니다.

#### GitHub OAuth 앱 등록

1. [GitHub Developer settings](https://github.com/settings/developers)에서 **New OAuth App**을 생성합니다.
2. **Homepage URL**: `http://localhost:3000` (또는 `NEXT_PUBLIC_APP_URL` 값)
3. **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. 생성된 **Client ID / Client Secret**을 `.env.local`의 `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`에 입력합니다.

### 3. PostgreSQL 실행

```bash
# Docker로 PostgreSQL 시작
docker compose up -d

# 상태 확인
docker compose ps
```

### 4. 데이터베이스 마이그레이션

```bash
# 마이그레이션 파일 생성 (이미 생성됨)
pnpm drizzle-kit generate

# 마이그레이션 실행
pnpm drizzle-kit push

# 또는 마이그레이션 적용
pnpm db:migrate
```

### 5. 개발 서버 실행

```bash
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어주세요.

## 📝 사용 가능한 명령어

```bash
# 개발 서버
pnpm dev

# 프로덕션 빌드
pnpm build

# 프로덕션 서버
pnpm start

# ESLint 실행
pnpm lint

# 기본 단위 테스트 (Auth redirect helper)
pnpm test

# Drizzle Studio (DB GUI)
pnpm db:studio

# 마이그레이션 생성
pnpm db:generate

# 마이그레이션 적용
pnpm db:push
```

## 🗄️ 데이터베이스 관리

### Drizzle Studio 사용

```bash
pnpm db:studio
```

브라우저에서 [https://local.drizzle.studio](https://local.drizzle.studio)에 접속하여 GUI로 데이터를 확인할 수 있습니다.

### 임시 사용자 추가 (선택)

GitHub OAuth로 로그인하면 `user` 테이블이 자동으로 생성됩니다. 별도로 테스트 계정을 만들고 싶다면 아래 SQL을 참고하세요.

```sql
INSERT INTO "user" (id, email, name)
VALUES ('temp-user-id', 'test@example.com', '테스트 사용자');
```

## 🔐 인증 (Auth.js + GitHub OAuth)

- **Auth.js v5 + Drizzle Adapter**: `src/auth.config.ts`에 OAuth 제공자, 인증 전략, 권한 로직을 한 곳에서 관리합니다.
- **안전한 Public Client 흐름**: GitHub OAuth를 Auth.js provider로 구성하고 `callbackUrl`을 화이트리스트하여 public client 시나리오에서도 안전하게 동작합니다.
- **미들웨어 보호**: `middleware.ts`와 `authorized` 콜백으로 `/posts/create` 등 보호 라우트를 강제하고, 인증 사용자에게는 `/login` 접근을 막습니다.
- **전용 로그인 페이지**: `app/login/page.tsx`에서 Auth.js 서버 액션(`LoginButton`)을 호출해 최초 redirect 목적지를 유지합니다.
- **Server Actions**: `features/auth/actions/auth.ts`가 `signIn/signOut`을 wrapping 하여 hidden redirect 필드를 검증합니다.
- **세션 타입 세분화**: `types/next-auth.d.ts`로 `session.user.id` 접근을 정식 타입으로 보장합니다.

## 🧭 페이지 구성

- **홈** (`/`): 프로젝트 소개, 기술 스택, 뉴스레터 미리보기.
- **게시판** (`/posts`): 게시글 목록/작성/상세, Auth.js로 보호된 작성 페이지.
- **뉴스레터** (`/newsletter`): 주간 발행 일정, 소개, `NewsletterSignupForm`를 이용한 구독 시뮬레이션.
- **글로벌 내비게이션**: `MainNav`가 `layout.tsx`에 포함되어 각 페이지에서 일관된 탐색을 제공합니다.

## 🏗️ 아키텍처 패턴

### 1. Feature-Based Architecture

기능별로 모듈을 분리하여 확장성과 유지보수성을 높였습니다.

```typescript
features/posts/
├── actions/        # Server Actions (Controller)
├── services/       # Service Layer (비즈니스 로직 + DAL)
├── schemas/        # Zod 검증
└── components/     # UI 컴포넌트
```

### 2. Data Flow

```
User Input (FormData)
  ↓
Server Action (Controller)
  ↓
Zod Validation (검증)
  ↓
Service Layer (비즈니스 로직)
  ↓
Data Access Layer (DB 접근)
  ↓
Response
```

### 3. Layer 책임 분리

- **App Router**: 라우팅만 담당 (얇은 레이어)
- **Server Actions**: FormData 파싱, 검증 호출, 캐시 관리
- **Service Layer**: 비즈니스 로직, 권한 확인, DB 접근
- **Components**: UI 렌더링만 담당

## 🎯 구현된 기능

- ✅ 게시글 목록 조회
- ✅ 게시글 상세 보기
- ✅ 게시글 작성
- ✅ Zod를 통한 폼 검증
- ✅ Server Actions 활용
- ✅ TypeScript 타입 안전성
- ✅ Responsive UI (모바일 지원)

## 🔜 향후 개발 예정

- [ ] 사용자 인증 (NextAuth.js)
- [ ] 게시글 수정/삭제
- [ ] 댓글 기능
- [ ] 좋아요 기능
- [ ] 검색 기능
- [ ] 페이지네이션
- [ ] 카테고리 분류

## 🐳 Docker 명령어

```bash
# PostgreSQL 시작
docker compose up -d

# PostgreSQL 중지
docker compose down

# 로그 확인
docker compose logs -f postgres

# 데이터 삭제 (주의!)
docker compose down -v
```

## 📚 학습 자료

- [Next.js 16 Documentation](https://nextjs.org/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [Zod Documentation](https://zod.dev)
- [shadcn/ui Documentation](https://ui.shadcn.com)

## 📄 라이선스

MIT

---

**Made with ❤️ using Next.js 16 + Drizzle ORM + Zod**
