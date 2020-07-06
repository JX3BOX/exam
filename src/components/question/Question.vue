<template>
    <div class="c-question" v-loading="loading">
        <div class="c-question-content" v-if="currentQuestion">
            <h3 class="q-text">{{ currentQuestion.title }}</h3>
            <div class="q-attr">
                <span class="q-attr-hint">{{ isMultiple ? "多选题" : "单选题" }}</span>
                <el-rate
                    v-model="currentQuestion.hardStar"
                    disabled
                    text-color="#ff9900"
                    score-template="{value}"
                ></el-rate>
                <span class="q-attr-author">提交人：<b>{{ currentQuestion.createUser }}</b></span>
            </div>

            <template v-if="isMultiple">
                <el-checkbox-group v-model="chosenOptions">
                    <el-checkbox
                        v-for="(option,index) of JSON.parse(currentQuestion.options)"
                        :key="index"
                        :label="index"
                        border
                        disabled
                        :class="{'is-correct-answer': currentQuestion.answerList.includes(index)}"
                    >{{String.fromCharCode(65+index)}}. {{option}}</el-checkbox>
                </el-checkbox-group>
            </template>
            <template v-else>
                <el-radio-group v-model="chosenOptions">
                    <el-radio
                        v-for="(option,index) of JSON.parse(currentQuestion.options)"
                        :key="index"
                        :label="index"
                        border
                        disabled
                        :class="{'is-correct-answer': currentQuestion.answerList.includes(index)}"
                    >{{String.fromCharCode(65+index)}}. {{option}}</el-radio>
                </el-radio-group>
            </template>
            <!-- <div class="c-exam-take-btn">
                <el-button type="success" style="float: right;" @click="submitPaper">提交试卷</el-button>
            </div>-->
            <div class="q-whyami">
                <h3>解析</h3>
                <div v-html="currentQuestion.whyami" class="q-whyami-content"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { axios } from "@/service/api.js";
import { __next } from "@jx3box/jx3box-common/js/jx3box.json";
import { JX3BOX, User } from "@jx3box/jx3box-common";
export default {
    name: "Question",
    components: {
        // HelloWorld
    },
    data() {
        return {
            loading: false,
            chosenOptions: null,
            currentQuestion: null,
            questionid: null
        };
    },
    computed: {
        isMultiple() {
            return this.currentQuestion.type === "checkbox";
        }
    },
    mounted() {
        this.getQuestionId();
        this.getUserInfo();
        this.getQuestion();
    },
    methods: {
        getQuestionId() {
            if (this.$route.params.id) {
                this.questionid = this.$route.params.id;
            } else {
                this.$message.error("题目不存在！");
                setTimeout(() => {
                    this.$router.go("-1");
                }, 1000);
                return false;
            }
        },
        getUserInfo() {
            let uid = null;
            if (User.getInfo() && User.getInfo().group > 60) {
                return true;
            } else {
                this.$router.replace('/index')
                return false;
            }
        },
        getQuestion() {
            this.loading = true;
            // let getUrl = __next + "api/question/user-exam-paper/q/:questionId"
            // let getUrl = "/api/question/user-exam-paper/q/";
            let getUrl = __next + "api/question/"
            // let getUrl = "/api/question/";
            getUrl += this.questionid;

            axios(getUrl, "GET")
                .then(response => {
                    console.log(response);
                    if (!response.id) {
                        this.$message.error("题目不存在！");
                        setTimeout(() => {
                            this.$router.go("-1");
                        }, 1000);
                        return false;
                    }
                    this.currentQuestion = response;
                    if (this.currentQuestion.type === "checkbox") {
                        this.chosenOptions = [];
                    } else {
                        this.chosenOptions = null;
                    }
                    // this.examid = response.id;
                    // this.examInfo = {
                    //     category: response.category,
                    //     corner: response.corner,
                    //     desc: response.desc,
                    //     medalAward: response.medalAward,
                    //     title: response.title,
                    //     tags: response.tags
                    // };
                    // this.questionIdList = response.questionIdList;
                    // this.questionList = response.questionDetailList;
                    // this.questionCount = this.questionIdList.length;

                    // this.currentQuestionNumber = 1;
                    // if (this.questionList[0].type === "checkbox") {
                    //     this.chosenOptions = []
                    // } else {
                    //     this.chosenOptions = null
                    // }
                    // this.loadQuestion();
                })
                .catch(e => {
                    console.log(e);
                })
                .then(() => {
                    this.loading = false;
                });
        }
        // submitQuestion() {
        //     if (Object.keys(this.userAnswers).length !== this.questionCount) {
        //         console.log("not finished")
        //     }
        // }
    }
};
</script>

<style lang="less">
@import "../../assets/css/question.less";
</style>