# Scale Lab

Change the scale. Test the idea. A working local learning prototype created for **ForgeHacks Online 2026, AI + Education** after the October 3 kickoff.

Students can memorize a formula without recognizing why doubling one quantity sometimes doubles, quadruples, halves or quarters another. Scale Lab makes a proposed relationship testable: learn a curve from observations, challenge it with a separate point, then compare an explicitly confirmed interpretation with a labelled ideal mathematical model.

## Run without accounts or API keys

Serve this folder with a local static server:

```sh
python3 -m http.server 8782 --bind 127.0.0.1
```

Open `http://127.0.0.1:8782/`. A server is needed for module imports and the two local model JSON files. No packages, model downloads, paid APIs, sponsor credits, telemetry or remote fonts are required. Python and Node are not bundled; use an existing installation. The app loads its own files from the server and processes observations/explanations locally. Optional textbook links open only when clicked. No draft persistence is promised across reloads.

## Try the primary learned experiment

1. Keep fitting observations `0.5,0.25`, `1,1`, `2,4`. Click **Fit a relationship**.
2. The regression learns output = 1 × input^2 from those three rows. No topic label or separate probe is used in fitting.
3. Test the separate probe `(3,9)`. The frozen curve predicts 9. The UI labels this as extrapolation beyond the fitting range, not proof of general accuracy.
4. Change only the observed probe output to 3 and test again. Error becomes 200%; the new observation challenges the fit. It does not silently retrain it.
5. Try the inverse data `0.5,2`, `1,1`, `2,0.5`. The same learning code fits exponent -1. Editing fitting data clears both the old model and probe result.
6. Download the fitted experiment as Markdown. It includes your numeric observations and any separate probe; nothing is uploaded.

The core ML method is ordinary least-squares regression in log space: log(output) = intercept + exponent × log(input). Both parameters are fitted from 3–10 distinct positive observations. Input ratios are bounded to 0.25–4, output ratios to 0.01–100, with at least a factor-of-two input span. Exponents beyond -6 to 6 are refused. This method minimizes log residuals, not error in the original output units. The displayed training RMSE and separate probe error are different quantities. A fixed 20% comparison tolerance is a teaching aid, not a confidence interval. Small samples, extrapolation and wrong physical assumptions remain limitations.

Default observations are synthetic, not field measurements. The program has not been evaluated with real learners and does not claim learning gains.

## Compare a known system

Choose circle area, cube volume, kinetic energy, constant-distance travel time, ideal point-source intensity or small-angle pendulum period. Each shows its formula and held-constant assumptions.

Write an English explanation, optionally request a language-model suggestion, and explicitly confirm its meaning. Select **Same proportion** for circle area and run: at 3× radius your claim gives 3× area while the stated relation gives 9×. A table tests 0.5×, 2× and 3× so an accidental match at 1× cannot be treated as confirmation. You can revise the explanation and export the experiment/reflection locally. Explanation, meaning and system changes invalidate stale results. No pupil is graded or selected by either model.

### The optional language classifier is limited

This is a small **TF-IDF word/bigram linear softmax classifier**, trained from 48 original authored synthetic English explanations with declared lexical normalization. Scores are uncalibrated. Six classes describe proportional, square, cube, reciprocal, reciprocal-square and square-root forms. Negation/uncertainty, insufficient familiar language or a weak score cause deferral. Even a confident suggestion can be wrong; manual confirmation is always required.

Its initial Naive Bayes experiment was weak and is retained as historical development evidence, not used by the app. The selected v002 weights/threshold were frozen before an independent reviewer authored/evaluated a separate sealed assessment. On those synthetic examples, raw matches were **13/30**, **26/30 were deferred**, and **3/4 non-deferred matches were correct, including one confident error**. Unsupported examples were deferred **10/10**. A declared fixed keyword baseline matched 10/30. This is a small reviewer-authored language check, not a real-student benchmark, broad superiority claim or evidence of educational benefit. We kept the result and moved the principal learning interaction to the numeric regression rather than hiding the failure or tuning against those answers.

## Source and verification

- `power-fit.mjs`, `discovery.mjs`: learned curve, separate probe and their bounded UI.
- `math.mjs`, `app.mjs`: labelled mathematical relationships, confirmed meaning, graph/table and local reflection export.
- `model-v002.mjs`, `model-v002.json`, `corpus.mjs`: selected learned language classifier and authored training data.
- `evaluation-v002.json`: development evaluation; its initial test is explicitly a seen development set.
- `index.html`, `styles.css`: semantic controls, keyboard focus, responsive open workspace and numerical alternatives to the plot.
- `DESIGN-v002.md`: current architecture; `DESIGN.md` and v001 model files preserve the initial experiment and are labelled historical.

Run the actual checks with Node:

```sh
node --test tests/*.test.mjs
```

The 16 observed test groups cover independent known ratios, reciprocal identities, wrong-power counterexamples, domain bounds, corpus separation, selected classifier guardrails, learned regression parameters and a probe that cannot update its fitted model. Tests are implementation checks, not a population accuracy estimate. Current desktop and 320px layouts, actual model inference, correction/deferral, state invalidation and a real Markdown download were checked in the in-app browser. An independent reviewer separately checked numeric cases and source state transitions; formal eligibility, public delivery, registration and final contest receipt remain separate gates.

Training scripts refuse existing output files to preserve frozen results. For a new experiment, choose new output names and new independent evaluation data. Do not silently overwrite frozen weights or present the seen development set as unseen.

## Origin and scope

Source, synthetic data, layout and experiment workflow were produced with OpenAI Codex assistance during the ForgeHacks build window at the participant's request. No prior submitted project's code, dataset, media or assets were copied. No first-person classroom experience, manual human coding, field study or user testing is claimed. No image generation, commercial APIs or sponsor credits were used. Public availability of this prototype does not mean it has been registered, accepted or awarded by ForgeHacks.

The formulas use original explanations and standard mathematical relationships. Reference facts: [OpenStax kinetic energy](https://openstax.org/books/college-physics-2e/pages/7-2-kinetic-energy-and-the-work-energy-theorem), [OpenStax inverse-square intensity](https://openstax.org/books/university-physics-volume-1/pages/17-3-sound-intensity). No textbook prose, images or other external assets are bundled.
