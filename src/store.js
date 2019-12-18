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

const CompanyMutations = {
    SetCompany: 'setCompany',
}

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        token: null,
        user: null,
        company: null,
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
        },
        company (state) {
            return state.company;
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token;

            if (state.token) {
                Cookies.set("authorization", token);
            } else {
                Cookies.remove("authorization");
            }
        },
        setUser(state, user) {
            state.user = user;
        },
        setCompany(state, company) {
            state.company = company;
        }
    }
});


export {
    AuthActions,
    AuthMutations,
    CompanyMutations,
    store,
}
