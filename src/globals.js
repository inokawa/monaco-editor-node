import Window from "window-mock";
const mockWindow = new Window();

global.document = mockWindow.document;
global.navigator = mockWindow.navigator;
global.self = global;
global.document.queryCommandSupported = function () {
  return false;
};
global.window = { location: {}, navigator: mockWindow.navigator };
