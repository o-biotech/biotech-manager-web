import{h as l}from"./chunk-27ALTVVV.js";import"./chunk-5DANTAD3.js";import"./chunk-E2XQFFXD.js";import"./chunk-B6NZ5ZRX.js";import{b as r}from"./chunk-B6JII4SV.js";import"./chunk-PB56H5ER.js";import"./chunk-7DO6M3U7.js";import{a as e}from"./chunk-F4TDH6VI.js";import"./chunk-7CC3ABIV.js";import"./chunk-2GUEMEWN.js";import"./chunk-EEB6LQGP.js";import"./chunk-DQW7DUIU.js";function f(n){let s=t=>{t.preventDefault(),confirm(n.message)&&fetch("",{method:"DELETE"}).then(i=>{i.json().then(o=>{o.Processing===3?location.reload():(console.log(o),alert(o.Messages.Error))})})};return e("form",{onSubmit:t=>s(t),children:e(r,{class:"flex flex-row items-center align-center w-full bg-red-500 hover:bg-red-600",type:"submit",children:[e("span",{class:"flex-none",children:n.children}),e("span",{class:"flex-1"}),e(l,{class:"flex-none w-6 h-6 text-white"})]})})}export{f as DeleteAction};
