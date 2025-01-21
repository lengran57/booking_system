<template>
  <div>
    <el-form :inline="true" :model="query" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="query.name" placeholder="房间名称" clearable />
      </el-form-item>
      <el-form-item>
        <el-input v-model="query.capacity" placeholder="容纳人数" clearable />
      </el-form-item>
      <el-form-item>
        <el-input v-model="query.location" placeholder="位置" clearable />
      </el-form-item>
      <el-form-item>
        <el-input v-model="query.equipment" placeholder="设备" clearable />
      </el-form-item>
      <el-form-item>
        <el-button @click="getList">搜索</el-button>
        <el-button type="primary" @click="handleAddRoom">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" v-loading="loading" style="width: 100%">
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="capacity" label="容纳人数" />
      <el-table-column prop="location" label="位置" />
      <el-table-column prop="equipment" label="设备" />
      <el-table-column prop="description" label="描述" />
      <el-table-column prop="createTime" label="添加时间" />
      <el-table-column prop="updateTime" label="更新时间" />
      <el-table-column prop="isBooked" label="预定状态">
        <template #default="{ row }">
          {{ row.isBooked }}
        </template>
      </el-table-column>
      <el-table-column prop="action" label="操作">
        <template #default="{ row }">
          <el-button link type="primary" size="small" @click="handleEdit(row)">
            修改
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

    <CreateDialog ref="createDialog" @refresh="getList" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { getRoomList } from '@/api/room'
import type { RoomItem } from './types'
import CreateDialog from './components/CreateDialog.vue'

const query = reactive({
  name: '',
  capacity: '',
  location: '',
  equipment: '',
  pageNo: 1,
  pageSize: 2,
})
const tableData = ref()
const total = ref(0)
const loading = ref(false)
const createDialog = ref()

async function getList() {
  try {
    loading.value = true
    const { data } = await getRoomList(query)
    total.value = data.totalCount
    tableData.value = data.meetingRooms
  } catch (error) {}
  loading.value = false
}
async function handleEdit(record: RoomItem) {
  createDialog.value.show(record)
}
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  query.pageNo = val
  getList()
}

function handleAddRoom() {
  createDialog.value.show()
}
onMounted(() => {
  getList()
})
</script>

<style scoped lang="less"></style>
