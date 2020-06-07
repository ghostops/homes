<template>
    <div class="home">
        <div
            class="main"
        >
            <Home
                :home="home"
            />
        </div>
    </div>
</template>

<script>
import Home from '@/components/Home.vue';

export default {
    components: {
        Home,
    },
    data() {
        return {};
    },
    computed: {
        home() {
            return this.$store.state.selectedHome;
        },
        selectNewHomeInfo() {
            return this.$store.state.createNewHome === 'info';
        },
        selectNewHomeDone() {
            return this.$store.state.createNewHome === 'done';
        },
    },
    methods: {

    },
};
</script>

<style>
    .home {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .home .main {
        flex: 1;
        background: white;
        padding: 20px;
    }

    .home-footer {
        height: 150px;
        padding: 20px;
        background: gray;
    }

    .footer-actions {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
</style>
