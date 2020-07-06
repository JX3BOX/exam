<template>
    <el-row class="c-exam-take" v-loading="loading">
        <el-col class="c-exam-take-main" :span="18">
            <div class="c-exam-take-title">
                <h1>{{examInfo ? examInfo.title : "试卷"}}</h1>
            </div>
            <div class="c-exam-take-content" v-if="currentQuestion">
                <h3 class="q-text">{{currentQuestionNumber}}. {{ currentQuestion.title }}</h3>
                <h4 class="q-hint">{{ isMultiple ? "多选题" : "单选题" }}</h4>
                <template v-if="isMultiple">
                    <el-checkbox-group v-model="chosenOptions">
                        <el-checkbox
                            v-for="(option,index) of JSON.parse(currentQuestion.options)"
                            :key="index"
                            :label="index"
                            border
                        >{{option}}</el-checkbox>
                    </el-checkbox-group>
                </template>
                <template v-else>
                    <el-radio-group v-model="chosenOptions">
                        <el-radio
                            v-for="(option,index) of JSON.parse(currentQuestion.options)"
                            :key="index"
                            :label="index"
                            border
                        >{{option}}</el-radio>
                    </el-radio-group>
                </template>
                <div class="c-exam-take-btn">
                    <el-button
                        plain
                        @click="gotoPrevQuestion"
                        :disabled="currentQuestionNumber === 1"
                    >上一题</el-button>
                    <el-button
                        type="primary"
                        style="float: right;"
                        @click="gotoNextQuestion"
                        v-if="currentQuestionNumber !== questionCount"
                    >下一题</el-button>
                    <el-button
                        type="success"
                        style="float: right;"
                        @click="submitPaper"
                        v-else
                    >提交试卷</el-button>
                </div>
            </div>
        </el-col>
        <el-col class="c-exam-take-sidebar" :span="6">
            <h4 class="summary-title">共{{questionCount}}题</h4>
            <div class="summary-mark">
                <el-radio-group v-model="currentQuestionNumber">
                    <el-radio
                        v-for="count in questionCount"
                        :key="count"
                        :label="count"
                        border
                        :class="{'q-attemped': isAttemped(count)}"
                    >{{count}}</el-radio>
                </el-radio-group>
            </div>
        </el-col>
        <!-- <RightSidebar>
            <Extend />
        </RightSidebar>-->
    </el-row>
</template>

<script>
import { axios } from "@/service/api.js";
import { __next } from "@jx3box/jx3box-common/js/jx3box.json";
import Extend from "@/components/Extend.vue";
export default {
    name: "TakeExam",
    components: {
        // Extend
    },
    data() {
        return {
            loading: false,
            examInfo: { title: "试卷" },
            userAnswers: {}, // 储存格式：{id: answer}
            // isMultiple: false,
            chosenOptions: null,
            // currentQuestion: null, // 当前一道题的内容
            questionCount: 10,
            questionIdList: [],
            questionList: [], // 所有题目的数组
            currentQuestionNumber: 1 // 当前题目是第几题，从1开始
        };
    },
    computed: {
        currentQuestion() {
            return this.questionList[this.currentQuestionNumber - 1];
        },
        isMultiple() {
            return this.currentQuestion.type === "checkbox"
        }
    },
    watch: {
        currentQuestionNumber(newNum, oldNum) {
            console.log("new", newNum)
            console.log("old", oldNum)
            let tmpAns = this.chosenOptions
            if (typeof(tmpAns) === 'number') {
                if (tmpAns) {
                    this.userAnswers[this.questionIdList[oldNum-1]] = this.chosenOptions // 储存上一题的答案
                }
            } else {
                if (tmpAns && tmpAns.length > 0) {
                    this.userAnswers[this.questionIdList[oldNum-1]] = this.chosenOptions // 储存上一题的答案
                } else {
                    delete this.userAnswers[this.questionIdList[oldNum-1]]
                }
            }
            if (this.userAnswers[this.questionIdList[newNum-1]]) {
                this.chosenOptions = this.userAnswers[this.questionIdList[newNum-1]]
            } else {
                this.chosenOptions = this.questionList[newNum-1].type === "checkbox" ? [] : null
            }
        }
    },
    mounted() {
        this.getExamInfo();
    },
    methods: {
        getExamInfo() {
            if (this.$route.params.id) {
                this.examid = this.$route.params.id;
            } else {
                this.$message.error("试卷不存在！");
                setTimeout(() => {
                    this.$router.replace("/list");
                }, 2000);
                return false;
            }

            let params = this.$route.params;
            if (params) {
                this.examInfo = params.examInfo;
            }

            // 获取试卷信息
            this.loading = true;
            let getUrl = __next + "api/question/user-exam-paper/"
            // let getUrl = "/api/question/user-exam-paper/";
            getUrl += this.examid;
            getUrl += "?details";
            axios(getUrl, "GET")
                .then(response => {
                    console.log(response);
                    if (!response.id) {
                        this.$message.error("试卷不存在！");
                        setTimeout(() => {
                            this.$router.replace("/list");
                        }, 1000);
                        return false;
                    }
                    this.examid = response.id;
                    this.examInfo = {
                        category: response.category,
                        corner: response.corner,
                        desc: response.desc,
                        medalAward: response.medalAward,
                        title: response.title,
                        tags: response.tags
                    };
                    this.questionIdList = response.questionIdList;
                    this.questionList = response.questionDetailList;
                    this.questionCount = this.questionIdList.length;

                    this.currentQuestionNumber = 1;
                    if (this.questionList[0].type === "checkbox") {
                        this.chosenOptions = []
                    } else {
                        this.chosenOptions = null
                    }
                    // this.loadQuestion();
                })
                .catch(e => {
                    console.log(e);
                })
                .then(() => {
                    this.loading = false;
                });
        },
        // // 加载题目
        // loadQuestion() {
        //     this.currentQuestion = this.questionList[
        //         this.currentQuestionNumber - 1
        //     ];
        //     this.isMultiple = this.currentQuestion.type === "checkbox";
        // },
        gotoPrevQuestion() {
            if (this.currentQuestionNumber > 1) {
                this.currentQuestionNumber -= 1
                // this.loadQuestionUserAnswer()

            }
        },
        gotoNextQuestion() {
            if (this.currentQuestionNumber < this.questionCount) {
                this.currentQuestionNumber += 1
                // this.loadQuestionUserAnswer()
            }
        },
        isAttemped(count) {
            let questionid = this.questionIdList[count-1]
            return this.userAnswers[questionid] !== null && this.userAnswers[questionid] !== '' && this.userAnswers[questionid] !== undefined
        },
        submitPaper() {
            if (Object.keys(this.userAnswers).length !== this.questionCount) {
                console.log("not finished")
            }
        }
        // // 改变题目时，保存并读取用户已经选择的选项
        // loadQuestionUserAnswer() {

        // }
    }
};
</script>

<style lang="less">
@import "../../assets/css/takeexam.less";
</style>