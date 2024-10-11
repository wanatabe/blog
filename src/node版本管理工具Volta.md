# Volta

[Volta](https://volta.sh/) 是一种管理 JavaScript 命令行工具的便捷方式。

## 功能

> - 速度
> - 无缝，每个项目的版本切换
> - 跨平台支持，包括 Windows 和所有 Unix shell
> - 支持多个包管理器
> - 稳定的工具安装-无需每次升级都重新安装!
> - 可扩展性挂钩用于特定于站点的定制

## 为什么选择 Volta?

> 使用 Volta，您可以一次选择 Node 引擎，然后不再担心它。您可以在项目之间切换，而不必手动在节点之间切换。你可以在工具链中安装 npm 二进制包，而不必定期重新安装它们，或者弄清楚它们停止工作的原因。

**_为什么不使用nvm?_**

&emsp;&emsp;随着团队项目越来越多，技术栈升级，导致每个项目node使用的版本不一致。在每次为项目运行时，mvn每次都要手动切换node 版本。当我们在同时开发两个不同node版本的项目时，就可能会遇到一些麻烦了。

## 快速设置和切换 Node 引擎

获取并使用特定版本的 Node:

```shell
volta install node@20
```

## 为合作者提供可复制的环境

Volta 允许你用一个命令为一个项目选择节点引擎和包管理器:

```shell
volta pin node@20
```

在项目目录中执行上述`volta pin`命令时，`package.json`将写入以下设置。

```json
{
  ...,
+ "volta": {
+   "node": "20.11.1"
+ }
}
```

之后，便可以和以往一样正常执行脚本，volta会自动使用指定的node版本，不再有额外负担。如：

```shell
pnpm lint
```

## 安装

### Unix 安装

在大多数 Unix 系统(包括 macOS)上，您可以使用一个命令安装 Volta:

```shell
curl https://get.volta.sh | bash
```

### Window 安装

对于 Windows，下载并运行 [Windows 安装程序](https://github.com/volta-cli/volta/releases/download/v1.1.1/volta-1.1.1-windows-x86_64.msi) 并按照说明操作。

对于访问github有困难的同志，可以前往公司NACS文件服务进行下载。
