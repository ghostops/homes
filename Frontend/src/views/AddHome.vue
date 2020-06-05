<template>
    <div
        v-if="addInfo"
        class="addHome"
    >
        <h1>Add info about your home</h1>

        <label>
            Home Name
            <input
                v-model="newHomeName"
                type="text"
                minlength="3"
                @change="onHomeNameChange"
            />
        </label>
    </div>

    <div
        v-else
        class="homeAdded"
    >
        <h1>Success!</h1>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            newHomeName: '',
        };
    },
    computed: {
        addInfo() {
            return this.$store.state.createNewHome === 'info';
        },
    },
    mounted() {
        if (this.$store.state.createNewHome === 'not') {
            this.$router.push({ path: '/' });
        }
    },
    methods: {
        onHomeNameChange() {
            this.$store.commit('setNewHomeName', this.newHomeName);
        },
    },
};
</script>
