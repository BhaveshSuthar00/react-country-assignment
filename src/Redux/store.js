import {createStore} from 'redux'
import {DataReducer} from './reducer'
export const store = createStore(
    DataReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)