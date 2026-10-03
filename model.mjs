export const LABELS = ['linear','square','cube','inverse','inverseSquare','root'];
const STOP = new Set('the a an is of to and in by as with has i my it this that be should gives give output input result relationship multiplier scale factor'.split(' '));
export function features(text) {
 if(typeof text !== 'string' || text.length > 600) throw new RangeError('Use an explanation of at most 600 characters.');
 const words = (text.toLowerCase().match(/[a-z]+/g)||[]).filter(x=>!STOP.has(x));
 return [...words,...words.slice(1).map((w,i)=>`${words[i]}_${w}`)];
}
export function train(rows) {
 const counts=Object.fromEntries(LABELS.map(k=>[k,{}]));
 const docs=Object.fromEntries(LABELS.map(k=>[k,0]));const totals={};const vocabulary=new Set();
 for(const row of rows) {
  if(!LABELS.includes(row.label)) throw new Error('Unknown training class.');
  docs[row.label]++;
  for(const f of features(row.text)) {counts[row.label][f]=(counts[row.label][f]||0)+1;vocabulary.add(f);}
 }
 if(LABELS.some(k=>docs[k]===0))throw new Error('All six classes require training examples.');
 for(const k of LABELS)totals[k]=Object.values(counts[k]).reduce((a,b)=>a+b,0);
 return {kind:'multinomial-naive-bayes',version:1,labels:LABELS,counts,docs,totals,vocabulary:[...vocabulary].sort(),threshold:{score:0.65,margin:0.15,coverage:0.25}};
}
export function infer(model,text) {
 const fs=features(text);const vocab=new Set(model.vocabulary);const known=fs.filter(x=>vocab.has(x));
 const totalDocs=Object.values(model.docs).reduce((a,b)=>a+b,0);
 const raw=model.labels.map(label=>({label,log:Math.log(model.docs[label]/totalDocs)+known.reduce((s,f)=>s+Math.log(((model.counts[label][f]||0)+1)/(model.totals[label]+vocab.size)),0)}));
 const top=Math.max(...raw.map(x=>x.log));const z=raw.reduce((s,x)=>s+Math.exp(x.log-top),0);
 const ranked=raw.map(x=>({...x,score:Math.exp(x.log-top)/z})).sort((a,b)=>b.score-a.score);
 const coverage=fs.length?known.length/fs.length:0, margin=ranked[0].score-ranked[1].score;
 const risky=/\b(not|never|cannot|can't|don't|doesn't|isn't|unsure|maybe|might|either|or|zero)\b/i.test(text);
 const reasons=[];
 if(known.length<2||coverage<model.threshold.coverage)reasons.push('Too little familiar language.');
 if(risky)reasons.push('Negation, uncertainty or an unsupported combination needs your interpretation.');
 if(ranked[0].score<model.threshold.score||margin<model.threshold.margin)reasons.push('The model cannot separate the meanings reliably.');
 const first=ranked[0].label,second=ranked[1].label;
 const evidence=[...new Set(known)].map(f=>({feature:f,logOdds:Math.log(((model.counts[first][f]||0)+1)/(model.totals[first]+vocab.size))-Math.log(((model.counts[second][f]||0)+1)/(model.totals[second]+vocab.size))})).filter(x=>x.logOdds>0).sort((a,b)=>b.logOdds-a.logOdds).slice(0,3);
 return {label:first,score:ranked[0].score,margin,coverage,deferred:reasons.length>0,reasons,evidence,ranked};
}
