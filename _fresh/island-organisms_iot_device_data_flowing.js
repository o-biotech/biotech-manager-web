import{l as d}from"./chunk-WF2RFOUW.js";import{b as s}from"./chunk-SYQ7NWGK.js";import"./chunk-PBNN5S4Q.js";import"./chunk-B6NZ5ZRX.js";import"./chunk-B6JII4SV.js";import"./chunk-PB56H5ER.js";import{b as m}from"./chunk-7DO6M3U7.js";import{a as e}from"./chunk-F4TDH6VI.js";import{a as c,b as l}from"./chunk-7CC3ABIV.js";import"./chunk-2GUEMEWN.js";import{d as n}from"./chunk-EEB6LQGP.js";import"./chunk-DQW7DUIU.js";function b(t){let o=e(n,{children:[t.waitingText&&e("div",{class:"font-bold text-lg",children:t.waitingText}),e(d,{...t,class:m(["-:w-6 -:h-6 -:text-blue-500 -:animate-spin -:inline-block -:m-4"],t)})]});if(!s)return o;let[f,h]=c(!1);return l(()=>{let w=async()=>{let a=`${location.origin}/api/data/warm/explorer`,r=(await(await fetch(a,{headers:{Authorization:`Bearer ${t.jwt}`}})).json()).tables?.find(g=>g.name==="PrimaryResult").data?.length>0;return h(r),r},i=()=>{w().then(a=>{a&&clearInterval(D)})},D=setInterval(i,3e4);i()},[]),e(n,{children:f?t.children:o})}export{b as DeviceDataFlowing};
