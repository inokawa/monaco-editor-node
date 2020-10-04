import "./globals";
import { StaticServices } from "monaco-editor-core/esm/vs/editor/standalone/browser/standaloneServices";
import { Colorizer } from "monaco-editor-core/esm/vs/editor/standalone/browser/colorizer";
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
