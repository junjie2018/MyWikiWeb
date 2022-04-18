<template>
  <a-layout>
    <a-layout-content class="layout-content-custom">

      <div class="table-operations">
        <a-form layout="inline">

          <a-form-item>
            <a-input placeholder="名称"/>
          </a-form-item>

          <a-form-item>
            <a-button type="primary" @click="handleQuery()">查询</a-button>
          </a-form-item>

          <a-form-item>
            <a-button type="primary" @click="handleAdd()">新增</a-button>
          </a-form-item>
        </a-form>
      </div>

      <a-table
          v-if="level1.length > 0"
          :columns="columns"
          :row-key="record => record.id"
          :data-source="level1"
          :loading="loading"
          :pagination="false"
          :defaultExpandAllRows="true"
      >
        <template #cover="{ text: cover }">
          <img v-if="cover" :src="cover" alt="avatar"/>
        </template>
        <template v-slot:action="{ text, record }">
          <a-space size="small">
            <a-button type="primary" @click="edit(record)">
              编辑
            </a-button>
          </a-space>
        </template>
      </a-table>

    </a-layout-content>

  </a-layout>

  <a-popconfirm
      title="删除后不可恢复，确认删除?"
      ok-text="是"
      cancel-text="否"
      @confirm="handleDelete(record.id)">
    <a-button type="danger">
      删除
    </a-button>
  </a-popconfirm>
</template>

<script lang="ts">

import {defineComponent, onMounted, ref} from 'vue';

export default defineComponent({
      setup() {
        return {}
      }
    }
)

</script>

<style>

.layout-content-custom {
  background: #ffffff;
  padding: 24px;
  margin: 0;
  min-height: 280px;
}

</style>