import {writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {rows,OOD} from '../corpus.mjs';
import {train,infer} from '../model.mjs';
const training=rows('train'),validation=rows('validation'),test=rows('test');
const all=[...training,...validation,...test];
if(new Set(all.map(x=>x.text.toLowerCase())).size!==all.length)throw new Error('Duplicate full sentence across splits.');
const model=train(training);
// Select the lowest threshold with zero non-deferred validation errors;
// no held-out sentence is used for fitting or operating-point selection.
let chosen=null;
for(const score of [0.55,0.65,0.75,0.85,0.95]){
 model.threshold={score,margin:0.15,coverage:0.25};
 const v=validation.map(x=>({...x,p:infer(model,x.text)}));
 if(v.every(x=>x.p.deferred||x.p.label===x.label)){chosen=score;break;}
}
model.threshold={score:chosen??0.95,margin:0.15,coverage:0.25};
function evaluate(data){const out=data.map(x=>{const p=infer(model,x.text);return {id:x.id,text:x.text,expected:x.label,predicted:p.label,score:p.score,deferred:p.deferred,reasons:p.reasons};});const accepted=out.filter(x=>!x.deferred);return {n:out.length,rawCorrect:out.filter(x=>x.expected===x.predicted).length,accepted:accepted.length,acceptedCorrect:accepted.filter(x=>x.expected===x.predicted).length,rows:out};}
function baseline(text){const s=text.toLowerCase();if(s.includes('inverse square')||s.includes('one quarter')||s.includes('one ninth'))return 'inverseSquare';if(s.includes('square root'))return 'root';if(s.includes('cube')||s.includes('cubic')||s.includes('eightfold'))return 'cube';if(s.includes('square')||s.includes('fourfold')||s.includes('ninefold'))return 'square';if(s.includes('inverse')||s.includes('reciprocal'))return 'inverse';return 'linear';}
const report={scope:'Authored synthetic English sentence classification only; no real learner or learning-gain claim.',trainCount:training.length,validation:evaluate(validation),test:evaluate(test),baseline:{name:'Fixed keyword rule, authored before evaluation',n:test.length,correct:test.filter(x=>baseline(x.text)===x.label).length},ood:OOD.map(text=>({text,...infer(model,text)})),threshold:model.threshold,allSentenceIds:all.map(x=>x.id),corpusSha256:createHash('sha256').update(JSON.stringify(all)).digest('hex'),limitations:['A small, authored corpus cannot establish generalization to real explanations.','Naive Bayes scores are uncalibrated; word-overlap can cause confident mistakes.','Negation/mixed claims are deliberately deferred. All classifications require learner confirmation.','No automatic grading, educational selection, learning-gain or multilingual claims.']};
await writeFile(new URL('../model.json',import.meta.url),JSON.stringify(model),{flag:'wx'});
await writeFile(new URL('../evaluation.json',import.meta.url),JSON.stringify(report,null,2),{flag:'wx'});
console.log(JSON.stringify({train:training.length,validation:{n:report.validation.n,rawCorrect:report.validation.rawCorrect,accepted:report.validation.accepted,acceptedCorrect:report.validation.acceptedCorrect},test:{n:report.test.n,rawCorrect:report.test.rawCorrect,accepted:report.test.accepted,acceptedCorrect:report.test.acceptedCorrect},baseline:report.baseline,oodDeferred:report.ood.filter(x=>x.deferred).length,oodN:OOD.length,threshold:model.threshold}));
