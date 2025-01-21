<template>
  <el-container class="h-full">
    <el-header class="bg-slate-50 flex items-center justify-between">
      <h3>冷然房间预定系统-后台</h3>
      <el-icon
        class="cursor-pointer"
        size="24"
        @click="$router.push('update_info')"
        ><UserFilled
      /></el-icon>
    </el-header>
    <el-container class="h-full">
      <el-aside class="h-full" width="200px">
        <el-menu
          default-active="home"
          class="el-menu-vertical-demo h-full"
          router
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="home">
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="meeting_room_manage">
            <span>会议室管理</span>
          </el-menu-item>
          <el-menu-item index="booking_manage">
            <span>预定管理</span>
          </el-menu-item>
          <el-menu-item index="user_manage">
            <span>用户管理</span>
          </el-menu-item>
          <el-menu-item index="statistics">
            <span>统计</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view> </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { UserFilled } from '@element-plus/icons-vue'

const handleOpen = (key: string, keyPath: string[]) => {}
const handleClose = (key: string, keyPath: string[]) => {}
</script>

<style scoped lang="less"></style>
