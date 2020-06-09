<template>
    <div id="mapContainer">
        <MglMap
            :accessToken="accessToken"
            :mapStyle="mapStyle"
            :zoom="zoom"
            :center="center"
            @click="onMapClick"
        >
            <MglMarker
                v-for="home in homes"
                :key="home.id"
                :coordinates="[home.Lng, home.Lat]"
                color="blue"
                @click="selectHome(home)"
            />

            <MglMarker
                v-if="newHomeMarker"
                :coordinates="[newHomeMarker.lng, newHomeMarker.lat]"
                color="red"
            />
        </MglMap>
    </div>
</template>

<script>
import Mapbox from 'mapbox-gl';
import { MglMap, MglMarker } from 'vue-mapbox';

export default {
    components: {
        MglMap,
        MglMarker,
    },
    data() {
        return {
            accessToken: '',
            mapStyle: 'mapbox://styles/mapbox/dark-v10',

            center: [17.866067, 59.416074],
            zoom: 14,
        };
    },
    computed: {
        homes() {
            return this.$store.state.homes;
        },
        newHomeMarker() {
            return this.$store.state.newHomeCoords;
        },
    },
    created() {
        // We need to set mapbox-gl library here in order to use it in template
        this.mapbox = Mapbox;

        this.$store.commit('loadHomes');
    },
    methods: {
        selectHome(home) {
            this.$store.commit('selectHome', home);
        },
        onMapClick({ mapboxEvent }) {
            if (this.$store.state.createNewHome === 'coords') {
                this.$store.commit('setNewHomeCoords', mapboxEvent.lngLat);
            }
        },
    },
};
</script>

<style>
    #mapContainer {
        height: 100%;
        width: 70%;
    }
</style>
