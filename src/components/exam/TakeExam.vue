<template>
    <el-row class="c-exam-take">
        <el-col class="c-exam-take-main" :span="18">
            <div class="c-exam-take-title">
                <h1>{{examInfo.title}}</h1>
            </div>
            <div class="c-exam-take-content">
                <h3 class="q-text">1. 玩家(你)刚进入游戏，在稻香村受伤昏迷，被村民所救。之后你将跟随李复，一路闯荡江湖。请问这一年李复多少岁？</h3>
                <h4 class="q-hint">{{ isMultiple ? "多选题" : "单选题" }}</h4>
                <template v-if="isMultiple">
                    <el-checkbox-group v-model="chosenOptions">
                        <el-checkbox label="21岁" border></el-checkbox>
                        <el-checkbox label="22岁" border></el-checkbox>
                        <el-checkbox label="23岁" border></el-checkbox>
                        <el-checkbox label="24岁" border></el-checkbox>
                    </el-checkbox-group>
                </template>
                <template v-else>
                    <el-radio-group v-model="chosenOptions">
                        <el-radio label="1" border>21岁</el-radio>
                        <el-radio label="2" border>22岁</el-radio>
                        <el-radio label="3" border>23岁</el-radio>
                        <el-radio label="4" border>24岁</el-radio>
                    </el-radio-group>
                </template>
                <div class="c-exam-take-btn">
                    <el-button plain>上一题</el-button>
                    <el-button type="primary" style="float: right;">下一题</el-button>
                </div>
            </div>
        </el-col>
        <el-col class="c-exam-take-sidebar" :span="6">
            <h4 class="summary-title">共10题</h4>
            <div class="summary-mark">
                <el-radio-group v-model="currentQuestion">
                    <el-radio label="1" border :class="{'q-attemped': true}">1</el-radio>
                    <el-radio label="2" border>2</el-radio>
                    <el-radio label="3" border>3</el-radio>
                    <el-radio label="4" border>4</el-radio>
                    <el-radio label="5" border>5</el-radio>
                    <el-radio label="6" border>6</el-radio>
                    <el-radio label="7" border>7</el-radio>
                    <el-radio label="8" border>8</el-radio>
                    <el-radio label="9" border>9</el-radio>
                    <el-radio label="10" border>10</el-radio>
                </el-radio-group>
            </div>
        </el-col>
        <!-- <RightSidebar>
            <Extend />
        </RightSidebar>-->
    </el-row>
</template>

<script>
import Extend from "@/components/Extend.vue";
export default {
    name: "TakeExam",
    components: {
        // Extend
    },
    data() {
        return {
            examInfo: {},
            userAnswers: {},
            isMultiple: false,
            chosenOptions: [],
            currentQuestion: "1",
            questionCount: 10,
        };
    },
    computed: {
        isName() {
            return false;
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
            this.examInfo = params.examInfo;
            console.log(this.examInfo);
        },
        
    }
};
</script>

<style lang="less">
@import "../../assets/css/takeexam.less";
</style>