import{c as a,h as c,i as l}from"./chunk-CVX5A5OC.js";import"./chunk-GD5PHL5W.js";import{f as m}from"./chunk-PBNN5S4Q.js";import"./chunk-B6NZ5ZRX.js";import{b as o}from"./chunk-B6JII4SV.js";import"./chunk-PB56H5ER.js";import"./chunk-7DO6M3U7.js";import{a as e}from"./chunk-F4TDH6VI.js";import"./chunk-7CC3ABIV.js";import"./chunk-2GUEMEWN.js";import{d as s}from"./chunk-EEB6LQGP.js";import"./chunk-DQW7DUIU.js";function y(t){let p=r=>{r.preventDefault(),confirm(`Are you sure you want to delete ${t.enterprise.EnterpriseName}?`)&&fetch("",{method:"DELETE",body:JSON.stringify({EnterpriseLookup:t.enterprise.EnterpriseLookup})}).then(i=>{i.json().then(n=>{n.Processing===3?location.reload():(console.log(n),alert(n.Messages.Error))})})},E=r=>{r.preventDefault(),confirm(`Are you sure you want to set ${t.enterprise.EnterpriseName} as active?`)&&fetch("",{method:"PUT",body:JSON.stringify({EnterpriseLookup:t.enterprise.EnterpriseLookup})}).then(i=>{i.json().then(n=>{n.Processing===3?location.reload():(console.log(n),alert(n.Messages.Error))})})};return e("div",{class:"flex flex-row justify-center items-center hover:bg-slate-700 hover:text-slate-300 dark:hover:bg-slate-300 dark:hover:text-slate-700 hover:opactity-80 px-2 py-1",children:[e("h1",{class:"flex-1 text-lg ml-1",children:t.enterprise.EnterpriseName}),e(m,{class:"flex-none",children:e(s,{children:[!t.manage&&e(o,{actionStyle:28,href:`/enterprises/${t.enterprise.EnterpriseLookup}`,children:e(l,{class:"w-6 h-6 text-blue-500"})}),!t.active&&e("form",{onSubmit:r=>E(r),children:e(o,{actionStyle:28,children:e(a,{class:"w-6 h-6 text-sky-500"})})}),e("form",{onSubmit:r=>p(r),children:e(o,{type:"submit",actionStyle:28,children:e(c,{class:"w-6 h-6 text-red-500"})})})]})})]})}export{y as EntepriseManagementItem};
