import { colorize as monacoColorize } from "monaco-editor-core/esm/vs/editor/standalone/browser/standaloneEditor";

export const colorize = (...args) => {
  return monacoColorize(...args);
};
