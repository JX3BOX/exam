(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9a547476"],{2777:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var s=n("bc3a"),i=n.n(s);n.d(e,"b",(function(){return i.a}));var r=n("64c7"),o=(i.a.create({baseURL:r["__server"],withCredentials:!0}),i.a.create({withCredentials:!0,baseURL:r["__next"]}))},3506:function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"c-take-question"},[t.currentQuestion?n("div",{staticClass:"c-take-question-content"},[n("h3",{staticClass:"q-text"},[void 0!==t.isCorrect?n("i",{class:{"el-icon-success":!0===t.isCorrect,"el-icon-error":!1===t.isCorrect}}):t._e(),n("Article",{attrs:{content:t.currentQuestion.title}})],1),n("div",{staticClass:"q-attr"},[n("span",{staticClass:"q-attr-hint"},[t._v(t._s(t.isMultiple?"多选题":"单选题"))]),n("el-rate",{attrs:{disabled:"","text-color":"#ff9900","score-template":"{value}"},model:{value:t.currentQuestion.hardStar,callback:function(e){t.$set(t.currentQuestion,"hardStar",e)},expression:"currentQuestion.hardStar"}}),n("span",{staticClass:"q-attr-author"},[t._v(" 提交人： "),n("el-link",{attrs:{href:t.paperAuthorLink,target:"_blank",underline:!1}},[n("el-avatar",{attrs:{src:t.paperAuthorAvatar}}),t._v(" "+t._s(t.currentQuestion.createUser)+" ")],1)],1),n("span",{staticClass:"q-attr-author"},[t._v(" 试卷标签： "),n("span",{staticClass:"c-exam-attr-value"},t._l(JSON.parse(t.currentQuestion.tags),(function(e){return n("el-tag",{key:e,attrs:{size:"medium"}},[t._v(t._s(e))])})),1)])],1),t.isMultiple?[n("el-checkbox-group",{model:{value:t.chosenOptions,callback:function(e){t.chosenOptions=e},expression:"chosenOptions"}},t._l(JSON.parse(t.currentQuestion.options),(function(e,s){return n("el-checkbox",{key:s,class:{"is-correct-answer":t.isCorrectAnswerClass(s),"is-wrong-answer":t.isWrongAnswerClass(s)},attrs:{label:s,border:"",disabled:t.isSubmitted}},[t._v(" "+t._s(String.fromCharCode(65+s))+". "),n("Article",{attrs:{content:e}})],1)})),1)]:[n("el-radio-group",{model:{value:t.chosenOptions,callback:function(e){t.chosenOptions=e},expression:"chosenOptions"}},t._l(JSON.parse(t.currentQuestion.options),(function(e,s){return n("el-radio",{key:s,class:{"is-correct-answer":t.isCorrectAnswerClass(s),"is-wrong-answer":t.isWrongAnswerClass(s)},attrs:{label:s,border:"",disabled:t.isSubmitted}},[t._v(" "+t._s(String.fromCharCode(65+s))+". "),n("Article",{attrs:{content:e}})],1)})),1)],n("div",{staticClass:"c-exam-take-btn"},[t.isSubmitted||t.loading||!t.currentQuestion?t._e():n("el-button",{attrs:{type:"success",disabled:null===t.chosenOptions||""===JSON.stringify(t.chosenOptions)||"[]"===JSON.stringify(t.chosenOptions)},on:{click:t.preSubmitQuestion}},[t._v("提交")])],1),t.questionAnswer?n("div",{staticClass:"q-whyami"},[n("h3",[t._v("解析")]),n("div",{staticClass:"q-whyami-content",domProps:{innerHTML:t._s(t.questionAnswer.whyami)}})]):t._e(),t.isAdmin?n("div",{staticClass:"m-exam-op"},[n("Fav",{staticStyle:{"padding-top":"9px","padding-bottom":"9px"},attrs:{"post-type":"question","post-id":t.id}}),n("el-button",{attrs:{type:"warning",plain:"",size:"small",icon:"el-icon-circle-close"},on:{click:function(e){return t.check("restore")}}},[t._v("复审")]),n("el-button",{attrs:{type:"danger",plain:"",size:"small",icon:"el-icon-delete"},on:{click:function(e){return t.check("delete")}}},[t._v("删除")])],1):t._e()],2):t._e(),n("div",{staticClass:"m-exam-comment"},[n("el-divider",{attrs:{"content-position":"left"}},[n("i",{staticClass:"el-icon-chat-line-square"}),t._v(" 讨论")]),n("Comment",{attrs:{id:t.id,category:"question"}})],1)])},i=[],r=(n("99af"),n("caad"),n("d81d"),n("b0c0"),n("ac1f"),n("2532"),n("5319"),n("408b")),o=n("64c7"),a=n("ee8f"),c=n("a974"),u=n("85e4"),l=n("e494"),h=n("23d8"),d=n("6f05"),p={name:"TakeQuestion",components:{Article:c["a"],Comment:h["a"]},data:function(){return{loading:!1,chosenOptions:null,currentQuestion:null,questionid:null,showAnswer:!1,isSubmitted:!1,questionAnswer:null,correctAnswer:null,isCorrect:void 0,authorAvatarUrl:"",isAdmin:a["User"].getInfo().group>60}},computed:{isMultiple:function(){return"checkbox"===this.currentQuestion.type},paperAuthorAvatar:function(){return Object(u["showAvatar"])(this.authorAvatarUrl,"s")},paperAuthorLink:function(){return Object(u["authorLink"])(this.currentQuestion.createUserId)},id:function(){return this.$route.params.id}},mounted:function(){"localhost"!=location.hostname&&this.checkLogin(),"question-take"==this.$route.name&&Object(l["a"])("question",this.$route.params.id)},methods:{checkLogin:function(){a["User"].isLogin()?this.getQuestionId():(this.$message.error("请先登录"),a["User"].destroy(),setTimeout((function(){a["User"].toLogin()}),1e3))},getAuthorAvatar:function(t){var e=this;Object(r["a"])("https://server.jx3box.com/user/info?uid=".concat(t),"GET").then((function(t){10024===t.code&&(e.authorAvatarUrl=t.data.avatar)})).catch((function(t){console.log(t)}))},getQuestionId:function(){var t=this;if(!this.$route.params.id)return this.$message.error("题目不存在！"),setTimeout((function(){t.$router.go("-1")}),1e3),!1;this.questionid=this.$route.params.id,this.getQuestion()},getQuestion:function(){var t=this;if(this.loading=!0,!this.$route.params.questionInfo)return this.$message.error("进入方法非法！请从试题列表页重新进入"),setTimeout((function(){t.$router.replace("/qlist")}),1e3),!1;this.currentQuestion=this.$route.params.questionInfo,"checkbox"===this.currentQuestion.type?this.chosenOptions=[]:this.chosenOptions=null,this.loading=!1,this.getAuthorAvatar(this.currentQuestion.createUserId)},preSubmitQuestion:function(){var t=[],e=this.chosenOptions,n=JSON.parse(this.currentQuestion.options);if(null===e)return!1;if("number"!==typeof e){if(0===e.length)return!1;t=e.map((function(t){return n[t]}))}else t=[n[e]];this.submitQuestion(t)},submitQuestion:function(t){var e=this,n=Object(r["b"])(o["__next"],"api/question/user-exam-paper/q/".concat(this.questionid,"/answer"));this.isSubmitted=!0,this.loading=!0,Object(r["a"])(n,"POST",!0,t).then((function(t){e.questionAnswer=t.question,e.correctAnswer=t.question.answerList,e.isCorrect=t.right})).catch((function(t){switch(e.isSubmitted=!1,t.code){case-1:e.$message.error(t.msg);break;case 9999:e.$message.error("登录失效, 请重新登录"),a["User"].destroy(),setTimeout((function(){a["User"].toLogin()}),1e3);break;default:e.$message.error("[".concat(t.code,"]").concat(t.msg))}})).then((function(){e.loading=!1}))},isCorrectAnswerClass:function(t){return!!this.correctAnswer&&this.correctAnswer.includes(t)},isWrongAnswerClass:function(t){if(this.correctAnswer&&!this.correctAnswer.includes(t)&&null!==this.chosenOptions){if(this.chosenOptions===t)return!0;if("number"!==typeof this.chosenOptions)return this.chosenOptions.includes(t)}return!1},check:function(t){var e=this;"delete"==t?this.$alert("确定删除吗","消息",{confirmButtonText:"确定",callback:function(n){"confirm"==n&&Object(d["b"])(e.id,t).then((function(t){e.$message({message:t.data.msg||"操作成功",type:"success"}),location.reload()}))}}):Object(d["b"])(this.id,t).then((function(t){e.$message({message:t.data.msg||"操作成功",type:"success"}),location.reload()}))}}},f=p,m=(n("902d"),n("2877")),b=Object(m["a"])(f,s,i,!1,null,null,null);e["default"]=b.exports},"6f05":function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"a",(function(){return a}));var s=n("2777"),i=n("64c7"),r=i["__next"]+"api/question/";function o(t,e){return s["b"].put(r+t+"/check","",{params:{action:e},withCredentials:!0})}function a(t,e){return s["b"].put(r+"exam-paper/"+t+"/opt","",{params:{action:e},withCredentials:!0})}},"902d":function(t,e,n){"use strict";var s=n("bcb1"),i=n.n(s);i.a},b0c0:function(t,e,n){var s=n("83ab"),i=n("9bf2").f,r=Function.prototype,o=r.toString,a=/^\s*function ([^ (]*)/,c="name";!s||c in r||i(r,c,{configurable:!0,get:function(){try{return o.call(this).match(a)[1]}catch(t){return""}}})},bcb1:function(t,e,n){},d81d:function(t,e,n){"use strict";var s=n("23e7"),i=n("b727").map,r=n("1dde"),o=n("ae40"),a=r("map"),c=o("map");s({target:"Array",proto:!0,forced:!a||!c},{map:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}})},e494:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var s=n("bc3a"),i=n.n(s),r=n("64c7");r["__next"];var o=r["__next"]+"api/summary-any/";function a(t,e){return i.a.get(o+t+"-"+e,{params:{type:t,actions:"views"}})}r["__next"]}}]);
//# sourceMappingURL=chunk-9a547476.c7301946.js.map