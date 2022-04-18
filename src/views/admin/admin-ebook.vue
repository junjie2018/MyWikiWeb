<template>
  <a-layout>
    <a-layout-content class="layout-content-custom">
      <div class="table-operations">
        <a-form layout="inline">

          <a-form-item>
            <a-input v-model:value="pageEBookRequest.condition.name" placeholder="名称"/>
          </a-form-item>

          <a-form-item>
            <a-button type="primary" @click="handleQuery()">查询</a-button>
          </a-form-item>

          <a-form-item>
            <a-button type="primary" @click="handleAdd()">新增</a-button>
          </a-form-item>
        </a-form>
      </div>

      <!-- 表格 -->
      <a-table
          class="table"
          bordered
          :columns="columns"
          :loading="loading"
          :data-source="datasource"
          :row-key="record => record.id"
          :pagination="pagination"
          @change="handleTableChange">

        <template #bodyCell="{ column, record }">

          <!-- 封面 -->
          <template v-if="column.dataIndex==='cover'">
            <img v-if="record.cover" :src="record.cover" alt="cover">
          </template>

          <!-- 分类 -->
          <template v-if="column.dataIndex==='category'">
            <span>
              {{ getCategoryName(record.category1Id, record.category2Id) }}
            </span>
          </template>

          <!-- 操作 -->
          <template v-if="column.dataIndex==='operation'">
            <a-space size="small">
              <a-button type="primary" @click="handleUpdate(record.id)">编辑</a-button>
              <a-button type="danger" @click="deleteEbook(record.id)">删除</a-button>
            </a-space>
          </template>

        </template>

      </a-table>

    </a-layout-content>

  </a-layout>

  <a-modal
      title="创建电子书"
      v-model:visible="addModalVisible"
      :confirm-loading="addModalLoading"
      @ok="handleAddOk"
  >
    <a-form :model="ebookToAdd" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">

      <a-form-item label="封面">
        <a-input v-model:value="ebookToAdd.cover"/>
      </a-form-item>

      <a-form-item label="名称">
        <a-input v-model:value="ebookToAdd.name"/>
      </a-form-item>

      <a-form-item label="分类">
        <a-cascader
            v-model:value="ebookToAdd.categoryIds"
            :options="categories"
        >
        </a-cascader>
      </a-form-item>

      <a-form-item label="描述">
        <a-input v-model:value="ebookToAdd.description" type="textarea"/>
      </a-form-item>

    </a-form>
  </a-modal>

  <a-modal
      title="编辑电子书"
      v-model:visible="updateModalVisible"
      :confirm-loading="updateModalLoading"
      @ok="handleUpdateOk"
  >
    <a-form :model="ebookToUpdate"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 18 }">

      <a-form-item label="封面">
        <a-input v-model:value="ebookToUpdate.cover"/>
      </a-form-item>

      <a-form-item label="名称">
        <a-input v-model:value="ebookToUpdate.name"/>
      </a-form-item>

      <a-form-item label="分类">
        <a-cascader
            v-model:value="ebookToUpdate.categoryIds"
            :options="categories"
        >
        </a-cascader>
      </a-form-item>

      <a-form-item label="描述">
        <a-input v-model:value="ebookToUpdate.description" type="textarea"/>
      </a-form-item>

    </a-form>
  </a-modal>

</template>

<script lang="ts">

import {computed, defineComponent, onMounted, reactive, ref} from 'vue';
import axios from "axios";
import {usePagination, useRequest} from "vue-request";
import type {CascaderProps, TableProps} from 'ant-design-vue';


interface PageRequest {
  current: number;
  size: number;
}

interface ResponseVo<T> {
  code: string;
  msg: string;
  data: T;
}

interface PageEBookCondition {
  name: string
}

interface PageEBookRequest extends PageRequest {
  condition: PageEBookCondition
}

interface PageData<T> {
  current: number;
  size: number;
  total: number;
  records: T[];
}

interface EBook {
  id: number,
  name: string;
  cover: string;
  category1Id: number;
  category2Id: number;
  description: string;
}

interface CreateEBookRequest {
  name: string;
  category1Id?: number;
  category2Id?: number;
  description?: string;
  cover?: string,

  [propsName: string]: any
}

interface UpdateEBookRequest {
  id: number,
  name: string;
  category1Id?: number;
  category2Id?: number;
  description?: string;
  cover?: string

  [propsName: string]: any
}

const columns = [
  {
    title: '封面',
    dataIndex: 'cover',
  },
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: '分类',
    dataIndex: 'category'
  },
  {
    title: '文档数',
    dataIndex: 'docCount'
  },
  {
    title: '阅读数',
    dataIndex: 'viewCount'
  },
  {
    title: '点赞数',
    dataIndex: 'voteCount'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    align: 'center'
  }
];

export default defineComponent({
  name: 'AdminEBook',

  setup: function () {

    // region 分页查询

    const pageEBookRequest = reactive<PageEBookRequest>({
      current: 1,
      size: 40,
      condition: {
        name: ''
      }
    });

    const {data, run, loading, current, pageSize, total, totalPage} = usePagination(
        (pageEBookRequest: PageEBookRequest) => {
          return axios.post<ResponseVo<PageData<EBook>>>('/ebook/pageEBook', pageEBookRequest);
        }
        ,
        {
          manual: true,
          formatResult: res => res.data.data,
          pagination: {
            currentKey: 'current',
            pageSizeKey: 'size',
            totalKey: 'total',
            totalPageKey: 'pages'
          }
        });


    // 调整表格右下角的页面，修改该字段么，应该不会的
    const pagination = computed(() => ({
      current: current.value,
      pageSize: pageSize.value,
      total: total.value,
      pages: totalPage.value
    }))

    const datasource = computed<EBook[]>(() => data.value?.records || []);

    // 点击查询按钮时触发
    function handleQuery() {

      pageEBookRequest.current = 1;

      run(pageEBookRequest);
    }

    // 调整表格右下角的页面时触发
    const handleTableChange: TableProps['onChange'] = (pagination2: any) => {
      console.log('from handleTableChange:', pagination2)
      console.log('from handleTableChange:', pagination)

      pageEBookRequest.size = pagination2.pageSize;
      pageEBookRequest.current = pagination2.current;

      run(pageEBookRequest)
    }

    onMounted(() => {
      console.log('pageEBookRequest', pageEBookRequest)
      console.log('pagination', pagination)
      run(pageEBookRequest)
    });

    // endregion

    // region 创建电子书

    const addModalVisible = ref(false);
    const ebookToAdd = reactive<CreateEBookRequest>({
      name: '',
      categoryIds: []
    });

    const {run: addEBook, loading: addModalLoading} = useRequest(
        (createEBookRequest: CreateEBookRequest) => {
          return axios.post<ResponseVo<PageData<EBook>>>('/ebook/createEBook', createEBookRequest)
        },
        {
          manual: true,
          onSuccess: () => {
            addModalVisible.value = false;
            run(pageEBookRequest)
          }
        });

    function handleAdd() {
      addModalVisible.value = true;
      ebookToAdd.name = '';
      ebookToAdd.categoryIds = [];
    }

    function handleAddOk() {
      ebookToAdd.category1Id = ebookToAdd.categoryIds[0];
      ebookToAdd.category2Id = ebookToAdd.categoryIds[1];
      addEBook(ebookToAdd);
    }

    // endregion

    // region 编辑电子书

    const updateModalVisible = ref(false);
    const ebookToUpdate = reactive<UpdateEBookRequest>({
      id: 0,
      name: '',
      categoryIds: []
    });

    const {run: updateEBook, loading: updateModalLoading} = useRequest(
        (updateEBookRequest: UpdateEBookRequest) => {
          return axios.post<ResponseVo<PageData<EBook>>>('/ebook/updateEBook', updateEBookRequest)
        },
        {
          manual: true,
          onSuccess: () => {
            updateModalVisible.value = false;
            run(pageEBookRequest)
          }
        });

    function handleUpdate(eBookId: number) {

      updateModalVisible.value = true;
      const eBook = datasource.value.find(item => item.id === eBookId);

      console.log('eBookId', eBookId)
      console.log('eBook', eBook)

      if (eBook) {
        ebookToUpdate.id = eBook.id;
        ebookToUpdate.name = eBook.name;
        ebookToUpdate.category1Id = eBook.category1Id;
        ebookToUpdate.category2Id = eBook.category2Id;
        ebookToUpdate.categoryIds = [eBook.category1Id, eBook.category2Id]
        ebookToUpdate.description = eBook.description;
        ebookToUpdate.cover = eBook.cover;
      }
    }

    function handleUpdateOk() {
      ebookToUpdate.category1Id = ebookToUpdate.categoryIds[0];
      ebookToUpdate.category2Id = ebookToUpdate.categoryIds[1];
      updateEBook(ebookToUpdate);
    }

    // endregion

    // region 删除电子书

    const {run: deleteEbook} = useRequest(
        (eBookId: number) => {
          return axios.post<ResponseVo<PageData<EBook>>>('/ebook/deleteEBook', {}, {params: {eBookId}})
        },
        {
          manual: true,
          onSuccess: () => {
            addModalVisible.value = false;
            run(pageEBookRequest)
          }
        });

    // endregion

    // region 分类信息

    const categories: CascaderProps['options'] = [
      {
        value: 1,
        label: 'Zhejiang',
        children: [
          {
            value: 2,
            label: 'Hangzhou',
          },
        ],
      },
      {
        value: 3,
        label: 'Jiangsu',
        children: [
          {
            value: 4,
            label: 'Nanjing',
          },
        ],
      },
    ];

    const getCategoryName = function (category1Id: number, category2Id: number) {
      const category1IdName = categories.find(item => item.value === category1Id)?.label;

      const category2IdName = categories
          .flatMap(item => item.children)
          .find(item => item?.value === category2Id)?.label;

      return category1IdName + '/' + category2IdName;
    }

    // endregion

    return {
      datasource,

      // 分类信息
      categories,
      getCategoryName,

      // 分页查询
      columns,
      loading,
      pagination,
      pageEBookRequest,
      handleQuery,
      handleTableChange,

      // 创建电子书
      ebookToAdd,
      addModalVisible,
      addModalLoading,
      handleAdd,
      handleAddOk,

      // 编辑电子书
      ebookToUpdate,
      updateModalVisible,
      updateModalLoading,
      handleUpdate,
      handleUpdateOk,

      // 删除电子书
      deleteEbook,
    }
  }
});
</script>

<style scoped>

.layout-content-custom {
  background: #ffffff;
  padding: 24px;
  margin: 0;
  min-height: 280px;
}

.table-operations {
  margin-bottom: 16px;
}

.table-operations > button {
  margin-right: 8px;
}

</style>
