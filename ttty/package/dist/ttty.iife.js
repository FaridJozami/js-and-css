var ttty=function(n){"use strict";const t=(n,t,e)=>{const s=document.createElement(n);return t&&(s.className=t),e&&(s.innerHTML=e),s},e=(n,t=!1)=>{n.input.readOnly=!t,n.inputContainer.style.opacity=t?"":"0"};var s,i;(i=s||(s={})).ON_COMMAND="onCommand",i.ON_COMMAND_NOT_FOUND="onCommand404",i.ON_PROCESS_START="onProcessStart",i.ON_PROCESS_END="onProcessStop",i.ON_PROCESS_INTERRUPT="onProcessInterrupt",i.ON_INIT="onInit";const o=(n,t,e)=>{const s=new CustomEvent(n,{detail:e});t.dispatchEvent(s)},r=(n,t)=>{const{print:e}=t,i=n.split(" "),r=i[0],a=i.slice(1),c=t.settings.commands[r];c?c.argDescriptions&&c.argDescriptions.length>0&&0===a.length?e(`Usage: ${r} ${c.argDescriptions.map((n=>`[${n}]`)).join(" ")}`):(c.func(t,...a),o(s.ON_COMMAND,t.settings.host,n)):(e(`<span class="terminal-error">command not found: ${r}</span>`),o(s.ON_COMMAND_NOT_FOUND,t.settings.host,n))},a=n=>{const{settings:{host:t}}=n;e(n),n.isProcessRunning=!0,o(s.ON_PROCESS_START,t)},c=n=>{const{input:t,settings:{host:i}}=n;e(n,!0),n.isProcessRunning=!1,t.focus(),o(s.ON_PROCESS_END,i)},p=(n,t)=>{const{history:e,lastHistoryIndex:s}=n,i=e.length-1;let o;t&&0===s||(t||s!==e.length)&&(i<0||(t?(o=s-1,n.input.value=o-1>=0?e[o-1]:""):(o=s+1,n.input.value=e[s]),n.lastHistoryIndex=o))};return n.initTerminal=({host:n,welcomeMessage:e,prompt:i="$: ",historyLength:l=50,enableHelp:m=!0,commands:u})=>{const d={host:n,welcomeMessage:e,prompt:i,historyLength:l,enableHelp:m,commands:u},{commandContainer:g,input:h,inputContainer:O}=((n,e)=>{n.className="terminal";const s=t("div","terminal-container"),i=t("div","terminal-type"),o=t("span",void 0,e),r=t("input");return r.setAttribute("type","text"),i.append(o),i.append(r),n.append(s),n.append(i),n.addEventListener("click",(()=>r.focus())),{commandContainer:s,input:r,inputContainer:i}})(n,i),N={history:[],lastHistoryIndex:0,isProcessRunning:!1,settings:d,commandContainer:g,inputContainer:O,input:h,print:(n,e=!1)=>((n,e,s,i,o)=>{const r=t("p",void 0,e?o:n);if(e){const e=t("span","termainal-command",n);r.append(e)}s.append(r),i.scrollIntoView()})(n,e,g,h,i),run:n=>r(n,N),start:()=>a(N),stop:()=>c(N),type:(n,e=60,s)=>((n,e,s,i)=>{a(s);const o=t("p");s.commandContainer.append(o);let r=0;const p=()=>{r<n.length&&s.isProcessRunning?(o.innerHTML+=n.charAt(r),r++,setTimeout(p,e)):(i&&i(),c(s))};setTimeout(p,e)})(n,e,N,s)};return m&&(N.settings.commands.help=(n=>({name:"help",description:"shows a full list of all available commands",func:({print:t})=>{for(const e in n.settings.commands)Object.hasOwnProperty.call(n.settings.commands,e)&&t(n.settings.commands[e].name+" - "+n.settings.commands[e].description)}}))(N)),((n,t)=>{const{input:e,print:i}=t;n.addEventListener("keyup",(({key:a,ctrlKey:l})=>{if(l&&"c"===a&&t.isProcessRunning)i("^C"),c(t),o(s.ON_PROCESS_INTERRUPT,n);else{if(t.isProcessRunning)return;if("Enter"===a)return t.lastHistoryIndex=0,e.value.length>0?(i(e.value,!0),(n=>{const{input:{value:t},history:e,settings:{historyLength:s}}=n;t!==e[0]&&(e.length>=s?n.history=[t,...e.slice(0,-1)]:(n.history=[t,...e],n.lastHistoryIndex=0))})(t),r(e.value,t)):i(" ",!0),void(e.value="");if("ArrowUp"===a)return void p(t);"ArrowDown"===a&&p(t,!0)}}))})(n,N),o(s.ON_INIT,n),e&&N.print(e),N},Object.defineProperty(n,"__esModule",{value:!0}),n[Symbol.toStringTag]="Module",n}({});