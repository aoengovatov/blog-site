import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter } from "react-router-dom";
import { Blog } from "./Blog.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Provider store={store}>
            <Blog />
        </Provider>
    </BrowserRouter>
);
