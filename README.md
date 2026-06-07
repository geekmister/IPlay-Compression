<p align="center">
	<img src="https://capsule-render.vercel.app/api?type=waving&height=220&color=0:4f46e5,50:0ea5e9,100:14b8a6&text=IPlay%20Compression&fontColor=ffffff&fontSize=64" alt="IPlay Compression Banner" />
</p>

<p align="center">
	<a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-111827.svg?style=for-the-badge" alt="MIT" /></a>
	<img src="https://img.shields.io/badge/Runtime-Browser%20Only-0f766e.svg?style=for-the-badge" alt="Browser Only" />
	<img src="https://img.shields.io/badge/Privacy-Local%20Processing-1d4ed8.svg?style=for-the-badge" alt="Local Processing" />
	<img src="https://img.shields.io/badge/Tested%20With-Playwright-7c3aed.svg?style=for-the-badge" alt="Playwright" />
</p>

<p align="center">
	<a href="https://github.com/Geekmister/
IPlay-Compression/stargazers"><img src="https://img.shields.io/github/stars/Geekmister/
IPlay-Compression?style=flat-square&label=Stars&color=f59e0b" alt="GitHub Stars" /></a>
	<a href="https://github.com/Geekmister/
IPlay-Compression/network/members"><img src="https://img.shields.io/github/forks/Geekmister/
IPlay-Compression?style=flat-square&label=Forks&color=0ea5e9" alt="GitHub Forks" /></a>
	<a href="https://github.com/Geekmister/
IPlay-Compression/issues"><img src="https://img.shields.io/github/issues/Geekmister/
IPlay-Compression?style=flat-square&label=Issues&color=ef4444" alt="GitHub Issues" /></a>
	<a href="https://github.com/Geekmister/
IPlay-Compression/commits"><img src="https://img.shields.io/github/last-commit/Geekmister/
IPlay-Compression?style=flat-square&label=Last%20Commit&color=22c55e" alt="Last Commit" /></a>
	<img src="https://visitor-badge.laobi.icu/badge?page_id=Geekmister.
IPlay-Compression" alt="Visitors" />
	<a href="https://github.com/Geekmister/
IPlay-Compression/releases"><img src="https://img.shields.io/github/downloads/Geekmister/
IPlay-Compression/total?style=flat-square&label=Downloads&color=8b5cf6" alt="Downloads" /></a>
</p>

<p align="center">	<a href="README.zh-CN.md">
		<img src="https://img.shields.io/badge/中文-🇨🇳-111827.svg?style=for-the-badge" alt="中文版本" />
	</a>
</p>

<p align="center">
	A pure front-end, locally-running image compression toolbox.No image uploads, no reliance on the backend. It turns the compression tasks of frequently used images into an easily accessible entry point for quick operation.
</p>

---

![Page preview](page-preview.png)

> The human in the picture is mine.

## Core Features

| Emoji | Feature | Description |
|---|---|---|
| 🔒 | Zero Backend Dependency | All image processing runs 100% locally in browser memory, your images never leave your device |
| 📤 | Drag & Drop Upload | Support 3 upload methods: drag & drop, paste screenshot, click to select |
| 👀 | Real-time Preview | Side-by-side comparison slider, drag to view before/after compression difference instantly |
| 🎚️ | Quality Adjustment | Visual slider to adjust compression quality with immediate preview |
| 📷 | Multi-format Support | Native support for JPG / PNG / WEBP 3 mainstream image formats |
| 📦 | Large File Support | Single file up to 50MB ultra-large image |
| 💾 | One-click Download | Export compressed image directly to local, no server waiting required |
| 🎛️ | Dark Console Style | Developer-oriented toolbench UI, comfortable for long time usage |

## Quick Start

1. Enviroment Requirements
    - Node.js >= 18.x
    - Nuxt 3 Runtime Environment
2. Instasll Dependencies
    ```bash
    yarn install
    ```
3. Launch development server
    ```bash
    yarn dev
    ```
4. Vist [Lcoal address](http://localhost:3000) to use
5. Production build
    ```bash
    yarn build
    ```
6. Preview production build
    ```bash
    yarn preview
    ```

## Project Structure
```markdown
IPlay-Compression/
├── app/
│   ├── app.vue
│   └── assets/
│       └── css/
│           └── main.css
├── docs/
│   └── v1.0.0迭代（MVP）.md
├── LICENSE
└── README.md
```

## Contributing

We welcome all kinds of contributions! Please follow these guidelines to make your contribution smooth:

### 🐛 Report Issues
- Before submitting a new issue, please search to avoid duplicates
- Clearly describe the problem, reproduction steps and expected behavior
- Attach screenshots and environment information if possible

### 🚀 Submit Pull Requests
1. Fork this repository and create a new branch from `develop`
2. Follow Conventional Commits specification for your commit messages
3. Make sure your code passes all lint checks and tests
4. Update relevant documentation if you change features
5. Submit PR to the `develop` branch, not `main`

### 🎨 Code Style
- Use Vue 3 Composition API with `<script setup>` syntax
- Follow ESLint and Prettier rules included in the project
- Keep components small and focused on single responsibility
- Write meaningful variable and function names in English

### 📝 Commit Convention
We strictly follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Formatting changes
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Test related changes
- `chore`: Build/tooling/maintenance changes

## Real-time trend dashboard

<p align="center">
	<a href="https://star-history.com/#Geekmister/IPlay&Date">
		<img alt="Star History Chart" width="100%" src="https://api.star-history.com/svg?repos=Geekmister/IPlay&type=Date" />
	</a>
</p>

<p align="center">
	<img alt="Commit Activity Graph" src="https://github-readme-activity-graph.vercel.app/graph?username=Geekmister&bg_color=ffffff&color=1f2937&line=4f46e5&point=06b6d4&area=true&hide_border=true" />
</p>

<p align="center">
	<a href="https://github.com/Geekmister/IPlay/graphs/contributors"><img src="https://contrib.rocks/image?repo=Geekmister/IPlay" alt="Contributors" /></a>
</p>

## License

[MIT License](LICENSE)

