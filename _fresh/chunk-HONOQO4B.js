import{b as l}from"./chunk-LVFTG2KX.js";import{a as t}from"./chunk-F4TDH6VI.js";import{a as u,b as a}from"./chunk-7CC3ABIV.js";import{d}from"./chunk-EEB6LQGP.js";function m(e){let o=Array.isArray(e)?void 0:e,i=Array.isArray(e)?e:void 0;return{nav:o,navActions:i}}function s(e){let o=e.actionStyle||13,i=t("div",{class:l(["-:block -:font-bold","-:transition-colors -:duration-200 -:ease-out",(o&16)===16?"-:px-2 -:py-2 -:hover:text-blue-700 -:hover:text-opacity-80":"-:px-4 -:py-2",(o&8)===8?(o&16)===16?"-:rounded-full":"-:rounded":"",(o&1)===1?"-:bg-blue-500 -:text-white":"-:text-black -:dark:text-white",(o&2)===2?"-:text-blue-700 -:border-blue-700 -:border-solid -:border -:hover:border-blue-900":"-:border-none",(o&4)===4&&(o&16)!==4?"-:hover:bg-blue-700 -:hover:bg-opacity-80 -:hover:text-white":""],e)});return t(d,{children:[!e.href&&t("button",{...e,class:i.props.class}),e.href&&t("a",{...e,class:i.props.class})]})}var y=(n=>(n[n.Popover=1]="Popover",n[n.Slideout=2]="Slideout",n[n.Responsive=4]="Responsive",n))(y||{});function g(e){let{nav:o,navActions:i}=m(e.children),[n,c]=u(!1),p=r=>{c(!!r.closest(".menu-wrapper"))};return a(()=>{let r=A=>{p(A.target)};return window.document.addEventListener("click",r),()=>{window.document.removeEventListener("click",r)}},[]),t(d,{children:t("div",{class:l(["-:menu-wrapper -:relative"],e),children:[t(s,{actionStyle:28,onClick:()=>c(!n),class:"flex items-center",children:e.toggleChildren}),n&&t("div",{class:l(["bg-white shadow-md",e.menuStyle===1?"absolute right-0 mt-2":void 0,e.menuStyle===2?"fixed top-0 bottom-0 left-0 z-50 w-[80%]":void 0,e.menuStyle===4?"fixed top-0 bottom-0 left-0 z-50 w-[80%] md:absolute md:right-0 md:mt-2 md:top-auto md:bottom-auto md:left-auto md:w-auto":void 0]),children:o||t("ul",{class:"divide-y divide-gray-200",children:i?.map(r=>t("li",{children:t(s,{actionStyle:32,class:"block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",...r})}))})})]})})}export{m as a,s as b,y as c,g as d};