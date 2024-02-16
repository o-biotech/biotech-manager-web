import{a as U}from"./chunk-QVU3U7VW.js";import{a as J}from"./chunk-PGUFRBTZ.js";import{e as P,l as $}from"./chunk-YMDD2NAK.js";import{b as H}from"./chunk-CXSCRK6U.js";import{a as T,b as x,c as I,e as h,g as C}from"./chunk-PBNN5S4Q.js";import"./chunk-B6NZ5ZRX.js";import{b as R}from"./chunk-B6JII4SV.js";import"./chunk-PB56H5ER.js";import{b as i}from"./chunk-7DO6M3U7.js";import{a as e}from"./chunk-F4TDH6VI.js";import{a as l,b as w,c as u}from"./chunk-7CC3ABIV.js";import"./chunk-2GUEMEWN.js";import{d as j}from"./chunk-EEB6LQGP.js";import"./chunk-DQW7DUIU.js";function Q(a){let n=Object.prototype.toString.call(a);return a instanceof Date||typeof a=="object"&&n==="[object Date]"?new a.constructor(+a):typeof a=="number"||n==="[object Number]"||typeof a=="string"||n==="[object String]"?new Date(a):new Date(NaN)}function B(a,n,g){let p;return ue(n)?p=n:g=n,new Intl.DateTimeFormat(g?.locale,p).format(Q(a))}function ue(a){return a!==void 0&&!("locale"in a)}function Ie(a){let n=e(j,{children:[e("div",{class:"font-bold text-lg",children:"Loading device data"}),e($,{...a,class:i(["-:w-6 -:h-6 -:text-blue-500 -:animate-spin -:inline-block -:m-4"],a)})]});if(!H)return n;let g=u(null),p=u(null),E=u(null),S=u(null),F=u(null),A=u(null),[d,D]=l("devices"),[r,b]=l("payloads"),[y,K]=l(""),[m,W]=l({EnableRefresh:!0,RefreshRate:30}),[o,X]=l({TakeRows:100,TakeRowsEnabled:!0,UseDescending:!0}),[v,z]=l(Object.keys(a.devices).map(t=>({DeviceID:t,Active:!1,Details:a.devices[t].Details}))),[k,Z]=l(""),[q,_]=l([]),[G,L]=l(!1),[M,V]=l(void 0),Y=t=>{let s=v.find(f=>f.DeviceID===t.currentTarget.id);s.Active=!s.Active,z([...v])},ee=t=>{K(g.current.value)},te=t=>{W({EnableRefresh:p.current.checked,RefreshRate:Number.parseInt(E.current.value)}),X({TakeRows:Number.parseInt(S.current.value),TakeRowsEnabled:F.current.checked,UseDescending:A.current.checked})},ae=async()=>{L(!0);let t=`${location.origin}/api/data/warm/explorer`,s={Query:k};console.log(s);let O=(await(await fetch(t,{method:"POST",headers:{Authorization:`Bearer ${a.jwt}`},body:JSON.stringify(s)})).json()).primaryResults[0].data;console.log(O[0]),_(O),setTimeout(()=>{L(!1)},0)};w(()=>{let t=`Devices
| order by EnqueuedTime ${o.UseDescending?"desc":"asc"}`;v.every(s=>!s.Active)||(t=`let deviceIds = dynamic([${v.filter(c=>c.Active).map(c=>`'${c.DeviceID}'`).join(",")}]);
${t}
| where DeviceID in (deviceIds)`),y&&(t=`${t}
${y}`),o.TakeRowsEnabled&&(t=`${t}
| take ${o.TakeRows}`),Z(t)},[y,v,o]);let N=()=>{ae().then()};w(()=>{k&&(M&&clearInterval(M),m.EnableRefresh&&V(setInterval(N,m.RefreshRate*1e3)),N())},[m,k]);let le=e("div",{class:"h-full relative overflow-hidden",children:e("div",{class:"h-full relative overflow-auto",children:v.map(t=>e("div",{class:"flex flex-row items-center",children:[e(x,{id:t.DeviceID,name:t.DeviceID,type:"checkbox",checked:t.Active,onClick:Y,class:"flex-none mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 peer"}),e("label",{for:t.DeviceID,class:"ml-2 flex-1 text-lg peer-checked:font-bold",children:t.Details.Name})]}))})}),re=e("div",{class:"h-full relative overflow-hidden",children:e("div",{class:"flex flex-col gap-2 h-full relative overflow-auto divide-y divide-gray-500",children:[e("div",{class:"flex flex-row gap-2 items-center my-2",children:e(h,{class:"after:top-[7px]",ref:F,checked:o.TakeRowsEnabled,children:[e("span",{class:"flex-1 md:flex-none ml-2 h-[34px] leading-[34px]",children:"Use Take Rows"}),e(I,{text:"rows",isNumber:!0,class:"w-full mt-2 md:flex-1 md:w-auto md:mt-auto hidden peer-checked:block ml-2 after:leading-[34px]",children:e(x,{type:"number",value:o.TakeRows,ref:S,maxlength:6,onKeyPress:T,class:"p-1"})})]})}),e("div",{class:"flex flex-row gap-2 items-center pt-2",children:e(h,{class:"after:top-[7px]",ref:A,checked:o.UseDescending,children:e("span",{class:"ml-2 h-[34px] leading-[34px]",children:"Use Descending Order"})})}),e("div",{class:"flex flex-row gap-2 items-center pt-2 mb-2",children:e(h,{class:"after:top-[7px]",ref:p,checked:m.EnableRefresh,children:[e("span",{class:"flex-1 md:flex-none ml-2 h-[34px] leading-[34px]",children:"Enable Auto Refresh"}),e(I,{text:"sec",isNumber:!0,class:"w-full mt-2 md:flex-1 md:w-auto md:mt-auto hidden peer-checked:block ml-2 after:leading-[34px]",children:e(x,{type:"number",value:m.RefreshRate,ref:E,maxlength:6,onKeyPress:T,class:"p-1"})})]})}),e("div",{class:"flex flex-row",children:[e("div",{class:"flex-1"}),e(R,{class:"mt-2",onClick:te,children:"Apply"})]})]})}),se=d==="devices"?le:d==="settings"?re:d==="custom"?e("div",{class:"h-full relative overflow-hidden",children:e("div",{class:"h-full relative overflow-auto",children:e("div",{class:"flex flex-col",children:[e("label",{for:"custom-filters",class:"ml-2 flex-1 text-lg peer-checked:font-bold",children:"Custom Filters"}),e(x,{id:"custom-filters",name:"custom-filters",type:"text",value:y,ref:g,multiline:!0}),e("div",{class:"flex flex-row",children:[e("div",{class:"flex-1"}),e(R,{class:"mt-2",onClick:ee,children:"Apply"})]})]})})}):d==="ai"?e("div",{class:"h-full relative overflow-hidden",children:e("div",{class:"h-full relative overflow-auto",children:e("h2",{children:"Coming Soon"})})}):void 0,ie=e("div",{class:"flex flex-col divide-y divide-gray-300 dark:divide-gray-700 h-full relative overflow-hidden",children:[e("div",{class:"flex-1 flex flex-row p-2",children:[e("div",{class:"flex-none w-40 underline",children:"Device ID"}),e("div",{class:"flex-1 underline",children:"Processed At"}),e("div",{class:"flex-none w-40 underline"})]}),e("div",{class:"flex flex-col divide-y divide-gray-300 dark:divide-gray-700 h-full relative overflow-auto",children:q.map(t=>{let s=B(new Date(Date.parse(t.EnqueuedTime)),{timeZoneName:"longOffset",year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric",fractionalSecondDigits:3}),f=JSON.stringify(t.RawData,null,2),c=t.DeviceID+Date.parse(t.EnqueuedTime);return e("div",{class:"flex-1 flex flex-wrap items-center p-2",children:[e("div",{class:"flex-none w-40",children:t.DeviceID}),e("div",{class:"flex-1",children:s}),e("div",{class:"flex-none",children:e(J,{class:"hidden",value:f})}),e("input",{id:c,type:"checkbox",class:"sr-only peer"}),e("label",{for:c,class:"cursor-pointer transition-all duration-200 peer-checked:rotate-[-180deg]",children:e(P,{class:"w-6 h-6"})}),e("div",{class:"hidden peer-checked:block w-full m-2 p-2 shadow shadow-inner bg-gray-200 dark:bg-gray-700",children:e("pre",{children:f})})]},c)})})]}),ne=e("h1",{class:"text-2xl",children:"Coming Soon"}),oe=e("div",{class:"h-full relative overflow-hidden",children:e("div",{class:"h-full relative overflow-auto",children:e("pre",{children:JSON.stringify(q,null,2)})})}),ce=e(U,{jwt:a.jwt,takeRows:o.TakeRows}),de=r==="raw"?oe:r==="payloads"?ie:r==="streaming"?ne:r==="hot-flow"?ce:r==="query"?e("div",{class:"h-full relative overflow-hidden",children:e("div",{class:"h-full relative overflow-auto",children:e("pre",{children:k})})}):void 0;return e("div",{class:"flex flex-col gap-4 divide-y-4 divide-[#4a918e]",children:[e("h1",{class:"text-4xl",children:"Device Data"}),e("div",{class:"flex flex-col md:flex-row gap-4 pt-4 relative",children:[e(C,{class:"md:w-[25%] md:flex-none p-4 bg-slate-50 dark:bg-slate-800 shadow shadow-slate-500 dark:shadow-black",children:[e("h1",{class:"text-2xl mb-1",children:"Filters"}),e("ul",{class:"flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400",children:[e("li",{class:"me-2",children:e("a",{onClick:()=>D("devices"),"aria-current":"page",class:i(["inline-block p-2 rounded-t-lg cursor-pointer",d==="devices"?"active bg-gray-700 dark:bg-gray-300 text-blue-300 dark:text-blue-700":"bg-gray-300 dark:bg-gray-700 text-blue-700 dark:text-blue-300"]),children:"Devices"})}),e("li",{class:"me-2",children:e("a",{onClick:()=>D("settings"),"aria-current":"page",class:i(["inline-block p-2 rounded-t-lg cursor-pointer",d==="settings"?"active bg-gray-700 dark:bg-gray-300 text-blue-300 dark:text-blue-700":"bg-gray-300 dark:bg-gray-700 text-blue-700 dark:text-blue-300"]),children:"Settings"})}),e("li",{class:"me-2",children:e("a",{onClick:()=>D("custom"),"aria-current":"page",class:i(["inline-block p-2 rounded-t-lg cursor-pointer",d==="custom"?"active bg-gray-700 dark:bg-gray-300 text-blue-300 dark:text-blue-700":"bg-gray-300 dark:bg-gray-700 text-blue-700 dark:text-blue-300"]),children:"Custom"})})]}),se]}),e(C,{class:"flex-1 p-4 bg-slate-100 dark:bg-slate-800 shadow shadow-slate-500 dark:shadow-black",children:[e("ul",{class:"flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400",children:[e("li",{class:"me-2",children:e("a",{onClick:()=>b("payloads"),"aria-current":"page",class:i(["inline-block p-4 rounded-t-lg cursor-pointer",r==="payloads"?"active bg-gray-700 dark:bg-gray-300 text-blue-300 dark:text-blue-700":"bg-gray-300 dark:bg-gray-700 text-blue-700 dark:text-blue-300"]),children:"Payloads"})}),e("li",{class:"me-2",children:e("a",{onClick:()=>b("streaming"),"aria-current":"page",class:i(["inline-block p-4 rounded-t-lg cursor-pointer",r==="streaming"?"active bg-gray-700 dark:bg-gray-300 text-blue-300 dark:text-blue-700":"bg-gray-300 dark:bg-gray-700 text-blue-700 dark:text-blue-300"]),children:"Streaming"})}),e("li",{class:"me-2",children:e("a",{onClick:()=>b("raw"),"aria-current":"page",class:i(["inline-block p-4 rounded-t-lg cursor-pointer",r==="raw"?"active bg-gray-700 dark:bg-gray-300 text-blue-300 dark:text-blue-700":"bg-gray-300 dark:bg-gray-700 text-blue-700 dark:text-blue-300"]),children:"Raw JSON"})}),e("li",{class:"me-2",children:e("a",{onClick:()=>b("hot-flow"),"aria-current":"page",class:i(["inline-block p-4 rounded-t-lg cursor-pointer",r==="hot-flow"?"active bg-gray-700 dark:bg-gray-300 text-blue-300 dark:text-blue-700":"bg-gray-300 dark:bg-gray-700 text-blue-700 dark:text-blue-300"]),children:"Hot Flow"})}),e("li",{class:"me-2",children:e("a",{onClick:()=>b("query"),"aria-current":"page",class:i(["inline-block p-4 rounded-t-lg cursor-pointer",r==="query"?"active bg-gray-700 dark:bg-gray-300 text-blue-300 dark:text-blue-700":"bg-gray-300 dark:bg-gray-700 text-blue-700 dark:text-blue-300"]),children:"Current Query"})})]}),G&&e("div",{class:"w-full",children:e("div",{class:"h-1.5 w-full bg-sky-100 overflow-hidden",children:e("div",{class:"animate-progress w-full h-full bg-sky-500 origin-left-right"})})}),e("div",{class:"m-2 h-[450px]",children:de})]})]})]})}export{Ie as DevicesDashboardControls};
