import Link from 'next/link'
import { ArrowRight, Mail, PenLine, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const featureHighlights = [
  {
    title: '실시간 게시판',
    description: 'Server Actions와 드리즐 캐싱을 활용해 글 작성 후 바로 목록에 반영됩니다.',
    icon: PenLine,
    href: '/posts',
    cta: '게시글 보기',
  },
  {
    title: '큐레이션 뉴스레터',
    description: 'Next.js와 React 19 생태계의 최신 소식을 정리해 메일로 전달합니다.',
    icon: Mail,
    href: '/newsletter',
    cta: '뉴스레터 살펴보기',
  },
  {
    title: '안전한 인증',
    description: 'Auth.js + GitHub OAuth로 로그인 흐름부터 세션 보안까지 모범 사례를 따릅니다.',
    icon: ShieldCheck,
    href: '/login',
    cta: '로그인',
  },
]

const newsletterTopics = [
  {
    title: '주간 Dev Recap',
    description: 'Next.js 16 릴리스, React 19 이슈, Drizzle ORM 업데이트를 한눈에 정리합니다.',
    tag: '트렌드',
  },
  {
    title: '코드 리뷰 팁',
    description: 'Feature-based 구조로 협업할 때의 코드리뷰 체크리스트와 도구를 소개합니다.',
    tag: 'Best Practice',
  },
  {
    title: '성능 다이어리',
    description: 'App Router, RSC, 캐시 태깅으로 TTFB를 줄였던 실험을 공유합니다.',
    tag: 'Performance',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-black">
      <div className="container mx-auto px-4 py-16 space-y-16">
        <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">Feature-Based Board</p>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-zinc-900 dark:text-zinc-50">
                Next.js 16으로 만드는 <span className="text-primary">현대적인 게시판</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                게시글과 뉴스레터, 인증까지 모두 App Router + Server Actions 패턴으로 구성했습니다. 실무형
                아키텍처를 그대로 체험해 보세요.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/posts">
                <Button size="lg" className="w-full sm:w-auto">
                  게시글 둘러보기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/newsletter">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  뉴스레터 소개
                </Button>
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="border-dashed">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">GitHub OAuth</CardTitle>
                  <CardDescription>Auth.js 5 + Drizzle Adapter</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    PKCE + callback 보호를 포함한 public client 시나리오로 바로 로그인할 수 있어요.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-dashed">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">캐시 일관성</CardTitle>
                  <CardDescription>Tag 기반 revalidate</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    게시글 쓰기 후 `revalidateTag`로 목록/상세 캐시를 동시에 무효화합니다.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          <Card className="h-fit border-primary/30 bg-primary/5">
            <CardHeader>
              <CardTitle>이번 주 뉴스레터 미리보기</CardTitle>
              <CardDescription>React 19 실험 기능과 Next.js 16 RSC 전략을 다룹니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {newsletterTopics.map((topic) => (
                <div key={topic.title} className="rounded-lg border border-primary/20 bg-white/70 p-4 dark:bg-zinc-900/60">
                  <p className="text-xs uppercase tracking-wide text-primary">{topic.tag}</p>
                  <p className="mt-2 text-sm font-semibold">{topic.title}</p>
                  <p className="text-sm text-muted-foreground">{topic.description}</p>
                </div>
              ))}
              <Link href="/newsletter">
                <Button variant="secondary" className="w-full">
                  전체 뉴스레터 보기
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-8">
          <div className="flex flex-col gap-2 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">모던 스택</p>
            <h2 className="text-3xl font-bold">이 프로젝트에서 확인할 수 있어요</h2>
            <p className="text-muted-foreground">
              Next.js 16, React 19, Drizzle ORM, Zod, Auth.js를 활용한 풀스택 코드를 한 저장소에서 살펴보세요.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featureHighlights.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title}>
                  <CardHeader className="space-y-2">
                    <div className="flex items-center gap-2 text-primary">
                      <Icon className="h-5 w-5" />
                      <span className="text-xs font-semibold uppercase">Feature</span>
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href={feature.href}>
                      <Button variant="outline" className="w-full">
                        {feature.cta}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
