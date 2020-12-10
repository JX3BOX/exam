<template>
    <div class="c-take-question" v-loading="loading">
        <div class="c-take-question-content" v-if="currentQuestion">
            <h3 class="q-text">
                <i
                    v-if="isCorrect !== undefined"
                    :class="{
                        'el-icon-success': isCorrect === true,
                        'el-icon-error': isCorrect === false,
                    }"
                ></i>
                <Article :content="currentQuestion.title"></Article>
            </h3>

            <div class="q-attr">
                <span class="q-attr-hint">{{
                    isMultiple ? "多选题" : "单选题"
                }}</span>
                <el-rate
                    v-model="currentQuestion.hardStar"
                    disabled
                    text-color="#ff9900"
                    score-template="{value}"
                ></el-rate>
                <span class="q-attr-author">
                    提交人：
                    <el-link
                        :href="paperAuthorLink"
                        target="_blank"
                        :underline="false"
                    >
                        <el-avatar :src="paperAuthorAvatar"></el-avatar>
                        {{ currentQuestion.createUser }}
                    </el-link>
                </span>
                <span class="q-attr-author">
                    试卷标签：
                    <span class="c-exam-attr-value">
                        <el-tag
                            size="medium"
                            v-for="tag of JSON.parse(currentQuestion.tags)"
                            :key="tag"
                            >{{ tag }}</el-tag
                        >
                    </span>
                </span>
            </div>

            <template v-if="isMultiple">
                <el-checkbox-group v-model="chosenOptions">
                    <el-checkbox
                        v-for="(option, index) of JSON.parse(
                            currentQuestion.options
                        )"
                        :key="index"
                        :label="index"
                        border
                        :disabled="isSubmitted"
                        :class="{
                            'is-correct-answer': isCorrectAnswerClass(index),
                            'is-wrong-answer': isWrongAnswerClass(index),
                        }"
                    >
                        {{ String.fromCharCode(65 + index) }}.
                        <Article :content="option"></Article>
                    </el-checkbox>
                </el-checkbox-group>
            </template>
            <template v-else>
                <el-radio-group v-model="chosenOptions">
                    <el-radio
                        v-for="(option, index) of JSON.parse(
                            currentQuestion.options
                        )"
                        :key="index"
                        :label="index"
                        border
                        :disabled="isSubmitted"
                        :class="{
                            'is-correct-answer': isCorrectAnswerClass(index),
                            'is-wrong-answer': isWrongAnswerClass(index),
                        }"
                    >
                        {{ String.fromCharCode(65 + index) }}.
                        <Article :content="option"></Article>
                    </el-radio>
                </el-radio-group>
            </template>

            <div class="c-exam-take-btn">
                <el-button
                    type="success"
                    @click="preSubmitQuestion"
                    v-if="!isSubmitted && !loading && currentQuestion"
                    :disabled="
                        chosenOptions === null ||
                            JSON.stringify(chosenOptions) === '' ||
                            JSON.stringify(chosenOptions) === '[]'
                    "
                    >提交</el-button
                >
            </div>
            <div class="q-whyami" v-if="questionAnswer">
                <h3>解析</h3>
                <div
                    v-html="questionAnswer.whyami"
                    class="q-whyami-content"
                ></div>
            </div>

            <div class="m-exam-op" v-if="isAdmin">
                <Fav
                    style="padding-top:9px;padding-bottom:9px"
                    post-type="question"
                    :post-id="id"
                />
                <el-button
                    type="warning"
                    plain
                    size="small"
                    icon="el-icon-circle-close"
                    @click="check('restore')"
                    >复审</el-button
                >
                <el-button
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
            <el-divider content-position="left"
                ><i class="el-icon-chat-line-square"></i> 讨论</el-divider
            >
            <Comment :id="id" category="question" />
        </div>
    </div>
</template>

<script>
import { axios, realUrl } from "@/service/api.js";
import { __next } from "@jx3box/jx3box-common/js/jx3box.json";
import { JX3BOX, User } from "@jx3box/jx3box-common";
import Article from "@jx3box/jx3box-editor/src/Article.vue";
import { showAvatar, authorLink } from "@jx3box/jx3box-common/js/utils";
import { postStat } from "@/service/stat.js";
import Comment from "@jx3box/jx3box-comment-ui/src/Comment.vue";
import { checkQuestion } from "@/service/admin.js";
export default {
    name: "TakeQuestion",
    components: {
        Article,
        Comment,
    },
    data() {
        return {
            loading: false,
            chosenOptions: null,
            currentQuestion: null,
            questionid: null,
            showAnswer: false,
            isSubmitted: false,
            questionAnswer: null,
            correctAnswer: null,
            isCorrect: undefined,
            authorAvatarUrl: "", // 这个url还没处理过
            isAdmin: User.getInfo().group > 60,
        };
    },
    computed: {
        isMultiple() {
            return this.currentQuestion.type === "checkbox";
        },
        paperAuthorAvatar() {
            return showAvatar(this.authorAvatarUrl, "s");
        },
        paperAuthorLink() {
            return authorLink(this.currentQuestion.createUserId);
        },
        id() {
            return this.$route.params.id;
        },
    },
    mounted() {
        if (location.hostname != "localhost") this.checkLogin();

        // this.getQuestionId();
        // this.getUserInfo();
        if (this.$route.name == "question-take") {
            postStat("question", this.$route.params.id);
        }
    },
    methods: {
        checkLogin() {
            if (User.isLogin()) {
                this.getQuestionId();
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
        getAuthorAvatar(uid) {
            axios(`https://server.jx3box.com/user/info?uid=${uid}`, "GET")
                .then((response) => {
                    if (response.code === 10024) {
                        this.authorAvatarUrl = response.data.avatar;
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        getQuestionId() {
            if (this.$route.params.id) {
                // console.log(this.$route);
                this.questionid = this.$route.params.id;
                this.getQuestion();
            } else {
                this.$message.error("题目不存在！");
                setTimeout(() => {
                    this.$router.go("-1");
                }, 1000);
                return false;
            }
        },
        getQuestion() {
            this.loading = true;
            if (this.$route.params.questionInfo) {
                this.currentQuestion = this.$route.params.questionInfo;
                if (this.currentQuestion.type === "checkbox") {
                    this.chosenOptions = [];
                } else {
                    this.chosenOptions = null;
                }
                this.loading = false;
                this.getAuthorAvatar(this.currentQuestion.createUserId);
            } else {
                this.$message.error("进入方法非法！请从试题列表页重新进入");
                setTimeout(() => {
                    this.$router.replace("/qlist");
                }, 1000);
                return false;
            }

            // let getUrl = __next + "api/question/user-exam-paper/q/:questionId"
            // let getUrl = "/api/question/user-exam-paper/q/";
            // let getUrl = realUrl(__next, "api/question/");
            // getUrl += this.questionid;

            // axios(getUrl, "GET", true)
            //     .then(response => {
            //         console.log(response);
            //         if (!response.id) {
            //             this.$message.error("题目不存在！");
            //             setTimeout(() => {
            //                 this.$router.go("-1");
            //             }, 1000);
            //             return false;
            //         }
            //         this.currentQuestion = response;
            //         if (this.currentQuestion.type === "checkbox") {
            //             this.chosenOptions = [];
            //         } else {
            //             this.chosenOptions = null;
            //         }
            //         // this.examid = response.id;
            //         // this.examInfo = {
            //         //     category: response.category,
            //         //     corner: response.corner,
            //         //     desc: response.desc,
            //         //     medalAward: response.medalAward,
            //         //     title: response.title,
            //         //     tags: response.tags
            //         // };
            //         // this.questionIdList = response.questionIdList;
            //         // this.questionList = response.questionDetailList;
            //         // this.questionCount = this.questionIdList.length;

            //         // this.currentQuestionNumber = 1;
            //         // if (this.questionList[0].type === "checkbox") {
            //         //     this.chosenOptions = []
            //         // } else {
            //         //     this.chosenOptions = null
            //         // }
            //         // this.loadQuestion();
            //     })
            //     .catch(e => {
            //         console.log(e);
            //     })
            //     .then(() => {
            //         this.loading = false;
            //     });
        },
        preSubmitQuestion() {
            let answer = [];
            let value = this.chosenOptions;
            let options = JSON.parse(this.currentQuestion.options);
            if (value === null) {
                return false;
            } else if (typeof value !== "number") {
                if (value.length === 0) {
                    return false;
                } else {
                    answer = value.map((each) => {
                        return options[each];
                    });
                }
            } else {
                answer = [options[value]];
            }
            this.submitQuestion(answer);
        },
        submitQuestion(answer) {
            let postUrl = realUrl(
                __next,
                `api/question/user-exam-paper/q/${this.questionid}/answer`
            );
            this.isSubmitted = true;
            this.loading = true;
            axios(postUrl, "POST", true, answer)
                .then((response) => {
                    // console.log(response);
                    this.questionAnswer = response.question;
                    this.correctAnswer = response.question.answerList;
                    this.isCorrect = response.right;
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
        },
        isCorrectAnswerClass(idx) {
            if (this.correctAnswer) {
                return this.correctAnswer.includes(idx);
            } else {
                return false;
            }
        },
        isWrongAnswerClass(idx) {
            if (this.correctAnswer) {
                if (
                    !this.correctAnswer.includes(idx) &&
                    this.chosenOptions !== null
                ) {
                    if (this.chosenOptions === idx) {
                        return true;
                    } else if (typeof this.chosenOptions !== "number") {
                        return this.chosenOptions.includes(idx);
                    }
                }
            }
            return false;
        },

        check: function(action) {
            if (action == "delete") {
                this.$alert("确定删除吗", "消息", {
                    confirmButtonText: "确定",
                    callback: (pop) => {
                        if (pop == "confirm") {
                            checkQuestion(this.id, action).then((res) => {
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
                checkQuestion(this.id, action).then((res) => {
                    this.$message({
                        message: res.data.msg || "操作成功",
                        type: "success",
                    });
                    location.reload();
                });
            }
        },
    },
};
</script>

<style lang="less">
@import "../../assets/css/takequestion.less";
</style>
