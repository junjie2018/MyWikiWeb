<template>
  <a-layout>
    <a-layout-content
        :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
    >
      <p>
        <a-button type="primary" @click="add" size="large">
          新增
        </a-button>
      </p>
      <a-table
          :columns="columns"
          :row-key="record => record.id"
          :data-source="ebooks"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
      >
        <template #cover="{text:cover}">
          <img v-if="cover" :src="cover" alt="avatar">
        </template>

        <template v-slot:action="{ text, record}">
          <a-space size="small">
            <a-button type="primary" @click="edit(record)">编辑</a-button>
            <a-button type="danger" @click="handleDelete(record.id)">删除</a-button>
          </a-space>
        </template>

      </a-table>
    </a-layout-content>

  </a-layout>

  <a-modal
      title="电子书表单"
      v-model:visible="modalVisible"
      :confirm-loading="modalLoading"
      @ok="handleModalOk"
  >
    <a-form :model="ebook" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="封面">
        <a-input v-model:value="ebook.cover"/>
      </a-form-item>
      <a-form-item label="名称">
        <a-input v-model:value="ebook.name"/>
      </a-form-item>
      <a-form-item label="分类一">
        <a-input v-model:value="ebook.category1Id"/>
      </a-form-item>
      <a-form-item label="分类二">
        <a-input v-model:value="ebook.category2Id"/>
      </a-form-item>
      <a-form-item label="描述">
        <a-input v-model:value="ebook.description" type="textarea"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue';
import axios from "axios";


export default defineComponent({
  name: 'AboutView',
  setup() {
    const ebooks = ref();
    const ebook = ref({
      id: '',
      name: '',
      category1Id: '',
      category2Id: '',
      description: '',
      cover: '',
    });
    const pagination = ref({
      current: 1,
      pageSize: 2,
      total: 0
    });
    const loading = ref(false);

    const modalVisible = ref(false);
    const modalLoading = ref(false);

    const handleModalOk = () => {
      modalLoading.value = true;

      const requestParam = {
        id: ebook.value.id,
        name: ebook.value.name,
        category1Id: ebook.value.category1Id,
        category2Id: ebook.value.category2Id,
        description: ebook.value.description,
        cover: ebook.value.cover,
      }

      // 新增逻辑
      if (ebook.value.id === '') {
        axios
            .post('/ebook/createEBook', requestParam)
            .then((response) => {
              const data = response.data;
              if (data.code === '0') {
                modalVisible.value = false;
                modalLoading.value = false;
              }
              handleQuery({
                current: pagination.value.current,
                pageSize: pagination.value.pageSize
              });
            })
      }
      // 编辑逻辑
      else {
        axios
            .post('/ebook/updateEBook', requestParam)
            .then((response) => {
              const data = response.data;
              if (data.code === '0') {
                modalVisible.value = false;
                modalLoading.value = false;
              }
              handleQuery({
                current: pagination.value.current,
                pageSize: pagination.value.pageSize
              });
            })
      }
    }

    const edit = (record: any) => {
      modalVisible.value = true;
      ebook.value = record;
      console.log(record);
    }

    const add = () => {
      modalVisible.value = true;
      ebook.value = {
        id: '',
        name: '',
        category1Id: '',
        category2Id: '',
        description: '',
        cover: '',
      };
    }

    const handleDelete = (id: any) => {
      axios
          .post('/ebook/deleteEBook?eBookId=' + id)
          .then((response) => {
            const data = response.data;
            handleQuery({
              current: pagination.value.current,
              pageSize: pagination.value.pageSize
            });
          })
    }

    const columns = [
      {
        title: '封面',
        dataIndex: 'cover',
        slots: {
          customRender: 'cover'
        }
      },
      {
        title: '名称',
        dataIndex: 'name'
      },
      {
        title: '分类一',
        dataIndex: 'category1Id'
      },
      {
        title: '分类二',
        dataIndex: 'category2Id'
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
        key: 'action',
        slots: {customRender: 'action'}
      }
    ];


    // 数据查询
    const handleQuery = (params: any) => {
      loading.value = true;
      const requestParam = {
        current: params.current,
        pageSize: params.pageSize,
        condition: {
          // name: "spring"
        }
      }
      axios
          .post('/ebook/pageEBook', requestParam)
          .then((response) => {
            loading.value = false;
            ebooks.value = response.data.data.records;
            pagination.value.current = requestParam.current;
            console.log(ebooks);
          })
    }

    // 表格点击页码时触发
    const handleTableChange = (pagination: any) => {
      console.log("自带的分页参数：", pagination);
      handleQuery({
        current: pagination.current,
        pageSize: pagination.pageSize
      });
    }

    onMounted(() => {
      handleQuery({
        current: 1,
        pageSize: 2
      })
    });

    return {
      ebook,
      ebooks,
      pagination,
      columns,
      loading,
      handleTableChange,
      modalVisible,
      modalLoading,
      handleModalOk,
      edit,
      add,
      handleDelete
    }
  }
});
</script>
