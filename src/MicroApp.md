# MicroApp

 [MicroApp](https://micro-zoe.github.io/micro-app/docs.html#/) 是一款简约、高效、功能强大的微前端框架，由京东前端团队推出的一款微前端框架，它借鉴了WebComponent的思想，通过`js沙箱`、`样式隔离`、`元素隔离`、`路由隔离`模拟实现了ShadowDom的隔离特性，并结合CustomElement将微前端封装成一个类WebComponent组件，从而实现微前端的组件化渲染，旨在降低上手难度、提升工作效率。

 micro-app和技术栈无关，也不和业务绑定，可以用于任何前端框架。

## 菜单配置

在本项目，系统管理->菜单配置中，一级菜单配置的`一级路由作为子应用名称`。

如下图所示：  
![系统管理->菜单配置](https://minio.scxnql.cn/doc/microapp/menudemo.png '系统管理->菜单配置')  
其中有系统`管理`、`审批`两个子应用，其对应的子应用名称对应为`system`、`approval`,在基座应用中对应的的子应用名应配置为：

```vue
 <micro-app name="system"  />
```

```vue
 <micro-app name="approval" />
```

## 子应用基础路由

1. vite配置基础路径

  ```ts
  // vite.config.ts
  export default defineConfig(() => {
    return {
      base: '/publicPath/'
    }
  })
  ```

2. router配置基础路径

  ```ts
  createRouter({
    history: createWebHistory(`/publicPath/`),
    routes: constantRoutes
  })
  ```

**注意：子应用基础路由不要与子应用名称一致**
