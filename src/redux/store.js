import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';

import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas';

import modalReducer from './reducers/modalReducer';
import sessionReducer from './reducers/sessionReducer';
import balanceDisplayerReducer from './reducers/balanceDisplayerReducer';
import httpReducer from './reducers/httpReducer';

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
    modalReducer,
    sessionReducer,
    httpReducer,
    balanceDisplayerReducer,
});

const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
