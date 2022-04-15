<template>
  <a-table :columns="columns" :data-source="data" bordered>
    <template #bodyCell="{column,text}">
      <template v-if="column.dataIndex==='name'">
        <a>{{ text }}</a>
      </template>
    </template>
    <template #title>Header</template>
    <template #footer>Footer</template>
  </a-table>
</template>

<script lang="ts">

import {defineComponent, computed} from 'vue';

// 这儿发生了变化，没有了之前的key字段，增加了width和filters字段，不是很懂
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Name',
    className: 'column-money',
    dataIndex: 'name',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    money: '￥300,000.00',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    money: '￥1,256,000.00',
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park',
  },
];

export default defineComponent({
  setup() {
    return {
      data, columns
    };
  },
});
</script>

<style>

th.column-money,
td.column-money {
  text-align: right !important;
}

</style>
