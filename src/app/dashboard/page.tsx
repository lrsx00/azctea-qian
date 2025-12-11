import { Leaf, Package, Search, Wrench } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  {
    title: "茶园地块数",
    value: "12",
    icon: Leaf,
  },
  {
    title: "今日采摘批次",
    value: "5",
    icon: Package,
  },
  {
    title: "待加工批次",
    value: "2",
    icon: Wrench,
  },
  {
    title: "累计溯源查询",
    value: "1,203",
    icon: Search,
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-2xl">
        <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/40">茶叶溯源系统</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
            欢迎回来，管理员
          </h1>
          <p className="mt-3 max-w-2xl text-base text-white/60">
            掌握茶园、生产与溯源的关键数据，实时监控每一个环节，确保品质与效率。
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon
          return (
            <Card
              key={item.title}
              className="group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl transition-all duration-300 hover:bg-white/10 hover:-translate-y-1"
            >
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">{item.title}</CardTitle>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg transition-all duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6 text-white/70" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-white">
                  {item.value}
                </div>
                <p className="mt-2 text-xs text-white/40">实时数据 · 展示中</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
