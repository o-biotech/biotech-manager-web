import{h as l}from"./chunk-L7FNLU2O.js";import"./chunk-CO2DYHC4.js";import"./chunk-HYNSP3Y5.js";import"./chunk-HADJFUJY.js";import{b as r}from"./chunk-JJVNKJR6.js";import"./chunk-WKHZVTXF.js";import"./chunk-FVURMPBZ.js";import{a as e}from"./chunk-BRQEXE2C.js";import"./chunk-IN5SKDVW.js";import"./chunk-2GUEMEWN.js";import"./chunk-BV6DNIGX.js";import"./chunk-DQW7DUIU.js";function f(n){let s=t=>{t.preventDefault(),confirm(n.message)&&fetch("",{method:"DELETE"}).then(i=>{i.json().then(o=>{o.Processing===3?location.reload():(console.log(o),alert(o.Messages.Error))})})};return e("form",{onSubmit:t=>s(t),children:e(r,{class:"flex flex-row items-center align-center w-full bg-red-500 hover:bg-red-600",type:"submit",children:[e("span",{class:"flex-none",children:n.children}),e("span",{class:"flex-1"}),e(l,{class:"flex-none w-6 h-6 text-white"})]})})}export{f as DeleteAction};
