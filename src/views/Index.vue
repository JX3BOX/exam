<template>
    <div class="v-index">
        <el-card class="box-card">
            <router-link class="u-item" to="/list">
                <i class="el-icon-s-order"></i>
                <b>试卷列表</b>
                <span>去做一套完整的试卷</span>
            </router-link>
        </el-card>
        <el-card class="box-card">
            <router-link class="u-item" to="/qlist">
                <i class="el-icon-document"></i>
                <b>试题列表</b>
                <span>可以自由挑选题目进行回答</span>
            </router-link>
        </el-card>
        <el-card class="box-card">
            <a href="../../dashboard/publish/#/exam" class="u-item">
                <i class="el-icon-s-opportunity"></i>
                <b>贡献题目</b>
                <span>可以为网站贡献题目</span>
            </a>
            <!-- <router-link class="u-item" to="/dashboard/publish/#/exam">
                <i class="el-icon-s-opportunity"></i>
                <b>贡献题目</b>
                <span>可以为网站贡献题目</span>
            </router-link> -->
        </el-card>
    </div>
</template>

<script>
import { getPosts } from "../service/post";
import {
    authorLink,
    publishLink,
    showAvatar,
    resolveImagePath
} from "@jx3box/jx3box-common/js/utils";
import { __ossMirror } from "@jx3box/jx3box-common/js/jx3box.json";
import lodash from "lodash";
import list from "@/components/list.vue";

export default {
    name: "Index",
    props: [],
    data: function() {
        return {};
    },
    computed: {},
    methods: {},
    created: function() {},
    components: {
        // list
    }
};
</script>

<style lang="less">
@import "../assets/css/index.less";
</style>
