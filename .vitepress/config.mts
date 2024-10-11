import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'wanatabe',
  description: "wanatabe's blog",
  head: [['link', { rel: 'icon', href: '/blog_logo.ico' }]],
  themeConfig: {
    logo: '/blog_logo.png',
    nav: [
      { text: '文档', link: '/src/依赖管理' },
      {
        text: 'blog',
        items: [
          {
            items: [{ text: '文章阅读', link: '/blog/提问的智慧' }],
          },
          {
            items: [{ text: 'TypeScript 教程', link: 'https://typescript.p6p.net/' }],
          },
        ],
      },
      {
        text: 'vitpress',
        items: [
          { text: 'vitepress', link: 'https://vitepress.dev/zh/' },
          { text: 'markdown扩展', link: 'https://vitepress.dev/zh/guide/markdown' },
          { text: '参考', link: 'https://vitepress.dev/zh/reference/site-config' },
        ],
      },
      { text: 'caniuse', link: 'https://caniuse.com/' },
    ],

    sidebar: {
      '/src/': [
        {
          text: 'Monorepo',
          items: [
            { text: 'Monorepo', link: '/src/Monorepo' },
            { text: '依赖管理', link: '/src/依赖管理' },
          ],
        },
        {
          items: [
            // { text: '快速开始', link: '/src/index' },
            { text: '约定式提交规范', link: '/src/约定式提交规范' },
            // { text: 'icon', link: '/src/使用svg作为icon' },
            // { text: 'indexDB', link: '/src/indexDB' },
            // { text: 'MicroApp', link: '/src/MicroApp' },
            { text: 'node版本管理工具Volta', link: '/src/node版本管理工具Volta' },
            // { text: 'swagger文档转api使用说明', link: '/src/swagger文档转api使用说明' },
          ],
        },
      ],
      '/blog/': [
        {
          items: [
            { text: '提问的智慧', link: '/blog/提问的智慧' },
            { text: '错误传递与捕获', link: '/blog/错误传递与捕获' },
            { text: '如何优化 JavaScript 代码', link: '/blog/如何优化 JavaScript 代码' },
          ],
        },
      ],
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/wanatabe' }],

    footer: {
      message: 'Released under the <a href="https://github.com/vuejs/vitepress/blob/main/LICENSE">MIT License</a>.',
      copyright:
        'Copyright © 2024-present wanatabe <a data-v-3f234ad9="" rel="nofollow" target="_blank" href="https://beian.miit.gov.cn/">蜀ICP备2022026040号-1</a>',
    },
  },
  ignoreDeadLinks: true,
});
