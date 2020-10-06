import * as monaco from "monaco-editor-node";

const cssText = `@import url("something.css");

body {
  margin: 0;
  padding: 3em 6em;
  font-family: tahoma, arial, sans-serif;
  color: #000;
}

#navigation a {
  font-weight: bold;
  text-decoration: none !important;
}

h1 {
  font-size: 2.5em;
}

h2 {
  font-size: 1.7em;
}

h1:before, h2:before {
  content: "some contents";
}

code {
  font-family: courier, monospace;
  font-size: 80%;
  color: #418A8A;
}
`;

describe("colorize", () => {
  it("css", () => {
    return monaco.colorize(cssText, "text/css", {}).then((res) => {
      expect(res).toMatchSnapshot();
    });
  });
});

describe("getCss", () => {
  it("default", () => {
    expect(monaco.getCss()).toMatchSnapshot();
  });
});

describe("tokenize", () => {
  it("css", () => {
    expect(monaco.tokenize(cssText, "text/css")).toMatchSnapshot();
  });
});
