<template>
    <MglMap :accessToken="accessToken" :mapStyle="mapStyle" />
</template>

<script>
    import Mapbox from "mapbox-gl";
    import { MglMap } from "vue-mapbox";

    export default {
        components: {
            MglMap
        },
        data() {
            return {
                accessToken: 'pk.eyJ1IjoiZ2hvc3RvcHMiLCJhIjoiY2theHlmNmowMGF0YzMwbnB2dTl2ODFteSJ9.XCJypMveqZ5gVtMy6VXkaQ',
            };
        },

        created() {
            // We need to set mapbox-gl library here in order to use it in template
            this.mapbox = Mapbox;
        }
    };
</script>
