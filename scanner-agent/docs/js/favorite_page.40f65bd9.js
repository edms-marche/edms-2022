(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["favorite_page"],{"0798":function(t,e,n){"use strict";n("caad");var r=n("5530"),o=n("ade3"),i=(n("0c18"),n("10d2")),a=n("afdd"),s=n("9d26"),c=n("f2e7"),l=n("7560"),d=n("2b0e"),u=d["a"].extend({name:"transitionable",props:{mode:String,origin:String,transition:String}}),f=n("58df"),h=n("d9bd");e["a"]=Object(f["a"])(i["a"],c["a"],u).extend({name:"v-alert",props:{border:{type:String,validator:function(t){return["top","right","bottom","left"].includes(t)}},closeLabel:{type:String,default:"$vuetify.close"},coloredBorder:Boolean,dense:Boolean,dismissible:Boolean,icon:{default:"",type:[Boolean,String],validator:function(t){return"string"===typeof t||!1===t}},outlined:Boolean,prominent:Boolean,text:Boolean,type:{type:String,validator:function(t){return["info","error","success","warning"].includes(t)}},value:{type:Boolean,default:!0}},computed:{__cachedBorder:function(){if(!this.border)return null;var t={staticClass:"v-alert__border",class:Object(o["a"])({},"v-alert__border--".concat(this.border),!0)};return this.coloredBorder&&(t=this.setBackgroundColor(this.computedColor,t),t.class["v-alert__border--has-color"]=!0),this.$createElement("div",t)},__cachedDismissible:function(){var t=this;if(!this.dismissible)return null;var e=this.iconColor;return this.$createElement(a["a"],{staticClass:"v-alert__dismissible",props:{color:e,icon:!0,small:!0},attrs:{"aria-label":this.$vuetify.lang.t(this.closeLabel)},on:{click:function(){return t.isActive=!1}}},[this.$createElement(s["a"],{props:{color:e}},"$cancel")])},__cachedIcon:function(){return this.computedIcon?this.$createElement(s["a"],{staticClass:"v-alert__icon",props:{color:this.iconColor}},this.computedIcon):null},classes:function(){var t=Object(r["a"])({},i["a"].options.computed.classes.call(this),{"v-alert--border":Boolean(this.border),"v-alert--dense":this.dense,"v-alert--outlined":this.outlined,"v-alert--prominent":this.prominent,"v-alert--text":this.text});return this.border&&(t["v-alert--border-".concat(this.border)]=!0),t},computedColor:function(){return this.color||this.type},computedIcon:function(){return!1!==this.icon&&("string"===typeof this.icon&&this.icon?this.icon:!!["error","info","success","warning"].includes(this.type)&&"$".concat(this.type))},hasColoredIcon:function(){return this.hasText||Boolean(this.border)&&this.coloredBorder},hasText:function(){return this.text||this.outlined},iconColor:function(){return this.hasColoredIcon?this.computedColor:void 0},isDark:function(){return!(!this.type||this.coloredBorder||this.outlined)||l["a"].options.computed.isDark.call(this)}},created:function(){this.$attrs.hasOwnProperty("outline")&&Object(h["a"])("outline","outlined",this)},methods:{genWrapper:function(){var t=[this.$slots.prepend||this.__cachedIcon,this.genContent(),this.__cachedBorder,this.$slots.append,this.$scopedSlots.close?this.$scopedSlots.close({toggle:this.toggle}):this.__cachedDismissible],e={staticClass:"v-alert__wrapper"};return this.$createElement("div",e,t)},genContent:function(){return this.$createElement("div",{staticClass:"v-alert__content"},this.$slots.default)},genAlert:function(){var t={staticClass:"v-alert",attrs:{role:"alert"},class:this.classes,style:this.styles,directives:[{name:"show",value:this.isActive}]};if(!this.coloredBorder){var e=this.hasText?this.setTextColor:this.setBackgroundColor;t=e(this.computedColor,t)}return this.$createElement("div",t,[this.genWrapper()])},toggle:function(){this.isActive=!this.isActive}},render:function(t){var e=this.genAlert();return this.transition?t("transition",{props:{name:this.transition,origin:this.origin,mode:this.mode}},[e]):e}})},"0c18":function(t,e,n){},"0e8f":function(t,e,n){"use strict";n("20f6");var r=n("e8f2");e["a"]=Object(r["a"])("flex")},"24a2":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-content",[n("v-container",[n("v-layout",{attrs:{"text-center":""}},[n("v-flex",[n("v-alert",{attrs:{text:"",color:"error"}},[t._v(" "+t._s(t.$t("greeting"))+" ")])],1)],1)],1)],1)},o=[],i=n("2877"),a=n("7622"),s=n("6544"),c=n.n(s),l=n("0798"),d=n("a523"),u=n("a75b"),f=n("0e8f"),h=n("a722"),p={},v=Object(i["a"])(p,r,o,!1,null,null,null);"function"===typeof a["default"]&&Object(a["default"])(v);e["default"]=v.exports;c()(v,{VAlert:l["a"],VContainer:d["a"],VContent:u["a"],VFlex:f["a"],VLayout:h["a"]})},"4b85":function(t,e,n){},5503:function(t,e){t.exports=function(t){t.options.__i18n=t.options.__i18n||[],t.options.__i18n.push('{"en":{"greeting":"Favorite page"},"vn":{"greeting":"Trang yêu thích"}}'),delete t.options._Ctor}},7622:function(t,e,n){"use strict";var r=n("5503"),o=n.n(r);e["default"]=o.a},a523:function(t,e,n){"use strict";n("99af"),n("4de4"),n("b64b"),n("2ca0"),n("20f6"),n("4b85");var r=n("e8f2"),o=n("d9f7");e["a"]=Object(r["a"])("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,e){var n,r=e.props,i=e.data,a=e.children,s=i.attrs;return s&&(i.attrs={},n=Object.keys(s).filter((function(t){if("slot"===t)return!1;var e=s[t];return t.startsWith("data-")?(i.attrs[t]=e,!1):e||"string"===typeof e}))),r.id&&(i.domProps=i.domProps||{},i.domProps.id=r.id),t(r.tag,Object(o["a"])(i,{staticClass:"container",class:Array({"container--fluid":r.fluid}).concat(n||[])}),a)}})},a722:function(t,e,n){"use strict";n("20f6");var r=n("e8f2");e["a"]=Object(r["a"])("layout")},a75b:function(t,e,n){"use strict";n("daaf");var r=n("d10f");e["a"]=r["a"].extend({name:"v-content",props:{tag:{type:String,default:"main"}},computed:{styles:function(){var t=this.$vuetify.application,e=t.bar,n=t.top,r=t.right,o=t.footer,i=t.insetFooter,a=t.bottom,s=t.left;return{paddingTop:"".concat(n+e,"px"),paddingRight:"".concat(r,"px"),paddingBottom:"".concat(o+i+a,"px"),paddingLeft:"".concat(s,"px")}}},render:function(t){var e={staticClass:"v-content",style:this.styles,ref:"content"};return t(this.tag,e,[t("div",{staticClass:"v-content__wrap"},this.$slots.default)])}})},afdd:function(t,e,n){"use strict";var r=n("8336");e["a"]=r["a"]},daaf:function(t,e,n){},e8f2:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));n("99af"),n("4de4"),n("a15b"),n("b64b"),n("2ca0"),n("498a");var r=n("2b0e");function o(t){return r["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(e,n){var r=n.props,o=n.data,i=n.children;o.staticClass="".concat(t," ").concat(o.staticClass||"").trim();var a=o.attrs;if(a){o.attrs={};var s=Object.keys(a).filter((function(t){if("slot"===t)return!1;var e=a[t];return t.startsWith("data-")?(o.attrs[t]=e,!1):e||"string"===typeof e}));s.length&&(o.staticClass+=" ".concat(s.join(" ")))}return r.id&&(o.domProps=o.domProps||{},o.domProps.id=r.id),e(r.tag,o,i)}})}}}]);
//# sourceMappingURL=favorite_page.40f65bd9.js.map