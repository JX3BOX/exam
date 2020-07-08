<template>
    <div class="c-exam-take" v-loading="loading">
        <div class="c-exam-take-main">
            <div class="c-exam-take-title">
                <h1>
                    {{examInfo ? examInfo.title : "试卷"}}
                    <i class="u-mark bg-magenta" v-if="examInfo && examInfo.corner">{{examInfo.corner}}</i>
                </h1>
            </div>
            <div class="c-exam-take-attr" v-if="examInfo">
                <h3>{{examInfo.desc}}</h3>
                <p class="c-exam-attr-content">
                    <span class="c-exam-attr-prop">出卷人：</span>
                    <span class="c-exam-attr-value">{{examInfo.author}}</span>
                </p>
                <p class="c-exam-attr-content" v-if="examInfo.tags">
                    <span class="c-exam-attr-prop">试卷标签：</span>
                    <span class="c-exam-attr-value">
                        <el-tag
                            size="medium"
                            v-for="tag of JSON.parse(examInfo.tags)"
                            :key="tag"
                        >{{tag}}</el-tag>
                    </span>
                </p>
                <p class="c-exam-attr-content" style="margin-top: -8px;">
                    <span class="c-exam-attr-prop">总共题数：</span>
                    <span class="c-exam-attr-value">{{questionIdList.length}}</span>
                </p>
            </div>
            <div class="c-exam-take-result" v-if="score !== -1">
                <p class="result-score">
                    <span>您的得分：</span>
                    <span style="font-size: 64px">{{score}}</span>
                    <span>分</span>
                </p>
            </div>
            <template v-if="questionList.length > 0">
                <el-card class="box-card" v-for="(question,index) of questionList" :key="index">
                    <div class="c-exam-take-content">
                        <h3 class="q-text">
                            <i
                                v-if="eachCorrectiveness[question.id] !== undefined"
                                :class="{'el-icon-success': eachCorrectiveness[question.id], 'el-icon-error': !eachCorrectiveness[question.id]}"
                            ></i>
                            {{index+1}}. {{ question.title }}
                        </h3>
                        <div class="q-attr">
                            <p class="q-attr-content">
                                <span class="q-attr-prop">出题人：</span>
                                <span class="q-attr-value">{{ question.createUser }}</span>
                            </p>
                            <p class="q-attr-content" v-if="question.tags">
                                <span class="q-attr-prop">题目标签：</span>
                                <span class="q-attr-value">
                                    <el-tag
                                        size="medium"
                                        v-for="tag of JSON.parse(question.tags)"
                                        :key="tag"
                                    >{{tag}}</el-tag>
                                </span>
                            </p>
                            <p class="q-attr-content">
                                <span class="q-attr-prop">难度：</span>
                                <span class="q-attr-value">
                                    <el-rate
                                        v-model="question.hardStar"
                                        disabled
                                        text-color="#ff9900"
                                    ></el-rate>
                                </span>
                            </p>
                        </div>
                        <h4 class="q-hint">{{ question.type === "checkbox" ? "多选题" : "单选题" }}</h4>
                        <template v-if="question.type === 'checkbox'">
                            <el-checkbox-group v-model="userAnswers[question.id]">
                                <el-checkbox
                                    v-for="(option,index) of JSON.parse(question.options)"
                                    :key="index"
                                    :label="index"
                                    border
                                    :disabled="isSubmitted"
                                    :class="{'is-correct-answer': isCorrectAnswerClass(question.id, index), 'is-wrong-answer': isWrongAnswerClass(question.id, index) }"
                                >{{String.fromCharCode(65+index)}}. {{option}}</el-checkbox>
                            </el-checkbox-group>
                        </template>
                        <template v-else>
                            <el-radio-group v-model="userAnswers[question.id]">
                                <el-radio
                                    v-for="(option,index) of JSON.parse(question.options)"
                                    :key="index"
                                    :label="index"
                                    border
                                    :disabled="isSubmitted"
                                    :class="{'is-correct-answer': isCorrectAnswerClass(question.id, index), 'is-wrong-answer': isWrongAnswerClass(question.id, index) }"
                                >{{String.fromCharCode(65+index)}}. {{option}}</el-radio>
                            </el-radio-group>
                        </template>
                        <div class="q-whyami" v-if="whyami[question.id] !== undefined">
                            <el-divider content-position="left">解析</el-divider>
                            <div v-html="whyami[question.id]" class="q-whyami-content"></div>
                        </div>
                    </div>
                </el-card>
            </template>

            <div class="c-exam-take-btn">
                <el-button type="success" @click="preSubmitPaper" v-if="!isSubmitted">提交试卷</el-button>
            </div>
        </div>
        <!-- <RightSidebar>
            <Extend />
        </RightSidebar>-->
    </div>
</template>

<script>
import { axios, realUrl } from "@/service/api.js";
import { __next } from "@jx3box/jx3box-common/js/jx3box.json";
import Extend from "@/components/Extend.vue";
import { JX3BOX, User } from "@jx3box/jx3box-common";
export default {
    name: "TakeExam",
    components: {
        // Extend
    },
    data() {
        return {
            loading: true,
            examInfo: { title: "试卷" },
            marks: [{ label: "官方试卷", value: "official" }],
            userAnswers: {}, // 储存格式：{id: answer}
            // isMultiple: false,
            chosenOptions: null,
            // currentQuestion: null, // 当前一道题的内容
            questionCount: 10,
            questionIdList: [],
            questionList: [], // 所有题目的数组
            currentQuestionNumber: 1, // 当前题目是第几题，从1开始
            isSubmitted: false, // 判断是否已经提交试卷

            correctCount: -1,
            score: -1,
            correctAnswers: {},
            eachCorrectiveness: {},
            whyami: {}
        };
    },
    computed: {},
    watch: {},
    mounted() {
        // 先判断是否登录
        this.checkLogin();
        // this.getExamInfo();
    },
    methods: {
        checkLogin() {
            if (User.isLogin()) {
                this.getExamInfo();
            } else {
                this.$message.error("请先登录");
                //1.注销
                User.destroy();
                //2.保存未提交成功的信息
                //请保存至IndexedDB,勿占用localstorage
                //3.跳转至登录页携带redirect
                setTimeout(() => {
                    User.toLogin();
                }, 1000);
            }
        },
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
            let getUrl = realUrl(__next, "api/question/user-exam-paper/");
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

                    // 获取角标的中文
                    let tmpMark = null;
                    this.marks.forEach(mark => {
                        if (mark.value === response.corner) {
                            tmpMark = mark.label;
                        }
                    });
                    this.examInfo = {
                        category: response.category,
                        corner: tmpMark,
                        desc: response.desc,
                        medalAward: response.medalAward,
                        title: response.title,
                        tags: response.tags,
                        author: response.createUser
                    };
                    this.questionIdList = response.questionIdList;
                    let questions = response.questionDetailList;

                    let tmpUserAnswers = {};
                    questions.forEach(question => {
                        if (question.type === "checkbox") {
                            tmpUserAnswers[question.id] = [];
                        } else {
                            tmpUserAnswers[question.id] = null;
                        }
                    });
                    this.userAnswers = tmpUserAnswers;

                    this.questionList = questions;
                    this.questionCount = this.questionIdList.length;

                    // // this.currentQuestionNumber = 1;
                    // if (this.questionList[0].type === "checkbox") {
                    //     this.chosenOptions = [];
                    // } else {
                    //     this.chosenOptions = null;
                    // }
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
        // isAttemped(count) {
        //     let questionid = this.questionIdList[count - 1];
        //     return (
        //         this.userAnswers[questionid] !== null &&
        //         this.userAnswers[questionid] !== "" &&
        //         this.userAnswers[questionid] !== undefined
        //     );
        // },
        preSubmitPaper() {
            // 提交试卷前的检查
            let finalAnswers = {};
            let isFinished = true;

            // 拼接最终答案
            for (let key in this.userAnswers) {
                let value = this.userAnswers[key];
                let options = [];
                for (let i = 0; i < this.questionList.length; ++i) {
                    if (this.questionList[i].id == key) {
                        options = this.questionList[i].options;
                        break;
                    }
                }

                options = JSON.parse(options);

                // 判断是否有空的题目
                if (value === null) {
                    isFinished = false;
                } else if (typeof value !== "number") {
                    if (value.length === 0) {
                        isFinished = false;
                    } else {
                        finalAnswers[key] = value.map(optionIndex => {
                            return options[optionIndex];
                        });
                    }
                } else {
                    finalAnswers[key] = [options[value]];
                }
            }

            // 如果有空的题目，提示是否要直接提交。但是不允许提交空白试卷
            if (!isFinished) {
                this.$confirm(
                    "还没有完成所有题目的作答，是否继续答题？",
                    "提示",
                    {
                        cancelButtonText: "继续答题",
                        confirmButtonText: "不管了，我要交卷",
                        type: "warning"
                    }
                )
                    .then(() => {
                        if (Object.keys(finalAnswers).length === 0) {
                            this.$alert("不能交白卷哦~", "提交失败", {
                                type: "error"
                            });
                        } else {
                            this.submitPaper(finalAnswers);
                        }
                    })
                    .catch(() => {
                        return false;
                    });
            } else {
                this.submitPaper(finalAnswers);
            }
        },

        // 执行提交试卷请求
        submitPaper(answers) {
            this.$confirm(
                "提交试卷后将无法再修改作答，且每套试卷只能作答一次。是否确定提交？",
                "提示",
                {
                    cancelButtonText: "我再看看",
                    confirmButtonText: "确定提交",
                    type: "warning"
                }
            )
                .then(() => {
                    this.isSubmitted = true;
                    this.loading = true;
                    let postUrl = realUrl(
                        __next,
                        `api/question/user-exam-paper/${this.examid}/i-finish-all`
                    );
                    axios(postUrl, "POST", true, answers)
                        .then(response => {
                            if (response.questionCount) {
                                this.correctCount = response.correct;
                                this.score = response.score;
                                window.scrollTo(0, 0);
                                this.getSolution();
                            } else {
                                this.isSubmitted = false;
                                if (response.msg) {
                                    this.$message.error(
                                        `[${response.code}]${response.msg}`
                                    );
                                }
                            }
                        })
                        .catch(e => {
                            this.isSubmitted = false;
                            switch (e.code) {
                                case -1:
                                    // 网络异常
                                    this.$message.error(e.msg);
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
                })
                .catch(() => {
                    return false;
                });
        },

        // 获取试卷答案
        getSolution() {
            this.loading = true;
            let solutionUrl = realUrl(
                __next,
                `api/question/user-exam-paper/${this.examid}/i-need-answer`
            );
            axios(solutionUrl, "GET", true)
                .then(response => {
                    console.log(response);
                    if (response.paper && response.paper.questionDetailList) {
                        // 展示答案，是否正确，已经给选项标上是否正确的标记
                        let qda = response.paper.questionDetailList;
                        let tmpAnswerList = {};
                        let tmpCorrectiveness = {};
                        let tmpWhyami = {};
                        qda.forEach(question => {
                            tmpAnswerList[question.id] = question.answerList;
                            tmpCorrectiveness[question.id] =
                                question.answerList.sort().toString() ===
                                question.myAnswer.sort().toString();
                            tmpWhyami[question.id] = question.whyami;
                        });
                        this.correctAnswers = tmpAnswerList;
                        this.eachCorrectiveness = tmpCorrectiveness;
                        this.whyami = tmpWhyami;
                    }
                })
                .catch(e => {
                    switch (e.code) {
                        case -1:
                            // 网络异常
                            this.$message.error(e.msg);
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
        isCorrectAnswerClass(qid, idx) {
            if (Object.keys(this.correctAnswers).length > 0) {
                return this.correctAnswers[qid].includes(idx);
            } else {
                return false;
            }
        },
        isWrongAnswerClass(qid, idx) {
            if (Object.keys(this.correctAnswers).length > 0) {
                if (
                    !this.correctAnswers[qid].includes(idx) &&
                    this.userAnswers[qid] !== null
                ) {
                    if (this.userAnswers[qid] === idx) {
                        return true;
                    } else if (typeof this.userAnswers[qid] !== "number") {
                        return this.userAnswers[qid].includes(idx);
                    }
                }
            }
            return false;
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