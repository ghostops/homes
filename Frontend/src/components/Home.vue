<template>
    <div class="single-home">
        <div v-if="home">
            <h1>{{home.Name}}</h1>
        </div>
        <div v-else>
            <h1>No home :(</h1>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    props: ['home'],
    data() {
        return {
        };
    },
    computed: {
    },
    methods: {
    },
};
</script>
