'use client'

import { Fragment, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, LogOut, Menu, QrCode, Scissors, Settings, Sprout, Users } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { ThemeSwitcher } from "@/components/theme-switcher"

const navItems = [
  { label: "数据总览", href: "/dashboard", icon: LayoutDashboard },
  { label: "茶园管理", href: "/dashboard/gardens", icon: Sprout },
  { label: "生产作业", href: "/dashboard/production", icon: Scissors },
  { label: "溯源管理", href: "/dashboard/traceability", icon: QrCode },
  { label: "人员管理", href: "/dashboard/users", icon: Users },
  { label: "系统设置", href: "/dashboard/settings", icon: Settings },
]

const slugMap: Record<string, string> = {
  dashboard: "数据总览",
  gardens: "茶园管理",
  production: "生产作业",
  traceability: "溯源管理",
  users: "人员管理",
  settings: "系统设置",
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.replace("/login")
      return
    }
    setReady(true)
  }, [router])

  const breadcrumbs = useMemo(() => {
    const segments = pathname?.split("/").filter(Boolean) ?? []
    const trail = []

    for (let i = 0; i < segments.length; i++) {
      const href = `/${segments.slice(0, i + 1).join("/")}`
      const slug = segments[i]
      trail.push({
        href,
        label: slugMap[slug] ?? slug,
        isLast: i === segments.length - 1,
      })
    }

    return trail
  }, [pathname])

  const renderNav = (isMobile = false) => (
    <>
      <nav className={cn("flex flex-col gap-1", isMobile ? "pt-4" : "pt-6")}>
        {navItems.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href || (pathname?.startsWith(item.href) && item.href !== "/dashboard")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                "text-foreground/60 hover:bg-accent/10 hover:text-foreground",
                active && "bg-primary/20 text-primary",
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
      {/* 主题切换器 */}
      <div className={cn("mt-auto", isMobile ? "px-4 pt-4" : "px-3 pt-6")}>
        <div className="[&>button]:w-full">
          <ThemeSwitcher />
        </div>
      </div>
      {/* 退出登录按钮 */}
      <div className={cn(isMobile ? "px-4 pb-4" : "px-3 pb-6")}>
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start gap-3 rounded-xl text-foreground/60 transition-all duration-200 hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          <span>退出登录</span>
        </Button>
      </div>
    </>
  )

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.replace("/login")
  }

  if (!ready) return null

  return (
    <div className="min-h-screen bg-background">
      {/* PC端：悬浮侧边栏 */}
      <aside className="fixed left-4 top-4 z-30 hidden h-[calc(100vh-2rem)] w-64 flex-shrink-0 flex-col overflow-hidden rounded-3xl bg-sidebar-background/80 backdrop-blur-2xl border border-border/50 shadow-2xl md:flex">
        <div className="flex items-center gap-3 px-5 py-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/20 backdrop-blur-sm border border-border/50 text-lg font-bold text-primary shadow-lg">
            茶
          </div>
          <div>
            <p className="text-base font-semibold leading-tight text-foreground">茶叶溯源系统</p>
            <p className="text-xs text-foreground/40">Traceability Admin</p>
          </div>
        </div>
        <Separator className="bg-border/50" />
        <div className="flex h-full flex-col overflow-y-auto px-3">{renderNav()}</div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col md:ml-[calc(16rem+1rem)]">
        {/* Header */}
        <header className="sticky top-4 z-20 mx-4 mt-4 rounded-2xl bg-card/80 backdrop-blur-xl border border-border/50 shadow-2xl md:mx-8 md:mt-4">
          <div className="flex items-center justify-between px-6 py-4">
            {/* 移动端：汉堡按钮（左） */}
            <div className="flex items-center gap-3 md:hidden">
              <Sheet>
                <SheetTrigger className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 text-foreground shadow-lg transition-all hover:bg-accent/10">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">打开菜单</span>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="flex h-full w-[85vw] max-w-xs flex-col border-border/50 bg-sidebar-background/80 backdrop-blur-2xl p-0"
                >
                  <SheetHeader className="px-6 pb-2 pt-6">
                    <SheetTitle className="text-left text-foreground">茶叶溯源系统</SheetTitle>
                  </SheetHeader>
                  <Separator className="bg-border/50" />
                  <div className="flex h-full flex-col overflow-y-auto">{renderNav(true)}</div>
                </SheetContent>
              </Sheet>
              {/* 移动端：当前页面标题（中） */}
              <h1 className="text-lg font-semibold text-foreground">
                {breadcrumbs[breadcrumbs.length - 1]?.label || "数据总览"}
              </h1>
            </div>

            {/* PC端：面包屑导航 */}
            <div className="hidden items-center gap-3 md:flex">
              <Breadcrumb>
                <BreadcrumbList className="text-foreground/80">
                  {breadcrumbs.map((item, idx) => (
                    <Fragment key={`${item.href}-${idx}`}>
                      {idx > 0 && <BreadcrumbSeparator className="text-foreground/40" />}
                      <BreadcrumbItem className="capitalize">
                        {item.isLast ? (
                          <BreadcrumbPage className="text-foreground font-semibold">{item.label}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={item.href} className="text-foreground/60 hover:text-foreground transition-colors">
                            {item.label}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-4 py-6 md:px-8">{children}</main>
      </div>
    </div>
  )
}
