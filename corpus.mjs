// Original authored synthetic English explanations. No pupil data or copied corpus.
// Split units are complete, independently authored sentences, not randomized
// paraphrases of a shared generated template. Not a real-learner benchmark.
export const CORPUS = {
 linear: {
  train: ['The output grows in direct proportion to the input.', 'Doubling the input doubles the result.', 'Triple the input and the result triples too.', 'A linear relationship keeps the same multiplier.', 'Output scales one for one with input.', 'Multiply the input by a factor and multiply the output by that same factor.', 'The relationship has a power of one.', 'Half the input produces half the output.'],
  validation: ['I expect direct proportional growth.', 'Both quantities increase by the same factor.', 'The result is linear in the input.'],
  test: ['My guess is that the output is proportional to the input.', 'A twofold input causes a twofold output.', 'The change is one for one.', 'Halving the input should halve the result.']
 },
 square: {
  train: ['Output grows with the square of the input.', 'Doubling the input gives four times the output.', 'Tripling the input produces nine times the result.', 'The relationship is quadratic.', 'The input multiplier is squared.', 'Two input factors multiply together.', 'The output has a power of two.', 'Half the input gives one quarter of the output.'],
  validation: ['A quadratic increase means squaring the scale.', 'I predict fourfold output for a doubled input.', 'The output follows input squared.'],
  test: ['I think the result is proportional to the square of input.', 'Twofold input makes the result fourfold.', 'Scaling by three gives ninefold output.', 'Squaring the multiplier gives the output factor.']
 },
 cube: {
  train: ['Output scales with the cube of the input.', 'Doubling the input produces eight times the output.', 'Tripling the input gives twenty seven times the result.', 'The relationship is cubic.', 'Three equal input factors multiply together.', 'The scale factor is cubed.', 'The output has a power of three.', 'Half the input leaves one eighth of the output.'],
  validation: ['A cubic relationship cubes the multiplier.', 'I expect eightfold output when input doubles.', 'The result follows input cubed.'],
  test: ['My prediction uses the cube of input.', 'A twofold input change makes an eightfold result.', 'Multiply the scale by itself three times.', 'Scaling down by half leaves an eighth.']
 },
 inverse: {
  train: ['Output is inversely proportional to input.', 'Doubling the input halves the output.', 'Tripling the input divides the result by three.', 'The result decreases as the reciprocal of input.', 'Divide one by the input multiplier.', 'The relationship has a negative power of one.', 'Half the input doubles the output.', 'Multiply input and output and the product stays constant.'],
  validation: ['The output follows the inverse of the scale.', 'A doubled input yields half the result.', 'This is a reciprocal relationship.'],
  test: ['I expect inverse proportionality.', 'Twofold input leaves half the output.', 'The output multiplier is the reciprocal of the input multiplier.', 'Reducing the input by half makes output twice as large.']
 },
 inverseSquare: {
  train: ['Output follows the inverse square of input.', 'Doubling the input leaves a quarter of the output.', 'Tripling the input leaves one ninth of the result.', 'Divide one by the square of the input multiplier.', 'The relationship has a negative power of two.', 'Half the input gives four times the output.', 'Output decreases according to reciprocal squared input.', 'The inverse square relationship falls faster than reciprocal input.'],
  validation: ['I predict inverse square scaling.', 'A doubled input reduces output to a quarter.', 'The reciprocal of the squared multiplier sets the result.'],
  test: ['My guess is an inverse square law.', 'Twofold input makes output one quarter as large.', 'The output factor is one divided by input squared.', 'Tripling the input reduces the result to one ninth.']
 },
 root: {
  train: ['Output increases with the square root of input.', 'Four times the input gives twice the output.', 'Nine times the input produces three times the result.', 'The input multiplier is square rooted.', 'The relationship has a power of one half.', 'Quarter the input and the result halves.', 'Output grows more slowly following the square root.', 'Take the positive square root of the input scale.'],
  validation: ['The output follows a square root relationship.', 'A fourfold input gives a doubled result.', 'I expect the positive root of the scale.'],
  test: ['My prediction is proportional to the square root of input.', 'A ninefold input increase makes output threefold.', 'Use the positive square root for the multiplier.', 'An input reduced to a quarter gives half the output.']
 }
};
export const OOD = [
 'I do not think the output is linear.', 'It might be square or inverse square, I cannot decide.',
 'The weather is cloudy and my cat is sleeping.', '두 배면 네 배가 됩니다.',
 'Output does not follow the square of input.', 'Multiply everything by zero.',
 'The answer is 827094.', 'I think it depends on several other changing variables.'
];
export function rows(split) { return Object.entries(CORPUS).flatMap(([label,sets]) => sets[split].map((text,i)=>({label,text,id:`${split}-${label}-${i+1}`}))); }
