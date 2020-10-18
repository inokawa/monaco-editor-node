import "./globals";
import { StaticServices } from "monaco-editor-core/esm/vs/editor/standalone/browser/standaloneServices";
import { Colorizer } from "monaco-editor-core/esm/vs/editor/standalone/browser/colorizer";
import { tokenize as monacoTokenize } from "monaco-editor-core/esm/vs/editor/standalone/browser/standaloneEditor";
import { generateTokensCSSForColorMap } from "monaco-editor-core/esm/vs/editor/common/modes/supports/tokenization";
import { DiffComputer } from "monaco-editor-core/esm/vs/editor/common/diff/diffComputer";
import { editorBackground } from "monaco-editor-core/esm/vs/platform/theme/common/colorRegistry";
import "monaco-languages/release/esm/monaco.contribution";

export function colorizeElement(...args) {
  return Colorizer.colorizeElement(
    StaticServices.standaloneThemeService.get(),
    StaticServices.modeService.get(),
    ...args
  );
}

export function colorize(...args) {
  return Colorizer.colorize(StaticServices.modeService.get(), ...args);
}

export function getColorizeCss(themeName) {
  const theme = StaticServices.standaloneThemeService
    .get()
    ._knownThemes.get(themeName);
  if (!theme) return "";
  return generateTokensCSSForColorMap(theme.tokenTheme.getColorMap());
}

export function getBackgroundColor(themeName) {
  const theme = StaticServices.standaloneThemeService
    .get()
    ._knownThemes.get(themeName);
  if (!theme) return "";
  return theme.getColor(editorBackground).toString();
}

export function tokenize(...args) {
  return monacoTokenize(...args);
}

export function computeDiff(originalLines, modifiedLines) {
  return new DiffComputer(originalLines, modifiedLines, {
    shouldComputeCharChanges: true,
    shouldPostProcessCharChanges: true,
    shouldIgnoreTrimWhitespace: true,
    maxComputationTime: 5000,
  }).computeDiff();
}
