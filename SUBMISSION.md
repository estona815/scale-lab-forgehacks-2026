# Prepared submission copy — no registration or final submission yet

Title: Scale Lab

Tagline: Learn a relationship from observations, then challenge it with a separate experiment.

Track: AI + Education

## Inspiration
Recognizing how a quantity scales is different from recalling its formula. The prototype invites a learner to make a prediction, fit an interpretable relationship and look for a counterexample. This is a proposed learning interaction; no classroom experience or measured learning gain is claimed.

## What it does
The primary experiment learns the constant and exponent of a power-law curve from 3–10 positive numeric observations. A separate probe tests the frozen model without retraining it. Training residual, probe error and extrapolation are labelled separately. An additional six-system sandbox contrasts a learner-confirmed scaling interpretation with a mathematical relationship whose assumptions are visible. Local Markdown exports preserve the experiment and reflection.

## How it was built
The numeric ML component is least-squares regression in log space. It learns two parameters directly from the fitting rows and never reads the separate probe while fitting. A secondary TF-IDF/softmax English classifier is trained from 48 authored synthetic sentences; its suggestion is optional and always requires confirmation. The implementation uses modular JavaScript, HTML and CSS, a table alternative to the SVG graph, and no accounts, telemetry or runtime commercial APIs. Source, synthetic data and UI were produced with Codex coding assistance during the event window. The AI/ML running in the product is separately described from that coding assistance.

## Challenges and honest limits
The first language model generalized poorly. The frozen selected language model also matched only 13/30 independent authored synthetic examples, deferred 26/30 and made one error among four non-deferred suggestions. We preserved these findings and strengthened the principal interaction with interpretable numeric learning and a separate probe. Both modules remain prototypes. No real learner study or broad accuracy claim is made. Small samples and ideal-model assumptions can mislead; extrapolation and mismatch are surfaced rather than converted into grades.

## What is complete
Working local fit/probe and confirmed-scaling workflows, bounded validation, state invalidation, responsive controls, local exports, original corpus and frozen language-model artifacts. Sixteen test groups were actually run, and the principal paths were actually operated in the in-app browser. A public code link and 2–4 minute public demo must be supplied and verified before final contest submission. This draft is not a receipt.
