import{a as s}from"./chunk-7AAPTB7I.js";import{a as n}from"./chunk-2F7KZXGB.js";import{b as c}from"./chunk-HONOQO4B.js";import{a as e}from"./chunk-F4TDH6VI.js";import{a as l,c as a}from"./chunk-7CC3ABIV.js";import{d as r}from"./chunk-EEB6LQGP.js";function v(o){let{children:u,organizations:g,...p}=o,h=a(null),[t,b]=l(!!o.checked),d=t&&o.hasGitHubAuth?e(r,{children:[e("div",{class:"w-full mb-2",children:[e("label",{for:"gitHubOrg",class:"block uppercase tracking-wide font-bold mb-2 text-sm",children:"GitHub Organization for Devices Flow"}),e("select",{id:"gitHubOrg",name:"gitHubOrg",required:!0,class:"appearance-none block w-full bg-white text-black border border-gray-400 hover:border-gray-500 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:shadow-lg focus:border-blue-500 placeholder-gray-500",children:[e("option",{value:"",children:"-- Select an organization --"}),o.organizations?.map(i=>e("option",{value:i,children:i}))]}),e("p",{children:["Don't see the organization your looking for? Add organizations by installing the"," ",e(c,{actionStyle:12,class:"inline-block text-blue-500 hover:text-white py-0 px-1",href:"https://github.com/apps/open-biotech-web-manager",target:"_blank",children:"OpenBiotech App"})]})]}),e("div",{class:"w-full",children:[e("label",{for:"gitHubRepo",class:"block uppercase tracking-wide font-bold mb-2 text-sm",children:"New Repository Name"}),e(n,{id:"gitHubRepo",name:"gitHubRepo",type:"text",required:!0,placeholder:"Enter new repository name",value:"iot-ensemble-device-flow",class:"appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none focus:border-blue-500"})]})]}):e(s,{children:"Sign in to GitHub"});return e("div",{children:[e("div",{children:[e(n,{type:"checkbox",...p,checked:t,onClick:()=>b(!t)}),u]}),t&&e("div",{class:"ml-8 mt-1",children:d})]})}export{v as a};