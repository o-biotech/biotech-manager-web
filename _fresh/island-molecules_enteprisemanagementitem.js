import{c as a,h as c,i as l}from"./chunk-QPDCKVNB.js";import{b as o,e as m}from"./chunk-NI644BZD.js";import"./chunk-2GUEMEWN.js";import"./chunk-IN5SKDVW.js";import{a as e}from"./chunk-BRQEXE2C.js";import{d as s}from"./chunk-BV6DNIGX.js";import"./chunk-DQW7DUIU.js";function g(t){let p=n=>{n.preventDefault(),confirm(`Are you sure you want to delete ${t.enterprise.EnterpriseName}?`)&&fetch("",{method:"DELETE",body:JSON.stringify({EnterpriseLookup:t.enterprise.EnterpriseLookup})}).then(i=>{i.json().then(r=>{r.Processing===3?location.reload():(console.log(r),alert(r.Messages.Error))})})},E=n=>{n.preventDefault(),confirm(`Are you sure you want to set ${t.enterprise.EnterpriseName} as active?`)&&fetch("",{method:"PUT",body:JSON.stringify({EnterpriseLookup:t.enterprise.EnterpriseLookup})}).then(i=>{i.json().then(r=>{r.Processing===3?location.reload():(console.log(r),alert(r.Messages.Error))})})};return e("div",{class:"flex flex-row justify-center items-center hover:bg-slate-300 hover:opactity-80",children:[e("h1",{class:"flex-1 text-lg ml-1",children:t.enterprise.EnterpriseName}),e(m,{class:"flex-none",children:e(s,{children:[!t.manage&&e(o,{actionStyle:12,class:"px-1 py-1",href:`/enterprises/${t.enterprise.EnterpriseLookup}`,children:e(l,{class:"w-6 h-6 text-blue-500"})}),!t.active&&e("form",{onSubmit:n=>E(n),children:e(o,{actionStyle:12,children:e(a,{class:"w-6 h-6 text-sky-500"})})}),e("form",{onSubmit:n=>p(n),children:e(o,{type:"submit",actionStyle:4,children:e(c,{class:"w-6 h-6 text-red-500"})})})]})})]})}export{g as EntepriseManagementItem};
