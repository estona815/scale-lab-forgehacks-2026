# Scale Lab initial design contract (historical v001)

Current architecture and screen order are specified in DESIGN-v002.md. The Naive Bayes file paths below describe the preserved first experiment only. The selected app uses model-v002.mjs/model-v002.json (TF-IDF softmax); power-fit.mjs supplies the primary learned regression. Neither NLP weights nor its threshold changed after the independent held-out review.

Original local prototype for ForgeHacks AI + Education. Frozen before coding on October 4 KST / October 3 UTC, after the conservative 17:00 UTC kickoff. No existing product source or media is incorporated.

## Surface
One working experiment screen, not a landing page. White background (#ffffff), charcoal ink (#162b32), teal experiment curve (#00796b), coral dashed claim curve (#bd4b36). System sans serif for controls and copy, system monospace for normalized ratios. Open two-column workspace, thin horizontal rules, no card grid, hero badge, generated art, fake social proof or impact metrics. 1120px maximum content width, 32px padding; collapse to one column below 760px and retain full labels at 320px. Minimum control height 44px and visible keyboard focus. Plot has a data-table alternative. Reduced motion disables transitions.

Header copy: Scale Lab; How it works. Main heading: Change the scale. Test the idea. Subcopy: Explain a relationship, confirm what you mean, then look for a counterexample. Left sequence: Choose a system; Explain your prediction; Interpret my explanation; Confirm the meaning; Run the experiment. Right: Your experiment; Input scale; Your prediction; Model relationship; a graph; comparison table; Revise your explanation; Download experiment. Footer/model details state synthetic data, limitations, no model grading, no measured learning gains and local-only processing.

Core workflow: choose topic -> original English explanation -> actual learned model suggests one of six powers or defers -> learner explicitly selects/confirms the intended power -> bounded slider changes normalized input -> exact mathematical model compares values at three test scales (never judge from x=1 alone) -> learner writes reflection -> download Markdown without account/upload. Topic, explanation or confirmed class changes invalidate any previous experiment/reflection. Classifier never grades or advances educational access.

Each topic includes explicit held-constant assumptions and formula. Physics topics are idealized; no measurement or safety advice. Plain English supported, no multilingual interpretation claim. The model only maps language to a scaling form; calculations are deterministic and separately labelled.

## Components and files
corpus.mjs original labelled sentences; model.mjs multinomial Naive Bayes training/inference and deferral; math.mjs trusted topics, numerical bounds and counterexamples; scripts/train.mjs validation-only operating point selection, frozen held-out evaluation; model.json/evaluation.json generated once; app.mjs DOM rendering and local export; index.html/styles.css static screen; tests/core.test.mjs independent numeric and model boundary regressions.

No dependency installation, remote fonts, telemetry, storage of learner names, runtime APIs, image-generation credits, paid hosting or model downloads. The user's explicit zero-credit/zero-expense constraint overrides the frontend skill's image-generation workflow. This document is the code-native visual specification; no claim of comparison with a generated design image.
