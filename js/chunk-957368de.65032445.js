(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-957368de"],{"0cb2":function(e,t,a){var n=a("7b0b"),r=Math.floor,i="".replace,s=/\$([$&'`]|\d{1,2}|<[^>]*>)/g,o=/\$([$&'`]|\d{1,2})/g;e.exports=function(e,t,a,c,u,l){var d=a+e.length,f=c.length,m=o;return void 0!==u&&(u=n(u),m=s),i.call(l,m,(function(n,i){var s;switch(i.charAt(0)){case"$":return"$";case"&":return e;case"`":return t.slice(0,a);case"'":return t.slice(d);case"<":s=u[i.slice(1,-1)];break;default:var o=+i;if(0===o)return n;if(o>f){var l=r(o/10);return 0===l?n:l<=f?void 0===c[l-1]?i.charAt(1):c[l-1]+i.charAt(1):n}s=c[o-1]}return void 0===s?"":s}))}},"408b":function(e,t,a){"use strict";a.d(t,"a",(function(){return s})),a.d(t,"b",(function(){return o}));a("b64b"),a("d3b7");var n=a("bc3a"),r=a.n(n);function i(e){return new Promise((function(t,a){var n=r.a.create({headers:{"Content-Type":"application/json",Accept:"application/json"},timeout:1e4});n(e).then((function(e){t(e.data)})).catch((function(e){console.log(e.response),e.response?e.response.data.code?a(e.response.data):a({msg:e.response.data,code:e.response.status}):a({msg:"网络请求异常",code:-1})}))}))}function s(e,t,a,n,r,s){var o={url:""+e,method:t||"GET"};return o["withCredentials"]=void 0!==a&&a,void 0!=n&&Object.keys(n).length>0&&(o["data"]=n),void 0!=r&&""!==r&&(o["headers"]=r),void 0!=s&&Object.keys(s).length>0&&(o["params"]=s),i(o)}function o(e,t){return e+t}},4683:function(e,t,a){},5319:function(e,t,a){"use strict";var n=a("d784"),r=a("825a"),i=a("50c4"),s=a("a691"),o=a("1d80"),c=a("8aa5"),u=a("0cb2"),l=a("14c3"),d=Math.max,f=Math.min,m=function(e){return void 0===e?e:String(e)};n("replace",2,(function(e,t,a,n){var p=n.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,h=n.REPLACE_KEEPS_$0,v=p?"$":"$0";return[function(a,n){var r=o(this),i=void 0==a?void 0:a[e];return void 0!==i?i.call(a,r,n):t.call(String(r),a,n)},function(e,n){if(!p&&h||"string"===typeof n&&-1===n.indexOf(v)){var o=a(t,e,this,n);if(o.done)return o.value}var g=r(e),b=String(this),k="function"===typeof n;k||(n=String(n));var x=g.global;if(x){var $=g.unicode;g.lastIndex=0}var _=[];while(1){var w=l(g,b);if(null===w)break;if(_.push(w),!x)break;var E=String(w[0]);""===E&&(g.lastIndex=c(b,i(g.lastIndex),$))}for(var I="",S=0,y=0;y<_.length;y++){w=_[y];for(var T=String(w[0]),C=d(f(s(w.index),b.length),0),j=[],R=1;R<w.length;R++)j.push(m(w[R]));var O=w.groups;if(k){var P=[T].concat(j,C,b);void 0!==O&&P.push(O);var A=String(n.apply(void 0,P))}else A=u(T,b,C,j,O,n);C>=S&&(I+=b.slice(S,C)+A,S=C+T.length)}return I+b.slice(S)}]}))},"98e7":function(e,t,a){"use strict";a("4683")},b21d:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return e.examInfo&&Object.keys(e.examInfo).length>0?a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"c-exam-rank"},[a("div",{staticClass:"c-exam-rank-title"},[a("h1",[e._v("百强榜")]),a("h2",[e._v("《"+e._s(e.examInfo.title)+"》")]),a("el-divider",[e._v("以下排名按照个人第一次获得的分数和答题消耗时间排序")])],1),a("div",{staticClass:"c-exam-rank-table"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.rankData}},[a("el-table-column",{attrs:{prop:"rank",label:"名次",width:120},scopedSlots:e._u([{key:"default",fn:function(t){return[t.$index>=3?a("span",[e._v(e._s(t.$index+1))]):a("div",{staticClass:"c-exam-rank-table-pic",class:e.bindRankingPicClass(t.$index)})]}}],null,!1,3079320940)}),a("el-table-column",{attrs:{prop:"displayName",label:"用户名"}}),a("el-table-column",{attrs:{prop:"score",label:"分数",width:120}}),a("el-table-column",{attrs:{prop:"coastTime",label:"答题耗时(秒)",width:120}}),a("el-table-column",{attrs:{prop:"endTimeStr",label:"完成时间",width:180}})],1)],1)]):e._e()},r=[],i=(a("ac1f"),a("5319"),a("99af"),a("408b")),s=a("65c2"),o=(a("85e4"),{name:"ExamRank",components:{},data:function(){return{examid:-1,examInfo:{},loading:!1,rankData:[{rank:1,username:"枫瑞",score:"1000",timestamp:"2020-04-32 25:61:61"},{rank:2,username:"枫瑞",score:"1000",timestamp:"2020-04-32 25:61:61"},{rank:3,username:"枫瑞",score:"1000",timestamp:"2020-04-32 25:61:61"},{rank:4,username:"枫瑞",score:"1000",timestamp:"2020-04-32 25:61:61"},{rank:5,username:"枫瑞",score:"1000",timestamp:"2020-04-32 25:61:61"},{rank:6,username:"枫瑞",score:"1000",timestamp:"2020-04-32 25:61:61"}]}},computed:{bindRankingPicClass:function(){return function(e){var t={};return t["rank-table-pic-ranking-".concat(e+1)]=!0,t}}},mounted:function(){this.getExamInfo(),this.getRankData()},methods:{name:function(){},getExamInfo:function(){var e=this;if(this.loading=!0,!this.$route.params.id)return this.$message.error("获取试卷信息失败，请重新从试卷列表页进入！"),setTimeout((function(){e.$router.replace("/list")}),1e3),!1;this.examid=this.$route.params.id;var t=this.$route.params;if(!t.examInfo)return this.$message.error("获取试卷信息失败，请重新从试卷列表页进入！"),setTimeout((function(){e.$router.replace("/list")}),1e3),!1;this.examInfo=t.examInfo},getRankData:function(){var e=this;if(!this.examInfo)return!1;console.log(this.examInfo);var t=Object(i["b"])(s["__next"],"api/question/user-exam-paper/".concat(this.examid,"/rank"));Object(i["a"])(t).then((function(t){e.rankData=t})).catch((function(t){switch(t.code){case-1:e.$message.error(t.msg);break;case 404:e.loading=!0,e.$message.error("试卷不存在！"),setTimeout((function(){e.$router.replace("/list")}),1e3);break;case 9999:e.$message.error("登录失效, 请重新登录"),User.destroy(),setTimeout((function(){User.toLogin()}),1e3);break;default:e.$message.error("[".concat(t.code,"]").concat(t.msg))}})).then((function(){e.loading=!1}))}}}),c=o,u=(a("98e7"),a("2877")),l=Object(u["a"])(c,n,r,!1,null,null,null);t["default"]=l.exports},b64b:function(e,t,a){var n=a("23e7"),r=a("7b0b"),i=a("df75"),s=a("d039"),o=s((function(){i(1)}));n({target:"Object",stat:!0,forced:o},{keys:function(e){return i(r(e))}})}}]);
//# sourceMappingURL=chunk-957368de.65032445.js.map