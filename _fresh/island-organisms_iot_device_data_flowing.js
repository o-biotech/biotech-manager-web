import"./chunk-GRAJADRK.js";import{b as s}from"./chunk-O2YIHIND.js";import{e as m}from"./chunk-FQCJ3BIC.js";import{a as d}from"./chunk-TRWQNRWE.js";import"./chunk-2GUEMEWN.js";import{a as c,b as l}from"./chunk-IN5SKDVW.js";import{a as e}from"./chunk-BRQEXE2C.js";import{d as n}from"./chunk-BV6DNIGX.js";import"./chunk-DQW7DUIU.js";function b(t){let i=e(n,{children:[t.waitingText&&e("div",{class:"font-bold text-lg",children:t.waitingText}),e(m,{...t,class:d(t,"w-6 h-6 text-blue-500 animate-spin inline-block m-4")})]});if(!s)return i;let[f,h]=c(!1);return l(()=>{let w=async()=>{let a=`${location.origin}/api/data/warm/explorer`,r=(await(await fetch(a,{headers:{Authorization:`Bearer ${t.jwt}`}})).json()).tables?.find(g=>g.name==="PrimaryResult").data?.length>0;return h(r),r},o=()=>{w().then(a=>{a&&clearInterval(D)})},D=setInterval(o,3e4);o()},[]),e(n,{children:f?t.children:i})}export{b as DeviceDataFlowing};
