import{a as t}from"./chunk-OBI4T3CI.js";import"./chunk-EO2WR4K7.js";import{b as o}from"./chunk-65XL2KY3.js";import"./chunk-PBNN5S4Q.js";import"./chunk-B6NZ5ZRX.js";import"./chunk-B6JII4SV.js";import"./chunk-PB56H5ER.js";import"./chunk-7DO6M3U7.js";import{a as e}from"./chunk-F4TDH6VI.js";import"./chunk-7CC3ABIV.js";import"./chunk-2GUEMEWN.js";import{d as l}from"./chunk-EEB6LQGP.js";import"./chunk-DQW7DUIU.js";function s(r){if(!o)return e(l,{});let a=`${location.origin}/api/data/warm/explorer`;return e("div",{class:"w-full p-3",children:[e("label",{class:"block uppercase tracking-wide font-bold mb-2 text-xl",children:"API Access"}),e("p",{class:"block text-md mb-8",children:"Use the following to call your warm data API."}),e("div",{class:"w-full mb-8",children:[e("label",{for:"connStr",class:"block uppercase tracking-wide font-bold mb-0 text-lg",children:"API URL"}),e(t,{id:"warmApi",name:"warmApi",type:"text",value:a})]}),e("div",{class:"w-full mb-8",children:[e("label",{for:"connStr",class:"block uppercase tracking-wide font-bold mb-0 text-lg",children:"API Access Token"}),e("p",{children:"Set authorization header as 'Bearer (token)'"}),e(t,{id:"jwt",name:"jwt",type:"text",class:"mt-2",value:r.jwt})]})]})}export{s as APIDevelopForm};
