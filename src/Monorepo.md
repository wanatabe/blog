# Monorepo

> Monorepo 是一种项目代码管理方式，指单个仓库中管理多个项目，有助于简化代码共享、版本控制、构建和部署等方面的复杂性，并提供更好的可重用性和协作性。

**参考：**  [带你了解更全面的 Monorepo - 优劣、踩坑、选型](https://juejin.cn/post/7215886869199896637)
  
## 目录结构

└ app  应用  
&emsp;├ base  基座  
&emsp;├ base_system  系统管理  
&emsp;└ base_workflow  审批  
└ doc  文档  
└ packages  公共包  

## packages目录说明

└ packages  
&emsp;├ api-generate &emsp;[swagger转ts生成器](./swagger文档转api使用说明.md)  
&emsp;├ db  &emsp;[indexDB](./indexDB.md)  
&emsp;├ eslint-config  &emsp;`eslint配置`  
&emsp;├ svg-icon  &emsp;`svg图标库源文件`  
&emsp;├ svg-preview  &emsp;`svg预览项目`  
&emsp;├ svg-vue  &emsp;`svg图标库`  
&emsp;├ typescript-config  &emsp;`ts配置`  
&emsp;├ ui  &emsp;`公共ui组件`  
&emsp;└ utils  &emsp;`公共工具函数`  

## packages下`ui`说明

抽离的纯ui组件，可以提供给所有的app应用使用。如`面包屑`、`layout`、`404页面`等。

## packages下`utils`说明

抽离的工具函数。

### 1. 金额

提供`千位符`、`小数位保留（银行家舍入法）`、`转换中文大写`等方法

### 2. 输入校验

`手机号`、`座机号`、`手机或座机`、`计算公式`、`URL链接`等校验

### 3. cookie

### 4. 双向链表

将列表转换为双向链表，提供链表结构常用方法

### 5. 文件下载

### 6. 字符串处理

`省份证号脱敏`、`手机号脱敏`、`姓名脱敏`等方法

### 7. 加密

### 8. 树

### 9. Object

### 10. promise（PromiseTimeout）超时中断
