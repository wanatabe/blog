# SVG

SVG 是一种基于 XML 的图像格式，用于定义用于网络的基于矢量的图形。

本项目使用SVG作为图标，并将`.svg`转换为vue组件。

例如：

```javascript
// arrow-left.svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.59 30.59 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.59 30.59 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0" /></svg>
```

将转换为：

```vue
// arrow-left.vue
<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1024 1024"
    fill="currentColor"
  >
    <path
      fill="currentColor"
      d="M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.59 30.59 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.59 30.59 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0"
    ></path>
  </svg>
</template>
<script lang="ts" setup>
defineOptions({
  name: 'SvgArrowLeft',
})
</script>

```

## 使用方式

使用方式参考[element-plus-icons](https://element-plus.org/zh-CN/component/icon.html)

```vue
import { SvgArrowLeft } from '@wwsg/svg-icon'

<template>
  <SvgArrowLeft />
</template>
```

## 新增svg图标

1. 新增svg图标文件

```bash
# 1、进入@wwsg/svg-icon工作空间
cd packages/svg-icon
# 2、将svg文件拷贝到该工作空间svg目录下

```

2. 转译svg图标组件

```bash
# 1、在根工作空间执行命令
pnpm build:svg

# 转译完成后建议停止本地开发服务重启
```

## 预览

```bash
# 1、在根工作空间执行命令
pnpm svg:preview

```

## 参考

本组件库实现方式参考 [element-plus-icons图标库](https://github.com/element-plus/element-plus-icons)
