import{a as g}from"./chunk-YDZRYKXF.js";import"./chunk-AFPDNR42.js";import"./chunk-26BDCZJB.js";import{a as m}from"./chunk-KD5SK75N.js";import"./chunk-BL4SBA6Y.js";import{a as c}from"./chunk-7CKSF5LV.js";import"./chunk-WYJHN32G.js";import"./chunk-MZ5H4FK2.js";import"./chunk-ZOLFBLN6.js";import{b as r,f as d}from"./chunk-PBNN5S4Q.js";import"./chunk-B6NZ5ZRX.js";import{b as n}from"./chunk-B6JII4SV.js";import"./chunk-PB56H5ER.js";import{b as l}from"./chunk-7DO6M3U7.js";import{a as o}from"./chunk-F4TDH6VI.js";import{a as u}from"./chunk-7CC3ABIV.js";import"./chunk-2GUEMEWN.js";import{d as a}from"./chunk-EEB6LQGP.js";import"./chunk-DQW7DUIU.js";function b(e){return o("form",{method:"post",...e,class:l(["-:w-full -:max-w-sm -:md:max-w-md -:mx-auto -:p-3 -:mt-8"],e),children:[o("div",{class:"flex flex-wrap -mx-3 mb-4 text-left",children:[o(r,{id:"cloudLookup",name:"cloudLookup",type:"hidden",value:e.cloudLookup}),o(r,{id:"resGroupLookup",name:"resGroupLookup",type:"hidden",value:e.resGroupLookup}),o(r,{id:"resLookup",name:"resLookup",type:"hidden",value:e.resLookup}),o("div",{class:"w-full p-3",children:[o("label",{class:"block uppercase tracking-wide font-bold mb-2 text-xl",children:"Storage Flows"}),o("p",{class:"block text-md mb-8",children:["Data storage flows determine how device data can be processed and accessed.",o("br",{}),o("br",{})," ","Cold flows enable long term storage with slower querying performance. Warm flows enable shorter term storage with better querying performance. Hot flows provide near real-time data (with no storage) and sync with your GitHub."]}),o("div",{class:"flex items-center mb-2",children:[o(r,{id:"storageFlowCold",name:"storageFlowCold",type:"checkbox",value:"cold",class:"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"}),o("label",{for:"storageFlowCold",class:"ms-2 text-sm font-medium pl-3",children:"Cold Storage"})]}),o("div",{class:"flex items-center mb-2",children:[o(r,{type:"checkbox",value:"warm",checked:!0,disabled:!0,class:"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"}),o(r,{type:"hidden",id:"storageFlowWarm",name:"storageFlowWarm",value:"warm"}),o("label",{for:"storageFlowWarm",class:"ms-2 text-sm font-medium pl-3",children:"Warm Storage (required)"})]}),o("div",{class:"flex items-center mb-2",children:o(m,{id:"storageFlowHot",name:"storageFlowHot",value:"hot",hasGitHubAuth:e.hasGitHubAuth,organizations:e.organizations,class:"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600",children:o("label",{for:"storageFlowHot",class:"ms-2 text-sm font-medium pl-3",children:"Hot Storage"})})})]})]}),o(d,{class:"mt-8 flex-col",children:o(a,{children:o(n,{type:"submit",class:l(["w-full md:w-auto text-white font-bold m-1 py-2 px-4 rounded focus:outline-none shadow-lg"],c.props),children:"Establish IoT Infrastructure"})})})]})}function A(e){let[s,p]=u(e.resGroupLookup),[i,f]=u(""),k=t=>{f(t)},y=e.resGroupLookup.split("-").map(t=>t.charAt(0)).join(""),h=i?`HostName=${y}-iot-hub.azure-devices.net;SharedAccessKeyName=${i};SharedAccessKey=${e.iotHubKeys[i]}`:"",w=t=>{p(t.currentTarget.value)};return o("div",{children:s&&o(a,{children:[o(b,{action:e.action,class:"px-4",cloudLookup:e.cloudLookup,hasGitHubAuth:e.hasGitHubAuth,organizations:e.organizations,resGroupLookup:s}),o("div",{class:"my-8",children:o("div",{class:"my-8",children:o(g,{deviceKeys:e.deviceKeys,iotHubKeys:e.iotHubKeys,resGroupLookup:s})})})]})})}export{A as ResourceGroupIoTSettings};
