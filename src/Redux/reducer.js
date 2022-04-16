import {ADD_USER} from './action'
const initState = {
    data : JSON.parse(localStorage.getItem('data')) || [],
}
export const DataReducer = (store = initState, {type , payload})=>{
    switch (type) {
        case ADD_USER : 
        return {...store, data : payload}
        default:
            return store
    }
};