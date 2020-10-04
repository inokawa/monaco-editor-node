# monaco-editor-node

Wrapper of [monaco-editor](https://github.com/microsoft/monaco-editor) to use some functionalities in Node.js.

## Install

```
npm install monaco-editor-node
```

### Usage

```
import * as monaco from "monaco-editor-node";

monaco.colorize(
`h1 {
  font-size: 2.5em;
}
`, "text/css", {}).then((text) => {
  console.log(text);
});
```

## Features

- [x] [colorize](https://microsoft.github.io/monaco-editor/api/modules/monaco.editor.html#colorize)
- [ ] [tokenize](https://microsoft.github.io/monaco-editor/api/modules/monaco.editor.html#tokenize)
