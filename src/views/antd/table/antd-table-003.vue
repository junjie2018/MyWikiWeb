<template>

  <a-table
      :columns="columns"
      :data-source="dataSource"
      :row-key="record=>record.login.uuid"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
  >

    <template #bodyCell="{column,text}">

      <template v-if="column.dataIndex==='name'">
        {{ text.first }} {{ text.last }}
      </template>

    </template>
  </a-table>
</template>

<script lang="ts">

// 这个写法是什么意思
import type {TableProps} from "ant-design-vue";
import {defineComponent, computed} from 'vue';
import axios from "axios";
// 完全不知道
import {usePagination} from "vue-request";

// 这儿发生了变化，没有了之前的key字段，增加了width和filters字段，不是很懂
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    width: '20%',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
      {text: 'Male', value: 'male'},
      {text: 'Female', value: 'female'},
    ],
    width: '20%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
];

// 不熟悉
type APIParams = {
  results: number;
  page?: number;
  sortField?: string;
  sortOrder?: number;
  [key: string]: any;
};

// 不熟悉
type APIResult = {
  results: {
    gender: 'female' | 'male';
    name: string;
    email: string;
  }[];
};

const queryData = (params: APIParams) => {
  // 不熟悉
  return axios.get<APIResult>('https://randomuser.me/api?noinfo', {params});
}

export default defineComponent({
  setup() {
    const {
      data: dataSource,
      run,
      loading,
      current,
      pageSize,
    } = usePagination(queryData, {
      formatResult: res => res.data.results,
      pagination: {
        currentKey: 'page',
        pageSizeKey: 'results',
      },
    });

    const pagination = computed(() => ({
      total: 200,
      current: current.value,
      pageSize: pageSize.value,
    }));

    const handleTableChange: TableProps['onChange'] = (
        // 这块我做了改动
        pag: { pageSize?: number; current?: number },
        filters: any,
        sorter: any,
    ) => {
      run({
        results: pag.pageSize!,
        page: pag?.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
      });
    };

    return {
      dataSource,
      pagination,
      loading,
      columns,
      handleTableChange,
    };
  },
});
</script>
