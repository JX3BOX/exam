<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb
            name="趣味题库"
            slug="exam"
            root="/exam"
            :publishEnable="false"
            :adminEnable="false"
            :feedbackEnable="true"
        >
            <img slot="logo" svg-inline src="./assets/img/100.svg" />
            <Info />
        </Breadcrumb>
        <LeftSidebar>
            <Nav />
        </LeftSidebar>
        <Main :withoutRight="true">
            <div class="m-main">
                <router-view />
            </div>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Info from "@/components/Info.vue";
import Nav from "@/components/Nav.vue";
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
    },
};
</script>

<style lang="less">
@import "./assets/css/app.less";
</style>
