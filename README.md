# Harvard Undergraduate Association Website

Unified public website for the Harvard Undergraduate Association and the HUA Finance Team. The application combines the original HUA site with the finance application from [`HUAtreasurer/HUA-Finance-Website`](https://github.com/HUAtreasurer/HUA-Finance-Website).

## View the website for the first time

The GitHub repository contains the website’s source files, but GitHub does not run the website inside the repository page. Follow the steps below to run a private preview on your own computer.

You do not need prior programming or command-line experience. The recommended setup uses GitHub Desktop and Visual Studio Code so you do not need to type folder-navigation or Git commands.

### 1. Install the required applications

Install these three applications if you do not already have them:

1. [Node.js](https://nodejs.org/) — choose the **LTS** download and accept the installer’s default options. This website requires Node.js 20.9 or newer.
2. [GitHub Desktop](https://desktop.github.com/) — sign in with the GitHub account that can see this repository.
3. [Visual Studio Code](https://code.visualstudio.com/) — accept the installer’s default options.

If you installed Node.js while Visual Studio Code was open, completely close and reopen Visual Studio Code before continuing.

### 2. Download the repository with GitHub Desktop

1. Open the repository in GitHub: [soapytofu/hua-website](https://github.com/soapytofu/hua-website).
2. Select the green **Code** button.
3. Select **Open with GitHub Desktop**.
4. If your browser asks for permission to open GitHub Desktop, select **Allow** or **Open GitHub Desktop**.
5. In GitHub Desktop, choose where you want the project saved. The default location is fine.
6. Select **Clone** and wait for the download to finish.

If **Open with GitHub Desktop** is unavailable, open GitHub Desktop directly and choose **File → Clone repository → URL**. Paste:

```text
https://github.com/soapytofu/hua-website.git
```

Then select **Clone**.

### 3. Open the project in Visual Studio Code

1. In GitHub Desktop, confirm that **hua-website** is shown as the current repository.
2. Select **Open in Visual Studio Code**. It may be under the **Repository** menu if it is not visible on the main screen.
3. Visual Studio Code will open the project folder. In the file list on the left, confirm that you can see `README.md`, `package.json`, and the `src` folder.

### 4. Open Visual Studio Code’s built-in terminal

1. In Visual Studio Code’s top menu, select **Terminal → New Terminal**.
2. A panel with a text prompt will open at the bottom of the window. This is the terminal.
3. The terminal should already be inside the `hua-website` folder because the project was opened through GitHub Desktop.

You do not need to understand the following commands. Copy each command exactly, paste it into the terminal, and press **Enter**.

### 5. Install the website’s dependencies

Paste this command and press **Enter**:

```bash
npm ci
```

This downloads the libraries the website needs. It can take several minutes the first time. Warnings displayed during installation are not necessarily errors; wait until the terminal displays a new prompt before continuing.

### 6. Start the website

Paste this command and press **Enter**:

```bash
npm run dev
```

Wait until the terminal displays a line similar to:

```text
Local: http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000) in Chrome, Safari, Firefox, or Edge. If the terminal displays a different port, such as `http://localhost:3001`, open the exact address shown in your terminal instead.

Useful pages include:

- Main HUA website: [http://localhost:3000](http://localhost:3000)
- Executive Officers: [http://localhost:3000/executiveofficers](http://localhost:3000/executiveofficers)
- Executive Team and Cabinet: [http://localhost:3000/executive-team](http://localhost:3000/executive-team)
- Finance website: [http://localhost:3000/finance](http://localhost:3000/finance)

This preview is only visible on your computer. It does not publish the website or change the GitHub repository.

### 7. Stop the website

Return to the Visual Studio Code terminal and press **Control + C**. On both Mac and Windows, this stops the local website server.

You can then close Visual Studio Code and GitHub Desktop.

### View it again later

1. Open GitHub Desktop and select the `hua-website` repository.
2. Select **Fetch origin**, then select **Pull origin** if GitHub Desktop offers that button. This downloads the team’s newest changes.
3. Select **Open in Visual Studio Code**.
4. Select **Terminal → New Terminal**.
5. Run `npm ci` to make sure the project’s libraries match the latest code.
6. Run `npm run dev`.
7. Open the local address printed in the terminal.

### Common problems

#### “npm is not recognized” or “command not found: npm”

Node.js is missing or Visual Studio Code was open during installation. Install the Node.js LTS version, close Visual Studio Code completely, reopen it, and try `npm ci` again.

#### “Could not read package.json” or “package.json not found”

Visual Studio Code opened the wrong folder. Return to GitHub Desktop and use **Repository → Open in Visual Studio Code** so the terminal starts inside `hua-website`.

#### Port 3000 is already in use

The development server will normally suggest or choose another port. Open the exact `Local:` address printed in the terminal. You can also find another terminal that is already running the website and stop it with **Control + C**.

#### The page looks old after pulling changes

Stop the server with **Control + C**, run `npm ci`, then run `npm run dev` again. Refresh the browser using **Command + Shift + R** on Mac or **Control + Shift + R** on Windows.

#### Google sign-in or administrative pages do not work

The public website works without private credentials. Google sign-in, administrative editing, automatic Instagram updates, and persistent finance settings require production environment variables that are intentionally not stored in GitHub.

#### You are still stuck

Open a GitHub issue or message the website team. Include a screenshot and copy the last 10–20 lines shown in the Visual Studio Code terminal. Never post passwords, access tokens, or `.env` file contents.

## Stack

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS 4
- NextAuth with Google sign-in for protected funding and admin routes
- Upstash Redis / Vercel KV-compatible configuration storage

## Quick start for experienced developers

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The main HUA site is at `/`; the Finance Team landing page is at `/finance`.

Run production checks with:

```bash
npm run lint
npm run build
```

## Production configuration

Public pages render with built-in defaults. To enable Google authentication and persistent admin-managed content, configure:

- `AUTH_SECRET`
- `AUTH_GOOGLE_ID`
- `AUTH_GOOGLE_SECRET`
- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` (or the compatible `STORAGE_REDIS_*` / `KV_REST_API_*` pair)
- `NEXT_PUBLIC_BASE_URL`

Optional public form overrides are `NEXT_PUBLIC_PAYMENT_FORM_URL`, `NEXT_PUBLIC_SUPPLEMENTAL_FORM_URL`, and `NEXT_PUBLIC_FUNDING_APPLICATION_URL`.

To enable Google Analytics, set `NEXT_PUBLIC_GA_ID` to the site’s GA4 measurement ID (for example, `G-XXXXXXXXXX`). Analytics scripts are omitted when the variable is unset.

### Automatic Instagram feeds

The homepage and Finance leadership page request the latest four posts through the server-side Instagram API and refresh their cached feed every 15 minutes. Configure the professional Instagram accounts with:

- `INSTAGRAM_HUA_ACCESS_TOKEN` and `INSTAGRAM_HUA_USER_ID`
- `INSTAGRAM_FINANCE_ACCESS_TOKEN` and `INSTAGRAM_FINANCE_USER_ID`

Tokens are never sent to the browser. `INSTAGRAM_GRAPH_API_BASE_URL` can optionally override the default `https://graph.instagram.com` API host. If credentials are missing, expired, or the API is unavailable, each section automatically keeps showing its four configured fallback images.

## Route organization

- Main HUA pages: `/`, `/executiveofficers`, `/calendar`, and the other public organization/resource routes
- Finance pages: `/finance`, `/leadership`, `/resources`, `/grant-application`, `/budget`, `/reports`, and related routes
- Finance administration: `/admin`
- Legacy finance URLs redirect to their integrated equivalents
