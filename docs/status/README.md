# 手动生成项目状态快照

这是本地进度记录，供 Morii 阅读并手动导入 Moriium Dashboard。沿用现有 Git 记录和仓库资料，不接入网站运行流程，不添加依赖或自动任务。

## 如何使用

首次基线已按本次请求生成。此后在本仓库的 Agent 对话中输入：

> 生成项目状态快照

Agent 按下述流程同步更新 [PROJECT_STATUS.md](./PROJECT_STATUS.md) 与 [project-status.json](./project-status.json)。Morii 随后将 JSON 文件手动导入 Dashboard。生成快照不包含提交、推送、发布或部署授权；这里也不实现 Dashboard 导入器。

平时开发、启动项目、修改照片或收到其他任务时，不刷新这两份文件，不改快照时间。快照描述生成时的状态，后续工作不会自动反映在其中。

## 每次生成的流程

1. 读取 `AGENTS.md`、上次快照、现有计划/记录、相关源码、部署配置、Git 状态与提交历史；复用既有材料，遵守仓库边界。
2. 记录当前分支、完整 HEAD 提交和带时区的生成时间；无法取得的信息留空。HEAD 不代表未提交内容，工作区差异须在依据和中文总结中明确说明。
3. 区分上线必需、后续集成和可选优化。Gallery 可独立首发，MoriMeta 联动未完成不能自动成为上线阻碍。
4. 按下列协议写 JSON，并同步写约 500–800 中文字的总结。原地更新这对文件；里程碑 `id` 在同一事项存续期间保持稳定。
5. 只核对 JSON 语法、协议字段/枚举、依据、文档链接与两份记录的一致性。不运行测试、类型检查、构建、开发服务或部署；`tests_rerun` 固定为 `false`。不查询线上状态，不读取密钥、原片私密元数据或修改业务源码。
6. 简短告知记录位置、手动触发方式及离上线还缺什么。不得把生成快照表述为上线检查通过。

## Project Status Protocol v1

只使用以下字段，不添加 Gallery 专用字段或修改枚举。文件为 UTF-8 JSON；完整实例见 [首份基线](./project-status.json)。

| 字段 | 约束 |
| --- | --- |
| `schema_version` | 固定为 `"1.0"` |
| `project_id` | 固定为 `"moriium.gallery"` |
| `project_name` | 固定为 `"Moriium Gallery"` |
| `snapshot_at` | ISO 8601 字符串，必须带时区 |
| `source` | 对象，恰含 `branch`、`commit_sha`、`basis`、`tests_rerun`；分支/提交未知为 `null`；依据为字符串数组，缺失为 `[]`；`tests_rerun` 固定为 `false` |
| `stage` | `planning / development / integration / acceptance / launch_preparation / live / maintenance / paused / unknown` |
| `summary` | 最多 160 字中文摘要 |
| `overall_progress` | 有明确计算依据的 0–100 数值，缺少依据为 `null` |
| `milestones` | 对象数组，每项恰含下文规定的六个字段 |
| `blockers` | 对象数组，每项恰含 `title`、`impact` |
| `next_actions` | 对象数组，每项恰含 `title`、`priority`、`result`；优先级为 `P0 / P1 / P2`，通常最多三项 |
| `needs_morii` | 对象数组，每项恰含 `decision` |

每个里程碑包含：

- `id`：稳定字符串；`title`：事项标题。
- `status`：`not_started / in_progress / blocked / done / unknown`。
- `evidence_level`：`self_report / repository / existing_test / morii_accepted / unknown`。
- `evidence_refs`：文件、提交或可复查记录的字符串数组；缺失为 `[]`。
- `human_acceptance`：`pending / accepted / rejected / not_required / unknown`。

没有里程碑、阻碍、下一步或待决事项时保留对应的 `[]`，不要删字段。未知的阶段、里程碑状态、证据等级和验收状态使用 `unknown`，不要猜测。

## 证据与验收怎么记

Agent 总结只能支撑 `self_report`；可复查的源码或提交支撑 `repository`，不代表行为已检查或 Morii 已验收。只有能指出既有检查输出、适用版本和检查范围时，才使用 `existing_test`，并说明它是历史证据，本次没有重跑。

`morii_accepted` 和 `accepted` 必须有 Morii 对相应范围的明确验收记录。“已提交”“代码存在”“Agent 说完成”均不能替代人工验收。尚待正式验收可写 `pending`；无法判断写 `unknown`。

`live` 必须有可复查的发布及在线确认记录；本流程不做实时探测，历史发布也不能证明此刻在线。仓库没有部署或联动记录，只能说当前资料未见，不能断言仓库外没有相关工作。

## 当前基线的边界

基线同时说明 HEAD 中的六个摄影集（96 张）与工作区的洛北 22 张及既有微调。未提交内容不记为已发布、已验收或新提交。本次没有改动照片、图片处理、UI 或主要业务逻辑，没有建立自动同步。

状态文件不写密钥、凭据、私密 EXIF/GPS 或原片位置；生产信息只记录可公开的配置概要。后续实际检查与部署应由 Morii 另行安排。

