# Moriium Gallery Agent Instructions

## Scope and precedence

This file applies to the entire repository. Direct instructions from Morii take precedence. A more deeply nested `AGENTS.md` may override this file only for files in its own subtree.

`AGENTS.md` is the shared source of truth for Codex, Claude, and other coding agents. Keep agent-specific bridge files short and point them here instead of duplicating rules.

## Product contract

Moriium Gallery is a static website for displaying Morii's Japan-trip photographs.

The product has exactly two user-facing capabilities:

1. Display photographs.
2. Classify photographs through the main menu.

Responsive layout, accessibility, image optimization, navigation state, and static metadata are supporting implementation work, not new product features.

Do not add accounts, uploads, an admin panel, comments, likes, favorites, search, maps, timelines, shopping, social features, analytics, AI captions, a database, an API, or a server runtime unless Morii explicitly changes the product scope. If a request would cross this boundary, state the consequence and ask before implementing it.

Keep original photographs unchanged. Put thumbnails and optimized derivatives in separate generated locations. Do not expose private EXIF or GPS data without explicit approval. Do not generate or replace travel photographs with synthetic images unless Morii asks.

Do not choose or migrate a framework, add a dependency, or introduce a hosted service merely for convenience. First inspect the existing stack and solve the task with the smallest compatible change.

## Working protocol

1. Read the relevant files and inspect `git status` before editing.
2. Classify the task, then load the smallest skill set that fully covers it.
3. Preserve Morii's and the other agent's unrelated changes. Avoid broad rewrites and drive-by formatting.
4. Implement only the requested behavior. Keep category data in one source of truth and expose it only through the main menu.
5. Run fresh, task-relevant checks. Review the final diff and status before reporting completion.

Do not commit, push, publish, deploy, open a pull request, or change remote state unless Morii explicitly asks. Destructive operations and public exposure always require explicit approval.

## Skill routing

Use installed skills selectively. Prefer the smallest set of skills that covers the current task; do not invoke skills merely because they are available. Skills may be combined only when their responsibilities genuinely overlap.

For frontend work:

- Use design skills while making visual or interaction decisions.
- Use implementation skills while coding.
- Use review or audit skills while reviewing.
- Use debugging skills only while diagnosing a real failure or unexpected behavior.
- Use verification skills before claiming substantial work is complete.

For writing:

- Prefer `humanizer-zh` for natural Chinese prose.
- Prefer `writing-clearly-and-concisely` for general prose clarity.
- Use `documentation-writer` for technical documentation.
- Use `doc-coauthoring` only for substantial, collaborative document workflows.
- Never invoke `beautiful-prose` implicitly.

### Frontend and source skills

| Skill | Invoke when | Do not invoke when |
| --- | --- | --- |
| `frontend-design` | Creating a new interface or making meaningful decisions about visual direction, hierarchy, typography, composition, or art direction. | Implementing an already approved design, fixing a local bug, or changing nonvisual code. |
| `ui-ux-pro-max` | Designing or revising interaction, responsive behavior, accessibility, color, typography, navigation, or a coherent UI system. | A trivial CSS correction or a task with no UX decision. |
| `vercel-react-best-practices` | Writing, reviewing, or refactoring React or Next.js components, pages, data loading, image delivery, bundles, or performance. | The project is not using React/Next.js, or the task changes only prose or static assets. |
| `vercel-composition-patterns` | Designing reusable React APIs, correcting boolean-prop growth, or using compound components, context, render props, or component-family architecture. | A small ordinary component, a one-off page section, or any non-React task. |
| `web-design-guidelines` | Morii asks for a UI, UX, or accessibility audit, or an existing interface is being formally reviewed before release. | Initial design or routine implementation; it is an audit skill, not a default coding skill. |
| `source-driven-development` | A change depends on current or unfamiliar framework, library, browser, hosting, or third-party API behavior; a dependency is added or upgraded; authoritative correctness matters. | A self-contained local change follows an already verified project pattern and has no version-sensitive external behavior. |

### Engineering quality skills

| Skill | Invoke when | Do not invoke when |
| --- | --- | --- |
| `systematic-debugging` | A bug, failed test/build, regression, or unexplained behavior exists. Reproduce and identify the cause before editing. | Building a requested feature normally or speculating about failures that have not occurred. |
| `verification-before-completion` | Before claiming a substantial change is complete, fixed, passing, or ready. Run fresh checks and report their actual results. | Pure discussion with no completion claim. Small prose-only replies do not need a project verification run. |
| `code-review-and-quality` | Morii requests review, a pull request or merge is being prepared, or a risky/substantial diff needs formal multi-axis review. | During ordinary implementation before a review phase, or for a trivial isolated prose edit. |

### Writing skills

| Skill | Invoke when | Do not invoke when |
| --- | --- | --- |
| `writing-clearly-and-concisely` | Writing or materially revising human-facing documentation, explanations, reports, commit messages, error messages, or substantial UI copy. | Code-only changes or tiny labels whose wording is already supplied. |
| `documentation-writer` | Creating or restructuring technical tutorials, how-to guides, references, explanations, setup docs, or a substantive README. | A short status update, ordinary code comments, or a tiny correction in an established document. |
| `doc-coauthoring` | A substantial proposal, specification, decision record, or documentation set needs iterative context transfer, outline agreement, and reader verification. | A focused single-file edit with clear requirements. |
| `humanizer-zh` | Morii asks to naturalize, polish, or remove AI/translation tone from substantial Chinese prose. | English machine instructions, code, exact technical reference text, or ordinary short Chinese conversation. |
| `beautiful-prose` | Morii explicitly names it for English prose or rewriting. | Every implicit or routine project task. |

### Common combinations

- New or substantially redesigned gallery UI: `frontend-design` + `ui-ux-pro-max`; add `vercel-react-best-practices` only if the chosen stack is React/Next.js.
- Implement an approved React design: `vercel-react-best-practices`; add `vercel-composition-patterns` only when component API architecture is genuinely involved.
- UI/accessibility audit: `web-design-guidelines`; add `ui-ux-pro-max` only if the task also asks for redesign decisions.
- Bug or failed build: `systematic-debugging` first, then the relevant implementation skill, then `verification-before-completion`.
- Pre-merge or pull-request readiness: `code-review-and-quality` + `verification-before-completion`.
- Technical documentation: `documentation-writer`; add `writing-clearly-and-concisely` for substantive prose polishing, and `doc-coauthoring` only for a genuinely iterative document project.

Skills not listed above are not part of the default project workflow. Invoke one only when Morii explicitly names it or the task unambiguously matches its current description. Do not preload speculative skills.

## Design reference library

Enouia and collaborating agents may consult these sites when a task requires new visual or motion decisions. They are an inspiration index, not a checklist. Choose one primary reference category and browse no more than one to three relevant sites unless the first pass leaves a concrete design question unanswered.

| Need | Reference | Consult for |
| --- | --- | --- |
| Motion | [Landing Love](https://www.landing.love/) | Page transitions, scroll choreography, hover behavior, and restrained motion sequencing. |
| Aesthetic direction | [Land-book](https://land-book.com/) | Overall visual tone, typography, composition, and editorial gallery presentation. |
| Creative concepts | [Awwwards](https://www.awwwards.com/) | Unusual art direction and interaction ideas that can be simplified to fit this static gallery. |
| Refined finish | [One Page Love](https://onepagelove.com/) | Polished single-page composition, spacing, hierarchy, and concise presentation. |
| Bold or striking treatment | [Lapa Ninja](https://www.lapa.ninja/) | High-impact layouts, color treatment, and contemporary landing-page patterns. |
| Existing components | [21st.dev](https://21st.dev/) | Possible implementation starting points after checking stack compatibility, accessibility, dependencies, and license terms. |
| Design-led layouts | [SiteInspire](https://www.siteinspire.com/) | Design-focused websites with strong grids, image pacing, typography, and art direction. |

Reference use must follow these rules:

- Extract principles, not proprietary layouts, code, copy, photographs, or branded assets.
- Keep Morii's photographs dominant. Do not let an admired reference add product features outside the product contract.
- For motion, preserve keyboard usability, reduced-motion behavior, stable layout, and reasonable loading cost.
- Treat `21st.dev` as external code. Do not install or paste a component until its license, dependencies, accessibility, and compatibility with the detected stack are verified. Dependency approval rules still apply.
- Record the selected references and the specific decisions they informed in the handoff. Do not cite an unvisited site as design evidence.

## Gallery quality gates

Apply only the checks relevant to the current change, but do not claim release readiness without confirming all applicable items:

- The production output is static and has no accidental server or runtime API dependency.
- Every category is reachable from the main menu, and every menu entry resolves to valid gallery content.
- Images preserve their intended aspect ratio, declare stable dimensions where the stack permits, and use responsive or optimized delivery without modifying originals.
- Above-the-fold and below-the-fold loading choices avoid obvious layout shift and unnecessary transfer.
- Menu and gallery controls work with keyboard input, visible focus, semantic markup, useful alternative text, and reduced-motion preferences where motion exists.
- The layout is usable at narrow mobile and wide desktop widths.
- Configured format, type, lint, test, and production-build commands pass.
- The final diff contains no unrelated generated files, secrets, private metadata, or accidental feature expansion.

If the repository does not yet provide a relevant check, say so instead of pretending it passed.

## Codex and Claude collaboration

- Read this file before starting work and re-check it when scope changes.
- Inspect the working tree before editing. Treat unfamiliar changes as another contributor's work unless proven otherwise.
- Never discard, reset, overwrite, or silently reformat another contributor's changes.
- Keep changes small and leave a clear handoff: changed files, decisions, verification performed, and unresolved risks.
- Do not duplicate these instructions in `CLAUDE.md`; that file is only a bridge to this source of truth.
- Credit only agents and people who materially contributed to the commit.

## Git and GitHub attribution

GitHub contribution credit depends on a commit author or `Co-authored-by` email that is associated with the credited GitHub account. A display name alone is insufficient.

Use these approved contributor identities:

- Codex: `Co-authored-by: Codex <267193182+codex@users.noreply.github.com>` — [GitHub profile](https://github.com/codex)
- Claude: `Co-authored-by: Claude <noreply@anthropic.com>` — [GitHub profile](https://github.com/claude)

When Morii asks for a commit:

1. Review the staged diff and use the repository's configured human author unless Morii requests another author.
2. Add the Codex trailer when Codex materially contributed to that commit.
3. Add the Claude trailer when Claude materially contributed to that commit. Add both when both contributed.
4. Do not duplicate a trailer that an agent or commit tool already added. Do not credit an agent that did not contribute to the committed diff.
5. After committing, verify the exact message and trailers with `git show -s --format=fuller HEAD` before reporting success.
6. After the first push that uses each identity, verify on GitHub that the commit links to the intended profile. If GitHub does not link it, stop reusing that address until the attribution rule is corrected.
