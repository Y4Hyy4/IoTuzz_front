<template>
  <el-container style="height: 100%;">
    <el-aside width="auto">
      <LeftNavMenu />
    </el-aside>
    <el-container>
      <el-header>
        <HeaderBar />
      </el-header>
      <TagBar />
      <el-main>
        <router-view />
      </el-main>
    </el-container>

  </el-container>
</template>
<script>
import LeftNavMenu from "../components/LeftNavMenu"
import HeaderBar from "../components/HeaderBar.vue"
import TagBar from "../components/TagBar.vue"
export default {
  name: 'mainWindow',
  components: {
    LeftNavMenu,
    HeaderBar,
    TagBar,
  }
}
</script>
<style lang="less" scoped>
.el-header {
  background-color: #333;
}

.el-main {
  padding-top: 0;
}
</style>