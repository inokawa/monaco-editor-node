import "./globals";
import { StaticServices } from "monaco-editor-core/esm/vs/editor/standalone/browser/standaloneServices";
import { Colorizer } from "monaco-editor-core/esm/vs/editor/standalone/browser/colorizer";
import { tokenize as monacoTokenize } from "monaco-editor-core/esm/vs/editor/standalone/browser/standaloneEditor";
import { generateTokensCSSForColorMap } from "monaco-editor-core/esm/vs/editor/common/modes/supports/tokenization";
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

export function tokenize(...args) {
  return monacoTokenize(...args);
}
