<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
    background-color="#545c64" text-color="white" active-text-color="#ffd04b" :collapse="isCollapse">
    <h3>{{ isCollapse ? 'IoTz' : 'IoTuzz' }}</h3>
    <el-menu-item v-for="item in noChildren" :index="item.path" :key="item.path" @click="clickMenu(item)">
      <i :class="item.icon"></i>
      <span slot="title" style="font-size: 15px;">{{ item.label }}</span>
    </el-menu-item>

    <el-submenu v-for="item in hasChildren" :index="item.path" :key="item.path">
      <template slot="title">
        <i :class=item.icon></i>
        <span slot="title" style="font-size: 15px;">{{ item.label }}</span>
      </template>
      <el-menu-item-group v-for="subItem in item.children" index="subItem.path" :key="subItem.path">
        <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">
          <i :class="subItem.icon"></i>
          {{ subItem.label }}
        </el-menu-item>
      </el-menu-item-group> 
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      menu: []
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item) {
      this.$router.push({
        name: item.name,
      })
      this.$store.commit('clearTestState')
      this.$store.commit('selectMenu', item)
    }
  },
  computed: {
    noChildren() {
      return this.asyncMenu.filter(item => !item.children)
    },
    hasChildren() {
      return this.asyncMenu.filter(item => item.children)
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse
    },
    asyncMenu() {
      return this.$store.state.tab.menu
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  height: 100%;
  border: none;
  font-size: 24px;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
    
  }
}
</style>
