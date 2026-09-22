# Agent Note: NebulaSeek brand overlay

Status: implemented

English | [中文](2026-09-22-nebulaseek-brand-overlay.zh.md)

## Problem

This distribution must present NebulaSeek branding while continuing to take community DeepSeek Harness updates with little conflict. Renaming package scopes, environment variables, commands, persisted identifiers, or plugin contracts would turn a presentation change into a permanent fork of upstream runtime behavior.

## Decision

Keep community code and technical contracts intact. Apply the downstream identity only to shipped user-facing surfaces: the sidebar and conversation hero, browser metadata, desktop application and installer text, icons, the CLI description, onboarding and error copy, and the public repository README.

Sidebar wordmarks display “星云寻知” in Simplified Chinese, “星雲尋知” in Traditional Chinese, and `NebulaSeek` in English. Window titles, installers, application filenames, and installation paths remain `NebulaSeek`; project components remain `NebulaSeek Harness` and `NebulaSeek Desktop`. Commands, package scopes, environment variables, plugins, storage, protocols, and service identifiers retain upstream contracts; DeepSeek model and community upstream names retain their actual names.

Brand assets keep their upstream filenames when the filename is an internal build input. The official brand plugin owns the sidebar and conversation hero marks, so generic UI packages need no downstream changes.

## Upstream sync workflow

1. Fetch the community remote and reset or rebase the downstream branch onto the selected upstream commit.
2. Reapply the single NebulaSeek branding commit. Resolve conflicts only in the documented presentation surfaces.
3. Review the diff for changes outside those surfaces and remove accidental internal renames.
4. Run the focused brand, locale, packaging, type, and documentation checks before publishing the downstream commit.

## Alternatives considered

**A repository-wide replacement of DeepSeek Harness.** Rejected because it changes technical contracts and creates recurring conflicts without changing what users see.

**Renaming package scopes, commands, environment variables, and persisted identifiers.** Rejected because those names are compatibility boundaries shared with plugins, scripts, stored data, and Desktop.

**Maintaining a separate copy of generic UI components.** Rejected because the upstream slot system already provides one owner for distribution branding.

## Consequences

Users see NebulaSeek throughout the distributed application, while plugins and integrations continue to use upstream contracts. Future syncs should normally touch only this overlay and any newly added user-facing upstream surface. If upstream changes a technical identifier, adopt it as an upstream migration rather than as part of branding.

## Testing

The official brand plugin test covers the sidebar and conversation hero registrations and the rendered wordmark. Locale, installer, manifest, package, and onboarding tests pin the other visible names. Type checking and the documentation pairing gate protect the shared interfaces and the bilingual policy record.
