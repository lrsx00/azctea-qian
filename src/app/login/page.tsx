"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";

const formSchema = z.object({
  username: z.string().min(1, "请输入用户名"),
  password: z.string().min(6, "密码至少 6 位"),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || "登录失败，请检查账号信息");
      }

      const data = await res.json();
      // 调试日志：帮助确认后端返回的字段结构
      console.log("后端返回的完整数据:", data);

      const token = data?.accessToken || data?.access_token || data?.token;
      if (!token) {
        throw new Error("未获取到登录令牌，请联系管理员");
      }

      localStorage.setItem("token", token);
      toast.success("登录成功");
      router.push("/dashboard");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "登录出现异常，请稍后重试";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-tea-gradient px-4 py-12 text-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(129,173,143,0.2),transparent_25%),radial-gradient(circle_at_80%_0%,rgba(73,116,92,0.18),transparent_30%)]" />

      <div className="relative z-10 grid w-full max-w-5xl grid-cols-1 items-center gap-10 rounded-3xl border border-border/70 bg-background/60 p-8 shadow-2xl backdrop-blur-xl md:grid-cols-2 md:p-12">
        <div className="space-y-4">
          <p className="inline-flex items-center rounded-full border border-border/60 bg-secondary/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            茶叶溯源管理系统
          </p>
          <h1 className="text-3xl font-semibold leading-snug text-foreground md:text-4xl">
            让每一片茶叶的旅程
            <br />
            都清晰可溯
          </h1>
          <p className="max-w-xl text-base text-muted-foreground">
            登录后台，管理供应链、质检与流通环节。我们以深茶绿为基调，营造沉静、可信的数字体验。
          </p>
          <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
            <div className="rounded-lg border border-border/60 bg-secondary/30 px-3 py-3">
              · 茶园批次追踪
            </div>
            <div className="rounded-lg border border-border/60 bg-secondary/30 px-3 py-3">
              · 质检报告留存
            </div>
            <div className="rounded-lg border border-border/60 bg-secondary/30 px-3 py-3">
              · 流通节点监控
            </div>
            <div className="rounded-lg border border-border/60 bg-secondary/30 px-3 py-3">
              · 风险预警洞察
            </div>
          </div>
        </div>

        <Card className="border-border/70 bg-card/80 backdrop-blur">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl text-foreground">账号登录</CardTitle>
            <CardDescription className="text-muted-foreground">
              欢迎回来，请使用您的管理员账号登录。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>用户名</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="输入用户名"
                          autoComplete="username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>密码</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="输入密码"
                          autoComplete="current-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition hover:shadow-primary/30"
                >
                  {loading ? "登录中..." : "登录"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-50 mix-blend-screen blur-3xl">
        <div className="absolute -left-16 top-10 h-48 w-48 rounded-full bg-emerald-700/40" />
        <div className="absolute bottom-10 right-10 h-56 w-56 rounded-full bg-amber-500/30" />
      </div>

      <Toaster />
    </div>
  );
}

