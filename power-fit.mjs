// Fit a power law y = c*x^p from numeric observations. This is learned
// least-squares regression in log space, not a pretrained language model.
export function parsePoints(text){
 if(typeof text!=='string'||text.length>2000)throw new RangeError('Use at most 2000 characters.');
 const lines=text.trim().split(/\r?\n/).filter(x=>x.trim());if(lines.length<3||lines.length>10)throw new RangeError('Use 3–10 input,output rows.');
 const points=lines.map((line,i)=>{const fields=line.split(',').map(x=>x.trim());if(fields.length!==2||fields.some(x=>!x||!/^\d*\.?\d+(?:[eE][+-]?\d+)?$/.test(x)))throw new RangeError('Row '+(i+1)+': use two positive numbers separated by a comma.');const[x,y]=fields.map(Number);validatePoint({x,y});return{x,y};});
 if(new Set(points.map(p=>p.x)).size!==points.length)throw new RangeError('Each fitting input must be distinct.');return points;
}
export function validatePoint({x,y}){if(!Number.isFinite(x)||!Number.isFinite(y)||x<.25||x>4||y<.01||y>100)throw new RangeError('Input must be 0.25–4; output must be 0.01–100.');}
export function fitPowerLaw(points){if(!Array.isArray(points)||points.length<3||points.length>10)throw new RangeError('Fit requires 3–10 points.');for(const p of points)validatePoint(p);const xs=points.map(p=>p.x);if(new Set(xs).size!==xs.length||Math.max(...xs)/Math.min(...xs)<2)throw new RangeError('Use distinct input values spanning at least a factor of two.');
 const data=points.map(p=>({x:Math.log(p.x),y:Math.log(p.y)}));const n=data.length,mx=data.reduce((s,p)=>s+p.x,0)/n,my=data.reduce((s,p)=>s+p.y,0)/n;const xx=data.reduce((s,p)=>s+(p.x-mx)**2,0);if(xx<1e-8)throw new RangeError('The input values are too close to fit a curve.');
 const power=data.reduce((s,p)=>s+(p.x-mx)*(p.y-my),0)/xx;const intercept=my-power*mx;const constant=Math.exp(intercept);if(!Number.isFinite(power)||!Number.isFinite(constant)||constant<=0||Math.abs(power)>6)throw new RangeError('The fitted curve falls outside this prototype’s supported exponent range (-6 to 6).');
 const residuals=data.map(p=>p.y-(intercept+power*p.x));const logRmse=Math.sqrt(residuals.reduce((s,r)=>s+r*r,0)/n);
 return{kind:'log-space-least-squares-power-law',n,power,intercept,constant,logRmse,minInput:Math.min(...xs),maxInput:Math.max(...xs),points:points.map(p=>({...p}))};
}
export function predictFit(model,x){if(!Number.isFinite(x)||x<.25||x>4)throw new RangeError('Probe input must be 0.25–4.');const y=model.constant*x**model.power;if(!Number.isFinite(y)||y<=0)throw new RangeError('Invalid fitted prediction.');return y;}
export function probeFit(model,point){validatePoint(point);if(model.points.some(p=>p.x===point.x))throw new RangeError('Use a probe input that was not used to fit this curve.');const predicted=predictFit(model,point.x);return{...point,predicted,relativeError:Math.abs(predicted-point.y)/point.y,outsideFitRange:point.x<model.minInput||point.x>model.maxInput};}
