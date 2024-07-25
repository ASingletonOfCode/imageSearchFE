This is a React (node) frontend app for the Image Search API (https://github.com/ASingletonOfCode/imageSearch). It has some very basic features of viewing images and uploading them.

## Local Setup

0. You will need NVM to install Node (v20+) and NPM https://nodejs.org/en/download/package-manager:

```
# installs nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# download and install Node.js (you may need to restart the terminal)
nvm install 20

# verifies the right Node.js version is in the environment
node -v # should print `v20.16.0`

# verifies the right npm version is in the environment
npm -v # should print `10.8.1`
```

1. Next install our dependencies:

```
npm install
```

2. Update your user name and password for the [requests](./src/app/requests/image.tsx) to the backend:

```
# src/app/requests/image.tsx
const AUTH_USERNAME = "{YOUR DJANGO ADMIN USERNAME}";
const AUTH_PASSWORD = "{YOUR DJANGO ADMIN PASSWORD}";
```

2. Run the frontend app:

```

npm run dev

```

3. Navigate to `http://localhost:3000`
