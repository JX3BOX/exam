<template>
    <div class="c-exam-take" v-loading="loading">
        <div class="c-exam-take-main">
            <div class="c-exam-take-title">
                <h1>
                    《{{ examInfo ? examInfo.title : "试卷" }}》
                    <!-- <i
                        class="u-mark bg-magenta"
                        v-if="examInfo && examInfo.corner"
                    >{{examInfo.corner}}</i>-->
                </h1>
            </div>
            <div class="c-exam-take-attr" v-if="examInfo">
                <h3>{{ examInfo.desc }}</h3>
                <p class="c-exam-attr-content">
                    <span class="c-exam-attr-prop">出卷人：</span>
                    <span class="c-exam-attr-value">
                        <el-link
                            :href="paperAuthorLink"
                            target="_blank"
                            :underline="false"
                        >
                            <!-- <el-avatar :src="paperAuthorAvatar"></el-avatar> -->
                            {{ examInfo.author }}
                        </el-link>
                    </span>
                </p>
                <p class="c-exam-attr-content" v-if="examInfo.tags">
                    <span class="c-exam-attr-prop">试卷标签：</span>
                    <span class="c-exam-attr-value">
                        <el-tag
                            size="medium"
                            v-for="tag of JSON.parse(examInfo.tags)"
                            :key="tag"
                            >{{ tag }}</el-tag
                        >
                    </span>
                </p>
                <p class="c-exam-attr-content" style="margin-top: -8px">
                    <span class="c-exam-attr-prop">总共题数：</span>
                    <!-- <span class="c-exam-attr-value">{{questionIdList.length}}</span> -->
                    <span class="c-exam-attr-value"
                        >共10题，每题10分，满分100分。</span
                    >
                </p>
                <span class="u-views" v-if="views >= 0"
                    ><i class="el-icon-view">&nbsp;{{ views }}</i></span
                >
                <QRcode />
                <span style="margin-left: 10px">
                    <Sharing
                        :title="sharingTitle"
                        img="./assets/img/100.svg"
                        v-if="score >= 0"
                        key="beforeTest"
                    />
                    <Sharing
                        :title="sharingTitle"
                        img="./assets/img/100.svg"
                        v-else
                        key="afterTest"
                    />
                </span>
            </div>
            <div class="c-exam-take-result" v-if="score !== -1">
                <p class="result-score">{{ score }}</p>
                <p class="result-text">本次得分</p>
            </div>
            <template v-if="questionList.length > 0">
                <div
                    class="question-row"
                    v-for="(question, index) of questionList"
                    :key="index"
                >
                    <el-card class="box-card">
                        <div class="card-header">
                            <div class="card-header-left">{{ index + 1 }}</div>
                            <div class="card-header-right">
                                <span class="q-attr-value">
                                    <el-tag
                                        size="small"
                                        v-for="tag of JSON.parse(question.tags)"
                                        :key="tag"
                                        >{{ tag }}</el-tag
                                    >
                                </span>
                            </div>
                        </div>
                        <div class="c-exam-take-content">
                            <h3 class="q-text">
                                <!-- <i
                                v-if="eachCorrectiveness[question.id] !== undefined"
                                :class="{'el-icon-success': eachCorrectiveness[question.id], 'el-icon-error': !eachCorrectiveness[question.id]}"
                                ></i>-->
                                <span class="q-hint"
                                    >[{{
                                        question.type === "checkbox"
                                            ? "多选题"
                                            : "单选题"
                                    }}]</span
                                >
                                <!-- {{ question.title }} -->
                                <Article :content="question.title"></Article>
                            </h3>

                            <template v-if="question.type === 'checkbox'">
                                <el-checkbox-group
                                    v-model="userAnswers[question.id]"
                                >
                                    <el-checkbox
                                        v-for="(option, index) of JSON.parse(
                                            question.options
                                        )"
                                        :key="index"
                                        :label="index"
                                        border
                                        :disabled="isSubmitted"
                                        :class="{
                                            'is-correct-answer': isCorrectAnswerClass(
                                                question.id,
                                                index
                                            ),
                                            'is-wrong-answer': isWrongAnswerClass(
                                                question.id,
                                                index
                                            ),
                                        }"
                                    >
                                        {{ String.fromCharCode(65 + index) }}.
                                        <Article :content="option"></Article>
                                    </el-checkbox>
                                </el-checkbox-group>
                            </template>
                            <template v-else>
                                <el-radio-group
                                    v-model="userAnswers[question.id]"
                                >
                                    <el-radio
                                        v-for="(option, index) of JSON.parse(
                                            question.options
                                        )"
                                        :key="index"
                                        :label="index"
                                        border
                                        :disabled="isSubmitted"
                                        :class="{
                                            'is-correct-answer': isCorrectAnswerClass(
                                                question.id,
                                                index
                                            ),
                                            'is-wrong-answer': isWrongAnswerClass(
                                                question.id,
                                                index
                                            ),
                                        }"
                                    >
                                        {{ String.fromCharCode(65 + index) }}.
                                        <Article :content="option"></Article>
                                    </el-radio>
                                </el-radio-group>
                            </template>

                            <div class="q-attr">
                                <p class="q-attr-content u-author">
                                    <span class="q-attr-prop">出题人：</span>
                                    <span class="q-attr-value">
                                        <el-link
                                            :href="
                                                getQAuthorLink(
                                                    question.createUserId
                                                )
                                            "
                                            target="_blank"
                                            >{{ question.createUser }}</el-link
                                        >
                                    </span>
                                </p>

                                <p class="q-attr-content u-hardstar">
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
                            <!-- 
                            <div class="q-whyami" v-if="whyami[question.id] !== undefined">
                                <el-divider content-position="left">解析</el-divider>
                                <Article :content="whyami[question.id]"></Article>
                            </div>
                            -->
                        </div>
                    </el-card>
                    <el-card
                        class="box-card-result"
                        v-if="eachCorrectiveness[question.id] !== undefined"
                    >
                        <p
                            class="card-result-status"
                            style="color: #f12e2e"
                            v-if="userAnswers[question.id] === null"
                        >
                            未作答
                        </p>
                        <p
                            class="card-result-status"
                            style="color: #18ca4e"
                            v-else-if="eachCorrectiveness[question.id]"
                        >
                            回答正确
                        </p>
                        <p
                            class="card-result-status"
                            style="color: #f12e2e"
                            v-else
                        >
                            回答错误
                        </p>
                        <p class="card-result-options">
                            你的答案：{{ userAnswerDisplayString(question.id) }}
                        </p>
                        <p class="card-result-options">
                            正确答案：{{
                                correctAnswers[question.id]
                                    .map((each) => {
                                        return String.fromCharCode(65 + each);
                                    })
                                    .join("")
                            }}
                        </p>
                        <el-divider></el-divider>
                        <p
                            style="
                                color: #2682ea;
                                font-size: 20px;
                                font-weight: 800;
                            "
                        >
                            解析：
                        </p>
                        <Article :content="whyami[question.id]"></Article>
                    </el-card>
                </div>
            </template>

            <div class="c-exam-take-btn">
                <el-button
                    type="success"
                    @click="preSubmitPaper"
                    v-if="!isSubmitted && !loading && questionList.length > 0"
                    >提交试卷</el-button
                >
            </div>

            <div class="m-exam-op">
                <Fav
                    style="padding-top: 9px; padding-bottom: 9px"
                    post-type="paper"
                    :post-id="id"
                />
                <el-button
                    v-if="isAuthor"
                    type="primary"
                    plain
                    size="small"
                    icon="el-icon-edit-outline"
                    @click="edit"
                    >编辑</el-button
                >
                <el-button
                    v-if="isAdmin"
                    type="warning"
                    plain
                    size="small"
                    icon="el-icon-circle-close"
                    @click="check('restore')"
                    >复审</el-button
                >
                <el-button
                    v-if="isAdmin"
                    type="danger"
                    plain
                    size="small"
                    icon="el-icon-delete"
                    @click="check('delete')"
                    >删除</el-button
                >
            </div>
        </div>
        <div class="m-exam-comment">
            <el-divider content-position="left">讨论</el-divider>
            <Comment :id="id" category="paper" />
        </div>
    </div>
</template>

<script>
import { axios, realUrl } from "@/service/api.js";
import { __next } from "@jx3box/jx3box-common/data/jx3box.json";
import { JX3BOX } from "@jx3box/jx3box-common";
import User from '@jx3box/jx3box-common/js/user'
import { showAvatar, authorLink } from "@jx3box/jx3box-common/js/utils";
import Article from "@jx3box/jx3box-editor/src/Article.vue";
import { postStat } from "@/service/stat.js";
import Comment from "@jx3box/jx3box-comment-ui/src/Comment.vue";
import { checkPaper } from "@/service/admin.js";
import { $next } from "@/service/axios.js";
export default {
    name: "TakeExam",
    components: {
        Comment,
        Article,
    },
    data() {
        return {
            examid: -1,
            views: -1,
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
            authorAvatarUrl: "", // 这个url还没处理过

            correctCount: -1,
            score: -1,
            correctAnswers: {},
            eachCorrectiveness: {},
            whyami: {},
            sharingTitle: "试卷",

            isAdmin: User.getInfo().group > 60,
            author_id: "",
        };
    },
    computed: {
        paperAuthorAvatar() {
            return showAvatar(this.authorAvatarUrl, "s");
        },
        paperAuthorLink() {
            return authorLink(this.examInfo.authorId);
        },
        id: function () {
            return this.$route.params.id;
        },
        isAuthor: function () {
            return User.isLogin() && User.getInfo().uid == this.author_id;
        },
    },
    watch: {
        userAnswers: {
            handler(newVal, oldValue) {
                if (
                    Object.keys(this.generateFinalAnswer().finalAnswers)
                        .length !== 0
                ) {
                    // 这个时候判断是否登录
                    if (location.hostname != "localhost") {
                        this.checkLogin();
                    }
                }
            },
            deep: true,
        },
    },
    mounted() {
        // 不先判断是否登录
        // if (location.hostname != "localhost"){
        //     this.checkLogin();
        // }else{
        //     this.getExamInfo();
        // }
        // this.getSolution()
        this.getExamInfo();
        if (this.$route.name == "exam-take") {
            postStat("paper", this.$route.params.id);
        }
    },
    methods: {
        checkLogin() {
            if (!User.isLogin()) {
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
        getAuthorAvatar(uid) {
            axios(`https://server.jx3box.com/user/info?uid=${uid}`, "GET")
                .then((response) => {
                    this.authorAvatarUrl = response.data.avatar;
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        getExamInfo() {
            // if (this.id) {

            // } else {
            //     this.$message.error("试卷不存在！");
            //     setTimeout(() => {
            //         this.$router.replace("/list");
            //     }, 2000);
            //     return false;
            // }

            this.examid = this.id;
            let params = this.$route.params;
            if (params) {
                this.examInfo = params.examInfo;
            }

            // 获取试卷信息
            this.loading = true;

            $next
                .get("api/question/user-exam-paper/" + this.examid + "?details")
                .then((response) => {
                    response = response.data;
                    // if (!response.id) {
                    //     this.$message.error("试卷不存在！");
                    //     setTimeout(() => {
                    //         this.$router.replace("/list");
                    //     }, 1000);
                    //     return false;
                    // }
                    this.examid = response.id;
                    this.author_id = response.createUserId;

                    // 获取角标的中文
                    let tmpMark = null;
                    this.marks.forEach((mark) => {
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
                        author: response.createUser,
                        authorId: response.createUserId,
                    };
                    // this.getAuthorAvatar(response.createUserId);
                    this.questionIdList = response.questionIdList;
                    let questions = response.questionDetailList;

                    let tmpUserAnswers = {};
                    questions.forEach((question) => {
                        if (question.type === "checkbox") {
                            tmpUserAnswers[question.id] = [];
                        } else {
                            tmpUserAnswers[question.id] = null;
                        }
                    });
                    this.userAnswers = tmpUserAnswers;

                    this.questionList = questions;
                    this.questionCount = this.questionIdList.length;

                    this.sharingTitle = this.examInfo
                        ? this.examInfo.title
                        : "试卷";

                    this.getStats();

                    // // this.currentQuestionNumber = 1;
                    // if (this.questionList[0].type === "checkbox") {
                    //     this.chosenOptions = [];
                    // } else {
                    //     this.chosenOptions = null;
                    // }
                    // this.loadQuestion();
                })
                .catch((e) => {
                    console.log(e);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        getStats() {
            let getStatsUrl = realUrl(__next, "api/summary-any/paper-");
            getStatsUrl += this.examid;
            getStatsUrl += "/stat";
            axios(getStatsUrl, "GET", true)
                .then((response) => {
                    if ("views" in response) {
                        this.views = response.views;
                    }
                })
                .catch((e) => {
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
                });
        },
        postStats() {
            let postStatsUrl = realUrl(__next, "api/summary-any/paper-");
            postStatsUrl += this.examid;
            postStatsUrl += "?type=paper&actions=views";
            axios(postStatsUrl, "GET", true)
                .then((response) => {})
                .catch((e) => {
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
                });
        },
        generateFinalAnswer() {
            // 拼接最终答案
            let finalAnswers = {};
            let isFinished = true;
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
                        finalAnswers[key] = value.map((optionIndex) => {
                            return options[optionIndex];
                        });
                    }
                } else {
                    finalAnswers[key] = [options[value]];
                }
            }

            return {
                finalAnswers: finalAnswers,
                isFinished: isFinished,
            };
        },
        preSubmitPaper() {
            // 提交试卷前的检查
            let generatedResult = this.generateFinalAnswer();
            let finalAnswers = generatedResult.finalAnswers;
            let isFinished = generatedResult.isFinished;

            // 如果有空的题目，提示是否要直接提交。但是不允许提交空白试卷
            if (!isFinished) {
                this.$confirm(
                    "还没有完成所有题目的作答，是否继续答题？",
                    "提示",
                    {
                        cancelButtonText: "继续答题",
                        confirmButtonText: "不管了，我要交卷",
                        type: "warning",
                    }
                )
                    .then(() => {
                        if (Object.keys(finalAnswers).length === 0) {
                            this.$alert("不能交白卷哦~", "提交失败", {
                                type: "error",
                            });
                        } else {
                            this.submitPaper(finalAnswers, true);
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
        submitPaper(answers, force = false) {
            this.$confirm(
                "提交试卷后将无法再修改作答，且每套试卷只能作答一次。是否确定提交？",
                "提示",
                {
                    cancelButtonText: "我再看看",
                    confirmButtonText: "确定提交",
                    type: "warning",
                }
            )
                .then(() => {
                    this.isSubmitted = true;
                    this.loading = true;
                    let postUrl = realUrl(
                        __next,
                        `api/question/user-exam-paper/${this.examid}/i-finish-all`
                    );
                    if (force) {
                        postUrl += "?force";
                    }
                    axios(postUrl, "POST", true, answers)
                        .then((response) => {
                            if (response.score) {
                                this.correctCount =
                                    response.score.questionRightCount;
                                this.sharingTitle = `我在${this.examInfo.title}中取得了${response.score.score}分的好成绩，你也快来试试吧！`;
                                this.score = response.score.score;
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
                        .catch((e) => {
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
                .then((response) => {
                    // console.log(response);
                    if (response.paper && response.paper.questionDetailList) {
                        // 展示答案，是否正确，已经给选项标上是否正确的标记
                        let qda = response.paper.questionDetailList;
                        let tmpAnswerList = {};
                        let tmpCorrectiveness = {};
                        let tmpWhyami = {};
                        qda.forEach((question) => {
                            tmpAnswerList[question.id] = question.answerList;
                            tmpCorrectiveness[question.id] =
                                question.myAnswer !== undefined &&
                                question.answerList.sort().toString() ===
                                    question.myAnswer.sort().toString();
                            tmpWhyami[question.id] = question.whyami;
                        });
                        this.correctAnswers = tmpAnswerList;
                        this.eachCorrectiveness = tmpCorrectiveness;
                        this.whyami = tmpWhyami;
                    }
                })
                .catch((e) => {
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
        },
        userAnswerDisplayString(qid) {
            let ans = this.userAnswers[qid];
            if (ans === null) {
                return "未作答";
            }
            if (typeof ans !== "number") {
                return ans
                    .map((each) => {
                        return String.fromCharCode(65 + each);
                    })
                    .join("");
            } else {
                return String.fromCharCode(65 + ans);
            }
        },
        getQAuthorLink(aid) {
            return authorLink(aid);
        },

        // // 改变题目时，保存并读取用户已经选择的选项
        // loadQuestionUserAnswer() {

        // }

        check: function (action) {
            if (action == "delete") {
                this.$alert("确定删除吗", "消息", {
                    confirmButtonText: "确定",
                    callback: (pop) => {
                        if (pop == "confirm") {
                            checkPaper(this.id, action).then((res) => {
                                this.$message({
                                    message: res.data.msg || "操作成功",
                                    type: "success",
                                });
                                location.reload();
                            });
                        }
                    },
                });
            } else {
                checkPaper(this.id, action).then((res) => {
                    this.$message({
                        message: res.data.msg || "操作成功",
                        type: "success",
                    });
                    location.reload();
                });
            }
        },
        edit: function () {
            location.href =
                "https://www.jx3box.com/dashboard/publish/#/exam/paper/" +
                this.id;
        },
    },
};
</script>

<style lang="less">
@import "../../assets/css/takeexam.less";
</style>
