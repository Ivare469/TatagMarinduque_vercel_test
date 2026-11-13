# Retired Node project configuration

The static conversion no longer reads or requires these values. They are retained here as a record of the retired API setup; do not use or publish real credentials in this file.

## Former environment template

```dotenv
MONGODB_URI=mongodb://127.0.0.1:27017/tatag-marinduque
JWT_SECRET=replace-with-a-long-random-secret
CLIENT_URL=http://localhost:3000
PORT=4000
```

The former npm scripts started Next.js and Express, built the Next.js client, seeded MongoDB, and ran backend tests. Those manifests and lockfiles were removed from the workspace-root project because none are needed by the static prototype.
