(this["webpackJsonpreact-pages"]=this["webpackJsonpreact-pages"]||[]).push([[0],{14:function(t,e,n){},15:function(t,e,n){"use strict";n.r(e);var o=n(0),a=n.n(o),c=n(3),i=n.n(c),s=(n(14),n(1)),r=n(4),l=n(5),u=n(7),m=n(6),h=n(8),p="AIzaSyDI8c1xJ4xr9VGlhAmSye4-2fWqQ2Dh_gc",g=function(t){function e(t){var n;return Object(r.a)(this,e),(n=Object(u.a)(this,Object(m.a)(e).call(this,t))).onInput=function(t){n.setState({name:t.target.value})},n.addTodo=function(){var t=n.state,e=t.todos,o=t.name;n.setState({todos:[].concat(Object(s.a)(e),[o])})},n.consClick=function(){var t=n.state.imgs_url;console.log(t)},n.viewImgs=function(){n.state.imgs_url;fetch("https://maps.googleapis.com/maps/api/directions/json?key="+p+"&origin=Sannomiya St&destination=KIITO").then((function(t){return t.json()})).then((function(t){console.log(t);for(var e=t.routes[0].legs[0].steps,o=[],a=0;a<e.length;a++){var c="https://maps.googleapis.com/maps/api/streetview?size=400x400&location="+(e[a].start_location.lat+","+e[a].start_location.lng)+"&fov=120&heading=0&pitch=10&key="+p;console.log(c),o.push(c)}n.setState({imgs_url:o})}))},n.removeTodo=function(t){var e=n.state,o=e.todos;e.name;n.setState({todos:[].concat(Object(s.a)(o.slice(0,t)),Object(s.a)(o.slice(t+1)))})},n.state={todos:[],name:"",imgs_url:[]},n}return Object(h.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){var t=this,e=this.state,n=e.todos,o=e.imgs_url;return a.a.createElement("div",null,a.a.createElement("input",{type:"text",onInput:this.onInput}),a.a.createElement("button",{onClick:this.addTodo},"\u767b\u9332"),a.a.createElement("ul",null,n.map((function(e,n){return a.a.createElement("li",{key:n},e,a.a.createElement("button",{onClick:function(){t.removeTodo(n)}},"\u524a\u9664"))}))),a.a.createElement("button",{onClick:this.viewImgs},"view"),a.a.createElement("br",null),o.map((function(t,e){return a.a.createElement("div",null,a.a.createElement("img",{src:t}))})),a.a.createElement("button",{onClick:this.consClick},"cons"))}}]),e}(o.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(a.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))},9:function(t,e,n){t.exports=n(15)}},[[9,1,2]]]);
//# sourceMappingURL=main.1c0ab1b4.chunk.js.map