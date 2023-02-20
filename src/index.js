import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Windmill } from "@windmill/react-ui";
import "./assets/css/custom.css";
import "./assets/css/tailwind.css";
import "./assets/css/tailwind.output.css";
import "@pathofdev/react-tag-input/build/index.css";
import App from "./App";
import myTheme from "./assets/theme/myTheme";
import { AdminProvider } from "./context/AdminContext";
import { SidebarProvider } from "./context/SidebarContext";
import ThemeSuspense from "./components/theme/ThemeSuspense";
// import * as serviceWorker from './serviceWorker';

// if (process.env.NODE_ENV !== "production") {
//   const axe = require("react-axe");
//   axe(React, ReactDOM, 1000);
// }

ReactDOM.render(
  <AdminProvider>
    <SidebarProvider>
      {/* <React.StrictMode> */}
      <Suspense fallback={<ThemeSuspense />}>
        <Windmill usePreferences theme={myTheme}>
          <App />
        </Windmill>
      </Suspense>
      {/* </React.StrictMode> */}
    </SidebarProvider>
  </AdminProvider>,

  document.getElementById("root")
);
