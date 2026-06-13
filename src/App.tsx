import { useState } from 'react';
import { Map, Plus, Trash2, X, Calendar } from 'lucide-react';
const C='#06b6d4';
interface Entry { id:string; dest:string; dates:string; notes:string; budget:number; spent:number; tags:string[]; createdAt:number; }
const SK='jl_trips_v1';
const ld=():Entry[]=>{try{return JSON.parse(localStorage.getItem(SK)||'[]')}catch{return[]}};
export default function App() {
  const [trips,setTrips]=useState<Entry[]>(ld);
  const [showAdd,setShowAdd]=useState(false);
  const [sel,setSel]=useState<Entry|null>(null);
  const [form,setForm]=useState({dest:'',dates:'',notes:'',budget:'',tags:''});
  const sv=(items:Entry[])=>{setTrips(items);localStorage.setItem(SK,JSON.stringify(items))};
  const inp={width:'100%',background:'#080c10',border:`1px solid ${C}20`,borderRadius:'10px',padding:'10px 14px',color:'white',fontSize:'14px',outline:'none',fontFamily:'Inter'};
  const add=()=>{
    if(!form.dest.trim())return;
    sv([{id:crypto.randomUUID(),dest:form.dest,dates:form.dates,notes:form.notes,budget:+form.budget||0,spent:0,tags:form.tags.split(',').map(t=>t.trim()).filter(Boolean),createdAt:Date.now()},...trips]);
    setForm({dest:'',dates:'',notes:'',budget:'',tags:''});setShowAdd(false);
  };
  if(sel) return (
    <div style={{minHeight:'100vh',background:'#06080c',display:'flex',flexDirection:'column'}}>
      <div style={{padding:'14px 20px',borderBottom:`1px solid ${C}20`,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <button onClick={()=>setSel(null)} style={{color:C,background:'none',border:'none',cursor:'pointer',fontSize:'14px',fontFamily:'Inter'}}>← Trips</button>
        <span style={{color:'white',fontSize:'15px',fontWeight:'600'}}>{sel.dest}</span>
        <button onClick={()=>{sv(trips.filter(t=>t.id!==sel.id));setSel(null);}} style={{padding:'4px',background:'none',border:'none',cursor:'pointer',color:`${C}60`}}><Trash2 size={14}/></button>
      </div>
      <div style={{flex:1,overflow:'auto',padding:'20px'}}>
        {sel.dates&&<div style={{display:'flex',alignItems:'center',gap:'8px',color:`${C}80`,fontSize:'13px',marginBottom:'12px'}}><Calendar size={13}/>{sel.dates}</div>}
        {sel.budget>0&&<div style={{background:`${C}10`,border:`1px solid ${C}20`,borderRadius:'10px',padding:'12px',marginBottom:'12px',display:'flex',justifyContent:'space-between'}}>
          <span style={{color:`${C}80`,fontSize:'13px'}}>Budget</span><span style={{color:C,fontWeight:'600'}}>${sel.budget}</span>
        </div>}
        {sel.notes&&<div style={{background:'#0a0e14',border:`1px solid ${C}20`,borderRadius:'10px',padding:'14px',marginBottom:'12px'}}>
          <p style={{color:'#cbd5e1',fontSize:'14px',lineHeight:'1.7',whiteSpace:'pre-wrap'}}>{sel.notes}</p>
        </div>}
        {sel.tags.length>0&&<div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
          {sel.tags.map(t=><span key={t} style={{padding:'3px 10px',borderRadius:'20px',background:`${C}15`,color:C,fontSize:'12px'}}>#{t}</span>)}
        </div>}
      </div>
    </div>
  );
  return (
    <div style={{minHeight:'100vh',background:'#06080c',display:'flex',flexDirection:'column'}}>
      <header style={{padding:'16px 20px',borderBottom:`1px solid ${C}20`,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <div style={{width:'36px',height:'36px',borderRadius:'10px',background:`linear-gradient(135deg,${C},#0891b2)`,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:`0 4px 14px ${C}30`}}><Map size={16} color="white"/></div>
          <div><div style={{fontWeight:'700',fontSize:'16px',color:'white',lineHeight:1}}>JourneyLog Pro</div>
          <div style={{fontSize:'11px',color:`${C}60`,marginTop:'2px'}}>{trips.length} trips</div></div>
        </div>
        <button onClick={()=>setShowAdd(true)} style={{display:'flex',alignItems:'center',gap:'5px',padding:'8px 14px',borderRadius:'9px',background:C,border:'none',color:'white',fontSize:'13px',fontWeight:'600',cursor:'pointer',fontFamily:'Inter',boxShadow:`0 4px 12px ${C}30`}}><Plus size={13}/> Log Trip</button>
      </header>
      <div style={{flex:1,overflow:'auto',padding:'14px 20px'}}>
        {trips.length===0?(<div style={{textAlign:'center',padding:'60px 20px'}}>
          <div style={{fontSize:'52px',marginBottom:'16px'}}>✈️</div>
          <h3 style={{fontSize:'20px',fontWeight:'700',color:'white',marginBottom:'8px'}}>Log your travels</h3>
          <p style={{color:`${C}60`,fontSize:'14px',lineHeight:'1.6',maxWidth:'240px',margin:'0 auto 24px'}}>Keep a private travel journal with notes and memories.</p>
          <button onClick={()=>setShowAdd(true)} style={{padding:'12px 24px',borderRadius:'10px',background:C,border:'none',color:'white',fontSize:'14px',fontWeight:'600',cursor:'pointer',fontFamily:'Inter'}}>Log first trip</button>
        </div>):(<div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
          {trips.map(t=><div key={t.id} style={{background:`${C}08`,border:`1px solid ${C}20`,borderRadius:'12px',padding:'14px',cursor:'pointer'}} onClick={()=>setSel(t)}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
              <div><div style={{color:'white',fontSize:'14px',fontWeight:'500',marginBottom:'3px'}}>{t.dest}</div>
              <div style={{color:`${C}60`,fontSize:'11px'}}>{t.dates||'No dates set'}</div></div>
              {t.budget>0&&<span style={{fontSize:'12px',color:C,fontWeight:'600'}}>${t.budget}</span>}
            </div>
            {t.notes&&<p style={{color:`${C}80`,fontSize:'12px',marginTop:'8px',lineHeight:'1.5',display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>{t.notes}</p>}
          </div>)}
        </div>)}
      </div>
      {showAdd&&(
        <div style={{position:'fixed',inset:0,background:'#00000080',zIndex:50,display:'flex',alignItems:'flex-end'}} onClick={e=>e.target===e.currentTarget&&setShowAdd(false)}>
          <div style={{width:'100%',background:'#0a0e14',borderRadius:'20px 20px 0 0',border:`1px solid ${C}20`,padding:'24px',maxHeight:'80vh',overflowY:'auto'}}>
            <div style={{width:'36px',height:'3px',background:'#0f1820',borderRadius:'2px',margin:'0 auto 20px'}}/>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'14px'}}>
              <h3 style={{color:'white',fontSize:'16px',fontWeight:'700',fontFamily:'Inter'}}>Log Trip</h3>
              <button onClick={()=>setShowAdd(false)} style={{background:'none',border:'none',cursor:'pointer',color:`${C}60`}}><X size={16}/></button>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              <input value={form.dest} onChange={e=>setForm({...form,dest:e.target.value})} placeholder="Destination *" style={inp} autoFocus/>
              <input value={form.dates} onChange={e=>setForm({...form,dates:e.target.value})} placeholder="Dates (e.g. June 2025)" style={inp}/>
              <input type="number" value={form.budget} onChange={e=>setForm({...form,budget:e.target.value})} placeholder="Budget ($)" style={inp}/>
              <textarea value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} placeholder="Notes, memories, highlights..." rows={4} style={{...inp,resize:'none',lineHeight:'1.6'}}/>
              <input value={form.tags} onChange={e=>setForm({...form,tags:e.target.value})} placeholder="Tags (comma separated)" style={inp}/>
              <button onClick={add} style={{padding:'14px',borderRadius:'12px',background:C,border:'none',color:'white',fontSize:'15px',fontWeight:'700',cursor:'pointer',fontFamily:'Inter'}}>Save Trip</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}