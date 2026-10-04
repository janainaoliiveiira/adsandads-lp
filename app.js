const DEFAULT_CONTENT_URL = 'content.default.json';
const CONFIG = window.ADS_CONFIG || {};
let siteContent = {};

async function loadContent(){
  try{
    siteContent = await (await fetch(DEFAULT_CONTENT_URL,{cache:'no-store'})).json();
  }catch(e){
    console.error('Não foi possível carregar content.default.json',e);
    siteContent = {};
  }
  applyContent();
}

function cssDecls(obj){
  const out=[];
  Object.entries(obj||{}).forEach(([k,v])=>{
    if(k==='__raw' || v==='' || v==null) return;
    out.push(`${k}:${v}!important`);
  });
  if(obj && obj.__raw) out.push(obj.__raw.trim());
  return out.join(';');
}

function applyProductionStyles(){
  let style=document.getElementById('adsProductionStyles');
  if(!style){
    style=document.createElement('style');
    style.id='adsProductionStyles';
    document.head.appendChild(style);
  }
  let css='';
  Object.entries(siteContent.__styles||{}).forEach(([selector,devices])=>{
    const d=cssDecls(devices.desktop); if(d) css+=`${selector}{${d}}\n`;
    const t=cssDecls(devices.tablet); if(t) css+=`@media (max-width:980px){${selector}{${t}}}\n`;
    const m=cssDecls(devices.mobile); if(m) css+=`@media (max-width:640px){${selector}{${m}}}\n`;
  });
  const th=siteContent.__theme||{};
  const root=[];
  if(th.purple)root.push(`--purple:${th.purple}`);
  if(th.magenta)root.push(`--magenta:${th.magenta}`);
  if(th.cyan)root.push(`--cyan:${th.cyan}`);
  if(th.lav)root.push(`--lav:${th.lav}`);
  if(th.ink)root.push(`--ink:${th.ink}`);
  if(th.sectionPad)root.push(`--section-pad:${th.sectionPad}px`);
  if(th.cardRadius)root.push(`--card-radius:${th.cardRadius}px`);
  if(th.buttonRadius)root.push(`--button-radius:${th.buttonRadius}px`);
  if(root.length) css+=`:root{${root.join(';')}}\n`;
  if(th.font) css+=`body{font-family:${th.font}!important}\n`;
  if(th.globalCss) css+=th.globalCss+'\n';
  style.textContent=css;

  Object.entries(siteContent.__images||{}).forEach(([selector,src])=>{
    try{const el=document.querySelector(selector); if(el && el.tagName==='IMG' && src) el.src=src;}catch(e){}
  });

  const main=document.querySelector('main');
  if(main){
    const visibility=siteContent.__sectionVisibility||{};
    [...main.querySelectorAll(':scope > section')].forEach(s=>{
      if(visibility[s.id]===false) s.style.display='none';
    });
    (siteContent.__sectionOrder||[]).forEach(id=>{
      const s=document.getElementById(id);
      if(s && s.parentElement===main) main.appendChild(s);
    });
  }
}

function applyContent(){
  document.querySelectorAll('[data-edit]').forEach(el=>{
    const k=el.dataset.edit;
    if(siteContent[k]!=null) el.textContent=siteContent[k];
  });
  if(siteContent['site.title']) document.title=siteContent['site.title'];
  if(siteContent['settings.hero_image']) document.getElementById('heroImage').src=siteContent['settings.hero_image'];
  if(siteContent['settings.logo_symbol']) document.querySelectorAll('.brand img').forEach(i=>i.src=siteContent['settings.logo_symbol']);
  applyProductionStyles();
}

function track(event,params={}){
  window.dataLayer=window.dataLayer||[];
  window.dataLayer.push({event,...params,page_type:'institutional',service:'general'});
}

function openModal(id,source){
  const m=document.getElementById(id);
  if(!m) return;
  m.classList.add('open');
  m.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
  track('form_open',{form_id:id==='diagnosticModal'?'diagnostico_geral':'whatsapp_quick',source_cta:source||'unknown'});
}
function closeModals(){
  document.querySelectorAll('.modal.open').forEach(m=>{m.classList.remove('open');m.setAttribute('aria-hidden','true')});
  document.body.style.overflow='';
}

document.addEventListener('click',e=>{
  const action=e.target.closest('[data-action]');
  if(action){
    const locationName=action.dataset.trackLocation||'unknown';
    const label=action.innerText.trim().toLowerCase().replace(/\s+/g,'_').slice(0,80);
    track('cta_click',{cta_location:locationName,cta_text:label,cta_type:'primary'});
    if(action.dataset.action==='diagnostic') openModal('diagnosticModal',locationName);
    if(action.dataset.action==='quick') openModal('quickModal',locationName);
  }
  if(e.target.matches('[data-close-modal]')) closeModals();
});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModals()});

function captureAttribution(){
  const url=new URL(location.href);
  const keys=['utm_source','utm_medium','utm_campaign','utm_content','utm_term'];
  const current={landing_url:location.href,landing_path:location.pathname};
  keys.forEach(k=>{if(url.searchParams.get(k))current[k]=url.searchParams.get(k)});
  if(!localStorage.getItem('ads_first_touch')) localStorage.setItem('ads_first_touch',JSON.stringify(current));
  localStorage.setItem('ads_last_touch',JSON.stringify(current));
}

function buildPayload(form,leadType){
  const data=Object.fromEntries(new FormData(form).entries());
  return {
    ...data,
    lead_type:leadType,
    page:location.href,
    first_touch:JSON.parse(localStorage.getItem('ads_first_touch')||'{}'),
    last_touch:JSON.parse(localStorage.getItem('ads_last_touch')||'{}'),
    created_at:new Date().toISOString()
  };
}

async function sendWebhook(payload){
  if(!CONFIG.leadWebhook) return false;
  try{
    const r=await fetch(CONFIG.leadWebhook,{
      method:'POST',
      headers:{'content-type':'application/json'},
      body:JSON.stringify(payload)
    });
    return r.ok || r.type==='opaque';
  }catch(e){return false;}
}

function whatsappNumber(){
  return String(CONFIG.whatsappNumber||siteContent['settings.whatsapp_number']||'').replace(/\D/g,'');
}
function openWhatsapp(payload,kind){
  const number=whatsappNumber();
  if(!number) return false;
  const base=siteContent['settings.whatsapp_message']||'Olá! Vim pelo site da ADS & ADS.';
  const lines=[base,`Nome: ${payload.name||''}`];
  if(payload.company) lines.push(`Empresa: ${payload.company}`);
  if(payload.email) lines.push(`E-mail: ${payload.email}`);
  if(payload.phone) lines.push(`Telefone: ${payload.phone}`);
  if(payload.challenge) lines.push(`Desafio: ${payload.challenge}`);
  if(payload.message) lines.push(`Mensagem: ${payload.message}`);
  window.location.href=`https://wa.me/${number}?text=${encodeURIComponent(lines.join('\n'))}`;
  track('whatsapp_click',{placement:kind,lead_type:payload.lead_type});
  return true;
}

function bindFormStart(id){
  const f=document.getElementById(id); if(!f)return;
  f.addEventListener('focusin',()=>{if(!f.dataset.started){f.dataset.started='1';track('form_start',{form_id:f.dataset.formId})}});
}
bindFormStart('diagnosticForm');
bindFormStart('quickForm');

const diagnosticForm=document.getElementById('diagnosticForm');
if(diagnosticForm) diagnosticForm.addEventListener('submit',async e=>{
  e.preventDefault();
  const form=e.currentTarget;
  const status=form.querySelector('.form-status');
  const payload=buildPayload(form,'diagnostic');
  status.textContent='Enviando...';
  track('form_submit',{form_id:form.dataset.formId,lead_type:'diagnostic'});
  const saved=await sendWebhook(payload);
  if(saved){
    track('generate_lead',{form_id:form.dataset.formId,lead_type:'diagnostic'});
    status.textContent='Recebido. Vamos analisar o seu cenário.';
    setTimeout(closeModals,1200);
  }else if(openWhatsapp(payload,'diagnostic_fallback')){
    track('generate_lead',{form_id:form.dataset.formId,lead_type:'diagnostic_whatsapp'});
    status.textContent='Abrindo o WhatsApp...';
  }else{
    status.textContent='A captação de leads ainda não foi configurada. Configure o webhook ou o número do WhatsApp em site.config.js.';
  }
});

const quickForm=document.getElementById('quickForm');
if(quickForm) quickForm.addEventListener('submit',async e=>{
  e.preventDefault();
  const form=e.currentTarget;
  const status=form.querySelector('.form-status');
  const payload=buildPayload(form,'whatsapp');
  status.textContent='Preparando contato...';
  track('form_submit',{form_id:form.dataset.formId,lead_type:'whatsapp'});
  const saved=await sendWebhook(payload);
  if(saved) track('generate_lead',{form_id:form.dataset.formId,lead_type:'whatsapp'});
  if(openWhatsapp(payload,'quick_form')){
    if(!saved) track('generate_lead',{form_id:form.dataset.formId,lead_type:'whatsapp_unstored'});
    status.textContent='Abrindo o WhatsApp...';
  }else{
    status.textContent=saved?'Lead salvo. Configure o número do WhatsApp para continuar a conversa.':'Configure o webhook ou o número do WhatsApp em site.config.js.';
  }
});

captureAttribution();
loadContent();
