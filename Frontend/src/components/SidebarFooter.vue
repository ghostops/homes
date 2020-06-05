<template>
    <footer class="home-footer">
        <div class="footer-actions">
            <button
                v-if="showAdd"
                @click="addNewHome"
            >
                Add new home
            </button>

            <button
                v-if="showCancel"
                @click="cancelNewHome"
            >
                Cancel
            </button>

            <button
                v-if="showContinue"
                @click="continueNewHome"
            >
                <p>
                    Continue
                </p>
            </button>
        </div>
    </footer>
</template>

<script>
export default {
    components: {},
    data() {
        return {
        };
    },
    computed: {
        showAdd() {
            return this.$store.state.createNewHome === 'not';
        },
        showContinue() {
            return (
                !!this.$store.state.newHomeCoords
            );
        },
        showCancel() {
            return (
                this.$store.state.createNewHome !== 'not'
                && this.$store.state.createNewHome !== 'done'
            );
        },
    },
    methods: {
        addNewHome() {
            this.$store.commit('setCreateNewHome', 'coords');
        },
        cancelNewHome() {
            if (this.$router.history.current.path !== '/') {
                this.$router.push({ path: '/' });
            }

            this.$store.commit('setCreateNewHome', 'not');
        },
        continueNewHome() {
            const state = this.$store.state.createNewHome;
            if (state === 'coords') {
                this.$router.push({ path: 'add' });
                this.$store.commit('setCreateNewHome', 'info');
            } else if (state === 'info') {
                this.$store.commit('setCreateNewHome', 'done');
                this.$store.commit('addNewHome');
            } else if (state === 'done') {
                this.$router.push({ path: '/' });
                this.$store.commit('setCreateNewHome', 'not');
            }
        },
    },
};
</script>
