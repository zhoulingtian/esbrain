# ESbrain build source

This directory is the version-controlled source used to generate the root
`index.html`.

From the repository root:

```powershell
node build/assemble.js
node build/smoke.js
```

`assemble.js` writes only to the repository root. Keep UI/runtime changes in
`skeleton.html`, content changes in `data/`, and regenerate `index.html` before
committing.
