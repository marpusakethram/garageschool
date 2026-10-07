# VentureSim

The Venture Capital Simulator.

A venture capital course and 150 investing tests. Each test hands you a fund and 50 fictional startups; you decide which to back, then see what happened to every one.

Plain HTML, CSS, and JavaScript. No build step.

## Run it

Open `index.html` in a browser, or serve the folder:

```
python -m http.server 4173
```

## Layout

- `index.html` home page, `break-into-vc.html` guide, `app.html` dashboard, tests, course, library, glossary
- `assets/js/engine.js` test generator and scoring (deterministic, same tests for every user)
- `assets/js/course/` one file per lesson, loaded when opened
- `library/` PDFs plus `library.js`, the list the Library page shows
- `tests/engine.test.js` engine checks: `node tests/engine.test.js`

## Known limits

- Accounts and progress live in the browser's localStorage. Real accounts need a backend.
- Test outcomes ship to the browser, so a determined user can read them in the source. Score on a server before using results for hiring.
- The two videos (`media/venturesim-intro.mp4`, `media/venturesim-walkthrough.mp4`) are not made yet; the players show a notice until they exist.
