export const FORMS={linear:{name:'Same proportion',power:1},square:{name:'Square of the scale',power:2},cube:{name:'Cube of the scale',power:3},inverse:{name:'Reciprocal of the scale',power:-1},inverseSquare:{name:'Reciprocal of scale squared',power:-2},root:{name:'Square root of the scale',power:0.5}};
export const TOPICS=[
 {id:'area',name:'Circle area',input:'radius',output:'area',power:2,formula:'A = πr²',assumptions:'A flat circle; only its radius changes. The constant π cancels in the normalized ratio.',why:'Radius stretches two independent directions. A length factor appears twice.'},
 {id:'volume',name:'Cube volume',input:'edge length',output:'volume',power:3,formula:'V = s³',assumptions:'A perfect cube; all three edges change by the same factor.',why:'Length, width and height each contribute a factor.'},
 {id:'energy',name:'Kinetic energy',input:'speed',output:'kinetic energy',power:2,formula:'K = ½mv²',assumptions:'Fixed mass; translational motion in the non-relativistic ideal model.',why:'Speed appears twice in the energy formula; mass is held constant.'},
 {id:'time',name:'Travel time',input:'speed',output:'travel time',power:-1,formula:'t = d/v',assumptions:'Fixed travel distance; constant positive speed with no stops or acceleration.',why:'Speed is in the denominator: the same distance takes less time.'},
 {id:'light',name:'Point-source intensity',input:'distance',output:'intensity',power:-2,formula:'I = P/(4πr²)',assumptions:'Ideal isotropic point source, fixed power, free space, no absorption or reflections.',why:'Fixed power spreads across a sphere whose surface area grows with radius squared.'},
 {id:'pendulum',name:'Pendulum period',input:'length',output:'period',power:0.5,formula:'T = 2π√(L/g)',assumptions:'Ideal simple pendulum at small amplitude; fixed gravity; no damping.',why:'Length is inside a square root; this is a small-angle idealization.'}
];
export function topicFor(id){const t=TOPICS.find(x=>x.id===id);if(!t)throw new RangeError('Unknown system.');return t;}
export function ratio(scale,power){if(!Number.isFinite(scale)||scale<0.25||scale>4||!Object.values(FORMS).some(x=>x.power===power))throw new RangeError('Unsupported scale or power.');return scale**power;}
export function compare(topicId,claim,scale){const topic=topicFor(topicId);if(!Object.hasOwn(FORMS,claim))throw new RangeError('Confirm a supported interpretation.');return {scale,predicted:ratio(scale,FORMS[claim].power),expected:ratio(scale,topic.power)};}
export function counterexamples(topicId,claim){return [0.5,2,3].map(scale=>({...compare(topicId,claim,scale),differs:Math.abs(compare(topicId,claim,scale).predicted-compare(topicId,claim,scale).expected)>1e-9}));}
export function fmt(x){return Number(x.toFixed(4)).toString();}
