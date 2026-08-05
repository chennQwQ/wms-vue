# 参考前端语义差异与验收报告

## 对齐结论

| 模块 | 判定 | 处理 |
| --- | --- | --- |
| 货主 | current-enhancement | 当前字段、状态字典和文件展示不低于参考实现，保留 |
| 商品分类 | current-enhancement | 当前使用 JeecgBoot 根节点/子节点 API、树选择和编辑回显，已有 API 契约测试 |
| 商品品牌 | current-enhancement | 保留当前图片上传、预览和 URL 兼容修复 |
| 商品 | missing → implemented | 恢复批量选择条码打印，保留高级查询、图片入口和批次模块 |
| 商品图片 | current-enhancement | 保留相对/绝对/HTTPS URL 规范化与测试 |
| 承运商 | equivalent | 当前新增文件与参考 CRUD、导入导出、批量操作一致 |
| 包装材料 | equivalent | 当前新增文件与参考 CRUD、导入导出、批量操作一致 |
| 仓库 | current-enhancement | 当前启用/禁用 API 参数方式和列表行为更完整，保留 |
| 库区 | current-enhancement | 当前包含仓库名称映射、可搜索选择和启停能力，保留 |
| 储位 | missing → implemented | 补齐仓库查询、仓库—库区级联、编辑回显和储位条码打印 |
| 监控大屏 | reference-defect + hardened | 参考代码仅实现待办接口，其余接口为空；保留界面并增加仓库参数、响应归一化、空引用保护和失败降级 |

## 明确不复制的参考缺陷

- 商品打印中的示例数据、未使用 Lodop 分支、调试日志和硬编码远程 CSS。
- 储位列表中指向商品权限且调用未定义 `print` 的按钮。
- 大屏把 `/bigscreen/todo-tasks` 响应误作入库趋势，以及未实现的出库趋势/排行榜请求。
- 各生成页面中的无效导入、纯格式差异和已被当前实现替代的裸 ID 输入。

## 自动化验证

- Jest 基线：4 suites / 8 tests 通过。
- 新增测试：条码打印 4 项、储位选项 2 项、大屏归一化 1 项。
- Vite production build：通过。
- `vue-tsc`：默认栈在 TypeScript 4.9.5 上溢出；提高栈后发现项目历史遗留约 3000 项全局类型错误。已修复首个阻断解析的 `MyComment.vue` 空 `v-show`，本次新增纯函数由 ts-jest 完成类型校验，改动页面由 Vite SFC 编译通过。全项目类型债务不属于参考前端三个模块的可控范围。

## 后端联调清单

- 商品、储位条码打印为纯前端能力，只需确认列表响应包含条码和名称字段。
- 储位联动：`GET /warehouse/wmsWarehouses/list`、`GET /warehouse/wmsStorageZones/list?warehouseId=...`。
- 商品分类树：root、child、loadTreeRoot、loadTreeChildren 端点已有契约测试。
- 大屏：`GET /bigscreen/todo-tasks?warehouseId=...`；后端当前未提供入库趋势、出库趋势和货主排行端点，需要联调阶段确认接口设计后接入。
