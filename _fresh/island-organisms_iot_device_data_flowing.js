import"./chunk-GRAJADRK.js";import{b as s}from"./chunk-NJFNGHDY.js";import{k as m}from"./chunk-QPDCKVNB.js";import{a as d}from"./chunk-BNCZVVQX.js";import"./chunk-2GUEMEWN.js";import{a as c,b as l}from"./chunk-IN5SKDVW.js";import{a as e}from"./chunk-BRQEXE2C.js";import{d as n}from"./chunk-BV6DNIGX.js";import"./chunk-DQW7DUIU.js";function b(t){let o=e(n,{children:[t.waitingText&&e("div",{class:"font-bold text-lg",children:t.waitingText}),e(m,{...t,class:d(["-:w-6 -:h-6 -:text-blue-500 -:animate-spin -:inline-block -:m-4"],t)})]});if(!s)return o;let[f,h]=c(!1);return l(()=>{let w=async()=>{let a=`${location.origin}/api/data/warm/explorer`,r=(await(await fetch(a,{headers:{Authorization:`Bearer ${t.jwt}`}})).json()).tables?.find(g=>g.name==="PrimaryResult").data?.length>0;return h(r),r},i=()=>{w().then(a=>{a&&clearInterval(D)})},D=setInterval(i,3e4);i()},[]),e(n,{children:f?t.children:o})}export{b as DeviceDataFlowing};
