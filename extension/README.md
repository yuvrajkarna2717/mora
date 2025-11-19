# 🌿 Mora — Your Browser Productivity Copilot

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Chrome Web Store](https://img.shields.io/badge/Chrome-Web%20Store-blue.svg)](https://chrome.google.com/webstore)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://github.com/yuvrajkarna2717/mora)

**Track less. Focus more.**

*A privacy-first Chrome extension that helps you understand and improve how you spend your time online — without tracking you on the cloud.*

[🚀 Install Extension](#installation) • [📖 Documentation](#documentation) • [🐛 Report Bug](https://github.com/yuvrajkarna2717/mora/issues) • [💡 Request Feature](https://github.com/yuvrajkarna2717/mora/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Installation](#-installation)
- [Usage](#-usage)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Development](#-development)
- [API Reference](#-api-reference)
- [Roadmap](#-roadmap)
- [Privacy & Security](#-privacy--security)
- [Contributing](#-contributing)
- [FAQ](#-faq)
- [License](#-license)
- [Acknowledgements](#-acknowledgements)

---

## ✨ Overview

Mora is a **privacy-first browser productivity copilot** designed to make you more mindful and productive on the web. Unlike other time-tracking tools, Mora keeps all your data **locally** on your device — no servers, no cloud storage, no privacy concerns.

### 🎯 Why Mora?

- **🔒 Privacy First**: All data stays on your device
- **⚡ Lightweight**: Minimal impact on browser performance
- **🎨 Beautiful UI**: Clean, intuitive interface built with React
- **📊 Actionable Insights**: Understand your browsing patterns
- **🚫 Distraction Blocking**: Focus mode to eliminate distractions

---

## 🧭 Features

### ✅ Current Features (v1.0)

| Feature | Description | Status |
|---------|-------------|--------|
| **⏱️ Time Tracking** | Automatic tracking of time spent on websites | ✅ Live |
| **📊 Dashboard Analytics** | Visual insights into daily/weekly browsing habits | ✅ Live |
| **🚫 Focus Mode** | Block distracting websites during work sessions | ✅ Live |
| **🔒 Local Storage** | All data stored locally using Chrome Storage API | ✅ Live |
| **📱 Popup Interface** | Quick access to stats and controls | ✅ Live |
| **🌙 Dark Mode** | Eye-friendly dark theme support | ✅ Live |

### 🚧 Planned Features (v2.0+)

| Feature | Description | Timeline |
|---------|-------------|----------|
| **🧠 Smart Insights** | AI-powered pattern detection and recommendations | Q2 2024 |
| **📈 Productivity Score** | Daily productivity metrics and trends | Q2 2024 |
| **🔄 Data Export** | Export your data in JSON/CSV formats | Q3 2024 |
| **☁️ Optional Sync** | Encrypted cloud backup (opt-in) | Q3 2024 |
| **🏆 Habit Streaks** | Track and celebrate focus streaks | Q4 2024 |
| **📱 Mobile Companion** | Mobile app for cross-device insights | 2025 |

---

## 📸 Screenshots

<div align="center">

| Popup Interface | Dashboard Analytics | Focus Mode |
|----------------|--------------------|-----------| 
| ![Popup](docs/images/popup.png) | ![Dashboard](docs/images/dashboard.png) | ![Focus](docs/images/focus-mode.png) |

</div>

---

## 🚀 Installation

### For Users

1. **Chrome Web Store** (Recommended)
   ```
   🔗 Coming Soon - Chrome Web Store Link
   ```

2. **Manual Installation**
   - Download the latest release from [Releases](https://github.com/yuvrajkarna2717/mora/releases)
   - Extract the ZIP file
   - Open Chrome → `chrome://extensions`
   - Enable "Developer mode"
   - Click "Load unpacked" → Select extracted folder

### For Developers

```bash
# Clone the repository
git clone https://github.com/yuvrajkarna2717/mora.git
cd mora

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

**Load in Chrome:**
1. Open `chrome://extensions`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `dist` folder

---

## 📖 Usage

### Quick Start

1. **Install** the extension
2. **Pin** Mora to your toolbar for easy access
3. **Browse** normally - Mora automatically tracks your time
4. **Click** the extension icon to view quick stats
5. **Open** the dashboard for detailed analytics

### Focus Mode

1. Click the Mora icon
2. Select "Focus Mode"
3. Choose websites to block
4. Set duration (15min, 30min, 1hr, custom)
5. Start your focused work session

### Dashboard Navigation

- **Today**: Current day's browsing breakdown
- **Week**: 7-day trend analysis
- **Sites**: Top visited websites with time spent
- **Categories**: Productivity vs. entertainment time
- **Settings**: Customize tracking preferences

---

## 🧱 Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Lucide React** - Icons

### Extension APIs
- **Manifest V3** - Latest Chrome extension standard
- **Chrome Storage API** - Local data persistence
- **Chrome Tabs API** - Tab activity monitoring
- **Chrome Idle API** - User activity detection
- **Chrome Alarms API** - Background task scheduling

### Build Tools
- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking

### Cloud Infrastructure (Optional)
- **Firebase/Supabase** - Backend-as-a-Service for cloud sync
- **End-to-End Encryption** - Client-side encryption libraries
- **OAuth Authentication** - Secure user authentication
- **RESTful APIs** - Data synchronization endpoints

### Testing
- **Vitest** - Unit testing
- **Testing Library** - Component testing
- **Playwright** - E2E testing

---

## 📂 Project Structure

```
mora/
├── 📁 public/                 # Static assets
│   ├── 📁 icons/             # Extension icons (16, 48, 128px)
│   ├── 📄 manifest.json      # Extension manifest
│   └── 📄 popup.html         # Popup HTML template
├── 📁 src/                   # Source code
│   ├── 📁 background/        # Background scripts
│   │   ├── 📄 background.ts  # Main background script
│   │   ├── 📄 tracker.ts     # Time tracking logic
│   │   └── 📄 storage.ts     # Data management
│   ├── 📁 components/        # React components
│   │   ├── 📁 ui/           # Reusable UI components
│   │   ├── 📄 Dashboard.tsx  # Main dashboard
│   │   ├── 📄 FocusMode.tsx  # Focus mode interface
│   │   └── 📄 Settings.tsx   # Settings panel
│   ├── 📁 pages/            # Main pages
│   │   ├── 📄 Popup.tsx     # Extension popup
│   │   └── 📄 Dashboard.tsx  # Full dashboard page
│   ├── 📁 hooks/            # Custom React hooks
│   │   ├── 📄 useStorage.ts  # Chrome storage hook
│   │   └── 📄 useTracker.ts  # Tracking data hook
│   ├── 📁 utils/            # Utility functions
│   │   ├── 📄 time.ts       # Time formatting utilities
│   │   ├── 📄 categories.ts  # Website categorization
│   │   └── 📄 constants.ts   # App constants
│   ├── 📁 types/            # TypeScript definitions
│   │   └── 📄 index.ts      # Type definitions
│   └── 📁 styles/           # Global styles
│       └── 📄 globals.css    # Tailwind + custom CSS
├── 📁 docs/                 # Documentation
│   ├── 📁 images/           # Screenshots
│   └── 📄 API.md            # API documentation
├── 📁 tests/                # Test files
│   ├── 📁 unit/            # Unit tests
│   └── 📁 e2e/             # End-to-end tests
├── 📄 package.json          # Dependencies
├── 📄 vite.config.ts        # Vite configuration
├── 📄 tailwind.config.js    # Tailwind configuration
├── 📄 tsconfig.json         # TypeScript configuration
└── 📄 README.md             # This file
```

---

## 🛠️ Development

### Prerequisites

- Node.js 18+ and npm
- Chrome browser
- Git

### Setup

```bash
# Clone and install
git clone https://github.com/yuvrajkarna2717/mora.git
cd mora
npm install

# Start development
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Lint code
npm run lint

# Format code
npm run format
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production-ready extension |
| `npm run preview` | Preview production build |
| `npm test` | Run unit tests |
| `npm run test:e2e` | Run end-to-end tests |
| `npm run lint` | Lint code with ESLint |
| `npm run format` | Format code with Prettier |
| `npm run type-check` | Check TypeScript types |

### Development Workflow

1. **Make changes** to source code
2. **Hot reload** automatically updates the extension
3. **Test** your changes in Chrome
4. **Run tests** to ensure nothing breaks
5. **Commit** with conventional commit messages

---

## 📚 API Reference

### Chrome Storage Schema

```typescript
interface StorageData {
  sites: Record<string, SiteData>;
  sessions: Session[];
  settings: UserSettings;
  focusMode: FocusModeData;
}

interface SiteData {
  domain: string;
  timeSpent: number;
  visits: number;
  category: string;
  lastVisit: number;
}
```

### Background Script Events

```typescript
// Tab activation tracking
chrome.tabs.onActivated.addListener(handleTabActivation);

// URL change tracking
chrome.tabs.onUpdated.addListener(handleTabUpdate);

// Window focus tracking
chrome.windows.onFocusChanged.addListener(handleWindowFocus);
```

For detailed API documentation, see [docs/API.md](docs/API.md).

---

## 🚀 Roadmap

### 🎯 Current Phase: Core Features (Q1 2024)

- [x] Basic time tracking
- [x] Popup interface
- [x] Dashboard analytics
- [x] Focus mode
- [x] Local data storage
- [ ] Chrome Web Store submission

### 📈 Phase 2: Enhanced Analytics (Q2 2024)

- [ ] Smart insights and patterns
- [ ] Productivity scoring
- [ ] Weekly/monthly reports
- [ ] Goal setting and tracking
- [ ] Data export functionality

### 🧠 Phase 3: AI Features (Q3 2024)

- [ ] AI-powered recommendations
- [ ] Automatic website categorization
- [ ] Personalized focus suggestions
- [ ] Habit formation insights

### ☁️ Phase 4: Cloud & Sync (Q4 2024)

- [ ] Optional encrypted cloud backup with user consent
- [ ] Multi-device synchronization across browsers
- [ ] End-to-end encrypted data storage
- [ ] Team/family sharing features
- [ ] Advanced privacy controls and granular sync options
- [ ] Data portability and migration tools

### 📱 Phase 5: Expansion (2025)

- [ ] Mobile companion app
- [ ] Firefox extension
- [ ] Safari extension
- [ ] Desktop application

---

## 🛡️ Privacy & Security

### Our Privacy Promise

- **🔒 Local-First**: All data stays on your device by default
- **🚫 No Tracking**: We don't track you or collect analytics
- **🔐 Optional Cloud**: Cloud storage only with explicit user consent
- **🗑️ Full Control**: Delete all data anytime (local and cloud)
- **📖 Open Source**: Code is transparent and auditable

### Data Storage Options

#### Local Storage (Default)
- Uses Chrome's `storage.local` API
- Data encrypted at rest by Chrome
- No network requests for tracking data
- Works completely offline

#### Optional Cloud Storage (User Choice)
- **Explicit Opt-in**: Clear consent flow explaining data usage
- **End-to-End Encryption**: Data encrypted before leaving your device
- **Granular Controls**: Choose what data to sync (time tracking, settings, etc.)
- **Multi-Device Sync**: Access your data across different browsers/devices
- **Easy Opt-out**: One-click to disable and delete all cloud data
- **Data Portability**: Export/import functionality for data migration

### Cloud Storage Benefits

| Feature | Local Only | With Cloud Sync |
|---------|------------|------------------|
| **Privacy** | ✅ Maximum | ✅ End-to-end encrypted |
| **Multi-device Access** | ❌ Single device | ✅ All your devices |
| **Data Backup** | ❌ Risk of loss | ✅ Secure backup |
| **Advanced Analytics** | ✅ Basic insights | ✅ Cross-device patterns |
| **Team Features** | ❌ Individual only | ✅ Family/team sharing |
| **Offline Usage** | ✅ Always works | ✅ Syncs when online |

### Technical Security Measures

- **Zero-Knowledge Architecture**: We can't read your encrypted data
- **Client-Side Encryption**: Data encrypted before transmission
- **Secure Authentication**: OAuth-based login with trusted providers
- **Regular Security Audits**: Third-party security assessments
- **GDPR Compliant**: Full compliance with privacy regulations
- **Data Minimization**: Only essential data is processed

### Permissions Explained

| Permission | Purpose | Required |
|------------|---------|----------|
| `tabs` | Track active tabs and URLs | ✅ Yes |
| `storage` | Store tracking data locally | ✅ Yes |
| `idle` | Detect when user is away | ✅ Yes |
| `alarms` | Background task scheduling | ✅ Yes |
| `activeTab` | Access current tab info | ✅ Yes |

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Ways to Contribute

- 🐛 **Report bugs** via [GitHub Issues](https://github.com/yuvrajkarna2717/mora/issues)
- 💡 **Suggest features** via [GitHub Discussions](https://github.com/yuvrajkarna2717/mora/discussions)
- 📝 **Improve documentation**
- 🧪 **Write tests**
- 🎨 **Design improvements**
- 💻 **Code contributions**

### Development Process

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Make** your changes
4. **Test** thoroughly
5. **Commit** with conventional commits: `git commit -m "feat: add amazing feature"`
6. **Push** to your branch: `git push origin feature/amazing-feature`
7. **Open** a Pull Request

### Commit Convention

```
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting changes
refactor: code refactoring
test: add tests
chore: maintenance tasks
```

### Code Style

- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Write tests for new features
- Update documentation as needed

---

## ❓ FAQ

<details>
<summary><strong>Is my browsing data sent anywhere?</strong></summary>

By default, no! All your data stays locally on your device. However, you can optionally enable encrypted cloud backup with explicit consent. Even with cloud sync, your data is end-to-end encrypted and we cannot read it.
</details>

<details>
<summary><strong>How does the optional cloud storage work?</strong></summary>

Cloud storage is completely opt-in. If you choose to enable it:
- Your data is encrypted on your device before being sent
- We use zero-knowledge architecture - we cannot decrypt your data
- You can sync across multiple devices and browsers
- You can disable and delete cloud data anytime
- Local storage continues to work even without cloud sync
</details>

<details>
<summary><strong>What data is stored in the cloud?</strong></summary>

You have granular control over what gets synced:
- Time tracking data (optional)
- Focus mode settings (optional)
- Dashboard preferences (optional)
- Website categories (optional)
- Browsing history is never stored in the cloud
</details>

<details>
<summary><strong>Does Mora slow down my browser?</strong></summary>

Mora is designed to be lightweight with minimal performance impact. It uses efficient background scripts and only tracks essential data. Cloud sync happens in the background and doesn't affect browsing performance.
</details>

<details>
<summary><strong>Can I export my data?</strong></summary>

Yes! You can export your data in JSON format from the Settings page. CSV export is planned for v2.0. This works for both local and cloud-synced data.
</details>

<details>
<summary><strong>How accurate is the time tracking?</strong></summary>

Mora tracks active tab time and detects when you're idle. It's accurate for active browsing but may not track background tabs. With cloud sync, you get more accurate cross-device insights.
</details>

<details>
<summary><strong>Can I use Mora on other browsers?</strong></summary>

Currently, Mora is Chrome-only. Firefox and Safari versions are planned for 2025. Cloud sync will enable seamless data sharing across different browsers once available.
</details>

<details>
<summary><strong>Is cloud storage free?</strong></summary>

Basic cloud sync will be free with reasonable usage limits. Advanced features like team sharing and extended history may require a premium subscription. Local-only usage will always remain completely free.
</details>

<details>
<summary><strong>How do I delete my cloud data?</strong></summary>

You can delete all cloud data instantly from the Settings page. This includes:
- All synced tracking data
- Account information
- Backup files
- Shared team data (if applicable)
Local data remains unaffected unless you choose to delete it separately.
</details>

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License - you can use, modify, and distribute this code freely.
```

---

## 🌟 Acknowledgements

### Inspiration
- **RescueTime** - For pioneering time tracking
- **StayFocusd** - For focus mode concepts
- **Clockify** - For clean analytics UI

### Technologies
- **React Team** - For the amazing framework
- **Tailwind CSS** - For utility-first styling
- **Chrome Extensions Team** - For the robust API

### Community
- All contributors and beta testers
- Open source community for inspiration
- Privacy advocates for guidance

---

<div align="center">

**🌿 Mora — Your Browser Productivity Copilot**

*"Awareness is the first step toward focus."*

**Built with ❤️ by [Yuvraj Karna](https://github.com/yuvrajkarna2717)**

[⭐ Star on GitHub](https://github.com/yuvrajkarna2717/mora) • [🐦 Follow Updates](https://twitter.com/yuvrajkarna) • [💬 Join Discussion](https://github.com/yuvrajkarna2717/mora/discussions)

</div>