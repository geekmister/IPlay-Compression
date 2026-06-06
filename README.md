<p align="center">
	<img src="https://capsule-render.vercel.app/api?type=waving&height=220&color=0:4f46e5,50:0ea5e9,100:14b8a6&text=IPlay Compression&fontColor=ffffff&fontSize=64&desc=Local Run%20Image%20Compression&descAlignY=70&animation=fadeIn" alt="IPlay Compression Banner" />
</p>

<p align="center">
	<a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-111827.svg?style=for-the-badge" alt="MIT" /></a>
	<img src="https://img.shields.io/badge/Runtime-Browser%20Only-0f766e.svg?style=for-the-badge" alt="Browser Only" />
	<img src="https://img.shields.io/badge/Privacy-Local%20Processing-1d4ed8.svg?style=for-the-badge" alt="Local Processing" />
	<img src="https://img.shields.io/badge/Tested%20With-Playwright-7c3aed.svg?style=for-the-badge" alt="Playwright" />
</p>

<p align="center">
	<a href="https://github.com/Geekmister/IPlay/stargazers"><img src="https://img.shields.io/github/stars/Geekmister/IPlay?style=flat-square&label=Stars&color=f59e0b" alt="GitHub Stars" /></a>
	<a href="https://github.com/Geekmister/IPlay/network/members"><img src="https://img.shields.io/github/forks/Geekmister/IPlay?style=flat-square&label=Forks&color=0ea5e9" alt="GitHub Forks" /></a>
	<a href="https://github.com/Geekmister/IPlay/issues"><img src="https://img.shields.io/github/issues/Geekmister/IPlay?style=flat-square&label=Issues&color=ef4444" alt="GitHub Issues" /></a>
	<a href="https://github.com/Geekmister/IPlay/commits"><img src="https://img.shields.io/github/last-commit/Geekmister/IPlay?style=flat-square&label=Last%20Commit&color=22c55e" alt="Last Commit" /></a>
	<img src="https://visitor-badge.laobi.icu/badge?page_id=Geekmister.IPlay" alt="Visitors" />
	<a href="https://github.com/Geekmister/IPlay/releases"><img src="https://img.shields.io/github/downloads/Geekmister/IPlay/total?style=flat-square&label=Downloads&color=8b5cf6" alt="Downloads" /></a>
</p>

<p align="center">
	A pure front-end, locally-running image compression toolbox.No image uploads, no reliance on the backend. It turns the compression tasks of frequently used images into an easily accessible entry point for quick operation.
</p>

---

![Page preview](page-preview.png)

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

---

## 快速开始

### 环境要求
- Node.js >= 18.x
- Nuxt 3 运行时

### 安装依赖
```bash
yarn install
```

### 启动开发服务器
```bash
yarn dev
```
访问 http://localhost:3000 即可开始使用。

### 生产构建
```bash
yarn build
```

### 预览生产构建
```bash
yarn preview
```

---

## 项目结构
```
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

---

## 隐私承诺

本项目严格遵循 Local-First 设计原则：
- 永远不会将您的图片上传到任何远程服务器
- 不会在本地持久化存储您的任何上传文件
- 所有处理逻辑完全开源可审计
- 所有计算完全在浏览器沙箱内执行

---

## License

MIT © IPlay Team
