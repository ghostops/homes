import Vue from 'vue';
import Vuex from 'vuex';
import { HomesApi } from '@/lib/api';

Vue.use(Vuex);

const API = new HomesApi('http://localhost:8000');

export interface AppState {
    homes: IHome[],
};

export default new Vuex.Store<AppState>({
    state: {
        homes: [],
    },
    mutations: {
        loadHomes: async (state) => {
            const homes = await API.getAllHomes();

            state.homes = homes;
        },
    },
    actions: {

    },
    modules: {
    },
});
