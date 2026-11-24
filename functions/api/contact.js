// Cloudflare Pages Function. Set RESEND_API_KEY + CONTACT_TO_EMAIL in Pages secrets.
const respond=(obj,status=200)=>new Response(JSON.stringify(obj),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff'}});
const clean=(v,max=5000)=>String(v??'').trim().slice(0,max);
const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export async function onRequestPost({request,env}){
  const contentLength=Number(request.headers.get('content-length')||0);
  if(contentLength>20000)return respond({error:'Payload too large'},413);
  let data;try{data=await request.formData()}catch{return respond({error:'Invalid form'},400)}
  if(data.get('website'))return respond({ok:true});
  const name=clean(data.get('name'),100),company=clean(data.get('company'),150),email=clean(data.get('email'),200),service=clean(data.get('service'),80),message=clean(data.get('message'),5000);
  if(!name||!company||!emailPattern.test(email)||!['development','enhancement','seo','design'].includes(service)||message.length<20)return respond({error:'Invalid input'},400);
  if(!env.RESEND_API_KEY||!env.CONTACT_TO_EMAIL||!env.RESEND_FROM_EMAIL)return respond({error:'Mail provider not configured'},503);
  const text=`New AngkasaDev inquiry\n\nName: ${name}\nCompany: ${company}\nEmail: ${email}\nService: ${service}\n\n${message}`;
  const result=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({from:env.RESEND_FROM_EMAIL,to:[env.CONTACT_TO_EMAIL],reply_to:email,subject:`AngkasaDev inquiry: ${service}`,text})});
  if(!result.ok)return respond({error:'Message delivery failed'},502);
  return respond({ok:true});
}
export async function onRequest({request}){if(request.method!=='POST')return respond({error:'Method not allowed'},405)}
