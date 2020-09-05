<template>
    <div class="v-index">
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
    }
};
</script>

<style lang="less">
@import "../assets/css/index.less";
</style>
