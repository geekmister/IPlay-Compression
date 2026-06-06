# IPlay Compression

![IPlay Banner](https://picsum.photos/id/1/1200/300)

> Local-First Image Compression Lab

一个纯前端、本地运行的图像压缩工具箱。
不上传图片，不依赖后端，把高频图像压缩任务做成可快速上手的任务入口。

---

## 核心特性

| 标签 | 说明 |
|---|---|
| LICENSE | MIT |
| RUNTIME | BROWSER ONLY |
| PRIVACY | 100% LOCAL PROCESSING |
| TESTED WITH | PLAYWRIGHT |

- 零后端依赖 - 所有图像处理完全在浏览器本地内存中完成，图片永远不会离开您的设备
- 拖拽上传 - 支持拖拽、粘贴截图、点击选择三种上传方式
- 实时预览 - 左右分栏对比滑块，一键拖动查看压缩前后差异
- 质量调节 - 可视化滑块实时调整压缩质量，即时预览效果
- 多格式支持 - 原生支持 JPG / PNG / WEBP 三种主流图像格式
- 大文件支持 - 单文件最大支持 50MB 超大图像
- 一键下载 - 压缩完成后直接导出到本地，无需等待服务器处理
- 深色控制台风格 - 专为开发者设计的工具台界面，长时间使用不疲劳

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
