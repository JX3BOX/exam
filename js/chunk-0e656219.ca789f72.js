(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0e656219"],{"0cb2":function(t,e,r){var n=r("7b0b"),i=Math.floor,o="".replace,s=/\$([$&'`]|\d{1,2}|<[^>]*>)/g,a=/\$([$&'`]|\d{1,2})/g;t.exports=function(t,e,r,c,u,l){var h=r+t.length,f=c.length,d=a;return void 0!==u&&(u=n(u),d=s),o.call(l,d,(function(n,o){var s;switch(o.charAt(0)){case"$":return"$";case"&":return t;case"`":return e.slice(0,r);case"'":return e.slice(h);case"<":s=u[o.slice(1,-1)];break;default:var a=+o;if(0===a)return n;if(a>f){var l=i(a/10);return 0===l?n:l<=f?void 0===c[l-1]?o.charAt(1):c[l-1]+o.charAt(1):n}s=c[a-1]}return void 0===s?"":s}))}},2300:function(t,e,r){"use strict";r("4ef9")},2777:function(t,e,r){"use strict";r.d(e,"a",(function(){return s}));var n=r("bc3a"),i=r.n(n);r.d(e,"b",(function(){return i.a}));var o=r("65c2"),s=(i.a.create({baseURL:o["__server"],withCredentials:!0}),i.a.create({withCredentials:!0,baseURL:o["__next"]}))},3506:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"c-take-question"},[t.currentQuestion?r("div",{staticClass:"c-take-question-content"},[r("div",{staticClass:"q-text-title"},[r("h3",{staticClass:"q-text"},[void 0!==t.isCorrect?r("i",{class:{"el-icon-success":!0===t.isCorrect,"el-icon-error":!1===t.isCorrect}}):t._e(),r("Article",{attrs:{content:t.currentQuestion.title}})],1),r("div",{staticClass:"m-exam-op"},[r("Fav",{staticStyle:{"padding-top":"9px","padding-bottom":"9px"},attrs:{"post-type":"question","post-id":t.id}}),t.isAuthor?r("el-button",{attrs:{type:"primary",plain:"",size:"small",icon:"el-icon-edit-outline"},on:{click:t.edit}},[t._v("编辑")]):t._e(),t.isAdmin?r("el-button",{attrs:{type:"danger",plain:"",size:"small",icon:"el-icon-delete"},on:{click:function(e){return t.check("delete")}}},[t._v("删除")]):t._e()],1)]),r("div",{staticClass:"q-attr"},[r("span",{staticClass:"q-attr-hint"},[t._v(t._s(t.isMultiple?"多选题":"单选题"))]),r("el-rate",{attrs:{disabled:"","text-color":"#ff9900","score-template":"{value}"},model:{value:t.currentQuestion.hardStar,callback:function(e){t.$set(t.currentQuestion,"hardStar",e)},expression:"currentQuestion.hardStar"}}),r("span",{staticClass:"q-attr-author"},[t._v(" 提交人： "),r("el-link",{attrs:{href:t.paperAuthorLink,target:"_blank",underline:!1}},[t._v(" "+t._s(t.currentQuestion.createUser)+" ")])],1),r("span",{staticClass:"q-attr-author"},[t._v(" 试卷标签： "),r("span",{staticClass:"c-exam-attr-value"},t._l(JSON.parse(t.currentQuestion.tags),(function(e){return r("el-tag",{key:e,attrs:{size:"medium"}},[t._v(t._s(e))])})),1)])],1),t.isMultiple?[r("el-checkbox-group",{model:{value:t.chosenOptions,callback:function(e){t.chosenOptions=e},expression:"chosenOptions"}},t._l(JSON.parse(t.currentQuestion.options),(function(e,n){return r("el-checkbox",{key:n,class:{"is-correct-answer":t.isCorrectAnswerClass(n),"is-wrong-answer":t.isWrongAnswerClass(n)},attrs:{label:n,border:"",disabled:t.isSubmitted}},[t._v(" "+t._s(String.fromCharCode(65+n))+". "),r("Article",{attrs:{content:e}})],1)})),1)]:[r("el-radio-group",{model:{value:t.chosenOptions,callback:function(e){t.chosenOptions=e},expression:"chosenOptions"}},t._l(JSON.parse(t.currentQuestion.options),(function(e,n){return r("el-radio",{key:n,class:{"is-correct-answer":t.isCorrectAnswerClass(n),"is-wrong-answer":t.isWrongAnswerClass(n)},attrs:{label:n,border:"",disabled:t.isSubmitted}},[t._v(" "+t._s(String.fromCharCode(65+n))+". "),r("Article",{attrs:{content:e}})],1)})),1)],r("div",{staticClass:"c-exam-take-btn"},[t.isSubmitted||t.loading||!t.currentQuestion?t._e():r("el-button",{attrs:{type:"success",disabled:null===t.chosenOptions||""===JSON.stringify(t.chosenOptions)||"[]"===JSON.stringify(t.chosenOptions)},on:{click:t.checkLogin}},[t._v("提交")])],1),t.questionAnswer?r("div",{staticClass:"q-whyami"},[r("h3",[t._v("解析")]),r("div",{staticClass:"q-whyami-content",domProps:{innerHTML:t._s(t.questionAnswer.whyami)}})]):t._e()],2):t._e(),r("div",{staticClass:"m-exam-comment"},[r("el-divider",{attrs:{"content-position":"left"}},[r("i",{staticClass:"el-icon-chat-line-square"}),t._v(" 讨论 ")]),r("Comment",{attrs:{id:t.id,category:"question"}})],1)])},i=[];r("d3b7");function o(t,e,r,n,i,o,s){try{var a=t[o](s),c=a.value}catch(u){return void r(u)}a.done?e(c):Promise.resolve(c).then(n,i)}function s(t){return function(){var e=this,r=arguments;return new Promise((function(n,i){var s=t.apply(e,r);function a(t){o(s,n,i,a,c,"next",t)}function c(t){o(s,n,i,a,c,"throw",t)}a(void 0)}))}}r("96cf"),r("b0c0"),r("ac1f"),r("5319"),r("d81d"),r("99af"),r("caad"),r("2532");var a=r("408b"),c=r("65c2"),u=(r("ee8f"),r("c9d2")),l=r("a974"),h=r("85e4"),f=r("e494"),d=r("23d8"),p=r("6f05"),v={name:"TakeQuestion",components:{Article:l["a"],Comment:d["a"]},data:function(){return{loading:!1,chosenOptions:null,currentQuestion:null,questionid:null,showAnswer:!1,isSubmitted:!1,questionAnswer:null,correctAnswer:null,isCorrect:void 0,authorAvatarUrl:"",isAdmin:u["a"].isEditor()}},computed:{isMultiple:function(){return"checkbox"===this.currentQuestion.type},paperAuthorAvatar:function(){return Object(h["showAvatar"])(this.authorAvatarUrl,"s")},paperAuthorLink:function(){return Object(h["authorLink"])(this.currentQuestion.createUserId)},id:function(){return this.$route.params.id},author_id:function(){return this.currentQuestion.createUserId},isAuthor:function(){return u["a"].isLogin()&&u["a"].getInfo().uid==this.author_id}},mounted:function(){"question-take"==this.$route.name&&Object(f["a"])("question",this.$route.params.id),this.getQuestionId()},methods:{checkLogin:function(){if("localhost"!=location.hostname&&!u["a"].isLogin())return this.$message.error("请先登录"),u["a"].destroy(),setTimeout((function(){u["a"].toLogin()}),1e3),!1;this.preSubmitQuestion()},getAuthorAvatar:function(t){var e=this;Object(a["a"])("https://server.jx3box.com/user/info?uid=".concat(t),"GET").then((function(t){10024===t.code&&(e.authorAvatarUrl=t.data.avatar)})).catch((function(t){console.log(t)}))},getQuestionId:function(){var t=this;if(!this.$route.params.id)return this.$message.error("题目不存在！"),setTimeout((function(){t.$router.go("-1")}),1e3),!1;this.questionid=this.$route.params.id,this.getQuestion()},getRemoteQuestionInfo:function(){var t=this;return s(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=Object(a["b"])(c["__next"],"api/question/".concat(t.questionid,"/no-answer")),e.next=3,Object(a["a"])(r,"GET",!0).then((function(e){return e.id?Promise.resolve(e):(t.$message.error("题目不存在！"),setTimeout((function(){t.$router.go("-1")}),1e3),!1)})).catch((function(t){return console.log(t),Promise.reject(t)}));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))()},getQuestion:function(){var t=this;return s(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.loading=!0,console.log(t.$route),!t.$route.params.questionInfo){e.next=6;break}t.currentQuestion=t.$route.params.questionInfo,e.next=16;break;case 6:return e.prev=6,e.next=9,t.getRemoteQuestionInfo();case 9:t.currentQuestion=e.sent,e.next=16;break;case 12:return e.prev=12,e.t0=e["catch"](6),e.t0.msg&&(t.$message.error("题目不存在！"),setTimeout((function(){t.$router.replace("/qlist")}),1e3)),e.abrupt("return",!1);case 16:"checkbox"===t.currentQuestion.type?t.chosenOptions=[]:t.chosenOptions=null,t.loading=!1,t.getAuthorAvatar(t.currentQuestion.createUserId);case 19:case"end":return e.stop()}}),e,null,[[6,12]])})))()},preSubmitQuestion:function(){var t=[],e=this.chosenOptions,r=JSON.parse(this.currentQuestion.options);if(null===e)return!1;if("number"!==typeof e){if(0===e.length)return!1;t=e.map((function(t){return r[t]}))}else t=[r[e]];this.submitQuestion(t)},submitQuestion:function(t){var e=this,r=Object(a["b"])(c["__next"],"api/question/user-exam-paper/q/".concat(this.questionid,"/answer"));this.isSubmitted=!0,this.loading=!0,Object(a["a"])(r,"POST",!0,t).then((function(t){e.questionAnswer=t.question,e.correctAnswer=t.question.answerList,e.isCorrect=t.right})).catch((function(t){switch(e.isSubmitted=!1,console.log(t),t.code){case-1:e.$message.error(t.msg);break;case 401:e.$message.error(t.msg),u["a"].destroy(),setTimeout((function(){u["a"].toLogin()}),1e3);break;default:e.$message.error("[".concat(t.code,"]").concat(t.msg))}})).then((function(){e.loading=!1}))},isCorrectAnswerClass:function(t){return!!this.correctAnswer&&this.correctAnswer.includes(t)},isWrongAnswerClass:function(t){if(this.correctAnswer&&!this.correctAnswer.includes(t)&&null!==this.chosenOptions){if(this.chosenOptions===t)return!0;if("number"!==typeof this.chosenOptions)return this.chosenOptions.includes(t)}return!1},check:function(t){var e=this;"delete"==t?this.$alert("确定删除吗？","消息",{confirmButtonText:"确定",callback:function(r){"confirm"==r&&Object(p["b"])(e.id,t).then((function(t){e.$message({message:t.data.msg||"操作成功",type:"success"}),location.reload()}))}}):Object(p["b"])(this.id,t).then((function(t){e.$message({message:t.data.msg||"操作成功",type:"success"}),location.reload()}))},edit:function(){location.href=Object(h["publishLink"])("question")+"/"+this.id}}},m=v,g=(r("902d"),r("2300"),r("2877")),y=Object(g["a"])(m,n,i,!1,null,"2497c946",null);e["default"]=y.exports},"4ef9":function(t,e,r){},5319:function(t,e,r){"use strict";var n=r("d784"),i=r("825a"),o=r("50c4"),s=r("a691"),a=r("1d80"),c=r("8aa5"),u=r("0cb2"),l=r("14c3"),h=Math.max,f=Math.min,d=function(t){return void 0===t?t:String(t)};n("replace",2,(function(t,e,r,n){var p=n.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,v=n.REPLACE_KEEPS_$0,m=p?"$":"$0";return[function(r,n){var i=a(this),o=void 0==r?void 0:r[t];return void 0!==o?o.call(r,i,n):e.call(String(i),r,n)},function(t,n){if(!p&&v||"string"===typeof n&&-1===n.indexOf(m)){var a=r(e,t,this,n);if(a.done)return a.value}var g=i(t),y=String(this),b="function"===typeof n;b||(n=String(n));var w=g.global;if(w){var x=g.unicode;g.lastIndex=0}var _=[];while(1){var k=l(g,y);if(null===k)break;if(_.push(k),!w)break;var O=String(k[0]);""===O&&(g.lastIndex=c(y,o(g.lastIndex),x))}for(var A="",L=0,C=0;C<_.length;C++){k=_[C];for(var E=String(k[0]),S=h(f(s(k.index),y.length),0),q=[],$=1;$<k.length;$++)q.push(d(k[$]));var Q=k.groups;if(b){var j=[E].concat(q,S,y);void 0!==Q&&j.push(Q);var T=String(n.apply(void 0,j))}else T=u(E,y,S,q,Q,n);S>=L&&(A+=y.slice(L,S)+T,L=S+E.length)}return A+y.slice(L)}]}))},"6f05":function(t,e,r){"use strict";r.d(e,"b",(function(){return s})),r.d(e,"a",(function(){return a}));var n=r("2777"),i=r("65c2"),o=i["__next"]+"api/question/";function s(t,e){return n["b"].put(o+t+"/check","",{params:{action:e},withCredentials:!0})}function a(t,e){return n["b"].put(o+"exam-paper/"+t+"/opt","",{params:{action:e},withCredentials:!0})}},"902d":function(t,e,r){"use strict";r("bcb1")},"96cf":function(t,e){!function(e){"use strict";var r,n=Object.prototype,i=n.hasOwnProperty,o="function"===typeof Symbol?Symbol:{},s=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag",u="object"===typeof t,l=e.regeneratorRuntime;if(l)u&&(t.exports=l);else{l=e.regeneratorRuntime=u?t.exports:{},l.wrap=w;var h="suspendedStart",f="suspendedYield",d="executing",p="completed",v={},m={};m[s]=function(){return this};var g=Object.getPrototypeOf,y=g&&g(g(Q([])));y&&y!==n&&i.call(y,s)&&(m=y);var b=O.prototype=_.prototype=Object.create(m);k.prototype=b.constructor=O,O.constructor=k,O[c]=k.displayName="GeneratorFunction",l.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===k||"GeneratorFunction"===(e.displayName||e.name))},l.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,O):(t.__proto__=O,c in t||(t[c]="GeneratorFunction")),t.prototype=Object.create(b),t},l.awrap=function(t){return{__await:t}},A(L.prototype),L.prototype[a]=function(){return this},l.AsyncIterator=L,l.async=function(t,e,r,n){var i=new L(w(t,e,r,n));return l.isGeneratorFunction(e)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},A(b),b[c]="Generator",b[s]=function(){return this},b.toString=function(){return"[object Generator]"},l.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){while(e.length){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},l.values=Q,$.prototype={constructor:$,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(q),!t)for(var e in this)"t"===e.charAt(0)&&i.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=r)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(n,i){return a.type="throw",a.arg=t,e.next=n,i&&(e.method="next",e.arg=r),!!i}for(var o=this.tryEntries.length-1;o>=0;--o){var s=this.tryEntries[o],a=s.completion;if("root"===s.tryLoc)return n("end");if(s.tryLoc<=this.prev){var c=i.call(s,"catchLoc"),u=i.call(s,"finallyLoc");if(c&&u){if(this.prev<s.catchLoc)return n(s.catchLoc,!0);if(this.prev<s.finallyLoc)return n(s.finallyLoc)}else if(c){if(this.prev<s.catchLoc)return n(s.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<s.finallyLoc)return n(s.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&i.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var s=o?o.completion:{};return s.type=t,s.arg=e,o?(this.method="next",this.next=o.finallyLoc,v):this.complete(s)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),q(r),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var i=n.arg;q(r)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:Q(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=r),v}}}function w(t,e,r,n){var i=e&&e.prototype instanceof _?e:_,o=Object.create(i.prototype),s=new $(n||[]);return o._invoke=C(t,r,s),o}function x(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(n){return{type:"throw",arg:n}}}function _(){}function k(){}function O(){}function A(t){["next","throw","return"].forEach((function(e){t[e]=function(t){return this._invoke(e,t)}}))}function L(t){function e(r,n,o,s){var a=x(t[r],t,n);if("throw"!==a.type){var c=a.arg,u=c.value;return u&&"object"===typeof u&&i.call(u,"__await")?Promise.resolve(u.__await).then((function(t){e("next",t,o,s)}),(function(t){e("throw",t,o,s)})):Promise.resolve(u).then((function(t){c.value=t,o(c)}),s)}s(a.arg)}var r;function n(t,n){function i(){return new Promise((function(r,i){e(t,n,r,i)}))}return r=r?r.then(i,i):i()}this._invoke=n}function C(t,e,r){var n=h;return function(i,o){if(n===d)throw new Error("Generator is already running");if(n===p){if("throw"===i)throw o;return j()}r.method=i,r.arg=o;while(1){var s=r.delegate;if(s){var a=E(s,r);if(a){if(a===v)continue;return a}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===h)throw n=p,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=d;var c=x(t,e,r);if("normal"===c.type){if(n=r.done?p:f,c.arg===v)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n=p,r.method="throw",r.arg=c.arg)}}}function E(t,e){var n=t.iterator[e.method];if(n===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=r,E(t,e),"throw"===e.method))return v;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var i=x(n,t.iterator,e.arg);if("throw"===i.type)return e.method="throw",e.arg=i.arg,e.delegate=null,v;var o=i.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=r),e.delegate=null,v):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,v)}function S(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function q(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function $(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(S,this),this.reset(!0)}function Q(t){if(t){var e=t[s];if(e)return e.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){while(++n<t.length)if(i.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=r,e.done=!0,e};return o.next=o}}return{next:j}}function j(){return{value:r,done:!0}}}(function(){return this}()||Function("return this")())},bcb1:function(t,e,r){},e494:function(t,e,r){"use strict";r.d(e,"a",(function(){return a}));var n=r("bc3a"),i=r.n(n),o=r("65c2");o["__next"];var s=o["__next"]+"api/summary-any/";function a(t,e){return i.a.get(s+t+"-"+e,{params:{type:t,actions:"views"}})}o["__next"]}}]);
//# sourceMappingURL=chunk-0e656219.ca789f72.js.map