# SandFest Deployment Guide

This walks through getting the SandFest live feed running publicly.

Two things deploy:
1. **Frontend** (`port-a-local-co`) → Vercel → `sandfest.heyelab.com`
2. **Camera API** (`2m-os/sandfest/`) → Mac Studio → `sandfest-api.heyelab.com`

---

## Part 1 — Camera API on the Mac Studio

### 1.1 Test the camera first

```bash
cd 2m-os/sandfest
pip3 install -r requirements.txt
python3 test_camera.py
```

This walks through FFmpeg, the J5Create device, Ollama, and the vision model.
If it fails at step 2 (device list), set `CAMERA_DEVICE` to whichever index
looks like the J5Create:

```bash
CAMERA_DEVICE=2 python3 test_camera.py
```

### 1.2 Start the service

```bash
cd 2m-os/sandfest
CAMERA_DEVICE=1 \
OLLAMA_VISION_MODEL=moondream \
uvicorn server:app --host 0.0.0.0 --port 8000
```

On a second terminal, kick off continuous counting:

```bash
curl -X POST http://localhost:8000/api/crowd/start
```

Verify it's working:

```bash
curl http://localhost:8000/api/crowd/status
curl http://localhost:8000/api/crowd/current   # after ~30s
```

### 1.3 Expose it at sandfest-api.heyelab.com

You already have `emma.heyelab.com` routed to this Mac Studio, so there's an
existing reverse proxy (nginx + certbot). Add a new server block:

```nginx
server {
    listen 443 ssl http2;
    server_name sandfest-api.heyelab.com;

    ssl_certificate     /etc/letsencrypt/live/sandfest-api.heyelab.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/sandfest-api.heyelab.com/privkey.pem;

    # Permissive CORS — kiosks / mobile users hit this from Vercel
    add_header Access-Control-Allow-Origin "*" always;
    add_header Access-Control-Allow-Methods "GET, POST, OPTIONS" always;
    add_header Access-Control-Allow-Headers "Content-Type" always;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_read_timeout 300s;
    }
}

server {
    listen 80;
    server_name sandfest-api.heyelab.com;
    return 301 https://$host$request_uri;
}
```

1. Add the DNS A record `sandfest-api.heyelab.com` → Mac Studio public IP
2. Issue the cert: `certbot --nginx -d sandfest-api.heyelab.com`
3. Reload nginx: `sudo nginx -s reload`

Verify:

```bash
curl https://sandfest-api.heyelab.com/health
# {"status":"ok","service":"sandfest","version":"1.0.0"}
```

### 1.4 Run the service as a LaunchAgent (optional, for reboots)

Save as `~/Library/LaunchAgents/com.heyelab.sandfest.plist` and `launchctl load`
it. Details in `2m-os/sandfest/README.md`.

---

## Part 2 — Frontend on Vercel at sandfest.heyelab.com

### 2.1 One-time: connect the GitHub repo to Vercel

1. Go to https://vercel.com/new
2. Import `nickbmerrill-collab/port-a-local-co`
3. **Framework:** Next.js (auto-detected)
4. **Root directory:** `/` (default)
5. **Environment variables** — add:
   - `NEXT_PUBLIC_SANDFEST_API_URL` = `https://sandfest-api.heyelab.com`
6. **Production branch:** `claude/sandfest-festival-integration-8bH9M` (until merged to main)
7. Click **Deploy**

Vercel will auto-deploy on every push to this branch from now on.

### 2.2 Add the custom domain

In the Vercel project → **Settings → Domains**:

1. Add `sandfest.heyelab.com`
2. Vercel will show a CNAME target (something like `cname.vercel-dns.com`)
3. In your DNS provider, add:
   `sandfest.heyelab.com CNAME cname.vercel-dns.com`
4. Wait a minute, Vercel issues the SSL cert automatically

The live URL will be: **https://sandfest.heyelab.com/sandfest**

### 2.3 Alternative: GitHub Actions auto-deploy (if you prefer)

A workflow lives at `.github/workflows/vercel-sandfest.yml`. To enable it:

1. Get a Vercel token at https://vercel.com/account/tokens
2. In the `port-a-local-co` repo → **Settings → Secrets and variables → Actions**
3. Add these secrets:
   - `VERCEL_TOKEN` — the token from step 1
   - `VERCEL_ORG_ID` — from `.vercel/project.json` after first local `vercel link`
   - `VERCEL_PROJECT_ID` — same file
4. Push to the `claude/sandfest-festival-integration-8bH9M` branch → workflow triggers

You only need this if you're NOT using the Vercel GitHub integration from 2.1.

---

## Part 3 — Day-of checklist

**The night before:**

- [ ] Run `python3 2m-os/sandfest/test_camera.py` on the Mac Studio — all 5 steps pass
- [ ] `curl https://sandfest-api.heyelab.com/health` returns `ok`
- [ ] `curl https://sandfest.heyelab.com/sandfest/live` loads the page
- [ ] Start the counting loop: `curl -X POST https://sandfest-api.heyelab.com/api/crowd/start`

**At the festival:**

- [ ] Camera powered + pointed at a gate or main walkway
- [ ] Mac Studio on wifi (or hotspot — the `wired` ethernet is safer)
- [ ] Laptop/tablet showing `sandfest.heyelab.com/sandfest/live` as the booth display
- [ ] Separate tablet for `sandfest.heyelab.com/sandfest/photobooth` (attendee-facing)

**If the counter goes stale:**

```bash
curl https://sandfest-api.heyelab.com/api/crowd/status
curl -X POST https://sandfest-api.heyelab.com/api/crowd/stop
curl -X POST https://sandfest-api.heyelab.com/api/crowd/start
```

---

## Architecture at a glance

```
  Festival attendees (mobile)  ──►  sandfest.heyelab.com  (Vercel)
                                         │
                                         │ fetch JSON + snapshots
                                         ▼
                               sandfest-api.heyelab.com
                                  (nginx reverse proxy)
                                         │
                                         ▼
                               localhost:8000  (uvicorn)
                                         │
                               ┌─────────┼─────────┐
                               │         │         │
                              ffmpeg   Ollama    FLUX.1
                             (J5Create)(vision)(images)
```

All heavy AI work runs locally on the Mac Studio. Zero cloud cost per
inference — the Mac Studio already runs emma.heyelab.com.
