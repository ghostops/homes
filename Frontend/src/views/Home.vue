<template>
    <div class="home">
        <div
            v-if="selectNewHomeInfo"
            class="main"
        >
            <h1>Add info about your home</h1>

            <label>
                Home Name
                <input
                    v-model="newHomeName"
                    type="text"
                    minlength="3"
                />
            </label>
        </div>
        <div
            class="main"
            v-else-if="!selectNewHomeInfo && selectNewHomeDone"
        >
            <h1>ayyyooo</h1>
        </div>
        <div
            class="main"
            v-else
        >
            <div v-if="home">
                <h1>{{home.Name}}</h1>
            </div>
            <div v-else>
                <h1>No home :(</h1>
            </div>
        </div>

        <footer class="home-footer">
            <div class="footer-actions">
                <button
                    @click="addNewHome"
                >
                    <p v-if="!creatingNewHome">
                        Add new home
                    </p>
                    <p v-else>
                        Cancel
                    </p>
                </button>
                <button
                    v-if="hasSelectedLocation"
                    @click="continueNewHome"
                >
                    <p>
                        Continue
                    </p>
                </button>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newHomeName: '',
        };
    },
    computed: {
        home() {
            return this.$store.state.selectedHome;
        },
        creatingNewHome() {
            return this.$store.state.createNewHome !== 'not';
        },
        selectNewHomeInfo() {
            return this.$store.state.createNewHome === 'info';
        },
        selectNewHomeDone() {
            return this.$store.state.createNewHome === 'done';
        },
        hasSelectedLocation() {
            return !!this.$store.state.newHomeCoords;
        },
    },
    methods: {
        addNewHome() {
            const val = this.creatingNewHome;
            this.$store.commit('setCreateNewHome', val ? 'not' : 'coords');
        },
        continueNewHome() {
            const state = this.$store.state.createNewHome;
            if (state === 'coords') {
                this.$store.commit('setCreateNewHome', 'info');
            } else if (state === 'info') {
                this.$store.commit('setNewHomeName', this.newHomeName);
                this.$store.commit('setCreateNewHome', 'done');
                this.$store.commit('addNewHome');
            } else if (state === 'done') {
                this.$store.commit('setCreateNewHome', 'not');
            }
        },
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
