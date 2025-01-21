<template>
  <div>
    <el-form :inline="true" :model="query" class="demo-form-inline">
      <el-form-item label="用户名">
        <el-input v-model="query.username" placeholder="搜索用户名" clearable />
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="query.nickName" placeholder="搜索昵称" clearable />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="query.email" placeholder="搜索邮箱" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="_getUsers">搜索</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" v-loading="loading" style="width: 100%">
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="nickName" label="昵称" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="headPic" label="头像">
        <template #default="{ row }">
          <el-image
            class="w-10"
            v-if="row.headPic"
            :src="row.headPic"
            fit="fill"
            :preview-src-list="[row.headPic]"
          />
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="注册时间" />
      <el-table-column prop="isFrozen" label="状态" />
      <el-table-column prop="action" label="操作">
        <template #default="{ row }">
          <el-button
            link
            type="primary"
            size="small"
            @click="handleFreeze(row.id)"
          >
            冻结
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout=" prev, pager, next, jumper"
      v-model:current-page="query.pageNo"
      v-model:page-size="query.pageSize"
      :total="total"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { getUsers, freezeUser } from '@/api/user'

const query = reactive({
  username: '',
  nickName: '',
  email: '',
  pageNo: 1,
  pageSize: 2,
})
const tableData = ref()
const total = ref(0)
const loading = ref(false)

async function _getUsers() {
  try {
    loading.value = true
    const { data } = await getUsers(query)
    total.value = data.totalCount
    tableData.value = data.users
  } catch (error) {}
  loading.value = false
}
async function handleFreeze(id: number) {
  try {
    await freezeUser(id)
    _getUsers()
  } catch (error) {}
}
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  query.pageNo = val
  _getUsers()
}
onMounted(() => {
  _getUsers()
})
</script>

<style scoped lang="less"></style>
