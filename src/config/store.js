import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null
    },
    mutations: {
        toggleMenu(state, isVisible) {
            if (!state.user) {
                state.isMenuVisible = false;
                return;
            }

            if (isVisible === undefined)
                state.isMenuVisible = !state.isMenuVisible;
            else state.isMenuVisible = isVisible;
        },
        setUser(state, data) {
            state.user = data;
            if (data) {
                axios.defaults.headers.common["Authorization"] = data.token;
            } else {
                delete axios.defaults.headers.common["Authorization"];
            }
        }
    }
});
