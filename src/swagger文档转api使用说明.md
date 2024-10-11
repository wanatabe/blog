# Swagger文档转API使用说明

## 1. 安装

```bash
  pnpm add -D @wwsg/api-generate --filter <workspace>
```

## 2. 初始化

执行下面命令，生成配置文件

```bash
# 进入对应工作空间目录
  cd <workspace>
# 初始化执行命令
  pnpm exec api-generate
```

该命令会在当前目录生成`apimodules.yaml`及`gulpfile.js`文件,同时在`package.json`中添加`refresh:api": "gulp generateApi`脚本命令

## 3. 生成API

```bash
# 进入对应工作空间目录
  cd <workspace>
# 执行生成命令
  pnpm refresh:api
```

该命令会根据`apimodules.yaml`文件中的配置，生成对应的API文件,产物在`src/api`及`src/entity`目录下。

## 4. 更新API

重新执行`pnpm refresh:api`命令，会根据`apimodules.yaml`文件中的配置，更新对应的API文件。

## 5. 配置文件说明

```yaml
# name          api产物目录
# path          swagger文档地址
# description   模块说明
# importApi     api连接实例名称
# importEntity  api连接实例导入目录
- name: minio
  path: http://10.150.2.13:7000/minio/swagger/v1/swagger.json
  description: 文件上传
  importApi: MINIO_API
  importEntity: src/utils/api/index


```
