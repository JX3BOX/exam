<template>
    <div class="m-list-nav">
        <h5 class="u-title">题库</h5>
        <div class="m-nav-group">
            <router-link to="/questions/pve">
                <img svg-inline src="../assets/img/logo.svg" />
                <span>PVE题库</span>
                <i class="u-mark isnew">还没上线</i>
            </router-link>
            <router-link to="/questions/pvp">
                <img svg-inline src="../assets/img/logo.svg" />
                <span>PVP题库</span>
                <i class="u-mark isnew">还没上线</i>
            </router-link>
            <router-link to="/questions/pvx">
                <img svg-inline src="../assets/img/logo.svg" />
                <span>PVX题库</span>
                <i class="u-mark isnew">还没上线</i>
            </router-link>
        </div>
        <h5 class="u-title">试卷</h5>
        <div class="m-nav-group">
            <router-link to="/list">
                <img svg-inline src="../assets/img/logo.svg" />
                <span>试卷列表</span>
                <i class="u-mark isnew">全新上线</i>
            </router-link>
            <router-link to="/history">
                <img svg-inline src="../assets/img/logo.svg" />
                <span>我做过的</span>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "list_nav",
    props: [],
    data: function() {
        return {
        };
    },
    computed: {
    },
    methods: {
    },
    mounted: function() {},
    components : {
        
    }
};
</script>
