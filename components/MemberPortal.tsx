'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseBrowserClient } from '@/lib/supabase';

type Profile = {
  id: string;
  display_name: string | null;
  created_at: string;
  first_order_at: string | null;
  founder_number: number | null;
  lifetime_spend: number;
  order_count: number;
  role: 'member' | 'owner';
};

const tiers = [
  { key:'member', name:'Member', days:0 },
  { key:'marked', name:'Marked', days:30 },
  { key:'bloodbound', name:'Bloodbound', days:90 },
  { key:'inner_circle', name:'Inner Circle', days:180 },
  { key:'archive_member', name:'Archive Member', days:365 },
] as const;

function tierInfo(profile: Profile) {
  const ageDays = Math.max(0, Math.floor((Date.now() - new Date(profile.created_at).getTime()) / 86400000));
  if (profile.role === 'owner') return { current: tiers[tiers.length - 1], next: null, ageDays, progress: 100, eligible:true };
  if (!profile.first_order_at) return { current: tiers[0], next: tiers[1], ageDays, progress: Math.min(100, ageDays / 30 * 100), eligible:false };
  let current: (typeof tiers)[number] = tiers[0];
  for (const tier of tiers) if (ageDays >= tier.days) current = tier;
  const index = tiers.findIndex(t => t.key === current.key);
  const next = tiers[index + 1] ?? null;
  const progress = next ? Math.min(100, ((ageDays - current.days) / (next.days - current.days)) * 100) : 100;
  return { current, next, ageDays, progress, eligible:true };
}

function AuthPanel(){
  const router = useRouter();
  const [mode,setMode]=useState<'signin'|'signup'>('signin');
  const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [name,setName]=useState('');
  const [busy,setBusy]=useState(false); const [message,setMessage]=useState('');
  async function submit(e:FormEvent){
    e.preventDefault(); setBusy(true); setMessage('');
    try {
      const supabase=getSupabaseBrowserClient();
      if(mode==='signup'){
        const {data,error}=await supabase.auth.signUp({email,password,options:{data:{display_name:name||email.split('@')[0]}}});
        if(error)setMessage(error.message); else if(!data.session)setMessage('Account created. Check your email to confirm your account.'); else {router.push('/account');router.refresh();}
      } else {
        const {error}=await supabase.auth.signInWithPassword({email,password});
        if(error)setMessage(error.message); else {router.push('/account');router.refresh();}
      }
    } catch (err) { setMessage(err instanceof Error ? err.message : 'Unable to connect.'); }
    setBusy(false);
  }
  return <div className="authShell"><div className="authTabs"><button className={mode==='signin'?'active':''} onClick={()=>setMode('signin')}>Sign in</button><button className={mode==='signup'?'active':''} onClick={()=>setMode('signup')}>Create account</button></div><form className="authForm" onSubmit={submit}>{mode==='signup'&&<label>Name<input value={name} onChange={e=>setName(e.target.value)} autoComplete="name"/></label>}<label>Email<input required type="email" value={email} onChange={e=>setEmail(e.target.value)} autoComplete="email"/></label><label>Password<input required minLength={8} type="password" value={password} onChange={e=>setPassword(e.target.value)} autoComplete={mode==='signup'?'new-password':'current-password'}/></label><button disabled={busy} className="button red" type="submit">{busy?'Working…':mode==='signup'?'Join the Bloodline':'Sign in'}</button>{message&&<p className="authMessage">{message}</p>}</form><p className="authFine">Account age starts on signup. Loyalty access only advances after a completed purchase.</p></div>;
}

function AccountPanel(){
  const router=useRouter(); const [loading,setLoading]=useState(true); const [email,setEmail]=useState(''); const [profile,setProfile]=useState<Profile|null>(null); const [error,setError]=useState('');
  useEffect(()=>{let live=true;(async()=>{try{const supabase=getSupabaseBrowserClient();const {data:{user}}=await supabase.auth.getUser();if(!live)return;if(!user){setLoading(false);return;}setEmail(user.email??'');const {data}=await supabase.from('lc_profiles').select('*').eq('id',user.id).single();if(live){setProfile(data as Profile|null);setLoading(false);}}catch(e){if(live){setError(e instanceof Error?e.message:'Unable to connect.');setLoading(false);}}})();return()=>{live=false}},[]);
  const status=useMemo(()=>profile?tierInfo(profile):null,[profile]);
  async function signOut(){await getSupabaseBrowserClient().auth.signOut();router.push('/');router.refresh();}
  if(loading)return <div className="accountPanel"><div className="demoFlag">Loading your L.C. account…</div></div>;
  if(error)return <div className="accountPanel"><div className="accountCard"><div className="eyebrow">CONNECTION NEEDED</div><h2>Account backend is not connected yet.</h2><p>{error}</p></div></div>;
  if(!profile)return <div className="accountPanel"><div className="accountCard"><div className="eyebrow">ACCOUNT REQUIRED</div><h2>Enter the Bloodline.</h2><p>Sign in or create an account to see your tier, Founder status and collection history.</p><div className="buttonRow"><Link className="button red" href="/login">Sign in / create account</Link></div></div></div>;
  const isOwner=profile.role==='owner';
  const nextCopy=isOwner?'Permanent owner access.':!status?.eligible?'Complete your first order to activate tier progression.':status?.next?`${Math.max(0,status.next.days-status.ageDays)} days until ${status.next.name}`:'Highest Bloodline tier reached.';
  return <div className="accountPanel">{isOwner?<div className="founderStrip">L.C. OWNER — FULL ACCESS</div>:profile.founder_number&&<div className="founderStrip">FIRST 100 — #{String(profile.founder_number).padStart(3,'0')}</div>}<div className="profileHead"><div><div className="eyebrow">L.C. MEMBER</div><h1>{profile.display_name||'Member'}</h1><p>{email}<br/>Member since {new Date(profile.created_at).toLocaleDateString()}</p></div><div className="statusStack"><div className="eyebrow">CURRENT STATUS</div><strong>{isOwner?'Owner':status?.current.name}</strong></div></div><div className="progress"><span style={{width:`${status?.progress??0}%`}}/></div><div className="progressMeta"><span>{status?.ageDays??0} days</span><span>{nextCopy}</span></div><div className="accountGrid"><div className="accountCard"><h2>Your access</h2><ul className="checkList"><li><span>Drop calendar</span><span>✓</span></li><li><span>Member previews</span><span>✓</span></li><li className={!isOwner&&((status?.ageDays??0)<30||!status?.eligible)?'locked':''}><span>Special colourways</span><span>30d</span></li><li className={!isOwner&&((status?.ageDays??0)<90||!status?.eligible)?'locked':''}><span>Accessories + prints</span><span>90d</span></li><li className={!isOwner&&((status?.ageDays??0)<180||!status?.eligible)?'locked':''}><span>Hidden products</span><span>180d</span></li><li className={!isOwner&&((status?.ageDays??0)<365||!status?.eligible)?'locked':''}><span>Archive editions</span><span>365d</span></li></ul></div><div className="accountCard"><h2>Collection history</h2><ul className="checkList"><li><span>Completed orders</span><span>{profile.order_count}</span></li><li><span>Lifetime spend</span><span>€{Number(profile.lifetime_spend||0).toFixed(2)}</span></li><li><span>Founder number</span><span>{profile.founder_number?`#${String(profile.founder_number).padStart(3,'0')}`:'—'}</span></li><li><span>First purchase</span><span>{profile.first_order_at?new Date(profile.first_order_at).toLocaleDateString():'—'}</span></li></ul></div></div><div className="buttonRow"><Link className="button red" href="/vault">Check Vault access</Link><button className="button secondary" onClick={signOut}>Sign out</button></div></div>;
}

function VaultPanel(){
  const [access,setAccess]=useState<{signedIn:boolean;unlocked:boolean;founder:boolean;days:number}|null>(null); const [error,setError]=useState('');
  const [activeVault,setActiveVault]=useState<'accessories'|'prints'|'colourways'|null>(null);
  const vaultCategories = {
    accessories:{label:'Accessories',code:'VAULT / 01',title:'Accessories',copy:'Members-only accessories will appear here first. Nothing has been released in this category yet.'},
    prints:{label:'Special prints',code:'VAULT / 02',title:'Special prints',copy:'Alternative and limited L.C. prints will appear here. Nothing has been released in this category yet.'},
    colourways:{label:'Secret colourways',code:'VAULT / 03',title:'Secret colourways',copy:'Hidden garment and print colour combinations will appear here. Nothing has been released in this category yet.'}
  } as const;
  useEffect(()=>{(async()=>{try{const supabase=getSupabaseBrowserClient();const {data:{user}}=await supabase.auth.getUser();if(!user){setAccess({signedIn:false,unlocked:false,founder:false,days:0});return;}const {data}=await supabase.from('lc_profiles').select('created_at,first_order_at,founder_number,role').eq('id',user.id).single();const row=data as {created_at:string;first_order_at:string|null;founder_number:number|null;role:'member'|'owner'}|null;if(!row){setAccess({signedIn:true,unlocked:false,founder:false,days:0});return;}const days=Math.max(0,Math.floor((Date.now()-new Date(row.created_at).getTime())/86400000));const owner=row.role==='owner';const founder=!!row.founder_number;setAccess({signedIn:true,unlocked:owner||founder||(!!row.first_order_at&&days>=90),founder:owner||founder,days});}catch(e){setError(e instanceof Error?e.message:'Unable to connect.');}})()},[]);
  if(error)return <div className="vaultGate"><div className="eyebrow">CONNECTION NEEDED</div><h1>THE VAULT</h1><p>{error}</p></div>;
  if(!access)return <div className="vaultGate"><div className="eyebrow">CHECKING ACCESS</div><h1>THE VAULT</h1></div>;
  if(!access.signedIn)return <div className="vaultGate"><div className="lock">×</div><div className="eyebrow">MEMBERS-ONLY STORE</div><h1>THE VAULT</h1><p>Sign in to check your Bloodline or First 100 access.</p><div className="buttonRow" style={{justifyContent:'center'}}><Link className="button red" href="/login">Sign in</Link><Link className="button secondary" href="/membership">See tiers</Link></div></div>;
  if(!access.unlocked)return <div className="vaultGate"><div className="lock">×</div><div className="eyebrow">LOCKED</div><h1>THE VAULT</h1><p>Your account is {access.days} days old. The Vault opens from Bloodbound (90 days + a completed order), while First 100 members have permanent access.</p><div className="buttonRow" style={{justifyContent:'center'}}><Link className="button red" href="/account">View progress</Link></div></div>;
  const selected=activeVault?vaultCategories[activeVault]:null;
  return <div className="vaultGate"><div className="lock unlocked">✓</div><div className="eyebrow">ACCESS GRANTED</div><h1>THE VAULT</h1><p>{access.founder?'Full access recognized.':'Bloodbound access recognized.'} Open a category to check its private releases.</p><div className="vaultPreview">{Object.entries(vaultCategories).map(([key,item])=><button type="button" className={activeVault===key?'active':''} aria-pressed={activeVault===key} onClick={()=>setActiveVault(activeVault===key?null:key as keyof typeof vaultCategories)} key={key}><span>{item.label}</span><span className="vaultArrow">→</span></button>)}</div>{selected&&<div className="vaultDetail"><div className="dropCode">{selected.code}</div><h2>{selected.title}</h2><p>{selected.copy}</p><div className="pill">NO RELEASES YET</div></div>}<div className="buttonRow vaultActions"><Link className="button secondary" href="/account">Back to account</Link></div></div>;
}

export default function MemberPortal({mode}:{mode:'login'|'account'|'vault'}){
  if(mode==='login')return <AuthPanel/>;
  if(mode==='vault')return <VaultPanel/>;
  return <AccountPanel/>;
}
