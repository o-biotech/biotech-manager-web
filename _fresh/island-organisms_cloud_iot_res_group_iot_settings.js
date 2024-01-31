import{a as c}from"./chunk-DIII4TCM.js";import"./chunk-O75MWVFO.js";import{a as d}from"./chunk-Y225NEWX.js";import{a as l,b as i,c as r,e as n}from"./chunk-YOVYNYLF.js";import"./chunk-2GUEMEWN.js";import{a as s}from"./chunk-IN5SKDVW.js";import{a as o}from"./chunk-BRQEXE2C.js";import{d as u}from"./chunk-BV6DNIGX.js";import"./chunk-DQW7DUIU.js";function g(e){return o("form",{method:"post",...e,class:l(["-:w-full -:max-w-sm -:md:max-w-md -:mx-auto -:p-3 -:mt-8"],e),children:[o("div",{class:"flex flex-wrap -mx-3 mb-4 text-left",children:[o(r,{id:"cloudLookup",name:"cloudLookup",type:"hidden",value:e.cloudLookup}),o(r,{id:"resGroupLookup",name:"resGroupLookup",type:"hidden",value:e.resGroupLookup}),o(r,{id:"resLookup",name:"resLookup",type:"hidden",value:e.resLookup}),o("div",{class:"w-full p-3",children:[o("label",{class:"block uppercase tracking-wide font-bold mb-2 text-xl",children:"Storage Flows"}),o("p",{class:"block text-md mb-8",children:"Your storage flows determine how your data can be accessed. Cold flows allow for long term storage with slower querying performance. Warm flows allow for shorter term storage with better querying performance. Hot flows provide data immediately with no storage; you manage the storage."}),o("div",{class:"flex items-center mb-2",children:[o(r,{id:"storageFlowCold",name:"storageFlowCold",type:"checkbox",value:"cold",class:"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"}),o("label",{for:"storageFlowCold",class:"ms-2 text-sm font-medium pl-3",children:"Cold Storage"})]}),o("div",{class:"flex items-center mb-2",children:[o(r,{type:"checkbox",value:"warm",checked:!0,disabled:!0,class:"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"}),o(r,{type:"hidden",id:"storageFlowWarm",name:"storageFlowWarm",value:"warm"}),o("label",{for:"storageFlowWarm",class:"ms-2 text-sm font-medium pl-3",children:"Warm Storage (required)"})]}),o("div",{class:"flex items-center mb-2",children:o(c,{id:"storageFlowHot",name:"storageFlowHot",value:"hot",hasGitHubAuth:e.hasGitHubAuth,organizations:e.organizations,class:"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600",children:o("label",{for:"storageFlowHot",class:"ms-2 text-sm font-medium pl-3",children:"Hot Storage"})})})]})]}),o(n,{class:"mt-8 flex-col",children:o(u,{children:o(i,{type:"submit",class:l(["w-full md:w-auto text-white font-bold m-1 py-2 px-4 rounded focus:outline-none shadow-lg"],d.props),children:"Establish IoT Infrastructure"})})})]})}function L(e){let[a,m]=s("");return o("div",{children:[o("div",{class:"w-full p-3",children:[o("label",{for:"resGroupLookup",class:"block uppercase tracking-wide font-bold mb-2 text-lg text-left",children:"IoT Resource Group"}),o("select",{id:"resGroupLookup",name:"resGroupLookup",type:"text",value:a,required:!0,onChange:t=>{m(t.currentTarget.value)},placeholder:"Select EaC cloud resource group",class:"appearance-none block w-full bg-white text-black border border-gray-400 hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none focus:border-blue-500",children:[o("option",{value:"",children:"-- Select EaC cloud resource group --"}),e.resGroupOptions.map(t=>o("option",{value:t.Lookup,children:t.Name}))]})]}),a&&o(g,{action:e.action,class:"px-4",cloudLookup:e.cloudLookup,hasGitHubAuth:e.hasGitHubAuth,organizations:e.organizations,resGroupLookup:a})]})}export{L as ResourceGroupIoTSettings};
