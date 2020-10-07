# monaco-editor-node

![check](https://github.com/inokawa/monaco-editor-node/workflows/check/badge.svg)

Wrapper of [monaco-editor](https://github.com/microsoft/monaco-editor) to use some functionalities in Node.js.

The bundle size is much smaller than original.

## Install

```
npm install monaco-editor-node
```

## Usage

```javascript
import * as monaco from "monaco-editor-node";

monaco.colorize(
`h1 {
  font-size: 2.5em;
}
`, "text/css", {}).then((text) => {
  console.log(text);
});

console.log(monaco.getColorizeCss('vs'));
```

## Features

- [x] [colorizeElement](https://microsoft.github.io/monaco-editor/api/modules/monaco.editor.html#colorizeelement)
- [x] [colorize](https://microsoft.github.io/monaco-editor/api/modules/monaco.editor.html#colorize)
- [x] `getColorizeCss(themeName: string): string`
  - Get CSS text which includes classes to colorize HTML created with `colorizeElement`/`colorize`. Theme names defined in monaco editor (`vs`, `vs-dark`, `hc-black`) will work.
- [x] [tokenize](https://microsoft.github.io/monaco-editor/api/modules/monaco.editor.html#tokenize)
