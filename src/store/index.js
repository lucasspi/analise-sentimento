import { createStore } from 'redux';

const INITIAL_STATE = {
    name: ""
};

// COMO A CRIEI APENAS PARA FINS DEMONSTRATIVOS, NÃO SEPAREI O REDUCER EM OUTRO ARQUIVO

function courses(state = INITIAL_STATE, action) {
    console.log('USER_NAME', action);
    switch (action.type) {
        case 'USER_NAME':
            return { ...state, name: action.name };
        default:
            return state;
    }
}

const store = createStore(courses);

export default store;