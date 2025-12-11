# 变更日志: 登录页与 shadcn 初始化
**日期**: 2025-12-11
**任务**: 初始化 Next.js 基础、引入 shadcn 组件并完成登录页

## 📂 文件变更
### 修改 (Modified) / 新增 (New)
- `package.json` / `package-lock.json` / `postcss.config.mjs` / `tailwind.config.ts`: 切换 Tailwind v3 配置，新增 shadcn/ui 依赖（Radix、sonner 等）与工具库。
- `.gitignore`: 合并忽略规则，允许跟踪 `docs/changelogs`。
- `src/app/globals.css` / `layout.tsx`: 设定深茶绿主题、字体与基础样式。
- `src/lib/utils.ts`: 提供 `cn` 工具函数。
- `src/components/ui/*`: 新增 button、input、label、card、form、toast 组件，符合 shadcn 风格。
- `src/app/page.tsx`: 默认重定向至登录页。
- `src/app/login/page.tsx`: 新增登录页面，集成表单校验、API 调用与 toast 提示。
- `components.json`: shadcn 配置声明。

## 💡 技术说明 (Technical Notes)
- **表单校验与提交流程**: 使用 `react-hook-form` + `zod` 校验，调用 `POST http://localhost:3000/auth/login`，成功后写入 `localStorage` 的 `azctea_token` 并跳转 `/dashboard`，失败通过 toast 呈现错误。
- **UI 主题**: Tailwind v3 + shadcn「New York」风格，主色为深茶绿，卡片/按钮带玻璃与渐变效果，新增 `tea-gradient` 背景和柔和阴影。
- **配置变更**: Tailwind 改为传统 `postcss` 管线，`tailwind.config.ts` 启用 `tailwindcss-animate`，无 `.env` 变量改动。

