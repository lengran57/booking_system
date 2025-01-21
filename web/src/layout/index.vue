<template>
  <el-container>
    <el-header class="bg-slate-50 flex items-center justify-between">
      <h3>冷然房间预定系统后台</h3>
      <el-icon
        class="cursor-pointer"
        size="24"
        @click="$router.push('update_info')"
        ><UserFilled
      /></el-icon>
    </el-header>
    <el-main>
      <router-view> </router-view>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { UserFilled } from '@element-plus/icons-vue'
</script>

<style scoped lang="less"></style>
