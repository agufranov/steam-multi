import React from "react";
import { render } from "react-dom";
import DevTools from "mobx-react-devtools";

import PlayerInput from "./components/PlayerInput";
import AppModel from "./models/AppModel";
import TodoModel from "./models/TodoModel";

const store = new AppModel();

render(
  <div>
    <DevTools />
    <PlayerInput store={store} />
  </div>,
  document.getElementById("root")
);

// playing around in the console
window.store = store;
