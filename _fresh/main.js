import{a as B,c as Y}from"./chunk-F43LKSUO.js";import"./chunk-2GUEMEWN.js";import{a as U,b as W,c as A,d as b,e as $,f as z}from"./chunk-BV6DNIGX.js";import"./chunk-DQW7DUIU.js";typeof globalThis>"u"&&(window.globalThis=window);var X="fresh-partial",w="f-partial",L="f-loading",P="f-client-nav",O="data-fresh-key",E="data-current",x="data-ancestor";function q(e,n){let r=new URL(n,"http://localhost").pathname;return r!=="/"&&r.endsWith("/")&&(r=r.slice(0,-1)),e!=="/"&&e.endsWith("/")&&(e=e.slice(0,-1)),e===r?2:e.startsWith(r+"/")||r==="/"?1:0}function j(e,n){let r=e.props,t=r.href;if(typeof t=="string"&&t.startsWith("/")){let o=q(n,t);o===2?(r[E]="true",r["aria-current"]="page"):o===1&&(r[x]="true",r["aria-current"]="true")}}function oe(e,n,r){return e.__k={_frshRootFrag:!0,nodeType:1,parentNode:e,nextSibling:null,get firstChild(){let t=n.nextSibling;return t===r?null:t},get childNodes(){let t=[],o=n.nextSibling;for(;o!==null&&o!==r;)t.push(o),o=o.nextSibling;return t},insertBefore(t,o){e.insertBefore(t,o??r)},appendChild(t){e.insertBefore(t,r)},removeChild(t){e.removeChild(t)}}}function Z(e){return e.nodeType===Node.COMMENT_NODE}function ie(e){return e.nodeType===Node.TEXT_NODE}function k(e){return e.nodeType===Node.ELEMENT_NODE&&!("_frshRootFrag"in e)}function Re(e,n){let r=[];S(e,n,[],[A(b,null)],document.body,r);for(let t=0;t<r.length;t++){let{vnode:o,rootFragment:a}=r[t],i=()=>{z(o,a)};"scheduler"in window?scheduler.postTask(i):setTimeout(i,0)}}function ee(e){return e.children}ee.displayName="PreactServerComponent";function I(e,n){let r=e.props;r.children==null?r.children=n:Array.isArray(r.children)?r.children.push(n):r.children=[r.children,n]}var K=class extends ${componentDidMount(){te.set(this.props.name,this)}render(){return this.props.children}};var G=!1,te=new Map;function v(e){let{startNode:n,endNode:r}=e,t=r.parentNode;if(!G&&n!==null&&n.nodeType===Node.COMMENT_NODE){let o=new Text("");e.startNode=o,t.insertBefore(o,n),n.remove()}if(!G&&r!==null&&r.nodeType===Node.COMMENT_NODE){let o=new Text("");e.endNode=o,t.insertBefore(o,r),r.remove()}}function J(e,n,r,t,o,a){let[i,s]=o.slice(6).split(":"),l=`#frsh-slot-${i}-${s}-children`,d=document.querySelector(l);if(d!==null){r.push({kind:1,endNode:null,startNode:null,text:o.slice(1)});let c=d.content.cloneNode(!0);S(e,n,r,t,c,a),r.pop()}}function S(e,n,r,t,o,a){let i=o;for(;i!==null;){let s=r.length>0?r[r.length-1]:null;if(Z(i)){let l=i.data;if(l.startsWith("!--")&&(l=l.slice(3,-2)),l.startsWith("frsh-slot"))r.push({startNode:i,text:l,endNode:null,kind:1}),t.push(A(ee,{id:l}));else if(l.startsWith("frsh-partial")){let[d,c,p,N]=l.split(":");r.push({startNode:i,text:c,endNode:null,kind:2}),t.push(A(K,{name:c,key:N,mode:+p}))}else if(l.startsWith("frsh-key:")){let d=l.slice(9);t.push(A(b,{key:d}))}else if(l.startsWith("/frsh-key:")){let d=t.pop(),c=t[t.length-1];I(c,d),i=i.nextSibling;continue}else if(s!==null&&(l.startsWith("/frsh")||s.text===l)){if(s.endNode=i,r.pop(),s.kind===1){let d=t.pop(),c=t[t.length-1];c.props.children=d,v(s),i=s.endNode.nextSibling;continue}else if(s!==null&&(s.kind===0||s.kind===2))if(r.length===0){let d=t[t.length-1];d.props.children==null&&J(e,n,r,t,l,a),t.pop();let c=i.parentNode;v(s);let p=oe(c,s.startNode,s.endNode);a.push({vnode:d,marker:s,rootFragment:p}),i=s.endNode.nextSibling;continue}else{let d=t[t.length-1];d&&d.props.children==null?(J(e,n,r,t,l,a),d.props.children==null&&t.pop()):t.pop(),s.endNode=i,v(s);let c=t[t.length-1];I(c,d),i=s.endNode.nextSibling;continue}}else if(l.startsWith("frsh")){let[d,c,p]=l.slice(5).split(":"),N=n[Number(c)];r.push({startNode:i,endNode:null,text:l,kind:0});let h=A(e[d],N);p&&(h.key=p),t.push(h)}}else if(ie(i)){let l=t[t.length-1];s!==null&&(s.kind===1||s.kind===2)&&I(l,i.data)}else{let l=t[t.length-1];if(k(i))if(s!==null&&(s.kind===1||s.kind===2)){let c={children:i.childNodes.length<=1?null:[]},p=!1;for(let h=0;h<i.attributes.length;h++){let u=i.attributes[h];if(u.nodeName===O){p=!0,c.key=u.nodeValue;continue}else if(u.nodeName===L){let f=u.nodeValue,m=n[Number(f)][L].value;i._freshIndicator=m}c[u.nodeName]=typeof i[u.nodeName]=="boolean"?!0:u.nodeValue}p&&i.removeAttribute(O);let N=A(i.localName,c);I(l,N),t.push(N)}else{let d=i.getAttribute(L);if(d!==null){let c=n[Number(d)][L].value;i._freshIndicator=c}}i.firstChild&&i.nodeName!=="SCRIPT"&&S(e,n,r,t,i.firstChild,a),s!==null&&s.kind!==0&&t.pop()}i!==null&&(i=i.nextSibling)}}var se="Unable to process partial response.";async function H(e,n={}){n.redirect="follow",e.searchParams.set(X,"true");let r=await fetch(e,n);await le(r)}function ne(e){document.querySelectorAll("a").forEach(n=>{let r=q(e.pathname,n.href);r===2?(n.setAttribute(E,"true"),n.setAttribute("aria-current","page"),n.removeAttribute(x)):r===1?(n.setAttribute(x,"true"),n.setAttribute("aria-current","true"),n.removeAttribute(E)):(n.removeAttribute(E),n.removeAttribute(x),n.removeAttribute("aria-current"))})}function re(e,n,r,t){let o=null,a=t.firstChild,i=0;for(;a!==null;){if(Z(a)){let s=a.data;if(s.startsWith("frsh-partial"))o=a,i++;else if(s.startsWith("/frsh-partial")){i--;let l={_frshRootFrag:!0,nodeType:1,nextSibling:null,firstChild:o,parentNode:t,get childNodes(){let d=[o],c=o;for(;(c=c.nextSibling)!==null;)d.push(c);return d}};S(n,r[0]??[],[],[A(b,null)],l,e)}}else i===0&&k(a)&&re(e,n,r,a);a=a.nextSibling}}var D=class extends Error{};async function le(e){if(e.headers.get("Content-Type")!=="text/html; charset=utf-8")throw new Error(se);let r=await e.text(),t=new DOMParser().parseFromString(r,"text/html"),o=[],a={},i=t.getElementById("__FRSH_PARTIAL_DATA"),s=null;i!==null&&(s=JSON.parse(i.textContent),o.push(...Array.from(Object.entries(s.islands)).map(async h=>{let u=await import(`${h[1].url}`);a[h[0]]=u[h[1].export]})));let l=t.getElementById("__FRSH_STATE")?.textContent,d=[[],[]],c;s!==null&&s.signals!==null&&o.push(import(s.signals).then(h=>{c=h.signal}));let p;l&&s&&s.deserializer!==null&&o.push(import(s.deserializer).then(h=>p=h.deserialize)),await Promise.all(o),l&&(d=p?p(l,c):JSON.parse(l)?.v);let N=[];if(re(N,a,d,t.body),N.length===0)throw new D(`Found no partials in HTML response. Please make sure to render at least one partial. Requested url: ${e.url}`);document.title=t.title,Array.from(t.head.childNodes).forEach(h=>{let u=h;if(u.nodeName!=="TITLE"){if(u.nodeName==="META"){let f=u;if(f.hasAttribute("charset"))return;let m=f.name;if(m!==""){let T=document.head.querySelector(`meta[name="${m}"]`);T!==null?T.content!==f.content&&(T.content=f.content):document.head.appendChild(f)}else{let T=u.getAttribute("property"),g=document.head.querySelector(`meta[property="${T}"]`);g!==null?g.content!==f.content&&(g.content=f.content):document.head.appendChild(f)}}else if(u.nodeName==="LINK"){let f=u;if(f.rel==="modulepreload")return;f.rel==="stylesheet"&&Array.from(document.head.querySelectorAll("link")).find(T=>T.href===f.href)===void 0&&document.head.appendChild(f)}else if(u.nodeName==="SCRIPT"){if(u.src===`${B}/refresh.js`)return}else if(u.nodeName==="STYLE"){let f=u;f.id===""&&document.head.appendChild(f)}}});for(let h=0;h<N.length;h++){let{vnode:u,marker:f}=N[h],m=te.get(f.text);if(!m)console.warn(`Partial "${f.text}" not found. Skipping...`);else{let T=u.props.mode,g=u.props.children;if(T===0)m.props.children=g;else{let V=m.props.children,R=Array.isArray(V)?V:[V];if(T===1)R.push(g);else{W(g)||(g=A(b,null,g)),g.key==null&&(g.key=R.length);let F=m.__v.__k;if(Array.isArray(F))for(let y=0;y<F.length;y++){let C=F[y];if(C.key==null)C.key=y;else break}for(let y=0;y<R.length;y++){let C=R[y];if(C.key==null)C.key=y;else break}R.unshift(g)}m.props.children=R}m.setState({})}}}var Q=U.vnode;U.vnode=e=>{Y(e),e.type==="a"&&j(e,location.pathname),Q&&Q(e)};function _(e){if(e===null)return document.querySelector(`[${P}="true"]`)!==null;let n=e.closest(`[${P}]`);return n===null?!1:n.getAttribute(P)==="true"}var M=history.state?.index||0;if(!history.state){let e={index:M,scrollX,scrollY};history.replaceState(e,document.title)}document.addEventListener("click",async e=>{let n=e.target;if(n&&n instanceof HTMLElement){let r=n;if(n.nodeName!=="A"&&(n=n.closest("a")),n&&n instanceof HTMLAnchorElement&&n.href&&(!n.target||n.target==="_self")&&n.origin===location.origin&&e.button===0&&!(e.ctrlKey||e.metaKey||e.altKey||e.shiftKey||e.button)&&!e.defaultPrevented){let t=n.getAttribute(w);if(n.getAttribute("href")?.startsWith("#")||!_(n))return;let o=n._freshIndicator;o!==void 0&&(o.value=!0),e.preventDefault();let a=new URL(n.href);try{if(n.href!==window.location.href){let s={index:M,scrollX:window.scrollX,scrollY:window.scrollY};history.replaceState({...s},"",location.href),M++,s.scrollX=0,s.scrollY=0,history.pushState(s,"",a.href)}let i=new URL(t||a.href,location.href);await H(i),ne(a),scrollTo({left:0,top:0,behavior:"instant"})}finally{o!==void 0&&(o.value=!1)}}else{let t=r;if(t.nodeName!=="A"&&(t=t.closest("button")),t!==null&&t instanceof HTMLButtonElement&&(t.type!=="submit"||t.form===null)){let o=t.getAttribute(w);if(o===null||!_(t))return;let a=new URL(o,location.href);await H(a)}}}});addEventListener("popstate",async e=>{if(e.state===null){history.scrollRestoration&&(history.scrollRestoration="auto");return}let n=history.state;if(M=n.index??M+1,!_(null)){location.reload();return}history.scrollRestoration&&(history.scrollRestoration="manual");let t=new URL(location.href,location.origin);try{await H(t),ne(t),scrollTo({left:n.scrollX??0,top:n.scrollY??0,behavior:"instant"})}catch(o){if(o instanceof D){location.reload();return}throw o}});document.addEventListener("submit",async e=>{let n=e.target;if(n!==null&&n instanceof HTMLFormElement&&!e.defaultPrevented){if(!_(n)||e.submitter!==null&&!_(e.submitter))return;let r=e.submitter?.getAttribute("formmethod")?.toLowerCase()??n.method.toLowerCase();if(r!=="get"&&r!=="post"&&r!=="dialog")return;let t=e.submitter?.getAttribute(w)??e.submitter?.getAttribute("formaction")??n.getAttribute(w)??n.action;if(t!==""){e.preventDefault();let o=new URL(t,location.href),a;r==="get"?new URLSearchParams(new FormData(n)).forEach((s,l)=>o.searchParams.set(l,s)):a={body:new FormData(n),method:r},await H(o,a)}}});export{le as applyPartials,Re as revive};
