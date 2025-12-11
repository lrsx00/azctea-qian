# 变更日志: 登录 token 解析修复
**日期**: 2025-12-11
**任务**: 修正登录响应解析，确保获取 access_token 并便于调试

## 📂 文件变更
### 修改 (Modified) / 新增 (New)
- `src/app/login/page.tsx`: 登录请求后增加调试日志打印完整响应，优先使用 `data.access_token` 读取令牌（兼容 `data.token`），存储为 `localStorage` 的 `token`，保持成功跳转 `/dashboard`。

## 💡 技术说明 (Technical Notes)
- **关键点**: 增加 `console.log` 辅助核对后端返回结构；令牌解析优先 `access_token`。
- **配置变更**: 无 `.env` 变动。

