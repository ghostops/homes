<template>
    <div id="mapContainer">
        <MglMap
            :accessToken="accessToken"
            :mapStyle="mapStyle"
            :zoom="zoom"
            :center="center"
        >
            <MglMarker
                v-for="home in homes"
                :key="home.id"
                :coordinates="[home.Lng, home.Lat]"
                color="blue"
                @click="lol(home)"
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
            accessToken: 'pk.eyJ1IjoiZ2hvc3RvcHMiLCJhIjoiY2theHlmNmowMGF0YzMwbnB2dTl2ODFteSJ9.XCJypMveqZ5gVtMy6VXkaQ',
            mapStyle: 'mapbox://styles/mapbox/dark-v10',

            center: [17.866067, 59.416074],
            zoom: 14,
        };
    },
    computed: {
        homes() {
            return this.$store.state.homes;
        },
    },
    created() {
        // We need to set mapbox-gl library here in order to use it in template
        this.mapbox = Mapbox;

        this.$store.commit('loadHomes');
    },
    methods: {
        lol: (a) => alert(JSON.stringify(a)),
    },
};
</script>

<style>
    #mapContainer {
        height: 100%;
        width: 100%;
    }
</style>
