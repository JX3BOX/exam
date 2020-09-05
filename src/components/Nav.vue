<template>
    <nav class="m-nav">
        <h5 class="u-title">试题中心</h5>
        <div class="m-nav-group">
            <router-link class="u-item" to="/qlist">
                <i class="el-icon-s-order"></i>
                <b>全部题目</b>
            </router-link>
            <a href="/dashboard/publish/#/exam/question" class="u-item" target="_blank">
                <i class="el-icon-s-opportunity"></i>
                <span>提交试题</span>
            </a>
        </div>

        <h5 class="u-title">试卷中心</h5>
        <div class="m-nav-group">
            <router-link class="u-item" to="/list">
                <i class="el-icon-s-order"></i>
                <b>全部试卷</b>
            </router-link>
            <a href="/dashboard/publish/#/exam/paper" class="u-item" target="_blank">
                <i class="el-icon-s-opportunity"></i>
                <span>制作试卷</span>
            </a>
        </div>
    </nav>
</template>

<script>
export default {
    name: "Nav",
    data: function() {
        return {};
    },
    computed: {
        mode: function() {
            return this.$store.state.mode;
        },
    },
    methods: {},
    mounted: function() {},
    components:{
    }
};
</script>

<style lang="less">
@import "../assets/css/nav.less";
</style>
