import type { Metadata } from 'next'
import { CalendarRange, Flame, Sparkles } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { NewsletterSignupForm } from '@/features/newsletter/components/newsletter-signup-form'

const editions = [
  {
    title: 'App Router Deep Dive',
    description: 'Route cache, dynamic rendering, server actions를 활용해 빌드와 런타임을 최적화하는 방법.',
    date: '2025. 02. 03 발행 예정',
    topics: ['Route Cache', 'Streaming', 'ISR'],
  },
  {
    title: 'React 19 Migration Note',
    description: 'Transition, Actions, 새 hook과 React Compiler 프리뷰를 적용하며 겪은 이슈 정리.',
    date: '2025. 02. 10 발행 예정',
    topics: ['React Actions', 'Compiler', 'Server Components'],
  },
  {
    title: 'Drizzle ORM Recipes',
    description: '태그 기반 캐싱, 멀티-테넌트 스키마, 마이그레이션 파이프라인 설계까지 실전 팁 모음.',
    date: '2025. 02. 17 발행 예정',
    topics: ['Caching', 'Migrations', 'Patterns'],
  },
]

export const metadata: Metadata = {
  title: '뉴스레터 | Next.js 16 게시판',
  description: 'Next.js, React 19, Drizzle ORM과 Auth.js 소식을 매주 정리한 뉴스레터입니다.',
}

export default function NewsletterPage() {
  return (
    <div className="bg-gradient-to-b from-white to-zinc-50 dark:from-black dark:to-zinc-900">
      <div className="container mx-auto px-4 py-16 space-y-16">
        <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
              <Sparkles className="h-4 w-4" />
              Weekly Shipping Log
            </p>
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
              모던 웹 개발 소식을 한 주 단위로 정리해 전달해요
            </h1>
            <p className="text-lg text-muted-foreground">
              Next.js 16, React 19, Auth.js, Drizzle ORM 업데이트와 실무에서 바로 적용할 수 있는 설계/배포 팁을
              큐레이션합니다. 실제 게시판 기능을 개선하며 얻게 된 인사이트도 함께 공유합니다.
            </p>
            <div className="rounded-2xl border bg-background/80 p-6 shadow-sm">
              <NewsletterSignupForm />
            </div>
          </div>
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarRange className="h-5 w-5 text-primary" />
                다음 호 미리보기
              </CardTitle>
              <CardDescription>관심 있는 토픽을 선택하면 맞춤형 링크도 함께 보내드려요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {editions.map((edition) => (
                <div key={edition.title} className="rounded-xl border border-primary/10 bg-white/80 p-4 dark:bg-zinc-900/70">
                  <p className="text-xs uppercase tracking-wide text-primary">{edition.date}</p>
                  <p className="mt-1 text-lg font-semibold">{edition.title}</p>
                  <p className="text-sm text-muted-foreground">{edition.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {edition.topics.map((topic) => (
                      <span key={topic} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-primary" />
                Shipping Log
              </CardTitle>
              <CardDescription>프로덕션에서 마주친 이슈와 해결 전략을 시간순으로 공유합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>• App Router 캐시 태그 설계, 서버 액션 기반 CRUD 흐름 모니터링</p>
              <p>• Auth.js authorized 콜백과 middleware를 활용한 퍼블릭 클라이언트 보호</p>
              <p>• Drizzle ORM으로 스키마 버전 관리 + 데이터 품질 체크</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>실험과 인사이트</CardTitle>
              <CardDescription>React 19 Transition, Actions, Compiler 실험 로그를 담습니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>• 서버 콤포넌트 + Suspense 패턴으로 UX를 개선한 사례</p>
              <p>• TS 5.x 설정, Zod 4와의 궁합, 런타임 타입 안정성 유지 전략</p>
              <p>• 런북과 체크리스트를 템플릿으로 제공</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>커뮤니티 하이라이트</CardTitle>
              <CardDescription>오픈소스와 커뮤니티에서 화제가 된 글, 이슈를 큐레이션합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>• 베스트 프랙티스 레포, RFC, 블로그 포스트</p>
              <p>• 국내/해외 밋업 일정, 웨비나 아카이브</p>
              <p>• 실무 적용 사례 인터뷰 요약</p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
