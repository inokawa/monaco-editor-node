import { JSDOM } from "jsdom";

const tmp = new JSDOM("<!DOCTYPE html><html><body></body></html>");
global.document = tmp.window.document;
global.navigator = tmp.window.navigator;
global.self = global;
global.document.queryCommandSupported = function () {
  return false;
};
global.window = { location: {}, navigator: tmp.window.navigator };
