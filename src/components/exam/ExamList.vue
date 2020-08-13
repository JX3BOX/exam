<template>
    <div class="c-exam">
        <h1 class="c-exam-title">试卷列表</h1>
        <el-input placeholder="可选，输入试卷名称" v-model="nameSearch" class="c-exam-filter" @change="searchWithQuery">
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

        <div class="c-exam-list">
            <el-card
                :body-style="{ padding: '0px', position: 'relative', height: '100%' }"
                v-for="exam of listData"
                :key="exam.id"
                :class="{'el-card__transparent': exam.history && exam.history !== null}"
                shadow="hover"
                @click.native.stop="takeExam(exam.id, exam)"
                :style="{'--tc': themeColor(exam.style), '--tct': themeColorTransparent(exam.style)}" 
            >
                <div class="c-exam-list-corner" v-if="exam.corner !== ''">{{ corner(exam.corner) }}</div>
                <div class="c-exam-list-main">
                    <div class="c-exam-list-title">{{ exam.title }}</div>
                    <el-tag
                        v-for="tag of JSON.parse(exam.tags).slice(0,3)"
                        :key="tag"
                        size="small"
                    >{{tag}}</el-tag>
                </div>
                <div class="c-exam-list-desc">
                    <div class="c-exam-list-desc-content">
                        <img svg-inline src="../../assets/img/logo.svg" />
                        <div>{{ exam.desc }}</div>
                    </div>
                    <div class="c-exam-list-desc-misc">
                        <div class="desc-misc-left">出卷人：{{ exam.createUser }}</div>
                        <div class="desc-misc-right">
                            难度：
                            <el-rate v-model="exam.hardStar" disabled text-color="#ff9900"></el-rate>
                        </div>
                    </div>
                </div>
            </el-card>
        </div>

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
import { axios, realUrl } from "@/service/api.js";
import { __next } from "@jx3box/jx3box-common/js/jx3box.json";
export default {
    name: "ExamList",
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
            styleColor: {
                default: '#2682ea',
                green: '#66d362',
                orange: '#f49e40',
                red: '#ed4948',
                purple: '#8a52f1'
            },
            // themeColor: '#2682ea',
            // themeColorTransparent: '#2682ea00',
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
        },
        // 获取角标的中文
        corner() {
            return engCorner => {
                if (engCorner === "") {
                    return "";
                }
                let tmpCorner = null;
                this.marks.forEach(mark => {
                    if (mark.value === engCorner) {
                        tmpCorner = mark.label;
                    }
                });
                return tmpCorner;
            };
        },
        themeColor() {
            return styleName => {
                if (styleName === '') {
                    return this.styleColor.default
                } else {
                    return this.styleColor[styleName]
                }
            }
        },
        themeColorTransparent() {
            return styleName => {
                if (styleName === '') {
                    return this.styleColor.default + '00'
                } else {
                    return this.styleColor[styleName] + '00'
                }
            }
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
            let url = realUrl(__next, "api/question/user-exam-paper");
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
        takeExam(id, examInfo) {
            // console.log(examInfo)
            this.$router.push({
                name: "exam-take",
                params: { id: id, examInfo: examInfo }
            });
        },
        changePage(i) {
            this.fetchData(i);
        },
        searchWithQuery() {
            this.useQuery = true;
            this.fetchData(1);
        },
        gotoRanking(row) {
            this.$router.push({
                name: "exam-rank",
                params: { id: row.id, examInfo: row }
            });
        }
    }
};
</script>

<style lang="less">
@import "../../assets/css/examlist.less";
</style>