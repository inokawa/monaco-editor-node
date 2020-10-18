import { editor, ILineChange } from "monaco-editor-core";

export declare const colorizeElement = editor.colorizeElement;

export declare const colorize = editor.colorize;

export declare function getColorizeCss(themeName: string): string;

export declare function getBackgroundColor(themeName: string): string;

export declare const tokenize = editor.tokenize;

export declare function computeDiff(
  originalLines: string[],
  modifiedLines: string[]
): ILineChange[];
