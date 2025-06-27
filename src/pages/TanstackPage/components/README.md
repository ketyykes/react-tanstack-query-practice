# TanstackPage 組件結構

此目錄包含 TanstackPage 的所有子組件，採用模組化設計來提高代碼可讀性和維護性。

## 組件架構

### 🔍 SearchFilter
- **職責**: 處理書籍標題搜尋功能
- **特點**: 簡單的受控輸入框，支援即時搜尋
- **Props**: `value`, `onChange`

### 📚 BookItem  
- **職責**: 顯示單一書籍項目
- **特點**: 包含書籍基本資訊和操作按鈕（編輯/刪除）
- **邏輯**: 將 className 條件邏輯抽取到函式中
- **Props**: `book`, `isSelected`, `onSelect`, `onEdit`, `onDelete`, `onHover`

### 📋 BookList
- **職責**: 管理書籍列表的顯示和狀態
- **特點**: 處理載入狀態、空狀態和錯誤狀態
- **邏輯**: 將條件渲染邏輯抽取到 render 函式中
- **Props**: `books`, `isLoading`, `selectedBookId`, 各種回調函式

### 👁️ BookDetails
- **職責**: 顯示選中書籍的完整詳細資訊
- **特點**: 純展示組件，無複雜邏輯
- **Props**: `book`

### ✏️ BookEditForm
- **職責**: 處理書籍編輯表單
- **特點**: 將表單欄位渲染邏輯抽取到 render 函式中
- **邏輯**: 支援文字、數字和文字區域不同類型的輸入
- **Props**: `editForm`, `isUpdatePending`, `onFormChange`, `onUpdate`, `onCancel`

### 🎛️ BookDetailPanel
- **職責**: 統一管理右側面板的顯示邏輯
- **特點**: 負責在詳情檢視和編輯表單之間切換
- **邏輯**: 將條件渲染邏輯抽取到 render 函式中
- **Props**: 組合了 BookDetails 和 BookEditForm 所需的所有 props

## 設計原則

### ✅ 已實現的最佳實踐

1. **邏輯分離**: 將條件渲染邏輯從 JSX 中移到 render 函式
2. **單一職責**: 每個組件只負責一個特定功能
3. **Props 明確**: 每個組件都有清晰的 interface 定義
4. **可讀性提升**: 主組件變得更簡潔易讀
5. **可重用性**: 子組件可以在其他地方重複使用

### 📊 組件層級結構
```
TanstackPage
├── SearchFilter
├── BookList
│   └── BookItem (multiple)
└── BookDetailPanel
    ├── BookDetails
    └── BookEditForm
```

### 🔄 資料流向
- **向下**: Props 從父組件傳遞到子組件  
- **向上**: 通過回調函式將事件傳遞給父組件
- **狀態管理**: 所有狀態仍在 TanstackPage 中集中管理 