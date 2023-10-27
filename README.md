# 前言

**为啥要合批**

减少DC

**什么是自定义顶点参数**

通过 几何体实例化 特性（GPU Instancing）可使 GPU 批量绘制模型相同且材质相同的渲染对象。如果我们想在不打破这一特性的情况下单独修改某个对象的显示效果，就需要通过自定义几何体实例化属性。

[参考文档](https://docs.cocos.com/creator/manual/zh/shader/instanced-attributes.html)

**UI(Sprite) 怎么你了？**

![image](https://img2023.cnblogs.com/blog/1663727/202309/1663727-20230928143145084-1316262660.png)

按照文档中的说法，需要用到 `MeshRenderer` 来设置自定义属性。
但 UI(Sprite) 并没有这个组件，也就无法按照文档来实现自定义 UI shader 的合批。

[后续博文地址](https://www.cnblogs.com/bakabird/p/17789253.html)
