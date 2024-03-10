import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import { userReducer, usersReducer, postReducer, postsReducer, appReducer } from "./reducers";

//const composeEnhancer = window.__REDUX_DEVTOOLS_RXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    user: userReducer,
    users: usersReducer,
    post: postReducer,
    posts: postsReducer,
    app: appReducer,
});

export const store = createStore(reducer, applyMiddleware(thunk));
