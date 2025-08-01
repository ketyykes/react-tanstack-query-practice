# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 專案概述

這是一個展示 TanStack Query (React Query) 最佳實踐的 React 專案，遵循 tkdodo 的建議實作伺服器狀態管理。專案使用 React 19、TypeScript、TanStack Query v5、React Hook Form、Zod 驗證和 Tailwind CSS。

## 開發指令

### 核心指令
```bash
# 安裝依賴
pnpm install

# 啟動開發伺服器 (port 9487)
pnpm run dev

# 啟動 JSON Server 後端 (port 3004) - 開發時必須同時執行
pnpm run server
# 或手動執行
pnpx json-server --watch db.json --port 3004

# 建置專案
pnpm run build

# 程式碼檢查
pnpm run lint

# 預覽建置結果
pnpm run preview
```

### 開發環境要求
- Node.js 22.17.0 (使用 Volta 管理)
- pnpm 套件管理器
- 需要同時執行前端開發伺服器和 JSON Server

## 程式碼架構

### TanStack Query 模式
專案嚴格遵循 tkdodo 的 React Query 最佳實踐：

1. **查詢金鑰工廠 (Query Key Factory)** - `src/query/query.tsx`
   - 使用 `bookKeys` 工廠函式統一管理所有查詢金鑰
   - 階層式結構：`['books'] → ['books', 'list'] → ['books', 'list', {filters}]`
   - 支援靈活的快取操作（invalidation、prefetch）

2. **自訂 Hooks 模式**
   - `useBooksQuery()` - 取得書籍列表，支援查詢字串過濾
   - `useBookQuery()` - 取得單一書籍，使用 `enabled` 選項條件查詢
   - `useCreateBookMutation()` - 新增書籍
   - `useUpdateBookMutation()` - 更新書籍
   - `useDeleteBookMutation()` - 刪除書籍
   - `usePrefetchBook()` - 預填充書籍詳情

3. **快取管理策略**
   - 使用 `invalidateQueries` 使列表查詢失效
   - 使用 `removeQueries` 移除已刪除項目的快取
   - 5 分鐘 `staleTime` 設定避免重複請求

### 檔案結構模式

```
src/
├── api/                          # API 層
│   ├── api.ts                   # Axios 設定、攔截器、API 函式
│   └── types/api.types.ts       # API 型別定義
├── query/query.tsx              # TanStack Query hooks 和查詢金鑰工廠
├── schemas/bookSchema.ts        # Zod 驗證 schema
├── pages/TanstackPage/          # 主要功能頁面
│   ├── TanstackPage.tsx        # 主要邏輯和狀態管理
│   └── components/             # 頁面專用組件
└── components/                  # 共用組件
```

### 狀態管理原則
- **伺服器狀態**：完全透過 TanStack Query 管理
- **客戶端狀態**：使用 React useState (搜尋過濾器、選擇狀態、編輯狀態)
- **表單狀態**：使用 React Hook Form + Zod 驗證
- 嚴格分離伺服器狀態與客戶端狀態，避免將伺服器資料複製到本地狀態

### React Hook Form + Zod 整合
- `bookEditSchema` 定義完整的書籍編輯驗證規則
- 使用 `@hookform/resolvers/zod` 進行表單驗證
- 型別安全的表單資料處理

### API 設計模式
- 路由工廠函式產生 URL (`bookQueryRouteCreator`, `bookDetailRouteCreator` 等)
- Axios 攔截器統一處理回應和錯誤
- 基於 JSON Server 的 REST API 模擬

## 重要設定檔

- `vite.config.ts` - Vite 設定，開發伺服器 port 9487，忽略 `db.json` 檔案變更監聽
- `db.json` - JSON Server 資料檔案，包含書籍模擬資料
- `src/App.tsx` - QueryClient 設定和 React Query DevTools 整合

## 開發注意事項

1. **必須同時執行兩個伺服器**：前端開發伺服器 (port 9487) 和 JSON Server (port 3004)
2. **TanStack Query DevTools** 已整合，開發時可用於除錯查詢狀態
3. **型別安全**：所有 API 函式和查詢 hooks 都有完整的 TypeScript 型別定義
4. **錯誤處理**：API 層有完整的錯誤攔截器，mutation hooks 包含錯誤處理邏輯
5. **效能優化**：實作預填充 (prefetch) 功能，滑鼠懸停時預載書籍詳情

## 測試與除錯

- 使用 React Query DevTools 監控查詢狀態和快取
- 瀏覽器開發者工具查看網路請求
- 檢查 `db.json` 檔案確認資料變更