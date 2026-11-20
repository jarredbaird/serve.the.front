# serve. — frontend

React app (built with Vite; migrated from Create React App).

```bash
npm install
npm run dev     # http://localhost:3000, talks to the API at VITE_API_URL (default http://localhost:3001)
npm run build   # static files in build/
npm run lint    # ESLint (also runs in CI on every PR)
```

CI: [.github/workflows/ci.yml](.github/workflows/ci.yml) runs `npm ci`, `npm run lint` and `npm run build` on every pull request and on pushes to `main`.

Set `VITE_API_URL` (see `.env.example`) to the deployed API's URL when building for production.
