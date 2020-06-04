<template>
    <div id="app">
        <!-- <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link> |
            <router-link to="/map">Map</router-link>
        </div> -->

        <Map></Map>

        <router-view/>
    </div>
</template>

<script>
import Map from '@/components/Map.vue';

export default {
    name: 'App',
    components: {
        Map,
    },
};
</script>

<style>
    * {
        box-sizing: border-box;
    }

    html,
    body,
    #app,
    .home {
        height: 100%;
    }

    body {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin: 0;
    }

    #app {
        display: flex;
        flex-direction: row;
    }
</style>
