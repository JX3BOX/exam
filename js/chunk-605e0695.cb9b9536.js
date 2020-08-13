(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-605e0695"],{"01dd":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"c-exam-take"},[s("div",{staticClass:"c-exam-take-main"},[s("div",{staticClass:"c-exam-take-title"},[s("h1",[t._v(" 《"+t._s(t.examInfo?t.examInfo.title:"试卷")+"》 ")])]),t.examInfo?s("div",{staticClass:"c-exam-take-attr"},[s("h3",[t._v(t._s(t.examInfo.desc))]),s("p",{staticClass:"c-exam-attr-content"},[s("span",{staticClass:"c-exam-attr-prop"},[t._v("出卷人：")]),s("span",{staticClass:"c-exam-attr-value"},[s("el-link",{attrs:{href:t.paperAuthorLink,target:"_blank",underline:!1}},[s("el-avatar",{attrs:{src:t.paperAuthorAvatar}}),t._v(" "+t._s(t.examInfo.author)+" ")],1)],1)]),t.examInfo.tags?s("p",{staticClass:"c-exam-attr-content"},[s("span",{staticClass:"c-exam-attr-prop"},[t._v("试卷标签：")]),s("span",{staticClass:"c-exam-attr-value"},t._l(JSON.parse(t.examInfo.tags),(function(e){return s("el-tag",{key:e,attrs:{size:"medium"}},[t._v(t._s(e))])})),1)]):t._e(),t._m(0),t.views>=0?s("span",{staticClass:"u-views"},[s("i",{staticClass:"el-icon-view"},[t._v(" "+t._s(t.views))])]):t._e(),s("QRcode"),s("span",{staticStyle:{"margin-left":"10px"}},[t.score>=0?s("Sharing",{key:"beforeTest",attrs:{title:t.sharingTitle,img:"./assets/img/100.svg"}}):s("Sharing",{key:"afterTest",attrs:{title:t.sharingTitle,img:"./assets/img/100.svg"}})],1)],1):t._e(),-1!==t.score?s("div",{staticClass:"c-exam-take-result"},[s("p",{staticClass:"result-score"},[t._v(t._s(t.score))]),s("p",{staticClass:"result-text"},[t._v("本次得分")])]):t._e(),t.questionList.length>0?t._l(t.questionList,(function(e,a){return s("div",{key:a,staticClass:"question-row"},[s("el-card",{staticClass:"box-card"},[s("div",{staticClass:"card-header"},[s("div",{staticClass:"card-header-left"},[t._v(t._s(a+1))]),s("div",{staticClass:"card-header-right"},[s("span",{staticClass:"q-attr-value"},t._l(JSON.parse(e.tags),(function(e){return s("el-tag",{key:e,attrs:{size:"small"}},[t._v(t._s(e))])})),1)])]),s("div",{staticClass:"c-exam-take-content"},[s("h3",{staticClass:"q-text"},[s("span",{staticClass:"q-hint"},[t._v("["+t._s("checkbox"===e.type?"多选题":"单选题")+"]")]),s("Article",{attrs:{content:e.title}})],1),"checkbox"===e.type?[s("el-checkbox-group",{model:{value:t.userAnswers[e.id],callback:function(s){t.$set(t.userAnswers,e.id,s)},expression:"userAnswers[question.id]"}},t._l(JSON.parse(e.options),(function(a,r){return s("el-checkbox",{key:r,class:{"is-correct-answer":t.isCorrectAnswerClass(e.id,r),"is-wrong-answer":t.isWrongAnswerClass(e.id,r)},attrs:{label:r,border:"",disabled:t.isSubmitted}},[t._v(" "+t._s(String.fromCharCode(65+r))+". "),s("Article",{attrs:{content:a}})],1)})),1)]:[s("el-radio-group",{model:{value:t.userAnswers[e.id],callback:function(s){t.$set(t.userAnswers,e.id,s)},expression:"userAnswers[question.id]"}},t._l(JSON.parse(e.options),(function(a,r){return s("el-radio",{key:r,class:{"is-correct-answer":t.isCorrectAnswerClass(e.id,r),"is-wrong-answer":t.isWrongAnswerClass(e.id,r)},attrs:{label:r,border:"",disabled:t.isSubmitted}},[t._v(" "+t._s(String.fromCharCode(65+r))+". "),s("Article",{attrs:{content:a}})],1)})),1)],s("div",{staticClass:"q-attr"},[s("p",{staticClass:"q-attr-content"},[s("span",{staticClass:"q-attr-prop"},[t._v("出题人：")]),s("span",{staticClass:"q-attr-value"},[s("el-link",{attrs:{href:t.getQAuthorLink(e.createUserId),target:"_blank"}},[t._v(t._s(e.createUser))])],1)]),s("p",{staticClass:"q-attr-content"},[s("span",{staticClass:"q-attr-prop"},[t._v("难度：")]),s("span",{staticClass:"q-attr-value"},[s("el-rate",{attrs:{disabled:"","text-color":"#ff9900"},model:{value:e.hardStar,callback:function(s){t.$set(e,"hardStar",s)},expression:"question.hardStar"}})],1)])])],2)]),void 0!==t.eachCorrectiveness[e.id]?s("el-card",{staticClass:"box-card-result"},[null===t.userAnswers[e.id]?s("p",{staticClass:"card-result-status",staticStyle:{color:"#F12E2E"}},[t._v("未作答")]):t.eachCorrectiveness[e.id]?s("p",{staticClass:"card-result-status",staticStyle:{color:"#18CA4E"}},[t._v("回答正确")]):s("p",{staticClass:"card-result-status",staticStyle:{color:"#F12E2E"}},[t._v("回答错误")]),s("p",{staticClass:"card-result-options"},[t._v("你的答案："+t._s(t.userAnswerDisplayString(e.id)))]),s("p",{staticClass:"card-result-options"},[t._v("正确答案："+t._s(t.correctAnswers[e.id].map((function(t){return String.fromCharCode(65+t)})).join("")))]),s("el-divider"),s("p",{staticStyle:{color:"#2682EA","font-size":"20px","font-weight":"800"}},[t._v("解析：")]),s("Article",{attrs:{content:t.whyami[e.id]}})],1):t._e()],1)})):t._e(),s("div",{staticClass:"c-exam-take-btn"},[!t.isSubmitted&&!t.loading&&t.questionList.length>0?s("el-button",{attrs:{type:"success"},on:{click:t.preSubmitPaper}},[t._v("提交试卷")]):t._e()],1)],2)])},r=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("p",{staticClass:"c-exam-attr-content",staticStyle:{"margin-top":"-8px"}},[s("span",{staticClass:"c-exam-attr-prop"},[t._v("总共题数：")]),s("span",{staticClass:"c-exam-attr-value"},[t._v("共10题，每题10分，满分100分。")])])}],i=(s("99af"),s("4160"),s("caad"),s("a15b"),s("d81d"),s("b64b"),s("d3b7"),s("ac1f"),s("25f0"),s("2532"),s("5319"),s("159b"),s("408b")),n=s("64c7"),o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"m-extend"},["single"==t.mode?s("single_side"):s("list_side")],1)},c=[],l=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"m-list-side"},[s("RightSideMsg",[s("em",[t._v("家园玩法交流群")]),t._v(" : "),s("strong",[s("a",{attrs:{href:"https://jq.qq.com/?_wv=1027&k=InbtJGcw"}},[t._v("658035079")])])]),s("div",{staticClass:"m-side-rank"},[s("h3",{staticClass:"c-sidebar-right-title"},[s("svg",{class:"u-icon",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512","svg-inline":"",role:"presentation",focusable:"false",tabindex:"-1"}},[s("g",{attrs:{fill:"#ffa91e"}},[s("path",{attrs:{d:"M324.891 167.266l16.262 94.815L256 217.314l-85.153 44.767 16.262-94.815-68.891-67.16 95.205-13.833L256 0l42.577 86.273 95.205 13.833z"}}),s("path",{attrs:{d:"M409.944 253.46v87.673L256.9 403.303l-.9-.36-153.944-61.76V253.46L256 315.219z"}}),s("path",{attrs:{d:"M409.944 362.157v87.673L256.9 512l-.9-.36-153.944-61.76v-87.723L256 423.916z"}})]),s("g",{attrs:{fill:"#ff8900"}},[s("path",{attrs:{d:"M341.153 262.081L256 217.314V0l42.577 86.273 95.205 13.833-68.891 67.16zM409.944 253.46v87.673L256.9 403.303l-.9-.36v-87.724zM256 423.916l153.944-61.759v87.673L256.9 512l-.9-.36z"}})])]),t._v(" 最高花价 "),s("router-link",{staticClass:"u-more",attrs:{to:"/rank"}},[t._v("完整榜单 »")])],1)]),s("div",{staticClass:"m-side-links"},[s("h3",{staticClass:"c-sidebar-right-title"},[s("svg",{class:"u-icon",attrs:{height:"512",viewBox:"0 0 512 512",width:"512",xmlns:"http://www.w3.org/2000/svg","svg-inline":"",role:"presentation",focusable:"false",tabindex:"-1"}},[s("path",{attrs:{d:"M256 256h85.333v21.333C341.333 300.897 360.436 320 384 320s42.667-19.103 42.667-42.667V256H512V42.667C512 19.103 492.897 0 469.333 0H256z",fill:"#dd636e"}}),s("path",{attrs:{d:"M469.333 0H384v320c23.564 0 42.667-19.103 42.667-42.667V256H512V42.667C512 19.103 492.897 0 469.333 0z",fill:"#d82e3d"}}),s("path",{attrs:{d:"M256 256v-85.333h21.333C300.897 170.667 320 151.564 320 128s-19.103-42.667-42.667-42.667H256V0H42.667C19.103 0 0 19.103 0 42.667V256z",fill:"#ffe646"}}),s("path",{attrs:{d:"M277.333 85.333H256V0H128v256h128v-85.333h21.333C300.898 170.667 320 151.564 320 128s-19.102-42.667-42.667-42.667z",fill:"#ffc81e"}}),s("path",{attrs:{d:"M256 256h-85.333v-21.333C170.667 211.102 151.564 192 128 192s-42.667 19.102-42.667 42.667V256H0v213.333C0 492.897 19.103 512 42.667 512H256z",fill:"#d49eee"}}),s("path",{attrs:{d:"M256 512V256h-85.333v-21.333C170.667 211.103 151.564 192 128 192v320z",fill:"#b77ede"}}),s("path",{attrs:{d:"M256 256v85.333h-21.333C211.102 341.333 192 360.436 192 384s19.102 42.667 42.667 42.667H256V512h213.333C492.897 512 512 492.897 512 469.333V256z",fill:"#badc1e"}}),s("path",{attrs:{d:"M384 512h85.333C492.897 512 512 492.897 512 469.333V256H384z",fill:"#73be14"}}),s("path",{attrs:{d:"M341.333 249v28.333C341.333 300.897 360.436 320 384 320s42.667-19.103 42.667-42.667V249z",fill:"#dd636e"}}),s("path",{attrs:{d:"M384 246v74c23.564 0 42.667-19.103 42.667-42.667V246z",fill:"#d82e3d"}})]),t._v(" 相关链接 ")]),t._m(0)])],1)},u=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"c-sidebar-right-list"},[s("a",{staticClass:"u-item",attrs:{href:"https://www.jx3box.com/tool/13948/",target:"_blank"}},[t._v("如何导出家园蓝图？")])])}],d={name:"list_side",props:[],data:function(){return{}},computed:{},methods:{},mounted:function(){},components:{}},f=d,h=s("2877"),m=Object(h["a"])(f,l,u,!1,null,null,null),p=m.exports,v=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},g=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"m-single-side"},[s("div",{attrs:{id:"directory"}})])}],b={name:"single_side",props:[],data:function(){return{}},computed:{},methods:{},filters:{},mounted:function(){}},_=b,w=Object(h["a"])(_,v,g,!1,null,null,null),C=w.exports,x={name:"Extend",props:[],data:function(){return{}},computed:{mode:function(){return this.$store.state.mode}},methods:{},mounted:function(){},components:{list_side:p,single_side:C}},k=x,A=(s("e1ea"),Object(h["a"])(k,o,c,!1,null,null,null)),y=(A.exports,s("ee8f")),S=s("85e4"),L=s("a974"),$=s("e494"),q={name:"TakeExam",components:{Article:L["a"]},data:function(){return{examid:-1,views:-1,loading:!0,examInfo:{title:"试卷"},marks:[{label:"官方试卷",value:"official"}],userAnswers:{},chosenOptions:null,questionCount:10,questionIdList:[],questionList:[],currentQuestionNumber:1,isSubmitted:!1,authorAvatarUrl:"",correctCount:-1,score:-1,correctAnswers:{},eachCorrectiveness:{},whyami:{},sharingTitle:"试卷"}},computed:{paperAuthorAvatar:function(){return Object(S["showAvatar"])(this.authorAvatarUrl,"s")},paperAuthorLink:function(){return Object(S["authorLink"])(this.examInfo.authorId)}},watch:{},mounted:function(){this.checkLogin(),Object($["a"])("paper",this.$route.params.id)},methods:{checkLogin:function(){y["User"].isLogin()?this.getExamInfo():(this.$message.error("请先登录"),y["User"].destroy(),setTimeout((function(){y["User"].toLogin()}),1e3))},getAuthorAvatar:function(t){var e=this;Object(i["a"])("https://server.jx3box.com/user/info?uid=".concat(t),"GET").then((function(t){10024===t.code&&(e.authorAvatarUrl=t.data.avatar)})).catch((function(t){console.log(t)}))},getExamInfo:function(){var t=this;if(!this.$route.params.id)return this.$message.error("试卷不存在！"),setTimeout((function(){t.$router.replace("/list")}),2e3),!1;this.examid=this.$route.params.id;var e=this.$route.params;e&&(this.examInfo=e.examInfo),this.loading=!0;var s=Object(i["b"])(n["__next"],"api/question/user-exam-paper/");s+=this.examid,s+="?details",Object(i["a"])(s,"GET",!0).then((function(e){if(!e.id)return t.$message.error("试卷不存在！"),setTimeout((function(){t.$router.replace("/list")}),1e3),!1;t.examid=e.id;var s=null;t.marks.forEach((function(t){t.value===e.corner&&(s=t.label)})),t.examInfo={category:e.category,corner:s,desc:e.desc,medalAward:e.medalAward,title:e.title,tags:e.tags,author:e.createUser,authorId:e.createUserId},t.getAuthorAvatar(e.createUserId),t.questionIdList=e.questionIdList;var a=e.questionDetailList,r={};a.forEach((function(t){"checkbox"===t.type?r[t.id]=[]:r[t.id]=null})),t.userAnswers=r,t.questionList=a,t.questionCount=t.questionIdList.length,t.sharingTitle=t.examInfo?t.examInfo.title:"试卷",t.postStats(),t.getStats()})).catch((function(e){switch(e.code){case-1:t.$message.error(e.msg);break;case 404:t.loading=!0,t.$message.error("试卷不存在！"),setTimeout((function(){t.$router.replace("/list")}),1e3);break;case 9999:t.$message.error("登录失效, 请重新登录"),y["User"].destroy(),setTimeout((function(){y["User"].toLogin()}),1e3);break;default:t.$message.error("[".concat(e.code,"]").concat(e.msg))}})).then((function(){t.loading=!1}))},getStats:function(){var t=this,e=Object(i["b"])(n["__next"],"api/summary-any/paper-");e+=this.examid,e+="/stat",Object(i["a"])(e,"GET",!0).then((function(e){"views"in e&&(t.views=e.views)})).catch((function(e){switch(e.code){case-1:t.$message.error(e.msg);break;case 9999:t.$message.error("登录失效, 请重新登录"),y["User"].destroy(),setTimeout((function(){y["User"].toLogin()}),1e3);break;default:t.$message.error("[".concat(e.code,"]").concat(e.msg))}}))},postStats:function(){var t=this,e=Object(i["b"])(n["__next"],"api/summary-any/paper-");e+=this.examid,e+="?type=paper&actions=views",Object(i["a"])(e,"GET",!0).then((function(t){})).catch((function(e){switch(e.code){case-1:t.$message.error(e.msg);break;case 9999:t.$message.error("登录失效, 请重新登录"),y["User"].destroy(),setTimeout((function(){y["User"].toLogin()}),1e3);break;default:t.$message.error("[".concat(e.code,"]").concat(e.msg))}}))},preSubmitPaper:function(){var t=this,e={},s=!0,a=function(a){for(var r=t.userAnswers[a],i=[],n=0;n<t.questionList.length;++n)if(t.questionList[n].id==a){i=t.questionList[n].options;break}i=JSON.parse(i),null===r?s=!1:"number"!==typeof r?0===r.length?s=!1:e[a]=r.map((function(t){return i[t]})):e[a]=[i[r]]};for(var r in this.userAnswers)a(r);s?this.submitPaper(e):this.$confirm("还没有完成所有题目的作答，是否继续答题？","提示",{cancelButtonText:"继续答题",confirmButtonText:"不管了，我要交卷",type:"warning"}).then((function(){0===Object.keys(e).length?t.$alert("不能交白卷哦~","提交失败",{type:"error"}):t.submitPaper(e,!0)})).catch((function(){return!1}))},submitPaper:function(t){var e=this,s=arguments.length>1&&void 0!==arguments[1]&&arguments[1];this.$confirm("提交试卷后将无法再修改作答，且每套试卷只能作答一次。是否确定提交？","提示",{cancelButtonText:"我再看看",confirmButtonText:"确定提交",type:"warning"}).then((function(){e.isSubmitted=!0,e.loading=!0;var a=Object(i["b"])(n["__next"],"api/question/user-exam-paper/".concat(e.examid,"/i-finish-all"));s&&(a+="?force"),Object(i["a"])(a,"POST",!0,t).then((function(t){t.score?(e.correctCount=t.score.questionRightCount,e.sharingTitle="我在".concat(e.examInfo.title,"中取得了").concat(t.score.score,"分的好成绩，你也快来试试吧！"),e.score=t.score.score,window.scrollTo(0,0),e.getSolution()):(e.isSubmitted=!1,t.msg&&e.$message.error("[".concat(t.code,"]").concat(t.msg)))})).catch((function(t){switch(e.isSubmitted=!1,t.code){case-1:e.$message.error(t.msg);break;case 9999:e.$message.error("登录失效, 请重新登录"),y["User"].destroy(),setTimeout((function(){y["User"].toLogin()}),1e3);break;default:e.$message.error("[".concat(t.code,"]").concat(t.msg))}})).then((function(){e.loading=!1}))})).catch((function(){return!1}))},getSolution:function(){var t=this;this.loading=!0;var e=Object(i["b"])(n["__next"],"api/question/user-exam-paper/".concat(this.examid,"/i-need-answer"));Object(i["a"])(e,"GET",!0).then((function(e){if(e.paper&&e.paper.questionDetailList){var s=e.paper.questionDetailList,a={},r={},i={};s.forEach((function(t){a[t.id]=t.answerList,r[t.id]=void 0!==t.myAnswer&&t.answerList.sort().toString()===t.myAnswer.sort().toString(),i[t.id]=t.whyami})),t.correctAnswers=a,t.eachCorrectiveness=r,t.whyami=i}})).catch((function(e){switch(e.code){case-1:t.$message.error(e.msg);break;case 9999:t.$message.error("登录失效, 请重新登录"),y["User"].destroy(),setTimeout((function(){y["User"].toLogin()}),1e3);break;default:t.$message.error("[".concat(e.code,"]").concat(e.msg))}})).then((function(){t.loading=!1}))},isCorrectAnswerClass:function(t,e){return Object.keys(this.correctAnswers).length>0&&this.correctAnswers[t].includes(e)},isWrongAnswerClass:function(t,e){if(Object.keys(this.correctAnswers).length>0&&!this.correctAnswers[t].includes(e)&&null!==this.userAnswers[t]){if(this.userAnswers[t]===e)return!0;if("number"!==typeof this.userAnswers[t])return this.userAnswers[t].includes(e)}return!1},userAnswerDisplayString:function(t){var e=this.userAnswers[t];return null===e?"未作答":"number"!==typeof e?e.map((function(t){return String.fromCharCode(65+t)})).join(""):String.fromCharCode(65+e)},getQAuthorLink:function(t){return Object(S["authorLink"])(t)}}},E=q,j=(s("8b33"),Object(h["a"])(E,a,r,!1,null,null,null));e["default"]=j.exports},"159b":function(t,e,s){var a=s("da84"),r=s("fdbc"),i=s("17c2"),n=s("9112");for(var o in r){var c=a[o],l=c&&c.prototype;if(l&&l.forEach!==i)try{n(l,"forEach",i)}catch(u){l.forEach=i}}},"17c2":function(t,e,s){"use strict";var a=s("b727").forEach,r=s("a640"),i=s("ae40"),n=r("forEach"),o=i("forEach");t.exports=n&&o?[].forEach:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}},4160:function(t,e,s){"use strict";var a=s("23e7"),r=s("17c2");a({target:"Array",proto:!0,forced:[].forEach!=r},{forEach:r})},"8b33":function(t,e,s){"use strict";var a=s("fa8e"),r=s.n(a);r.a},a15b:function(t,e,s){"use strict";var a=s("23e7"),r=s("44ad"),i=s("fc6a"),n=s("a640"),o=[].join,c=r!=Object,l=n("join",",");a({target:"Array",proto:!0,forced:c||!l},{join:function(t){return o.call(i(this),void 0===t?",":t)}})},c56e:function(t,e,s){},d81d:function(t,e,s){"use strict";var a=s("23e7"),r=s("b727").map,i=s("1dde"),n=s("ae40"),o=i("map"),c=n("map");a({target:"Array",proto:!0,forced:!o||!c},{map:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}})},e1ea:function(t,e,s){"use strict";var a=s("c56e"),r=s.n(a);r.a},e494:function(t,e,s){"use strict";s.d(e,"a",(function(){return o}));var a=s("bc3a"),r=s.n(a),i=s("64c7");i["__next"];var n=i["__next"]+"api/summary-any/";function o(t,e){return r.a.get(n+t+"-"+e,{params:{type:t,actions:"views"}})}i["__next"]},fa8e:function(t,e,s){}}]);
//# sourceMappingURL=chunk-605e0695.cb9b9536.js.map