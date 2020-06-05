<template>
    <div class="sidebar">
        <div class="sidebarInner">
            <router-view/>
        </div>

        <SidebarFooter></SidebarFooter>
    </div>
</template>

<script>
import SidebarFooter from '@/components/SidebarFooter.vue';

export default {
    components: {
        SidebarFooter,
    },
};
</script>

<style>
    .sidebar {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .sidebarInner {
        flex: 1;
        display: flex;
    }
</style>
