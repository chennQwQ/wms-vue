# Reference Frontend Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 补齐参考前端中的货品、仓库和监控大屏功能，同时保留当前项目已有增强，并通过测试、类型检查和生产构建。

**Architecture:** 对每个模块执行语义合并，以当前代码为主体，只引入参考实现中确实缺失的交互与数据映射。可独立验证的打印和数据归一化逻辑抽成纯函数，页面继续使用现有 JeecgBoot `useListPage`、`useForm`、`useModal` 与 API 封装。

**Tech Stack:** Vue 3、TypeScript、Vite、Ant Design Vue、JeecgBoot Vue3、Jest/ts-jest、sv-print、ECharts。

## Global Constraints

- 参考目录是最低功能基线，不允许整目录覆盖。
- 保留商品批次、图片 URL 兼容及工作区既有未提交修改。
- 不复制未定义函数、错误权限、示例数据、调试日志或硬编码远程打印样式。
- 第一阶段必须通过 Jest、`vue-tsc --noEmit` 和生产构建；第二阶段再连接后端联调。

---

### Task 1: 建立语义差异清单与基线验证

**Files:**
- Create: `docs/superpowers/plans/2026-08-05-reference-frontend-alignment-report.md`
- Modify: none
- Test: existing `tests/**/*.spec.ts`

**Interfaces:**
- Consumes: 参考目录与 `src/views/goods`、`src/views/warehouse`、`src/views/dashboard/bigscreen`。
- Produces: 每个参考功能的 `missing`、`current-enhancement`、`reference-defect` 或 `equivalent` 判定。

- [ ] **Step 1: 运行现有单元测试并记录基线**

Run: `pnpm exec jest --runInBand`

Expected: 记录 PASS/FAIL 和失败用例，不把既有失败误判为本次回归。

- [ ] **Step 2: 运行类型检查和生产构建并记录基线**

Run: `pnpm exec vue-tsc --noEmit`

Run: `pnpm build`

Expected: 记录基线错误；后续本次范围内错误必须清零。

- [ ] **Step 3: 写语义差异报告**

报告必须逐项覆盖货主、分类、品牌、商品、图片、承运商、包装材料、仓库、库区、储位和大屏，并列出拟改文件与判定理由。

- [ ] **Step 4: 提交报告**

```bash
git add docs/superpowers/plans/2026-08-05-reference-frontend-alignment-report.md
git commit -m "docs: inventory frontend alignment gaps"
```

### Task 2: 商品与储位条码打印

**Files:**
- Create: `src/views/printTemplate/barcodePrint.utils.ts`
- Create: `src/views/printTemplate/storageLocationBarcode-panel.js`
- Modify: `src/views/goods/WmsProductsList.vue`
- Modify: `src/views/warehouse/WmsStorageLocationsList.vue`
- Test: `tests/views/printTemplate/barcodePrint.utils.spec.ts`

**Interfaces:**
- Produces: `selectPrintableRecords<T>(rows: T[] | undefined, barcodeField: keyof T): T[]`，过滤无条码记录；`assertPrintableSelection(rows: unknown[]): void`，空集合时抛出可展示错误。
- Consumes: 商品字段 `ownerName`、`productName`、`productSpec`、`productBarcode`；储位字段 `locationCode`、`warehouseName`/`warehouse.warehouseName`、`zoneName`/`storageZones.zoneName`。

- [ ] **Step 1: 写打印选择逻辑失败测试**

```ts
expect(selectPrintableRecords(undefined, 'productBarcode')).toEqual([]);
expect(selectPrintableRecords([{ productBarcode: '' }, { productBarcode: 'P1' }], 'productBarcode')).toEqual([{ productBarcode: 'P1' }]);
expect(() => assertPrintableSelection([])).toThrow('请先选择需要打印的数据');
```

- [ ] **Step 2: 运行测试确认失败**

Run: `pnpm exec jest tests/views/printTemplate/barcodePrint.utils.spec.ts --runInBand`

Expected: FAIL because module/functions do not exist.

- [ ] **Step 3: 实现纯函数和本地储位模板**

实现无副作用的选择过滤与校验。储位模板只读取本地字段并输出储位编码条码，不加载远程 CSS。

- [ ] **Step 4: 接入两个列表页**

商品列表使用 `productbarcode-panel.js`；储位列表使用新模板。按钮只在选择记录后执行，权限分别使用 `goods:wms_products:exportXls` 与 `warehouse:wms_storage_locations:exportXls`，打印异常通过 `useMessage().createError` 呈现。

- [ ] **Step 5: 运行针对性测试**

Run: `pnpm exec jest tests/views/printTemplate/barcodePrint.utils.spec.ts --runInBand`

Expected: PASS.

- [ ] **Step 6: 提交打印功能**

```bash
git add src/views/printTemplate/barcodePrint.utils.ts src/views/printTemplate/storageLocationBarcode-panel.js src/views/goods/WmsProductsList.vue src/views/warehouse/WmsStorageLocationsList.vue tests/views/printTemplate/barcodePrint.utils.spec.ts
git commit -m "feat: align product and location barcode printing"
```

### Task 3: 货品管理语义合并

**Files:**
- Modify: `src/views/goods/WmsCargoOwners*.{ts,vue}` and matching components where the report marks a gap
- Modify: `src/views/goods/WmsProductCategories*.{ts,vue}` and matching components
- Modify: `src/views/goods/WmsProductBrand*.{ts,vue}` and matching components
- Modify: `src/views/goods/WmsProducts*.{ts,vue}` and matching components
- Modify: `src/views/goods/WmsProductImages*.{ts,vue}` and matching components
- Modify: carrier and packaging files only if the report marks a gap
- Test: `tests/views/goods/*.spec.ts`

**Interfaces:**
- Consumes: current `fileUrl.utils.ts`, batch-number module, JeecgBoot dictionary/search/tree components and current backend endpoint constants.
- Produces: complete CRUD, bulk delete, import/export, advanced query, category tree load/edit echo, related owner/brand/category selection and image preview behavior.

- [ ] **Step 1: 为新增树或字段归一化逻辑写失败测试**

测试根节点 `parentId = '0'`、子节点懒加载结果、编辑回显和 URL 保持规则；若逻辑留在框架组件内，则以可抽离纯函数测试其输入输出。

- [ ] **Step 2: 运行货品测试确认失败**

Run: `pnpm exec jest tests/views/goods --runInBand`

Expected: 新测试在实现前 FAIL。

- [ ] **Step 3: 合并货品数据定义与 API**

保留当前更完整字段，同时恢复参考中的货主名称、品牌名称、分类名称、SKU、规格、单位、批次和供应商条码等用户可读列；关联字段使用选择组件而不是裸 ID 输入。统一字典码和响应字段，不降低图片 URL 兼容能力。

- [ ] **Step 4: 合并列表与弹窗交互**

恢复缺失的高级查询、批量操作、树加载和编辑回显；删除无效导入与调试输出。现有批次和商品图片入口保持可用。

- [ ] **Step 5: 运行货品测试和类型检查**

Run: `pnpm exec jest tests/views/goods --runInBand`

Run: `pnpm exec vue-tsc --noEmit`

Expected: 货品测试 PASS；不新增货品范围类型错误。

- [ ] **Step 6: 提交货品对齐**

```bash
git add src/views/goods tests/views/goods
git commit -m "feat: align goods management functionality"
```

### Task 4: 仓库管理语义合并

**Files:**
- Modify: `src/views/warehouse/WmsWarehouses*.{ts,vue}` and matching components
- Modify: `src/views/warehouse/WmsStorageZones*.{ts,vue}` and matching components
- Modify: `src/views/warehouse/WmsStorageLocations*.{ts,vue}` and matching components
- Create or modify tests under `tests/views/warehouse/`

**Interfaces:**
- Consumes: warehouse list API, zone list API, current status dictionaries and list-page hooks.
- Produces: warehouse CRUD/enable/disable, zone CRUD and warehouse selection, location CRUD and warehouse-to-zone cascading selection with edit echo.

- [ ] **Step 1: 写仓库—库区联动纯逻辑失败测试**

覆盖仓库改变时清空 `zoneId`、无仓库时返回空选项、API records 映射为 `{ label, value }`、编辑时按 `warehouseId` 加载库区。

- [ ] **Step 2: 运行仓库测试确认失败**

Run: `pnpm exec jest tests/views/warehouse --runInBand`

Expected: 新测试在实现前 FAIL。

- [ ] **Step 3: 修正仓库和库区定义**

沿用 `wms_status` 与后端状态语义，确保启停 API 参数方式一致；仓库与库区列表显示名称和字典文本，选择器支持搜索。

- [ ] **Step 4: 完成储位联动和回显**

储位表单加载仓库选项，仓库改变后加载对应库区；编辑时先加载已有仓库的库区再回填 `zoneId`。列表优先显示后端嵌套名称，缺失时回退到映射名称而不是裸 ID。

- [ ] **Step 5: 运行仓库测试和类型检查**

Run: `pnpm exec jest tests/views/warehouse --runInBand`

Run: `pnpm exec vue-tsc --noEmit`

Expected: 仓库测试 PASS；不新增仓库范围类型错误。

- [ ] **Step 6: 提交仓库对齐**

```bash
git add src/views/warehouse tests/views/warehouse
git commit -m "feat: align warehouse management functionality"
```

### Task 5: 监控大屏数据流对齐

**Files:**
- Modify: `src/views/dashboard/bigscreen/index.vue`
- Modify: `src/views/dashboard/bigscreen/api.ts`
- Modify: `src/views/dashboard/bigscreen/homePage/IndexBigscreen.vue`
- Create: `src/views/dashboard/bigscreen/bigscreenData.utils.ts`
- Test: `tests/views/dashboard/bigscreenData.utils.spec.ts`

**Interfaces:**
- Produces: `normalizeBigscreenList<T>(value: unknown): T[]` and zero-value fallbacks for card/chart inputs.
- Consumes: selected warehouse ID and existing `/bigscreen/*` API responses.

- [ ] **Step 1: 写大屏响应归一化失败测试**

```ts
expect(normalizeBigscreenList(undefined)).toEqual([]);
expect(normalizeBigscreenList({ records: [{ id: 1 }] })).toEqual([{ id: 1 }]);
expect(normalizeBigscreenList([{ id: 2 }])).toEqual([{ id: 2 }]);
```

- [ ] **Step 2: 运行测试确认失败**

Run: `pnpm exec jest tests/views/dashboard/bigscreenData.utils.spec.ts --runInBand`

Expected: FAIL because utility does not exist.

- [ ] **Step 3: 合并入口和请求数据流**

仓库选择变化触发全部卡片刷新；每个请求携带 warehouse ID。保留当前已启用的入库趋势请求，避免复制参考文件中被注释的错误实现。

- [ ] **Step 4: 增加逐卡片错误降级**

每个加载函数独立捕获异常并设置空数组或零值；一个请求失败不得阻断其他卡片。

- [ ] **Step 5: 运行大屏测试和类型检查**

Run: `pnpm exec jest tests/views/dashboard/bigscreenData.utils.spec.ts --runInBand`

Run: `pnpm exec vue-tsc --noEmit`

Expected: PASS and no new bigscreen type errors.

- [ ] **Step 6: 提交大屏对齐**

```bash
git add src/views/dashboard/bigscreen tests/views/dashboard
git commit -m "feat: align warehouse dashboard data flow"
```

### Task 6: 全量静态验收与联调准备

**Files:**
- Modify: `docs/superpowers/plans/2026-08-05-reference-frontend-alignment-report.md`
- Modify: only source files required to fix verification failures introduced by Tasks 2–5

**Interfaces:**
- Consumes: all completed tasks.
- Produces: verified frontend and a backend endpoint checklist.

- [ ] **Step 1: 运行全量单元测试**

Run: `pnpm exec jest --runInBand`

Expected: PASS.

- [ ] **Step 2: 运行类型检查**

Run: `pnpm exec vue-tsc --noEmit`

Expected: exit 0, or documented pre-existing errors with zero new errors in changed files.

- [ ] **Step 3: 运行生产构建**

Run: `pnpm build`

Expected: exit 0 and generated production bundle.

- [ ] **Step 4: 复核语义差异清单**

把所有 `missing` 项更新为已实现，并为 `current-enhancement`、`reference-defect` 和 `equivalent` 项保留证据说明；添加待联调 API 路径、方法和关键参数清单。

- [ ] **Step 5: 提交验收记录**

```bash
git add docs/superpowers/plans/2026-08-05-reference-frontend-alignment-report.md
git commit -m "test: verify frontend feature alignment"
```
