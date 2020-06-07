<template>
    <div
        v-if="addInfo"
        class="addHome"
    >
        <h1>Add info about your home</h1>

        <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
              <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
        </p>

        <label>
            Home Name
            <input
                v-model="newHomeName"
                type="text"
                minlength="3"
                @change="onHomeNameChange"
            />
        </label>

        <label>
            Moved in
            <Datepicker
                v-model="newHomeMoveIn"
            />
        </label>

        <label>
            Moved out
            <Datepicker
                v-model="newHomeMoveOut"
            />
        </label>

        <input
            type="submit"
            value="Submit"
        />
    </div>

    <div
        v-else
        class="homeAdded"
    >
        <h1>Success!</h1>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';

export default {
    components: {
        Datepicker,
    },
    data() {
        return {
            newHomeName: '',
            newHomeMoveIn: new Date(),
            newHomeMoveOut: new Date(),
        };
    },
    computed: {
        addInfo() {
            return this.$store.state.createNewHome === 'info';
        },
        errors() {
            return this.$store.state.newHomeErrors;
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
        submitForm(e) {
            const errors = [];

            if (!this.newHomeName) {
                errors.push('Name required.');
            }

            this.$store.commit('setNewHomeErrors', errors);

            e.preventDefault();
        },
    },
};
</script>
