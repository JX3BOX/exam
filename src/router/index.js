import Vue from "vue";
import VueRouter from "vue-router";

// const Index = () => import("../views/Index.vue");
// const Fn = () => import("../views/Fn.vue");

Vue.use(VueRouter);

const routes = [
    { name: "index", path: "/", component: () => import("../components/exam/ExamList.vue") },
    { name: "exam-list", path: "/list", component: () => import("../components/exam/ExamList.vue") },
    { name: "exam-take", path: "/paper/:id", component: () => import("../components/exam/TakeExam.vue") },
    { name: "exam-rank", path: "/paper/rank/:id", component: () => import("../components/exam/ExamRank.vue") },
    { name: "question-list", path: "/qlist", component: () => import("../components/question/QuestionList.vue") },
    { name: "question-take", path: "/question/:id", component: () => import("../components/question/TakeQuestion.vue") },
    { name: "question-specific", path: "/question/:id/admin", component: () => import("../components/question/Question.vue") }
];

const router = new VueRouter({
    routes,
});

export default router;
