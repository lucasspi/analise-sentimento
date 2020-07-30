import { createStore } from 'redux';

const INITIAL_STATE = {
    name: "",
    list: [],
    humor: ""
};

// COMO A CRIEI APENAS PARA FINS DEMONSTRATIVOS, NÃO SEPAREI O REDUCER EM OUTRO ARQUIVO
function courses(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'USER_NAME':
            return { ...state, name: action.name };
        case 'TWITTER_LIST':
            return { ...state, list: action.list };
        case 'HUMOR':
            return { ...state, humor: action.humor };
        default:
            return state;
    }
}

const store = createStore(courses);

export default store;