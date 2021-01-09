# monaco-editor-node

![npm](https://img.shields.io/npm/v/monaco-editor-node) ![check](https://github.com/inokawa/monaco-editor-node/workflows/check/badge.svg)

Wrapper of [monaco-editor](https://github.com/microsoft/monaco-editor) to use some functionalities in Node.js.

The bundle size is much smaller than original.

## Install

```
npm install monaco-editor-node
```

## Usage

```javascript
import * as monaco from "monaco-editor-node";

monaco
  .colorize(
    `h1 {
  font-size: 2.5em;
}
`,
    "text/css",
    {}
  )
  .then((text) => {
    console.log(text);
  });

console.log(monaco.getColorizeCss("vs"));
```

## Features

- [colorizeElement](https://microsoft.github.io/monaco-editor/api/modules/monaco.editor.html#colorizeelement)
- [colorize](https://microsoft.github.io/monaco-editor/api/modules/monaco.editor.html#colorize)
- `getColorizeCss(themeName: string): string`
  - Get CSS text which includes classes to colorize HTML created with `colorizeElement`/`colorize`. Theme names defined in monaco editor (`vs`, `vs-dark`, `hc-black`) will work.
- `getBackgroundColor(themeName: string): string`
  - Get background color of editor. Theme names defined in monaco editor (`vs`, `vs-dark`, `hc-black`) will work.
- [tokenize](https://microsoft.github.io/monaco-editor/api/modules/monaco.editor.html#tokenize)
- `computeDiff(originalLines: string[], modifiedLines: string[]): ILineChange[]`
  - Get computed diff information from 2 texts splited into arrays by line break.
  - [ILineChange](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ilinechange.html)
