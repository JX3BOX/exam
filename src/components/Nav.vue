<template>
    <nav class="m-nav">
        <h5 class="u-title">题库中心</h5>
        <div class="m-nav-group">
            <router-link class="u-item" to="/qlist">
                <i class="el-icon-s-order"></i>
                <span>全部题目</span>
            </router-link>
            <router-link class="u-item" to="/list">
                <i class="el-icon-s-order"></i>
                <span>全部试卷</span>
            </router-link>
        </div>

        <h5 class="u-title">参与贡献</h5>
        <div class="m-nav-group">
            <a href="/dashboard/publish/#/exam/question" class="u-item" target="_blank">
                <i class="el-icon-s-opportunity"></i>
                <span>提交试题</span>
            </a>
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
