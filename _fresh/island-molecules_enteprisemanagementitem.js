import{c as a,h as c}from"./chunk-CHWHQTZS.js";import{b as i,e as l}from"./chunk-JB7CRVBN.js";import"./chunk-2GUEMEWN.js";import"./chunk-IN5SKDVW.js";import{a as e}from"./chunk-BRQEXE2C.js";import{d as s}from"./chunk-BV6DNIGX.js";import"./chunk-DQW7DUIU.js";function g(o){let m=t=>{t.preventDefault(),confirm(`Are you sure you want to delete ${o.enterprise.EnterpriseName}?`)&&fetch("",{method:"DELETE",body:JSON.stringify({EnterpriseLookup:o.enterprise.EnterpriseLookup})}).then(n=>{n.json().then(r=>{r.Processing===3?location.reload():(console.log(r),alert(r.Messages.Error))})})},p=t=>{t.preventDefault(),confirm(`Are you sure you want to set ${o.enterprise.EnterpriseName} as active?`)&&fetch("",{method:"PUT",body:JSON.stringify({EnterpriseLookup:o.enterprise.EnterpriseLookup})}).then(n=>{n.json().then(r=>{r.Processing===3?location.reload():(console.log(r),alert(r.Messages.Error))})})};return e("div",{class:"flex flex-row justify-center items-center hover:bg-slate-300 hover:opactity-80",children:[e("h1",{class:"flex-1 text-lg ml-1",children:o.enterprise.EnterpriseName}),e(l,{class:"flex-none",children:e(s,{children:[!o.active&&e("form",{onSubmit:t=>p(t),children:e(i,{actionStyle:4,children:e(a,{class:"w-6 h-6 text-sky-500"})})}),e("form",{onSubmit:t=>m(t),children:e(i,{type:"submit",actionStyle:4,children:e(c,{class:"w-6 h-6 text-red-500"})})})]})})]})}export{g as EntepriseManagementItem};
