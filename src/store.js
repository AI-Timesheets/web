import Vuex from 'vuex';
import Vue from 'vue';
import $axios from './api.js';
import Cookies from 'js-cookie';

const AuthMutations = {
    SetToken: 'setToken',
    SetUser: 'setUser',
};

const AuthActions = {
}

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        token: null,
        user: null,
    },
    getters: {
        token (state) {
            return state.token;
        },
        user (state) {
            return state.user;
        },
        loggedIn (state) {
            return state.user !== null;
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token;

            console.log(state);

            if (state.token) {
                Cookies.set("authorization", token);
            } else {
                Cookies.remove("authorization");
            }
        },
        setUser(state, user) {
            state.user = user;
        }
    }
});


export {
    AuthActions,
    AuthMutations,
    store,
}
