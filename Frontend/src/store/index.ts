import Vue from 'vue';
import Vuex from 'vuex';
import { HomesApi } from '@/lib/api';

Vue.use(Vuex);

const API = new HomesApi('http://localhost:8000');

interface LatLng {
    lat: number;
    lng: number;
}

type CreateHomeStage = 'not' | 'coords' | 'info' | 'done';

export interface AppState {
    homes: IHome[];
    selectedHome: IHome | null;

    createNewHome: CreateHomeStage;
    newHomeCoords: LatLng | null;
    newHomeName: string | null;
}

export default new Vuex.Store<AppState>({
    state: {
        homes: [],
        selectedHome: null,
        createNewHome: 'not',
        newHomeCoords: null,
        newHomeName: null,
    },
    mutations: {
        loadHomes: async (state) => {
            const homes = await API.getAllHomes();

            state.homes = homes;
        },
        selectHome: (state, home: IHome) => {
            state.selectedHome = home;
        },
        setCreateNewHome: (state, value: CreateHomeStage) => {
            if (value === 'not') {
                state.newHomeCoords = null;
                state.newHomeName = null;
            }

            state.createNewHome = value;
        },
        setNewHomeCoords: (state, { lat, lng }: LatLng) => {
            state.newHomeCoords = { lat, lng };
        },
        setNewHomeName: (state, name: string) => {
            state.newHomeName = name;
        },
        addNewHome: async (state) => {
            const home = await API.addHome({
                name: state.newHomeName as string,
                lat: state.newHomeCoords?.lat as number,
                lng: state.newHomeCoords?.lng as number,
            });

            // Reset old values
            state.newHomeName = null;
            state.newHomeCoords = null;

            state.homes = [...state.homes, home];
        },
    },
    actions: {

    },
    modules: {
    },
});
