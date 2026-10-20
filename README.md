# GarageSchool

Learn venture capital by making investment decisions, then seeing what happened.

A venture capital course and 150 investing tests. Each test hands you a fund and 50 fictional startups; you decide which to back, then see what happened to every one.

Plain HTML, CSS, and JavaScript. No build step.

## Try it

**[Open the live app](https://venturesimulator.vercel.app/index.html)** · [Try the six-startup example](https://venturesimulator.vercel.app/app.html#/example)

| Track | Your job |
| --- | --- |
| Analyst | Screen startups against a fund thesis and decide which deserve a meeting. |
| Associate | Choose investments, weigh price and record conviction. |
| Partner | Allocate a fund, make follow-on decisions and review net returns. |

There are 50 tests per track, with 50 fictional companies in each test. The same seed produces the same case, making it possible to compare decisions. Courses and workshops cover investment memos, term sheets, cap tables and portfolio management.

## Run locally

Requires Python to serve locally and Node.js only if you want to run the engine tests. No package install or build step is needed.

```bash
git clone https://github.com/marpusakethram/garageschool.git
cd garageschool
```

Open `index.html` in a browser, or serve the folder:

```
python -m http.server 4173
```

Open `http://localhost:4173`, then select a track or use the example test.

## Layout

- `index.html` home page, `break-into-vc.html` guide, `app.html` dashboard, tests, course, library, glossary
- `assets/js/engine.js` test generator and scoring (deterministic, same tests for every user)
- `assets/js/course/` one file per lesson, loaded when opened
- `library/` PDFs plus `library.js`, the list the Library page shows
- `tests/engine.test.js` engine checks: `node tests/engine.test.js`

## Known limits

- Practice progress is stored in the browser. The hosted site also has optional Firebase sign-in and Google Forms submissions; signing in does not mean progress is synchronized across devices. For a private local trial, avoid submitting forms and use the example test.
- Test outcomes ship to the browser, so a determined user can read them in the source. Score on a server before using results for hiring.
- The two videos (`media/garageschool-intro.mp4`, `media/garageschool-walkthrough.mp4`) are not made yet; the players show a notice until they exist.


## Run the engine checks

```bash
node tests/engine.test.js
```

## Contribute

See [CONTRIBUTING.md](CONTRIBUTING.md). Useful contributions include reproducible scoring bugs, clearer explanations and accessibility improvements. Companies and outcomes are fictional; this is an educational simulation, not a hiring assessment or investment recommendation.

## Hosting configuration

Firebase web configuration is public client configuration, not a service-account secret. Configure your own Firebase project and Google Forms endpoints before hosting a fork; do not send test signups to the original application's forms. Restrict API access appropriately and enforce authorization in the relevant services. Never commit admin credentials, private keys or response exports.
