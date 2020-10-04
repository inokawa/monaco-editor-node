import { Colorizer } from "monaco-editor-core/esm/vs/editor/standalone/browser/colorizer";
import { ModeServiceImpl } from "monaco-editor-core/esm/vs/editor/common/services/modeServiceImpl";

export const colorize = (...args) => {
  return Colorizer.colorize(new ModeServiceImpl(), ...args);
};
