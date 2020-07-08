<template>
    <div class="c-question-list">
        
    </div>
</template>

<script>
import { axios, realUrl } from "@/service/api.js";
import { __next } from "@jx3box/jx3box-common/js/jx3box.json";
export default {
    name: 'QuestionList',
    components: {
        // HelloWorld
    },
    data() {
        return {
            tagOptions: [
                {
                    label: "玩法",
                    options: [
                        { value: "PVE", label: "PVE" },
                        { value: "PVP", label: "PVP" },
                        { value: "PVX", label: "PVX" }
                    ]
                },
                {
                    label: "科目",
                    options: [
                        { value: "语文", label: "语文" },
                        { value: "数学", label: "数学" },
                        { value: "物理", label: "物理" },
                        { value: "化学", label: "化学" },
                        { value: "生物", label: "生物" },
                        { value: "历史", label: "历史" },
                        { value: "地理", label: "地理" },
                        { value: "政治", label: "政治" }
                    ]
                },
                {
                    label: "语种",
                    options: [
                        { value: "英语", label: "英语" },
                        { value: "日语", label: "日语" },
                        { value: "韩语", label: "韩语" },
                        { value: "其他外语", label: "其他外语" }
                    ]
                },
                {
                    label: "专业",
                    options: [
                        { value: "医学", label: "医学" },
                        { value: "法学", label: "法学" },
                        { value: "会计", label: "会计" }
                    ]
                },
                {
                    label: "生活技能",
                    options: [
                        { value: "缝纫", label: "缝纫" },
                        { value: "锻造", label: "锻造" },
                        { value: "烹饪", label: "烹饪" }
                    ]
                },
                {
                    label: "其他玩法",
                    options: [
                        { value: "抓马", label: "抓马" },
                        { value: "宠物", label: "宠物" },
                        { value: "副本", label: "副本" },
                        { value: "插件", label: "插件" }
                    ]
                }
            ],
            tagSearch: "",
            nameSearch: "",
            listData: [],
            loading: true,
            page: 0,
            total: 1,
            pageSize: 15,
            useQuery: false // 是否使用条件参数查询
        };
    },
    computed: {
        isName() {
            return false;
        }
    },
    mounted() {
        this.getQuestionList();
    },
    methods: {
        getQuestionList() {
            this.fetchData();
        },
        fetchData(page = 1) {
            window.scrollTo(0, 0);
            let url = realUrl(__next, "api/question/user-exam-paper")
            let query = { page: page };
            if (this.useQuery) {
                if (this.tagSearch !== "") {
                    query["tag"] = this.tagSearch;
                }
                if (this.nameSearch !== "") {
                    query["title"] = this.nameSearch;
                }
            }
            this.loading = true;
            axios(url, "GET", false, [], null, query)
                .then(response => {
                    console.log(response);
                    let page = response.page;
                    if (page.total) {
                        this.total = page.total;
                        this.pageSize = page.pageSize;
                    }
                    this.listData = response.data;
                })
                .catch(e => {
                    console.log(e);
                })
                .then(() => {
                    this.loading = false;
                });
        },
        filterMethod(node, keyword) {
            console.log(123);
            console.log(node);
            this.tagSearch = keyword;
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        handleSort({ prop, order }) {
            // 后端排序
            if (order) {
                this.orderBy = prop.replace("attributes.", "");
                this.order = order === "ascending" ? 1 : 0;
            } else {
                this.orderBy = undefined;
                this.order = undefined;
            }
        },
        takeExam(row, column, event) {
            let id = row.id;
            this.$router.push({
                name: "exam-take",
                params: { id: id, examInfo: row }
            });
        },
        changePage(i) {
            this.fetchData(i);
        },
        searchWithQuery() {
            this.useQuery = true
            this.fetchData(1)
        }
    }
};
</script>

<style lang="less">
@import "../../assets/css/questionlist.less";
</style>