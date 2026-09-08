# Agent Note: The shipped brand becomes 星云寻知 and drops "Harness" from user-facing copy

Status: implemented

English | [中文](2026-09-08-xingyunxunzhi-brand.zh.md)

## Problem

This repository is a downstream distribution, but every brand surface still carried DeepSeek's identity: the sidebar and hero rendered the upstream whale mark, the wordmark spelled the upstream name in vector letterforms, both favicons and the web manifest shipped the whale, and 526 prose occurrences across docs, CLI descriptions, the system-prompt identity line, and recorded snapshots read "DeepSeek Harness". [`BRAND_GUIDELINES.md`](../../../../BRAND_GUIDELINES.md) itself states that "DeepSeek Harness" is a registered trademark and that downstream projects must not use it in their names, so leaving those surfaces in place was also a licensing problem, not only a cosmetic one.

The npm scope, the `dsh` command, the `DSH_*` environment variables, and the `deepseek_harness` Python module are a different kind of name: they resolve published artifacts and importing consumers, and renaming them requires republishing under names this project does not own.

## Decision

Brand surfaces move to 星云寻知 / Xingyunxunzhi; distribution identifiers do not. The product name carries no suffix: it is 星云寻知, not 星云寻知 Harness, and the lockup ends at the name.

User-facing copy names the component 内核 / 內核 / Core rather than Harness — the welcome dialog and the root README's category line. Code identifiers (`HarnessError`, `HarnessClient`, `makeHarness`, `harness.run`, `HARNESS_HOME`), directory names, and the `xingyunxunzhi-harness` repository name keep the technical term, because renaming them is a breaking API change with no brand-visibility gain.

[`BrandLogo`](../../../../packages/client/ui-primitives/src/BrandLogo.tsx) replaces `FishLogo` and carries the artwork's own two gradients rather than riding `currentColor`, because the mark must hold one identity on light and dark surfaces. Both gradients take `useId` ids, so the sidebar's two render sites and the hero cannot collide. [`BrandWordmark`](../../../../packages/client/ui-primitives/src/BrandWordmark.tsx) draws the name as `<text>` over the same geometry instead of baked letterforms, and drops the filled product badge that closed the upstream lockup; the name is a module constant, marking it as wordmark lettering rather than copy a locale dictionary owns.

The [hero](../../../../packages/client/ui-conversation/src/client/skeleton/EmptyHero.tsx) fallback drops its SMIL swim morph. The morph targets were hand-derived deformations of the fish geometry — a tail wag and a fin flutter — and have no meaning on a cloud. The stylesheet's hover sway survives as `hero-mark-float`, so hovering still animates.

Prose replacement is locale-aware per line: a line containing CJK takes `星云寻知`, every other line takes `Xingyunxunzhi`. Recorded snapshots receive the same substitution, keeping them consistent with the system-prompt and Web GUI strings they capture.

`BRAND_GUIDELINES` is rewritten as this project's own guidance plus an upstream-attribution section that names the MIT origin, disclaims affiliation, and records why the upstream identifiers are retained.

## Alternatives considered

- Rename the npm scope, `dsh`, and `deepseek_harness` too: this project cannot publish under `@deepseek-ai`, and the rename would break every importing consumer for no brand-visibility gain, since none of those names appear in the UI.
- Keep `FishLogo` as the export name with new artwork: the name would then describe nothing in the file.
- Recolor the new mark to `currentColor` for consistency with the icon set: the gradient is the brand, and the icon set's rule exists so glyphs inherit surrounding ink, which a logo should not.
- Repoint the upstream Discord and WeCom community links at this project: they are upstream's channels and their QR images are served from `cdn.deepseek.com`. The section is removed instead.

## Consequences

`FishLogo`, `FISH_LOGO_PATH`, and `FISH_LOGO_VIEWBOX` are gone from the `dsh-client-ui-primitives` barrel; consumers use `BrandLogo` and the `BRAND_LOGO_*` constants. The wordmark's intrinsic width changes from 182 to 100 (72 without the mark), so any layout that hard-codes those numbers needs rechecking.

[`sidebar-snapshot.client.spec.tsx.snap`](../../../../packages/client/ui-sidebar/tests/__snapshots__/sidebar-snapshot.client.spec.tsx.snap) was re-recorded: the brand mark is now 24x24 on `viewBox="0 0 50 50"` at all three render sites.

Three specs pinned copy this change moved and were updated with it: the welcome notice's English body, and the doc-site projection's home heading and llms.txt title. The two locale homes no longer share one heading, so that assertion now checks each route against its own brand form.

`pnpm run test` passes at 19232/19620 with three failing files, none of them touched here: `code-runtime-python` needs CPython 3.10 or newer and the host offers 3.9.6, and `spawn-runner` exercises Windows PATH semantics. `typecheck`, `lint`, `doc-sync`, `test:snapshot`, and `test:expected` remain unrun.

`LICENSE` keeps its upstream copyright, and the DeepSeek model provider's identifiers — `DeepSeekAdapter`, `deepseek-official`, `web-search-deepseek`, `DEEPSEEK_API_KEY` — are untouched, because they name a model service rather than this product.
