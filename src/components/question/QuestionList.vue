<template>
    <div class="c-question">
        <h1 class="c-question-title">题目列表</h1>
        <el-input placeholder="可选，输入题目名称" v-model="nameSearch" class="c-question-filter" @change="searchWithQuery">
            <el-select
                v-model="tagSearch"
                filterable
                allow-create
                default-first-option
                placeholder="选择分类"
                slot="prepend"
                @change="searchWithQuery"
            >
                <el-option label="全部" value=""></el-option>
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
            class="c-question-list"
            :data="listData"
            style="width: 100%"
            @sort-change="handleSort"
            v-loading="loading"
            @row-click="takeQuestion"
        >
            <el-table-column prop="id" label="编号" width="60"></el-table-column>
            <el-table-column prop="title" label="标题">
                <template slot-scope="scope">
                    <span
                        class="c-question-list-title"
                    >{{ filteredTitle(scope.row.title) }}</span>
                    <!-- <i class="u-mark bg-magenta" v-if="scope.row.corner">{{ scope.row.corner }}</i>
                    <i class="u-mark bg-black" v-if="scope.row.category">{{ scope.row.category }}</i>
                    <p class="c-question-list-desc">{{ scope.row.desc }}</p>-->
                </template>
            </el-table-column>
            <!-- <el-table-column prop="desc" label="描述" class="test-class" width="240"></el-table-column> -->
            <el-table-column prop="tags" label="标签" width="180">
                <template slot-scope="scope">
                    <el-tag
                        v-for="tag of JSON.parse(scope.row.tags).slice(0,3)"
                        :key="tag"
                        size="small"
                    >{{tag}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="hardStar" label="难度" width="120">
                <template slot-scope="scope">
                    <el-rate v-model="scope.row.hardStar" disabled text-color="#ff9900"></el-rate>
                </template>
            </el-table-column>
            <el-table-column prop="author" label="出题人" width="180">
                <template slot-scope="scope">
                    {{ scope.row.createUser }}
                    <!-- <span
                        class="c-question-list-authorid"
                    >uid: {{scope.row.createUserId}}</span> -->
                </template>
            </el-table-column>
            <!-- <el-table-column prop="medalAward" label="奖励" width="120"></el-table-column>
            <el-table-column prop="hasTaken" label="已完成" width="90">
                <template slot-scope="prop">{{prop.history !== null ? "是" : "否"}}</template>
            </el-table-column>-->
            <!-- <el-table-column prop="ranking" label="排行榜" width="90">
                <template slot-scope="scope">
                    <el-button
                        @click.native.stop="gotoRanking(scope.row)"
                        type="text"
                        size="small"
                    >查看</el-button>
                </template>
            </el-table-column>-->
            <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                    <!-- @click.native.stop="handleEdit(scope.$index, scope.row)" -->
                    <el-button @click="handleEdit(scope.$index, scope.row)" type="primary">去答题</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            class="c-question-pages"
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
import { axios, realUrl } from "@/service/api.js";
import { __next } from "@jx3box/jx3box-common/js/jx3box.json";
export default {
    name: "QuestionList",
    components: {
        // HelloWorld
    },
    data() {
        return {
            tags: {
                school: [
                    "七秀",
                    "万花",
                    "五毒",
                    "长歌",
                    "天策",
                    "少林",
                    "明教",
                    "苍云",
                    "纯阳",
                    "唐门",
                    "藏剑",
                    "丐帮",
                    "蓬莱",
                    "凌雪"
                ],
                subject: [
                    "语文",
                    "数学",
                    "外语",
                    "信息",
                    "物理",
                    "化学",
                    "生物",
                    "政治",
                    "历史",
                    "地理"
                ],
                game: ["PVE", "PVP", "PVX", "PVBB"],
                play: ["副本", "宠物", "家园", "奇遇", "成就"],
                domain: ["美容", "金融", "医学", "法学"]
            },
            marks: [{ label: "官方试卷", value: "official" }],
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
        filteredTitle() {
            return title => {
                let reg = /<[^<>]+>/g;
                title = title.replace(reg, ""); //替换HTML标签
                title = title.replace(/&nbsp;/gi, ""); //替换HTML空格
                return title;
            };
        },
        tagOptions() {
            let translate = {
                game: "方向",
                play: "玩法",
                school: "门派",
                subject: "学科",
                domain: "领域"
            };
            let tmpOptions = [];
            // label options label value
            for (let key in translate) {
                tmpOptions.push({
                    label: translate[key],
                    options: this.tags[key].map(tag => {
                        return { label: tag, value: tag };
                    })
                });
            }
            return tmpOptions;
        }
    },
    mounted() {
        this.getQuestionList();
    },
    methods: {
        getQuestionList() {
            // console.log(this.$route);
            if (this.$route.params.tag) {
                this.tagSearch = this.$route.params.tag;
            }
            this.fetchData();
        },
        fetchData(page = 1) {
            window.scrollTo(0, 0);
            let url = realUrl(__next, "api/question/public-list");
            let query = { pageIndex: page };
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
                    // console.log(response);
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
            // console.log(node);
            this.tagSearch = keyword;
        },
        handleEdit(index, row) {
            // console.log(index, row);
        },
        handleDelete(index, row) {
            // console.log(index, row);
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
        takeQuestion(row, column, event) {
            // console.log(row.id);
            let id = row.id;
            this.$router.push({
                name: "question-take",
                params: { id: id, questionInfo: row }
            });
        },
        changePage(i) {
            this.fetchData(i);
        },
        searchWithQuery() {
            this.useQuery = true;
            this.fetchData(1);
        }
    }
};
</script>

<style lang="less">
@import "../../assets/css/questionlist.less";
</style>