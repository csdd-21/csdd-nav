<template>
  <div class="test">
    <div class="desc">
      Less （Leaner Style Sheets 的缩写） 是一门向后兼容的 CSS 扩展语言。这里呈现的是 Less 的官方文档（中文版），包含了 Less 语言以及利用 JavaScript 开发的用于将 Less 样式转换成 CSS 样式的 Less.js 工具。 因为 Less 和 CSS 非常像，因此很容易学习。而且 Less 仅对 CSS 语言增加了少许方便的扩展，这就是
      Less 如此易学的原因之一。 有关 Less 语言特性的详细文档，请参阅 Less 语言特性 章节 有关 Less 内置函数的列表，请参阅 Less 函数手册 章节 有关详细的使用说明，请参阅 Less.js 用法 章节 有关第三方工具的详细信息，请参阅 工具 章节 Less 到底为 CSS 添加了什么功能？以下就是这些新加功能的概览
    </div>
  </div>
</template>

<script>
export default {
  name: "Test",
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>

<style lang="less" scoped>
.test {
  .desc {
    background-color: pink;
    width: 20%;
    height: 200px;
  }
}
</style>
