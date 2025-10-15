## Purpose
Short, targeted instructions to help an AI coding agent be productive in this repo (face/login detection + AI eye-health fork in `Hack_Elite`). Focus on concrete locations and commands.

## Quick checklist (what to do first)
- Install dependencies: run the root script that installs server and client deps.
- Start the backend: the server lives in `Hack_Elite/server` (Express + MongoDB + Socket.IO).
- Start the frontend: React app in `Hack_Elite/client` (proxy -> `http://localhost:5000`).
- For face detection experiments, use the Python code in `Hack_Elite/Face Detection` and the YAML models in `trained_models/`.

## Quick-start commands (PowerShell)
Run from repository root in PowerShell:

1) Install everything:
   npm run install-all

2) Start both client and server for local development:
   npm run dev

3) Start only the server (nodemon in dev):
   cd "Hack_Elite/server"; npm run dev

4) Build client for production:
   cd "Hack_Elite"; npm run build

Health check (once server is running):
  GET http://localhost:5000/api/health

## Big-picture architecture
- Monorepo-like layout (not a workspace): root contains legacy/experiment files plus `Hack_Elite/` which is the main app.
- Hack_Elite/server: Express API, MongoDB via `mongoose`, Socket.IO for realtime events. Entry: `Hack_Elite/server/index.js`.
- Hack_Elite/client: React + Tailwind. API helper at `Hack_Elite/client/src/services/api.js`. Socket client in `Hack_Elite/client/src/contexts/SocketContext.js`.
- Face detection experiments (Python + OpenCV) are in `Hack_Elite/Face Detection` and use local Haar cascades and trained .yml face-recognizer files. Trained models for other experiments live at the repo root `trained_models/`.

## Project-specific patterns & conventions
- Models: face recognizer models are YAML files named `face_recognizer_model_YYYYMMDD_HHMMSS.yml` and have sidecar `model_metadata_*.json` files in the same `trained_models` folder or the `Face Detection/trained_models` folder.
- Latest model convention: `latest_face_model.yml` is expected and used by Python scripts in `Face Detection`.
- Socket.IO: server exposes the io instance via `app.set('io', io)` in `Hack_Elite/server/index.js` — route handlers may access it from the `app` to emit events (avoid circular requires by using `app.get('io')` or `req.app.get('io')`).
- Auth in sockets: socket handshake expects `handshake.auth.token` (see `io.use(...)` in `Hack_Elite/server/index.js`). Client-side token usage is implemented in `Hack_Elite/client/src/contexts/SocketContext.js` and `AuthContext.js`.
- File uploads: server route `Hack_Elite/server/routes/upload.js` uses `multer` and Cloudinary; check `server/env.example` for required env vars.

## Integration points & external deps to be aware of
- MongoDB: default URI `mongodb://localhost:27017/eye-health-system` (override with `MONGODB_URI`). See `Hack_Elite/server/index.js`.
- Cloudinary, Twilio, JWT, and SMTP dependencies are used by the server (check `Hack_Elite/server/package.json` and `server/env.example`).
- REST API routes: defined under `Hack_Elite/server/routes/*` (auth, patient, ai, upload, appointments, doctor, admin, contact). Use `/api/<route>` prefixes.
- Frontend proxy: `Hack_Elite/client/package.json` sets "proxy": "http://localhost:5000" so relative API calls in the client go to the local server.

## Running Python face detection code
- Folder: `Hack_Elite/Face Detection` contains `Face-Iris_login_system.py` and `facedetector.py` and `requirements.txt` for the Python environment.
- Models: the Python code expects `latest_face_model.yml` and Haar cascade XMLs in the same folder.
- Typical workflow: create a venv, pip install -r `Hack_Elite/Face Detection/requirements.txt`, then run the Python script.

## Useful example references (search these files first)
- Server entry & socket setup: `Hack_Elite/server/index.js`
- API client helper: `Hack_Elite/client/src/services/api.js`
- Socket usage (client): `Hack_Elite/client/src/contexts/SocketContext.js`
- Python face code: `Hack_Elite/Face Detection/Face-Iris_login_system.py` and `facedetector.py`
- Model artifacts: `trained_models/latest_face_model.yml` and `trained_models/face_recognizer_model_*.yml`
- Root helper/test: `test_biometric.js` (quick node-based experiments)

## Developer notes / gotchas
- Large binary model files exist in `trained_models/` and `Hack_Elite/Face Detection/trained_models/` — avoid committing new large models without LFS.
- The repo mixes JS/Node, React, and Python; for changes touching the Python face code, run the Python requirements locally rather than relying on Node tooling.
- Environment variables: copy `Hack_Elite/server/env.example` → `.env` in `Hack_Elite/server` before starting the server.
- Deployment: `Hack_Elite/vercel.json` is present — deployment may rely on prebuilt `client/build` assets.

## If you need to modify or add endpoints
- Follow pattern in `Hack_Elite/server/routes/*.js` (each route exports an Express Router). Use `req.app.get('io')` to receive the io instance for emitting socket events.

---
If any section is unclear or you want more detail (examples of emitting sockets from routes, exact env keys in `env.example`, or a minimal test script for the Python code), tell me which part to expand and I will iterate.
