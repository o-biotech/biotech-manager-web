import{a as h}from"./chunk-KDZBTB6T.js";import"./chunk-GRAJADRK.js";import{b as u}from"./chunk-O2YIHIND.js";import{e as m}from"./chunk-FQCJ3BIC.js";import{a as s,b as l,c as f,e as g}from"./chunk-TRWQNRWE.js";import"./chunk-2GUEMEWN.js";import{a as d,c as p}from"./chunk-IN5SKDVW.js";import{a as e}from"./chunk-BRQEXE2C.js";import{d as r}from"./chunk-BV6DNIGX.js";import"./chunk-DQW7DUIU.js";function $(o){if(!u)return e(r,{});let n=p(null),[x,w]=d(!1);if(o.dashboardTypes.includes("AzureDataExplorer")){let b=t=>{switch(t){case"query":return["https://kwetest.eastus.kusto.windows.net/.default"];case"People.Read":return["People.Read","User.ReadBasic.All","Group.Read.All"];default:return[t]}},k=(t,a)=>{console.log(`[postToken] scope: ${a}, message length(accesstoken): ${t.length}`),w(!0),n.current?.contentWindow?.postMessage({type:"postToken",message:t,scope:a},"*")},A=async t=>{let a=b(t),T=`${location.origin}/api/data/clouds/auth-token?scope=${a.join(",")}`,c=await(await fetch(T,{headers:{Authorization:`Bearer ${o.jwt}`}})).json();console.log(c),k(c.Token,t)};self.addEventListener("message",t=>{console.log(t.data.type),t.data.signature==="queryExplorer"&&t.data.type==="getToken"&&A(t.data.scope).then()})}let i=o.dashboardTypes.includes("AzureDataExplorer")?`https://dataexplorer.azure.com/clusters/${o.kustoCluster}.${o.kustoLocation}/databases/Telemetry?f-IFrameAuth=true&f-UseMeControl=false&workspace=<guid>`:null,y=i&&e(r,{children:[!x&&e(m,{class:"w-20 h-20 text-blue-500 animate-spin inline-block m-4"}),e("iframe",{class:"w-full h-[600px]",ref:n,src:i})]});return e("form",{method:"post",action:"/api/eac/data/explore",...o,class:s(o,"w-full mx-auto p-3 mt-8"),children:[e("div",{class:"flex flex-wrap -mx-3 mb-4 text-left",children:e("div",{class:"w-full p-3",children:[e(f,{id:"explored",name:"explored",type:"hidden",value:"true"}),e("label",{class:"block uppercase tracking-wide font-bold mb-2 text-xl",children:"Explore Data"}),e("p",{class:"block text-md mb-8",children:"Now that data is flowing, the next step is to explore the dashboards you configured previously, or skip ahead to see what other development you can implement with your data."}),e("ul",{class:"flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400",children:e("li",{class:"me-2",children:e("a",{href:"#","aria-current":"page",class:"inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500",children:"Azure Data Explorer"})})}),e("p",{children:["If you receive an error about failure to read 'localStorage' visit"," ",e(l,{class:"inline-block",actionStyle:4,href:"https://www.chromium.org/for-testers/bug-reporting-guidelines/uncaught-securityerror-failed-to-read-the-localstorage-property-from-window-access-is-denied-for-this-document/#:~:text=This%20exception%20is%20thrown%20when,the%20fourth%20item%20under%20Cookies.",target:"_blank",children:"this"})," ","page to fix."]}),y]})}),e(g,{class:"mt-8 flex-col",children:e(r,{children:e(l,{type:"submit",class:s(h.props,"w-full md:w-auto text-white font-bold m-1 py-2 px-4 rounded focus:outline-none shadow-lg"),children:"Move to Develop Solutions"})})})]})}export{$ as DataExploreForm};
