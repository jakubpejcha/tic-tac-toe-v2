(this["webpackJsonptic-tac-toe-v2"]=this["webpackJsonptic-tac-toe-v2"]||[]).push([[0],{32:function(e,t,c){},33:function(e,t,c){},34:function(e,t,c){},35:function(e,t,c){},37:function(e,t,c){},38:function(e,t,c){},39:function(e,t,c){},40:function(e,t,c){},41:function(e,t,c){},47:function(e,t,c){},50:function(e,t,c){},51:function(e,t,c){},52:function(e,t,c){"use strict";c.r(t);var n=c(1),a=c.n(n),r=c(17),s=c.n(r),l=(c(32),c(18)),o=c(4),i=c(7),j=c(11),u=(c(33),c(34),c(35),c(0)),b=function(e){var t=e.index,c=e.showClassName,n=e.takenByPlayer,a=e.currentPlayer,r=e.winning,s=e.size,l=e.onClickCallback;return Object(u.jsxs)("div",{className:"board__cell-wrapper",children:[Object(u.jsx)("div",{"data-index":t,className:"board__cell-content board__cell board__cell".concat(s).concat(c).concat(a).concat(n).concat(r?" winning":""),onClick:function(e){if("undefined"===typeof e.currentTarget.dataset.index)return null;l(+e.currentTarget.dataset.index)}}),Object(u.jsx)("div",{className:"board__cell-content board__cell--backface board__cell--backface".concat(s).concat(n).concat(r?" winning":"")})]})},O=function(e,t,c){for(var n=Math.floor(t/e)+1,a=e-n<c?e-n:c-1,r=[],s=n<c?n-1:c-1;s>0;s--)r.push(t-s*e);r.push(t);for(var l=1;l<=a;l++)r.push(t+l*e);return r},d=function(e,t,c){for(var n=t%e+1,a=e-n<c?e-n:c-1,r=[],s=n<c?n-1:c-1;s>0;s--)r.push(t-s);r.push(t);for(var l=1;l<=a;l++)r.push(t+l);return r},f=function(e,t,c){for(var n=Math.floor(t/e)+1,a=t%e+1,r=n<c?n-1:c-1,s=a<c?a-1:c-1,l=e-a<c?e-a:c-1,o=[],i=e-n<c?e-n:c-1;i>0;i--)i>s||o.push(t+i*e-i);o.push(t);for(var j=1;j<=r&&!(j>l);j++)o.push(t-j*e+j);return o},h=function(e,t,c){for(var n=Math.floor(t/e)+1,a=t%e+1,r=e-n<c?e-n:c-1,s=a<c?a-1:c-1,l=e-a<c?e-a:c-1,o=[],i=n<c?n-1:c-1;i>0;i--)i>s||o.push(t-i*e-i);o.push(t);for(var j=1;j<=r&&!(j>l);j++)o.push(t+j*e+j);return o},x=function(e,t,c,n,a,r){for(var s=r(c,n,a),l=0,o=[],i=s.length,j=0;j<i;j++)if(l++,o.push(s[j]),""!==e[s[j]].takenByPlayer&&e[s[j]].takenByPlayer.trim()===t||(l=0,o.length=0),l===a)return o;return!1},m=function(e,t,c,n,a){return-1!==n&&(x(e,t,c,n,a,O)||x(e,t,c,n,a,d)||x(e,t,c,n,a,f)||x(e,t,c,n,a,h)||!1)},y=c(24),_=function(e){return"x"===e?"o":"x"},v=function e(t,c,n){var a=c.cells,r=c.currentPlayer,s=c.size,l=c.lastCellIndex,i=c.winStreak,j=function(e,t){return e?t?10:-10:0}(m(a,r,s,l,i),n);if(10===j)return j;if(-10===j)return j;if(!function(e){var t,c=Object(y.a)(e);try{for(c.s();!(t=c.n()).done;)if(""===t.value.takenByPlayer)return!0}catch(n){c.e(n)}finally{c.f()}return!1}(a))return 0;var u=-100;return n?a.forEach((function(s,l){if(""===s.takenByPlayer){s.takenByPlayer=_(r);var i=Object(o.a)(Object(o.a)({},c),{},{cells:a,currentPlayer:_(r),lastCellIndex:l});u=Math.max(u,e(t+1,i,!n)),s.takenByPlayer=""}})):(u=100,a.forEach((function(s,l){if(""===s.takenByPlayer){s.takenByPlayer=_(r);var i=Object(o.a)(Object(o.a)({},c),{},{cells:a,currentPlayer:_(r),lastCellIndex:l});u=Math.min(u,e(t+1,i,!n)),s.takenByPlayer=""}}))),u},p=(c(37),function(e){var t=e.isWinner,c=e.isDraw,a=e.winner,r=Object(n.useState)(!0),l=Object(i.a)(r,2),o=l[0],j=l[1];Object(n.useEffect)((function(){setTimeout((function(){j(!(t||c)),setTimeout((function(){j(!0)}),2e3)}),1e3)}),[t,c]);var b=document.getElementById("modalPortal"),O="";return t&&(O="Player ".concat(a," wins!!!")),c&&(O="Draw!!!"),b?s.a.createPortal(Object(u.jsx)(u.Fragment,{children:Object(u.jsx)("div",{className:"modal".concat(o?"":" show"),children:Object(u.jsx)("div",{className:"modal__message",children:O})})}),b):null}),k=(c(38),function(e){var t=e.scoreHandler,c=e.restart,a=e.handleRestart,r=e.size,s=e.isAI,l=function(e){var t={BOARD_NUM_ROWS:e,SIZE:"",DELAY:0,WIN_STREAK:0};return 3===e&&(t.SIZE="--small"),10===e&&(t.SIZE="--large"),3===e&&(t.DELAY=150),10===e&&(t.DELAY=10),t.WIN_STREAK=e>=5?5:e,t}(r),O=Object(n.useState)(!1),d=Object(i.a)(O,2),f=d[0],h=d[1],x=Object(n.useState)(!1),y=Object(i.a)(x,2),_=y[0],k=y[1],N=Object(n.useState)(0),g=Object(i.a)(N,2),P=g[0],w=g[1],B=Object(n.useState)("x"),S=Object(i.a)(B,2),E=S[0],C=S[1],A=Object(n.useState)(Array(l.BOARD_NUM_ROWS*l.BOARD_NUM_ROWS).fill({showClassName:"",takenByPlayer:"",winning:!1})),R=Object(i.a)(A,2),I=R[0],T=R[1],D=Object(n.useState)(-1),M=Object(i.a)(D,2),W=M[0],U=M[1];Object(n.useEffect)((function(){c&&(h(!1),k(!1),w(0),C("x"),I.forEach((function(e,t){T((function(c){var n=Object(j.a)(c);return n[t]=Object(o.a)(Object(o.a)({},e),{},{takenByPlayer:"",winning:!1}),n}))})),U(-1),a(!1))}),[c]);Object(n.useEffect)((function(){I.forEach((function(e,t){setTimeout((function(){T((function(c){var n=Object(j.a)(c);return n[t]=Object(o.a)(Object(o.a)({},e),{},{showClassName:" show"}),n}))}),t*l.DELAY)}))}),[]);var z=function(e){T((function(t){if(""!==t[e].takenByPlayer||f)return t;var c=Object(j.a)(t);return c[e]=Object(o.a)(Object(o.a)({},t[e]),{},{takenByPlayer:" ".concat(E)}),w((function(e){return e+1})),U(e),c}))};return Object(n.useEffect)((function(){if(-1!==W){var e=m(I,E,l.BOARD_NUM_ROWS,W,l.WIN_STREAK);if(e&&Array.isArray(e))return h(!0),t(E),void T((function(t){var c=Object(j.a)(t);return e.forEach((function(e){c[e]=Object(o.a)(Object(o.a)({},t[e]),{},{winning:!0})})),c}));P!==l.BOARD_NUM_ROWS*l.BOARD_NUM_ROWS?C((function(e){return"x"===e?"o":"x"})):k(!0)}}),[W]),Object(n.useEffect)((function(){"o"===E&&s&&T((function(e){var t=function(e){var t=e.cells,c=e.currentPlayer,n=(e.size,e.lastCellIndex,e.winStreak,Object(j.a)(t)),a=Object(o.a)(Object(o.a)({},e),{},{cells:n});console.log("called finder");var r=-100,s=-1;return a.cells.forEach((function(e,t){if(""===e.takenByPlayer){e.takenByPlayer=c,a.lastCellIndex=t,console.time("minimax");var n=v(0,a,!0);console.timeEnd("minimax"),e.takenByPlayer="",n>r&&(r=n,s=t)}})),s}({cells:e,currentPlayer:"o",size:l.BOARD_NUM_ROWS,lastCellIndex:W,winStreak:l.WIN_STREAK}),c=Object(j.a)(e);return c[t]=Object(o.a)(Object(o.a)({},e[t]),{},{takenByPlayer:" o"}),w((function(e){return e+1})),U(t),c}))}),[E]),Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("div",{className:"board board_".concat(l.BOARD_NUM_ROWS),children:I.map((function(e,t){return Object(u.jsx)(b,{index:t,showClassName:e.showClassName,takenByPlayer:e.takenByPlayer,winning:e.winning,currentPlayer:" current_".concat(E),size:l.SIZE,onClickCallback:z},t)}))}),Object(u.jsx)(p,{isWinner:f,isDraw:_,winner:E})]})}),N=(c(39),function(e){var t=e.theme,c=e.onClickHandler;return Object(u.jsx)("div",{className:"theme-toggler theme-toggler--".concat(t),onClick:c,title:"Toggle theme"})}),g=(c(40),function(e){var t=e.score,c=e.theme;return Object(u.jsxs)("div",{className:"score score--".concat(c),children:[Object(u.jsx)("span",{className:"score__title",children:"SCORE:"}),Object(u.jsxs)("div",{className:"score__table",children:[Object(u.jsxs)("div",{className:"score__row score__row--players",children:[Object(u.jsx)("span",{className:"score__column--left",children:"x"}),Object(u.jsx)("span",{className:"score__column--right",children:"o"})]}),Object(u.jsxs)("div",{className:"score__row score__row--score",children:[Object(u.jsx)("span",{className:"score__column--left",children:t.x}),Object(u.jsx)("span",{className:"score__column--right",children:t.o})]})]})]})}),P=(c(41),function(e){var t=e.onClickHandler,c=e.theme;return Object(u.jsx)("button",{className:"restart restart--".concat(c),onClick:function(){return t(!0)},children:Object(u.jsx)("span",{children:"Clear board"})})}),w=c(3),B=c(25),S=c(27),E=(c(47),function(e){var t=e.goToPath,c=Object(w.g)();return Object(u.jsx)("div",{className:"back",children:Object(u.jsxs)("button",{type:"button",onClick:function(){null!==t?c.push(t):c.goBack()},children:[Object(u.jsx)(B.a,{icon:S.a}),Object(u.jsx)("span",{className:"back__text",children:" go back"})]})})}),C=function(){var e=Object(n.useState)(!1),t=Object(i.a)(e,2),c=t[0],a=t[1],r=c?"grey":"color",s=Object(n.useState)({x:0,o:0}),j=Object(i.a)(s,2),b=j[0],O=j[1],d=Object(n.useState)(!1),f=Object(i.a)(d,2),h=f[0],x=f[1],m=function(e){x(e)},y=Object(w.h)(),_=y.mode,v=y.type;return Object(u.jsxs)("div",{className:"app-container app-container--".concat(r),children:[Object(u.jsx)(E,{goToPath:null}),Object(u.jsx)(P,{onClickHandler:m,theme:r}),Object(u.jsx)(N,{theme:r,onClickHandler:function(){a((function(e){return!e}))}}),Object(u.jsx)(g,{score:b,theme:r}),Object(u.jsx)(k,{scoreHandler:function(e){O((function(t){return Object(o.a)(Object(o.a)({},t),{},Object(l.a)({},e,t[e]+1))}))},restart:h,handleRestart:m,size:+_,isAI:"pvc"===v})]})},A=(c(50),c(51),function(e){return Object(u.jsx)("ul",{className:"game-menu",children:e.children})}),R=c(10),I=function(){var e=Object(w.i)(),t=e.path,c=e.url;return Object(u.jsxs)("div",{className:"welcome",children:[Object(u.jsx)("h1",{className:"welcome__title",children:"TIC TAC TOE"}),Object(u.jsx)("div",{className:"welcome__menu",children:Object(u.jsxs)(w.d,{children:[Object(u.jsx)(w.b,{path:"".concat(t,"/mode-3"),children:Object(u.jsxs)(A,{children:[Object(u.jsx)(E,{goToPath:null}),Object(u.jsx)("li",{children:Object(u.jsx)(R.b,{to:"/game/3/pvp",children:"Player vs Player"})}),Object(u.jsx)("li",{children:Object(u.jsx)(R.b,{to:"/game/3/pvc",children:"Player vs AI"})})]})}),Object(u.jsx)(w.b,{path:"".concat(t,"/mode-10"),children:Object(u.jsxs)(A,{children:[Object(u.jsx)(E,{goToPath:null}),Object(u.jsx)("li",{children:Object(u.jsx)(R.b,{to:"/game/10/pvp",children:"Player vs Player"})})]})}),Object(u.jsx)(w.b,{path:t,children:Object(u.jsxs)(A,{children:[Object(u.jsx)("li",{children:Object(u.jsx)(R.b,{to:"".concat(c,"/mode-3"),children:"3 x 3 mode (includes AI opponent)"})}),Object(u.jsx)("li",{children:Object(u.jsx)(R.b,{to:"".concat(c,"/mode-10"),children:"10 x 10 mode"})})]})})]})})]})},T=function(){return Object(u.jsx)(R.a,{children:Object(u.jsxs)(w.d,{children:[Object(u.jsx)(w.b,{path:"/game/:mode/:type",children:Object(u.jsx)(C,{})}),Object(u.jsx)(w.b,{path:"/welcome",children:Object(u.jsx)(I,{})}),Object(u.jsx)(w.b,{path:"/",children:Object(u.jsx)(w.a,{to:"/welcome"})})]})})};s.a.render(Object(u.jsx)(a.a.StrictMode,{children:Object(u.jsx)(T,{})}),document.getElementById("root"))}},[[52,1,2]]]);
//# sourceMappingURL=main.7ec71f02.chunk.js.map