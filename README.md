# 二人禅 · 学习与实践中心 / Dyad Zen

一个以体验式学习为中心的中文二人禅开放网站。完整的新项目，与旧版 [dyad](https://choosemiracle.github.io/dyad/) 独立。

## 内容结构

- **认识**：二人禅的起源、经典顿悟密集与本站短时改编的边界。
- **系统学习**：八个基础单元，每单元包含体验、反思、概念与再次尝试。
- **练习室**：安全协议、双人练习计时器、可选探问、A/B 换位、练习整合。
- **带领者**：40 分钟体验单元、场景判断题与带领者清单。
- **研究文库**：原典资源、对比表、证据与来源说明。
- **共同体**：提供组织练习的建议与联络入口，不虚构活动日期。

## 伦理与隐私

本站不声称授予专业资格，也不保证觉醒或疗效。练习不替代心理治疗。学习进度仅保存在本地浏览器 localStorage；不要求上传私人练习内容、录音或笔记。网站没有账户系统或假密码保护。

练习室默认每轮 **5 分钟**：温和入门 4 轮（20 分钟）；“40 分钟／8 次轮换”仅为经典结构参考，不等于完整 Enlightenment Intensive；高强度密集静修应当由有经验的专业带领者组织。

## 开发

```sh
npm ci
npm test
npm run dev
npm run build
```

Vite base 为 `/dyadzen/`，适配 GitHub Pages 子路径。工作流：`.github/workflows/pages.yml`。

## 发布

网站开发入口为 `index.source.html`。`npm run build` 会生成 `dist/index.html`，并同步一份完整的生产文件到仓库根目录的 `index.html`、`assets/`、`illustrations/` 与 `favicon.svg`。这兼容当前 GitHub Pages 的 `main / (root)` 发布方式，也兼容 Actions 构建发布，避免把开发入口作为生产网页。

本地开发访问 `http://localhost:5173/dyadzen/index.source.html#/`。每次提交源码前先执行 `npm run build` 并一并提交新的根目录静态文件。正式地址 https://choosemiracle.github.io/dyadzen/ 。

## 文献

公开研究来源的链接与“原典观点／实践设计”区别见网站文库。资料中的精神性主张属于实践传统的自我理解，不应当当成已验证的普遍事实。
