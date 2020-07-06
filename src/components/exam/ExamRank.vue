<template>
    <div class="c-exam-rank">
        <div class="c-exam-rank-title">
            <h1>百强榜</h1>
            <h2>剑三2020高考卷</h2>
            <el-divider>以下排名按照个人最高历史分数和获得分数的时间排序</el-divider>
        </div>
        <div class="c-exam-rank-table">
            <el-table :data="rankData" style="width: 100%">
                <el-table-column prop="rank" label="名次"></el-table-column>
                <el-table-column prop="username" label="用户名"></el-table-column>
                <el-table-column prop="score" label="分数"></el-table-column>
                <el-table-column prop="timestamp" label="完成时间"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    name: "ExamRank",
    components: {
        // HelloWorld
    },
    data() {
        return {
            rankData: [
                {
                    rank: 1,
                    username: "枫瑞",
                    score: "1000",
                    timestamp: "2020-04-32 25:61:61"
                },
                {
                    rank: 2,
                    username: "枫瑞",
                    score: "1000",
                    timestamp: "2020-04-32 25:61:61"
                },
                {
                    rank: 3,
                    username: "枫瑞",
                    score: "1000",
                    timestamp: "2020-04-32 25:61:61"
                },
                {
                    rank: 4,
                    username: "枫瑞",
                    score: "1000",
                    timestamp: "2020-04-32 25:61:61"
                },
                {
                    rank: 5,
                    username: "枫瑞",
                    score: "1000",
                    timestamp: "2020-04-32 25:61:61"
                },
                {
                    rank: 6,
                    username: "枫瑞",
                    score: "1000",
                    timestamp: "2020-04-32 25:61:61"
                }
            ]
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
@import "../../assets/css/examrank.less";
</style>