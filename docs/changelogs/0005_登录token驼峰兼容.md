# 变更日志: 登录 token 驼峰兼容
**日期**: 2025-12-11
**任务**: 兼容后端返回的 `accessToken` 字段

## 📂 文件变更
### 修改 (Modified) / 新增 (New)
- `src/app/login/page.tsx`: 令牌读取顺序调整为 `accessToken` > `access_token` > `token`，保持写入 `localStorage` 的键为 `token`，成功后跳转 `/dashboard`。

## 💡 技术说明 (Technical Notes)
- **关键点**: 适配后端驼峰命名的 `accessToken` 响应字段。
- **配置变更**: 无 `.env` 改动。

