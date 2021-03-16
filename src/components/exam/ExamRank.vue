<template>
    <div
        class="c-exam-rank"
        v-if="examInfo && Object.keys(examInfo).length > 0"
        v-loading="loading"
    >
        <div class="c-exam-rank-title">
            <h1>百强榜</h1>
            <h2>《{{ examInfo.title }}》</h2>
            <el-divider>以下排名按照个人第一次获得的分数和答题消耗时间排序</el-divider>
        </div>
        <div class="c-exam-rank-table">
            <el-table :data="rankData" style="width: 100%">
                <el-table-column prop="rank" label="名次" :width="120">
                    <template slot-scope="scope">
                        <span v-if="scope.$index >= 3">{{ scope.$index + 1 }}</span>
                        <div v-else class="c-exam-rank-table-pic" :class="bindRankingPicClass(scope.$index)"></div>
                    </template>
                </el-table-column>
                <!-- <el-table-column type="index" width="50" label="名次"></el-table-column> -->
                <el-table-column prop="displayName" label="用户名"></el-table-column>
                <el-table-column prop="score" label="分数" :width="120"></el-table-column>
                <el-table-column prop="coastTime" label="答题耗时(秒)" :width="120"></el-table-column>
                <el-table-column prop="endTimeStr" label="完成时间" :width="180"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { axios, realUrl } from "@/service/api.js";
import { __next } from "@jx3box/jx3box-common/data/jx3box.json";
import { showAvatar, authorLink } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "ExamRank",
    components: {
        // HelloWorld
    },
    data() {
        return {
            examid: -1,
            examInfo: {},
            loading: false,
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
        bindRankingPicClass() {
            return (index) => {
                let tmpClass = {}
                tmpClass[`rank-table-pic-ranking-${index+1}`] = true
                return tmpClass
            }
        }
    },
    mounted() {
        this.getExamInfo();
        this.getRankData();
    },
    methods: {
        name() {},
        getExamInfo() {
            this.loading = true
            if (this.$route.params.id) {
                this.examid = this.$route.params.id;
            } else {
                this.$message.error(
                    "获取试卷信息失败，请重新从试卷列表页进入！"
                );
                setTimeout(() => {
                    this.$router.replace("/list");
                }, 1000);
                return false;
            }

            let params = this.$route.params;
            if (params.examInfo) {
                this.examInfo = params.examInfo;
            } else {
                this.$message.error(
                    "获取试卷信息失败，请重新从试卷列表页进入！"
                );
                setTimeout(() => {
                    this.$router.replace("/list");
                }, 1000);
                return false;
            }
        },
        getRankData() {
            if (!this.examInfo) {
                return false;
            }
            console.log(this.examInfo);
            let rankUrl = realUrl(
                __next,
                `api/question/user-exam-paper/${this.examid}/rank`
            );
            axios(rankUrl)
                .then(response => {
                    this.rankData = response;
                })
                .catch(e => {
                    switch (e.code) {
                        case -1:
                            // 网络异常
                            this.$message.error(e.msg);
                            break;
                        case 404:
                            this.loading = true;
                            this.$message.error("试卷不存在！");
                            setTimeout(() => {
                                this.$router.replace("/list");
                            }, 1000);

                            break;
                        case 9999:
                            this.$message.error("登录失效, 请重新登录");
                            //1.注销
                            User.destroy();
                            //2.保存未提交成功的信息
                            //请保存至IndexedDB,勿占用localstorage
                            //3.跳转至登录页携带redirect
                            setTimeout(() => {
                                User.toLogin();
                            }, 1000);
                            //不指定url时则自动跳回当前所在页面
                            break;
                        default:
                            // 服务器错误
                            this.$message.error(`[${e.code}]${e.msg}`);
                    }
                })
                .then(() => {
                    this.loading = false;
                });
        },
    }
};
</script>

<style lang="less">
@import "../../assets/css/examrank.less";
</style>