import{a as w}from"./chunk-7CKSF5LV.js";import{a as g}from"./chunk-ZVEU6AV6.js";import{l as m}from"./chunk-M5SI4A4X.js";import{b as c}from"./chunk-BOA3IXSD.js";import{b as f,f as h}from"./chunk-PBNN5S4Q.js";import"./chunk-B6NZ5ZRX.js";import{b as p}from"./chunk-B6JII4SV.js";import"./chunk-PB56H5ER.js";import{b as r}from"./chunk-7DO6M3U7.js";import{a as e}from"./chunk-F4TDH6VI.js";import{a as u,c as d}from"./chunk-7CC3ABIV.js";import"./chunk-2GUEMEWN.js";import{d as a}from"./chunk-EEB6LQGP.js";import"./chunk-DQW7DUIU.js";function M(o){if(!c)return e(a,{});let n=d(null),[x,k]=u(!1);if(o.dashboardTypes.includes("AzureDataExplorer")){let b=t=>{switch(t){case"query":return["https://kwetest.eastus.kusto.windows.net/.default"];case"People.Read":return["People.Read","User.ReadBasic.All","Group.Read.All"];default:return[t]}},y=(t,s)=>{console.log(`[postToken] scope: ${s}, message length(accesstoken): ${t.length}`),k(!0),n.current?.contentWindow?.postMessage({type:"postToken",message:t,scope:s},"*")},T=async t=>{let s=b(t),A=`${location.origin}/api/data/clouds/auth-token?scope=${s.join(",")}`,i=await(await fetch(A,{headers:{Authorization:`Bearer ${o.jwt}`}})).json();console.log(i),y(i.Token,t)};self.addEventListener("message",t=>{console.log(t.data),t.data.signature==="queryExplorer"&&t.data.type==="getToken"&&T(t.data.scope).then()})}let l=o.dashboardTypes.includes("AzureDataExplorer")?`https://dataexplorer.azure.com/clusters/${o.kustoCluster}.${o.kustoLocation}/databases/Telemetry?f-IFrameAuth=true&f-UseMeControl=false&workspace=<guid>`:null,E=l&&e(a,{children:[!x&&e(m,{class:"w-20 h-20 text-blue-500 animate-spin inline-block m-4"}),e("iframe",{class:"w-full h-[600px]",ref:n,src:l})]});return e("form",{method:"post",action:"/api/eac/data/explore",...o,class:r(["-:w-full -:mx-auto -:p-3 -:mt-8"],o),children:[e("div",{class:"flex flex-wrap -mx-3 mb-4 text-left",children:e("div",{class:"w-full p-3",children:[e(f,{id:"explored",name:"explored",type:"hidden",value:"true"}),e("label",{class:"block uppercase tracking-wide font-bold mb-2 text-xl",children:"Explore Data"}),e("p",{class:"block text-md mb-8",children:"Now that data is flowing into the system, this step provides initial access to the dashboard services configured earlier in the workflow. You can start exploring the device data that is now flowing into these services or continue to the next step."}),e(g,{dashboardTypes:o.dashboardTypes,jwt:o.jwt,kustoCluster:o.kustoCluster,kustoLocation:o.kustoLocation})]})}),e(h,{class:"mt-8 flex-col",children:e(a,{children:e(p,{type:"submit",class:r(["w-full md:w-auto text-white font-bold m-1 py-2 px-4 rounded focus:outline-none shadow-lg"],w.props),children:"Move to Develop Solutions"})})})]})}export{M as DataExploreForm};
