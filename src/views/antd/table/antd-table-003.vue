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

import type {TablePaginationConfig, TableProps} from "ant-design-vue";
import {defineComponent, computed} from 'vue';
import axios, {AxiosResponse} from "axios";
import {usePagination} from "vue-request";
import {FilterValue, SorterResult} from "ant-design-vue/lib/table/interface";

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

type APIParams = {
  results: number;
  page?: number;
  sortField?: string;
  sortOrder?: number;
  [propsName: string]: any;
};

type ResultType = {
  gender: 'female' | 'male';
  name: string;
  email: string;
}

type APIResult = {
  results: ResultType[];
};

const queryData = (params: APIParams): Promise<AxiosResponse<APIResult>> => {
  return axios.get<APIResult>(
      'https://randomuser.me/api?noinfo',
      {params});
}

export default defineComponent({
  setup() {
    const {
      data: dataSource,
      run,
      loading,
      current,
      pageSize,
    } = usePagination(
        queryData,
        {
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

    // 这块的写法我不是很熟悉
    const handleTableChange: TableProps<ResultType>['onChange'] = (
        // 这块我做了改动
        pagination: TablePaginationConfig,
        filters: any,
        sorter: any,
    ) => {
      console.log('pag', pagination);
      console.log('filters', filters);
      console.log('sorter', sorter);
      run({
        // 这个写法我不是很熟悉
        results: pagination.pageSize!,
        // 这个写法我不是很熟悉
        page: pagination?.current,
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
