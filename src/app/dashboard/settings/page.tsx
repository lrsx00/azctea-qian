'use client'

import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.info("演示模式：修改密码功能开发中")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">系统设置</h1>
        <p className="mt-2 text-sm text-white/60">管理系统配置和安全设置</p>
      </div>

      <Card className="rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-xl text-white">安全设置</CardTitle>
          <CardDescription className="text-white/40">修改您的登录密码以保护账户安全</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="current-password" className="text-white/80">
                当前密码
              </Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="请输入当前密码"
                className="rounded-xl bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-white/40 focus:border-emerald-500/50 focus:ring-emerald-500/30 focus:bg-white/10 transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-white/80">
                新密码
              </Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="请输入新密码"
                className="rounded-xl bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-white/40 focus:border-emerald-500/50 focus:ring-emerald-500/30 focus:bg-white/10 transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-white/80">
                确认新密码
              </Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="请再次输入新密码"
                className="rounded-xl bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-white/40 focus:border-emerald-500/50 focus:ring-emerald-500/30 focus:bg-white/10 transition-all"
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-emerald-500/80 to-emerald-600/80 text-white shadow-lg shadow-emerald-500/30 hover:from-emerald-500 hover:to-emerald-600 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-200"
              >
                保存修改
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
