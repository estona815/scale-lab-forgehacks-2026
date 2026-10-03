export const LABELS=['linear','square','cube','inverse','inverseSquare','root'];
const STOP=new Set('the a an is of to and in by as with has i my it this that be should gives give output input result relationship multiplier scale factor'.split(' '));
const STEM={doubling:'double',doubles:'double',doubled:'double',twofold:'double',twice:'double',tripling:'triple',triples:'triple',tripled:'triple',threefold:'triple',halving:'half',halves:'half',halved:'half',halving:'half',squared:'square',squaring:'square',rooted:'root',cubed:'cube',cubes:'cube',cubic:'cube',quadratic:'square',fourfold:'four',eightfold:'eight',ninefold:'nine',quartering:'quarter',proportionality:'proportion',proportional:'proportion',reciprocal:'inverse',reciprocally:'inverse',inversely:'inverse',increases:'increase',grows:'increase',growth:'increase',decreases:'decrease',reduces:'decrease',reduced:'decrease',reducing:'decrease',divided:'divide',divides:'divide',multiplying:'multiply',multiplied:'multiply'};
export function features(text){
 if(typeof text!=='string'||text.length>600)throw new RangeError('Use at most 600 characters.');
 const words=(text.toLowerCase().match(/[a-z]+/g)||[]).filter(w=>!STOP.has(w)).map(w=>STEM[w]||w);
 return [...words,...words.slice(1).map((w,i)=>words[i]+'_'+w)];
}
function vector(model,text){const count={};for(const f of features(text))if(Object.hasOwn(model.idf,f))count[f]=(count[f]||0)+1;
 const out=Object.entries(count).map(([f,n])=>[model.index[f],(1+Math.log(n))*model.idf[f]*(f.includes('_')?2:1)]);const norm=Math.sqrt(out.reduce((s,x)=>s+x[1]**2,0));return out.map(([i,n])=>[i,n/norm]);}
function scores(model,x){const logits=model.weights.map((w,k)=>model.bias[k]+x.reduce((s,[i,v])=>s+w[i]*v,0));const m=Math.max(...logits);const z=logits.reduce((s,l)=>s+Math.exp(l-m),0);return logits.map(l=>Math.exp(l-m)/z);}
export function train(rows,regularization=0.001){
 const vocab=new Set(),df={};for(const r of rows){if(!LABELS.includes(r.label))throw new Error('Unknown class.');for(const f of new Set(features(r.text))){vocab.add(f);df[f]=(df[f]||0)+1;}}
 const vocabulary=[...vocab].sort();const index=Object.fromEntries(vocabulary.map((f,i)=>[f,i]));
 const model={kind:'tf-idf-softmax-linear-classifier',version:2,labels:LABELS,vocabulary,index,idf:Object.fromEntries(vocabulary.map(f=>[f,1+Math.log((rows.length+1)/(df[f]+1))])),weights:LABELS.map(()=>Array(vocabulary.length).fill(0)),bias:LABELS.map(()=>0),regularization,threshold:{score:0.4,margin:0.1,coverage:0.25}};
 const data=rows.map(r=>({x:vector(model,r.text),k:LABELS.indexOf(r.label)}));
 for(let epoch=0;epoch<1600;epoch++){
  const g=LABELS.map(()=>Array(vocabulary.length).fill(0)),b=LABELS.map(()=>0);
  for(const row of data){const p=scores(model,row.x);for(let k=0;k<LABELS.length;k++){const e=p[k]-(k===row.k?1:0);b[k]+=e;for(const [i,v]of row.x)g[k][i]+=e*v;}}
  for(let k=0;k<LABELS.length;k++){model.bias[k]-=b[k]/data.length;for(let i=0;i<vocabulary.length;i++)model.weights[k][i]-=g[k][i]/data.length+regularization*model.weights[k][i];}
 }
 return model;
}
export function infer(model,text){const fs=features(text),x=vector(model,text),p=scores(model,x);const ranked=p.map((score,k)=>({label:model.labels[k],score,k})).sort((a,b)=>b.score-a.score);const coverage=fs.length?fs.filter(f=>Object.hasOwn(model.index,f)).length/fs.length:0;const margin=ranked[0].score-ranked[1].score;const reasons=[];
 if(x.length<2||coverage<model.threshold.coverage)reasons.push('Too little familiar language.');
 if(/\b(not|never|cannot|can't|don't|doesn't|isn't|unsure|maybe|might|either|or|zero)\b/i.test(text))reasons.push('Negation, uncertainty or an unsupported combination needs your interpretation.');
 if(ranked[0].score<model.threshold.score||margin<model.threshold.margin)reasons.push('The model cannot separate the meanings reliably.');
 const evidence=x.map(([i,v])=>({feature:model.vocabulary[i],contribution:v*(model.weights[ranked[0].k][i]-model.weights[ranked[1].k][i])})).filter(x=>x.contribution>0).sort((a,b)=>b.contribution-a.contribution).slice(0,3);
 return {label:ranked[0].label,score:ranked[0].score,margin,coverage,deferred:reasons.length>0,reasons,evidence,ranked};}
