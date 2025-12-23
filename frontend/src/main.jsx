import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { EmployeeTimeProvider } from "./context/employeeTimeContext.jsx";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import store from "./redux/store.js";

const persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <EmployeeTimeProvider>
          <App />
          <ToastContainer position="top-center" />
        </EmployeeTimeProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
