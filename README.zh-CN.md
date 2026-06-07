<p align="center">
	<img src="https://capsule-render.vercel.app/api?type=waving&height=220&color=0:4f46e5,50:0ea5e9,100:14b8a6&text=IPlay%20Compression&fontColor=ffffff&fontSize=64" alt="IPlay Compression Banner" />
</p>

<p align="center">
	<a href="LICENSE"><img src="https://img.shields.io/badge/许可证-MIT-111827.svg?style=for-the-badge" alt="MIT" /></a>
	<img src="https://img.shields.io/badge/运行时-仅浏览器-0f766e.svg?style=for-the-badge" alt="Browser Only" />
	<img src="https://img.shields.io/badge/隐私-本地处理-1d4ed8.svg?style=for-the-badge" alt="Local Processing" />
	<img src="https://img.shields.io/badge/测试-Playwright-7c3aed.svg?style=for-the-badge" alt="Playwright" />
</p>

<p align="center">
	<a href="https://github.com/Geekmister/IPlay-Compression/stargazers"><img src="https://img.shields.io/github/stars/Geekmister/IPlay-Compression?style=flat-square&label=星标&color=f59e0b" alt="GitHub Stars" /></a>
	<a href="https://github.com/Geekmister/IPlay-Compression/network/members"><img src="https://img.shields.io/github/forks/Geekmister/IPlay-Compression?style=flat-square&label=复刻&color=0ea5e9" alt="GitHub Forks" /></a>
	<a href="https://github.com/Geekmister/IPlay-Compression/issues"><img src="https://img.shields.io/github/issues/Geekmister/IPlay-Compression?style=flat-square&label=问题&color=ef4444" alt="GitHub Issues" /></a>
	<a href="https://github.com/Geekmister/IPlay-Compression/commits"><img src="https://img.shields.io/github/last-commit/Geekmister/IPlay-Compression?style=flat-square&label=最后提交&color=22c55e" alt="Last Commit" /></a>
	<img src="https://visitor-badge.laobi.icu/badge?page_id=Geekmister.IPlay-Compression" alt="访问量" />
	<a href="https://github.com/Geekmister/IPlay-Compression/releases"><img src="https://img.shields.io/github/downloads/Geekmister/IPlay-Compression/total?style=flat-square&label=下载量&color=8b5cf6" alt="Downloads" /></a>
</p>

<p align="center">
	<a href="README.md">
		<img src="https://img.shields.io/badge/English-🇺🇸-111827.svg?style=for-the-badge" alt="English Version" />
	</a>
</p>

<p align="center">
	一个纯前端、本地运行的图像压缩工具箱。不上传图片，不依赖后端，把高频图像压缩任务做成可快速上手的任务入口。
</p>

---

![页面预览](page-preview.png)

## 核心特性

| Emoji | 特性 | 说明 |
|---|---|---|
| 🔒 | 零后端依赖 | 所有图像处理完全在浏览器本地内存中完成，图片永远不会离开您的设备 |
| 📤 | 拖拽上传 | 支持拖拽、粘贴截图、点击选择三种上传方式 |
| 👀 | 实时预览 | 左右分栏对比滑块，一键拖动查看压缩前后差异 |
| 🎚️ | 质量调节 | 可视化滑块实时调整压缩质量，即时预览效果 |
| 📷 | 多格式支持 | 原生支持 JPG / PNG / WEBP 三种主流图像格式 |
| 📦 | 大文件支持 | 单文件最大支持 50MB 超大图像 |
| 💾 | 一键下载 | 压缩完成后直接导出到本地，无需等待服务器处理 |
| 🎛️ | 深色控制台风格 | 专为开发者设计的工具台界面，长时间使用不疲劳 |

## 快速开始

### 环境要求
- Node.js >= 18.x
- Nuxt 3 运行时环境

### 安装依赖
```bash
yarn install
```

### 启动开发服务器
```bash
yarn dev
```
访问 [本地地址](http://localhost:3000) 即可开始使用。

### 生产构建
```bash
yarn build
```

### 预览生产构建
```bash
yarn preview
```

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
├── README.md
└── README.zh-CN.md
```

## 隐私承诺

本项目严格遵循 Local-First 设计原则：
- 🔴 永远不会将您的图片上传到任何远程服务器
- 🔴 不会在本地持久化存储您的任何上传文件
- 🟢 所有处理逻辑完全开源可审计
- 🟢 所有计算完全在浏览器沙箱内执行

## 贡献指南

我们欢迎任何形式的贡献！请遵循以下指南让您的贡献过程更加顺畅：

### 🐛 提交问题
- 在提交新问题之前，请先搜索避免重复
- 清晰描述问题、复现步骤和预期行为
- 尽可能附上截图和环境信息

### 🚀 提交拉取请求
1. Fork 本仓库并从 `develop` 分支创建新分支
2. 遵循 Conventional Commits 规范编写提交信息
3. 确保您的代码通过所有代码检查和测试
4. 如果修改了功能，请同步更新相关文档
5. 提交 PR 到 `develop` 分支，不要提交到 `main` 分支

### 🎨 代码风格
- 使用 Vue 3 Composition API 和 `<script setup>` 语法
- 遵循项目中包含的 ESLint 和 Prettier 规则
- 保持组件小巧，专注单一职责
- 使用英文编写有意义的变量和函数名

### 📝 提交约定
我们严格遵循 [Conventional Commits](https://www.conventionalcommits.org/zh-hans/) 规范：
- `feat`: 新功能
- `fix`: 修复 Bug
- `docs`: 文档变更
- `style`: 格式调整
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关变更
- `chore`: 构建/工具/维护类变更

---

## 实时趋势面板

<p align="center">
	<a href="https://star-history.com/#Geekmister/IPlay&Date">
		<img alt="Star 历史图表" width="100%" src="https://api.star-history.com/svg?repos=Geekmister/IPlay&type=Date" />
	</a>
</p>

<p align="center">
	<img alt="提交活动热力图" src="https://github-readme-activity-graph.vercel.app/graph?username=Geekmister&bg_color=0f172a&color=e2e8f0&line=4f46e5&point=06b6d4&area=true&hide_border=true" />
</p>

<p align="center">
	<a href="https://github.com/Geekmister/IPlay/graphs/contributors"><img src="https://contrib.rocks/image?repo=Geekmister/IPlay" alt="贡献者" /></a>
</p>

---

## 许可证

基于 [MIT 许可证](LICENSE) 发布。
