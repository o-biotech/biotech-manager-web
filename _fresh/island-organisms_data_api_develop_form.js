import{a as t}from"./chunk-O4WPNXBW.js";import"./chunk-GRAJADRK.js";import{b as l}from"./chunk-Y5CBMVP7.js";import"./chunk-CHWHQTZS.js";import"./chunk-B2TBHPJT.js";import"./chunk-2GUEMEWN.js";import"./chunk-IN5SKDVW.js";import{a as e}from"./chunk-BRQEXE2C.js";import{d as o}from"./chunk-BV6DNIGX.js";import"./chunk-DQW7DUIU.js";function s(r){if(!l)return e(o,{});let a=`${location.origin}/api/data/warm/explorer`;return e("div",{class:"w-full p-3",children:[e("label",{class:"block uppercase tracking-wide font-bold mb-2 text-xl",children:"API Access"}),e("p",{class:"block text-md mb-8",children:"The following is information you can use to call your warm data API."}),e("div",{class:"w-full mb-8",children:[e("label",{for:"connStr",class:"block uppercase tracking-wide font-bold mb-0 text-lg",children:"API URL"}),e(t,{id:"warmApi",name:"warmApi",type:"text",value:a})]}),e("div",{class:"w-full mb-8",children:[e("label",{for:"connStr",class:"block uppercase tracking-wide font-bold mb-0 text-lg",children:"API Access Token"}),e("p",{children:"(Set as authorization header as `Bearer (token)`)"}),e(t,{id:"jwt",name:"jwt",type:"text",class:"mt-2",value:r.jwt})]})]})}export{s as APIDevelopForm};
