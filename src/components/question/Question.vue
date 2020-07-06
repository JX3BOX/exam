<template>
    <div class="c-question">
        
    </div>
</template>

<script>
export default {
    name: 'Question',
    components: {
        // HelloWorld
    },
    data() {
        return {
            key: 1
        };
    },
    computed: {
        isName() {
            return false;
        }
    },
    methods: {
        name() {}
    }
};
</script>

<style lang="less">
@import "../../assets/css/question.less";
</style>