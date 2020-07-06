<template>
    <div class="c-exam">
        <h1 class="c-exam-title">试卷列表</h1>
        <!-- TODO: 改为级联选择器？ -->
        <el-input placeholder="可选，输入试卷名称" v-model="nameSearch" class="c-exam-filter">
            <el-select
                v-model="tagSearch"
                filterable
                allow-create
                default-first-option
                placeholder="可以选择或输入试卷标签"
                slot="prepend"
            >
                <el-option-group
                    v-for="group in tagOptions"
                    :key="group.label"
                    :label="group.label"
                >
                    <el-option
                        v-for="item in group.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-option-group>
            </el-select>

            <el-button slot="append" icon="el-icon-search" @click="searchWithQuery"></el-button>
        </el-input>

        <el-table
            class="c-exam-list"
            :data="listData"
            style="width: 100%"
            @sort-change="handleSort"
            v-loading="loading"
            @row-click="takeExam"
        >
            <el-table-column prop="id" label="编号" width="60"></el-table-column>
            <el-table-column prop="title" label="标题" width="300">
                <template slot-scope="scope">
                    <span>{{ scope.row.title }}</span>
                    <i class="u-mark bg-magenta" v-if="scope.row.corner">{{ scope.row.corner }}</i>
                    <i class="u-mark bg-black" v-if="scope.row.category">{{ scope.row.category }}</i>
                </template>
            </el-table-column>
            <el-table-column prop="desc" label="描述" class="test-class" width="240"></el-table-column>
            <el-table-column prop="tags" label="标签" width="180">
                <template slot-scope="scope">
                    <el-tag v-for="tag of JSON.parse(scope.row.tags).slice(0,3)" :key="tag">{{tag}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="medalAward" label="奖励" width="180"></el-table-column>
            <!-- <el-table-column prop="hasTaken" label="已完成" width="90">
                <template slot-scope="prop">{{prop.hastaken ? "是" : "否"}}</template>
            </el-table-column>-->
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click.native.stop="handleEdit(scope.$index, scope.row)"
                    >编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click.native.stop="handleDelete(scope.$index, scope.row)"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            class="c-exam-pages"
            background
            :hide-on-single-page="true"
            @current-change="changePage"
            :current-page.sync="page"
            layout="total, prev, pager, next, jumper"
            :total="total"
            :page-size="pageSize"
        ></el-pagination>
    </div>
</template>

<script>
import { axios } from "@/service/api.js";
import { __next } from "@jx3box/jx3box-common/js/jx3box.json";
export default {
    name: "ExamList",
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
        this.getExamList();
    },
    methods: {
        getExamList() {
            this.fetchData();
        },
        fetchData(page = 1) {
            window.scrollTo(0, 0);
            let url = __next + "api/question/user-exam-paper"
            // let url = "/api/question/user-exam-paper";
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
@import "../../assets/css/examlist.less";
</style>