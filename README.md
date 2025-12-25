# EMS App

This repository contains the source code for the EMS desktop application.

## ⭐ Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## 🚧 Project Setup

### ℹ️ Prerequisites

Before starting, ensure you have the following installed on your machine:

- NodeJS

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```

## Development Notes

When working with **MUI Modals or Dialogs** in this project, make sure to scope them correctly to the active tab.  

By default, MUI uses a **portal** to render modals at the root of the DOM (`document.body`).  
In a multi-tab environment, this causes a problem: if a modal is opened in one tab, it may also appear across all other tabs.  

---

## ✅ Solution

To ensure that a modal belongs only to the tab it was opened from, always add the following attribute:

```tsx
<Dialog
  open={open}
  onClose={handleClose}
  disablePortal
>
  {/* Modal content */}
</Dialog>
```

---

## ℹ️ Why this matters

- `disablePortal` forces the modal to render inside its tab’s DOM subtree instead of escaping to `document.body`.  
- This ensures that modals (and their backdrops) are **isolated per tab**, preventing cross-tab bleed-through.  
- The same rule applies to other portal-based MUI components, such as:
  - **Popover**
  - **Menu**
  - **Tooltip**
  - **Select**

---

## ⚠️ Common Pitfalls

1. **Forgetting `disablePortal`**  
   Without it, the modal will render globally and affect all tabs.

2. **Global open/close state**  
   Make sure modal state (`open`) is **scoped per tab**, not shared globally.

3. **Backdrops stacking incorrectly**  
   If you notice backdrops overlapping tabs, double-check that:
   - Each tab container has `position: relative`.
   - The modal is using `disablePortal` or a scoped `container`.

4. **Other MUI components**  
   Remember that Popover, Menu, Tooltip, and Select also use portals.  
   Always add `disablePortal` (or `container`) for tab-specific rendering.

---

## ✅ Best Practice

- Use `disablePortal` for all modals/dialogs/popovers in multi-tab components.  
- Keep modal state isolated in the tab store (`tabs[activeIndex]`).  
- Test opening modals in multiple tabs to confirm correct isolation.  

---

## 🚀 Build and Release Guide for EMS App

This section describes the prerequisites and steps to run the GitHub Actions workflow that builds and releases the EMS Electron app for both Windows and Linux platforms.

### 🔧 Prerequisites

- **GitHub Secrets Setup**  
  Ensure the following secrets are configured in your GitHub repository:
  - `VITE_API_URL`: API base URL used by the app at build time.
  - `VITE_UPDATER_OWNER`: GitHub owner/org for the updater repository.
  - `VITE_UPDATER_REPO`: GitHub repository name for the updater.
  - `VITE_UPDATER_GH_TOKEN`: GitHub personal access token with rights to write releases and contents (usually `repo` scope).

- **Electron Builder Configuration**  
  Your `package.json` and `electron-builder` config must be set up correctly for:
  - Building for Windows and Linux.
  - Versioning synchronized with the workflow.
  - Publishing artifacts without auto-publish (`-p never`) as release upload is handled by the workflow.

- **Git & Node.js**  
  The GitHub runners use Ubuntu with Wine installed for Windows build support. Node.js version 20 is used for building.

### ▶️ Running the Workflow

1. **Trigger the workflow manually:**
   - Go to the GitHub Actions tab in your repository.
   - Find the workflow named **Build and Release EMS App**.
   - Click **Run workflow**.
   - Enter the desired release version (e.g., `1.2.3`) in the input field.
   - Start the run.

1. **Workflow process overview:**
   - Checks out the repository code.
   - Installs Wine dependencies to build Windows installers on Ubuntu.
   - Sets up Node.js environment (v20).
   - Compares input version to current `package.json` version; updates and commits if different.
   - Installs Node dependencies and builds the app.
   - Packages Electron app for Windows and Linux using electron-builder.
   - Creates or updates a GitHub release with the generated artifacts including

### 📂 Output

- The workflow creates a GitHub Release tagged with the version.
- Artifacts ready for download and auto-update hosting are attached to the release.
- The auto-updater in your app will use these to check for and apply updates.

### 💡 Notes

- The Wine installation step is crucial for building Windows installers on the Ubuntu runner.
- Ensure your GitHub Token used in secrets has `write` permissions on contents and packages for automated releases.
- Always increment the version when releasing to trigger new builds and releases.
- Review logs and artifacts in the workflow run for troubleshooting build issues.