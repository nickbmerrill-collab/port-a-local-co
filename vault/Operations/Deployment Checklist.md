# Deployment Checklist

## Web App
- [ ] Set up hosting (Vercel recommended for Next.js)
- [ ] Configure environment variables (if any added later)
- [ ] Verify `better-sqlite3` works in production (may need serverless adapter)
- [ ] Set up domain (portalocalco.com or similar)
- [ ] Test all API routes in production
- [ ] Verify static pages generate correctly

## Mobile App
- [ ] Log in to Expo (`npx eas-cli login`)
- [ ] Link project (`npx eas-cli init`)
- [ ] Register test devices in Apple Developer portal
- [ ] Run development build (`npx eas-cli build --profile development --platform ios`)
- [ ] Install on both test phones
- [ ] Test push notifications end-to-end
- [ ] Configure API URL to point to production server

## App Store (Future)
- [ ] Fill in `eas.json` Apple credentials (appleId, ascAppId, appleTeamId)
- [ ] Create App Store Connect listing
- [ ] Add screenshots and metadata
- [ ] Run production build
- [ ] Submit for review

## Business Directory
- [ ] Add [[The Palm Republic]] as a business listing
- [ ] Continue scraping more businesses
- [ ] Add business images/photos
- [ ] Set up business claim/verification flow

## Related
- [[iOS Build Guide]]
- [[Environment Setup]]
