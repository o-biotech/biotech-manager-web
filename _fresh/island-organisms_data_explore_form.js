import"./chunk-GRAJADRK.js";import{b as u}from"./chunk-TOMJPPNW.js";import{d as p}from"./chunk-NHSO3ND6.js";import{a as s,b as m,e as f}from"./chunk-T6HS2F3C.js";import{a as c,c as d}from"./chunk-IN5SKDVW.js";import"./chunk-2GUEMEWN.js";import{a as e}from"./chunk-BRQEXE2C.js";import{d as r}from"./chunk-BV6DNIGX.js";import"./chunk-DQW7DUIU.js";var g=e("span",{class:"bg-gradient-to-r from-blue-500 to-purple-500/75 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500/75"});function F(o){if(!u)return e(r,{});let l=d(null),[x,h]=c(!1);if(o.dashboardTypes.includes("AzureDataExplorer")){let k=t=>{switch(t){case"query":return["https://kwetest.eastus.kusto.windows.net/.default"];case"People.Read":return["People.Read","User.ReadBasic.All","Group.Read.All"];default:return[t]}},w=(t,a)=>{console.log(`[postToken] scope: ${a}, message length(accesstoken): ${t.length}`),h(!0),l.current?.contentWindow?.postMessage({type:"postToken",message:t,scope:a},"*")},y=async t=>{let a=k(t),A=`${location.origin}/api/data/clouds/auth-token?scope=${a.join(",")}`,i=await(await fetch(A,{headers:{Authorization:`Bearer ${o.jwt}`}})).json();console.log(i),w(i.Token,t)};self.addEventListener("message",t=>{console.log(t.data.type),t.data.signature==="queryExplorer"&&t.data.type==="getToken"&&y(t.data.scope).then()})}let n=o.dashboardTypes.includes("AzureDataExplorer")?`https://dataexplorer.azure.com/clusters/${o.kustoCluster}.${o.kustoLocation}/databases/Telemetry?f-IFrameAuth=true&f-UseMeControl=false&workspace=<guid>`:null,b=n&&e(r,{children:[!x&&e(p,{class:"w-20 h-20 text-blue-500 animate-spin inline-block m-4"}),e("iframe",{class:"w-full h-[600px]",ref:l,src:n})]});return e("form",{method:"post",action:"/api/eac/data/explore",...o,class:s(o,"w-full mx-auto p-3 mt-8"),children:[e("div",{class:"flex flex-wrap -mx-3 mb-4 text-left",children:e("div",{class:"w-full p-3",children:[e("label",{class:"block uppercase tracking-wide font-bold mb-2 text-xl",children:"Explore Data"}),e("p",{class:"block text-md mb-8",children:"Now that data is flowing, the next step is to explore the dashboards you configured previously, or skip ahead to see what other development you can implement with your data."}),e("ul",{class:"flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400",children:e("li",{class:"me-2",children:e("a",{href:"#","aria-current":"page",class:"inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500",children:"Azure Data Explorer"})})}),b]})}),e(f,{class:"mt-8 flex-col",children:e(r,{children:e(m,{type:"submit",class:s(g.props,"w-full md:w-auto text-white font-bold m-1 py-2 px-4 rounded focus:outline-none shadow-lg"),children:"Move to Develop Solutions"})})})]})}export{F as DataExploreForm};