# monaco-editor-node

![check](https://github.com/inokawa/monaco-editor-node/workflows/check/badge.svg)

Wrapper of [monaco-editor](https://github.com/microsoft/monaco-editor) to use some functionalities in Node.js.

## Install

```
npm install monaco-editor-node
```

## Usage

```
import * as monaco from "monaco-editor-node";

monaco.colorize(
`h1 {
  font-size: 2.5em;
}
`, "text/css", {}).then((text) => {
  console.log(text);
});

console.log(monaco.getCss());
```

## Features

- [x] [colorizeElement](https://microsoft.github.io/monaco-editor/api/modules/monaco.editor.html#colorizeelement)
- [x] [colorize](https://microsoft.github.io/monaco-editor/api/modules/monaco.editor.html#colorize)
- getCss
  - Get CSS text which includes classes to colorize HTML created with `colorizeElement`/`colorize`.
- [x] [tokenize](https://microsoft.github.io/monaco-editor/api/modules/monaco.editor.html#tokenize)
