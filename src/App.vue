<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb
            name="趣味题库"
            slug="exam"
            root="/exam"
            :publishEnable="true"
            :adminEnable="true"
            :feedbackEnable="true"
        >
            <img slot="logo" svg-inline src="./assets/img/100.svg" />
            <Info />
        </Breadcrumb>
        <LeftSidebar :open="false">
            <Nav />
        </LeftSidebar>
        <Main :withoutRight="true" :withoutLeft="true">
            <div class="m-main">
                <router-view />
            </div>
            <!-- <RightSidebar>
                <Extend />
            </RightSidebar> -->
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Info from "@/components/Info.vue";
import Nav from "@/components/Nav.vue";
// import Extend from "@/components/Extend.vue";
// import tabs from "@/components/tabs";
const { getRewrite } = require("@jx3box/jx3box-common/js/utils");

export default {
    name: "App",
    props: [],
    data: function() {
        return {};
    },
    computed: {
    },
    methods: {},
    beforeCreate: function() {
    },
    components: {
        Info,
        Nav,
        // Extend,
        // tabs,
    },
};
</script>

<style lang="less">
@import "./assets/css/app.less";
</style>
