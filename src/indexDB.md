# localForage

> [indexDB](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API) 是一种底层 API，用于在客户端存储大量的结构化数据（也包括文件/二进制大型对象（blobs））。该 API 使用索引实现对数据的高性能搜索。虽然 Web Storage 在存储较少量的数据很有用，但对于存储更大量的结构化数据来说力不从心。而 IndexedDB 提供了这种场景的解决方案。

> localForage 是一个 JavaScript 库，通过简单类似 localStorage API 的异步存储来改进你的 Web 应用程序的离线体验。它能存储多种类型的数据，而不仅仅是字符串。

## 官方文档

[github地址](https://github.com/localForage/localForage)  
[npm地址](https://www.npmjs.com/package/localforage)  
[中文文档](https://localforage.docschina.org/)  

## 安装

```bash
# 1、进入根工作区间
pnpm add @wwsg/db --filter <workspace name>
```

## 初始化

```ts
// ./src/db/index.ts
import DB from '@wwsg/db'

const DBUtils = new DB(
  {
    name: 'APPROVAL-DB',
    storeName: 'default',
    version: 1.0,
    description: '审批'
  },
  { timeout: 4 * 60 * 60 * 1000 }
)

export default DBUtils
```

## api说明

 **1、 setItem**  
 将数据保存到离线仓库。

```ts
interface DB {
  setItem<T>(key: string, value: T, ): Promise<T>;
}
```

 **2、 getItem**  
 从仓库中获取 key 对应的值并将结果提供给回调函数。如果 key 不存在，getItem() 将返回 null。

```ts
interface DB {
  getItem<T>(key: string): Promise<T | null>;
}
```

 **3、 removeItem**  
 从离线仓库中删除 key 对应的值。

```ts
interface DB {
  removeItem(key: string): Promise<void>;
}
```

 **4、 clear**  
 从数据库中删除所有的 key，重置数据库。

```ts
interface DB {
  setItem<T>(key: string, value: T, callback?: (err: any, value: T) => void): Promise<T>;
}
```

 **5、 dictionary**
  从离线仓库中获取api的响应结果，如果值不存在，发起请求获取数据并缓存进入离线仓库。

```ts
interface DB {
  dictionary(api: any, ...arg:any[]): Promise<any>;
}
```

 例如有一个query接口：  

```ts
 // textApi.ts
 /** 上传文件 */
export function query(body: { file?: string }, query?: { prefix?: string }, bucketName?: string): Promise<ResultUploadFileVO> {
  return MINIO_API.connect('POST', `/minio/upload/${bucketName}`, body, query )
}
```

```ts
import { query } from './textApi.ts'
import DBUtils from './src/db/index.ts'

DBUtils.dictionary(query, {file:'test'}, {prefix:'/test'}, 'test')
```

 **6、 updateDictionary**  
 发起请求获取数据并缓存进入离线仓库。

```ts
interface DB {
  updateDictionary(api: any, ...arg:any[]): Promise<any>;
}
```

```ts
import { query } from './textApi.ts'
import DBUtils from './src/db/index.ts'

DBUtils.updateDictionary(query, {file:'test'}, {prefix:'/test'}, 'test')
```

## 快捷键重置数据库

 `ctrl + alt + c` 连续键入3次
