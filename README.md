# React TanStack Query Practice

## 📚 專案介紹

這是一個遵循 **tkdodo** 最佳實踐的 React Query 範例專案，展示如何在 React 應用程式中正確使用 TanStack Query (React Query) 進行伺服器狀態管理。

## 🎯 實作的 tkdodo 最佳實踐

### 1. 查詢金鑰工廠（Query Key Factory）
```typescript
export const bookKeys = {
  all: ["books"] as const,
  lists: () => [...bookKeys.all, "list"] as const,
  list: (filters: string) => [...bookKeys.lists(), { filters }] as const,
  details: () => [...bookKeys.all, "detail"] as const,
  detail: (id: number) => [...bookKeys.details(), id] as const,
};
```
- 統一管理所有查詢金鑰
- 階層式結構，易於管理失效策略
- 避免重複和錯誤

### 2. 自訂 Hooks
- 將資料獲取邏輯與 UI 分離
- 保持組件的整潔性
- 易於重複使用和測試

### 3. 查詢金鑰作為依賴陣列
```typescript
const { data: books } = useBooksQuery(
  searchFilter ? `title_like=${searchFilter}` : undefined
);
```
- 搜尋過濾器改變時自動觸發新查詢
- 確保資料與 UI 狀態同步

### 4. 善用 `enabled` 選項
```typescript
const { data: selectedBook } = useBookQuery(
  selectedBookId!, 
  !!selectedBookId  // 只有在選擇書籍時才載入詳情
);
```
- 避免不必要的網路請求
- 條件式查詢執行

### 5. 分離 Server State 與 Client State
- 搜尋過濾器和選擇狀態使用本地狀態
- 書籍資料完全依賴 React Query
- 避免將伺服器資料複製到本地狀態

### 6. 預填充策略（Prefetching）
```typescript
const handleBookHover = (id: number) => {
  prefetchBook(id);  // 滑鼠懸停時預先載入
};
```
- 提升使用者體驗
- 減少感知載入時間

### 7. 智慧快取管理
```typescript
onSuccess: (_, id) => {
  // 移除特定書籍快取並使列表失效
  queryClient.removeQueries({ queryKey: bookKeys.detail(id) });
  queryClient.invalidateQueries({ queryKey: bookKeys.lists() });
},
```
- 刪除後適當地使快取失效
- 移除已刪除項目的快取

## 🛠️ 技術堆疊

- **React 19** - 前端框架
- **TypeScript** - 型別安全
- **TanStack Query v5** - 伺服器狀態管理
- **Axios** - HTTP 客戶端
- **Vite** - 建置工具
- **React Router** - 路由管理

## 📁 專案結構

```
src/
├── api/                    # API 相關
│   ├── api.ts             # Axios 設定和 API 函式
│   └── types/
│       └── api.types.ts   # 型別定義
├── query/                 # React Query 相關
│   └── query.tsx          # 自訂 hooks 和查詢金鑰
├── pages/
│   └── TanstackPage/      # 主要範例頁面
│       └── TanstackPage.tsx
└── main.tsx               # QueryClient 設定
```

## 🚀 開始使用

### 安裝依賴
```bash
npm install
```

### 啟動開發伺服器
```bash
npm run dev
```

### 啟動 JSON Server（後端 API）
```bash
npx json-server --watch db.json --port 3000
```

## 🎨 功能特色

1. **書籍列表展示** - 支援即時搜尋過濾
2. **書籍詳情查看** - 點選書籍查看完整資訊
3. **預填充優化** - 滑鼠懸停時預載資料
4. **智慧快取** - 自動管理資料快取和失效
5. **錯誤處理** - 友善的錯誤訊息顯示
6. **載入狀態** - 適當的載入指示器

## 📖 學習重點

這個專案特別適合學習：

- React Query 的核心概念
- tkdodo 推薦的最佳實踐
- TypeScript 與 React Query 的整合
- 伺服器狀態與客戶端狀態的分離
- 查詢金鑰的設計模式
- 快取策略的實作

## 🔗 相關資源

- [tkdodo 的 React Query 部落格系列](https://tkdodo.eu/blog/practical-react-query)
- [TanStack Query 官方文件](https://tanstack.com/query/latest)
- [React Query 最佳實踐指南](https://react-query.tanstack.com/guides/best-practices)

## 📝 注意事項

- 本專案需要 JSON Server 提供後端 API
- 確保 `db.json` 檔案包含適當的書籍資料
- 開發時建議開啟 React Query DevTools

## 🤝 貢獻

歡迎提出 Issue 和 Pull Request 來改善這個範例專案！
