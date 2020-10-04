import "./globals";
import { Colorizer } from "monaco-editor-core/esm/vs/editor/standalone/browser/colorizer";
import { ModeServiceImpl } from "monaco-editor-core/esm/vs/editor/common/services/modeServiceImpl";
import "monaco-languages/release/esm/monaco.contribution";

const ModeService = new ModeServiceImpl();

export function colorize(...args) {
  return Colorizer.colorize(ModeService, ...args);
}
