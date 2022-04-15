<!--<template>-->
<!--  <div class="pagination-container">-->
<!--    <NSpin class="pagination-container__list" :show="loading">-->
<!--      <NList bordered>-->
<!--        <NListItem v-for="item in list" :key="item.id">-->
<!--          <template #prefix>-->
<!--            <NAvatar>{{ item.name[0] }}</NAvatar>-->
<!--          </template>-->
<!--          <template #suffix>-->
<!--            <span class="pagination-container__list-suffix">{{ item.job }}</span>-->
<!--          </template>-->
<!--          {{ item.name }}-->
<!--        </NListItem>-->
<!--      </NList>-->
<!--    </NSpin>-->

<!--    <div class="pagination-container__page">-->
<!--      <NPagination-->
<!--          v-model:page="current"-->
<!--          v-model:page-size="pageSize"-->
<!--          :page-count="totalPage"-->
<!--          :page-slot="5"-->
<!--          :page-sizes="[5, 10, 20]"-->
<!--          show-size-picker-->
<!--      />-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script lang="ts">-->

<!--import axios from 'axios'-->
<!--import {faker} from "@faker-js/faker";-->
<!--import {computed, defineComponent} from 'vue';-->
<!--import {usePagination} from 'vue-request';-->
<!--import {NAvatar, NList, NListItem, NPagination, NSpin} from 'naive-ui';-->

<!--type Date = {-->
<!--  date: {-->
<!--    id: number;-->
<!--    name: string;-->
<!--    avatar: string;-->
<!--    job: string-->
<!--  }[];-->
<!--  total: number;-->
<!--}-->

<!--function testService(params: { page?: number; limit?: number }) {-->
<!--  return axios.get<Date>-->
<!--}-->

<!--function testService(): Promise<EmailType[]> {-->
<!--  return new Promise<EmailType[]>(resolve => {-->
<!--    setTimeout(() => {-->
<!--      console.log('[vue-request] fetching data...');-->
<!--      resolve(-->
<!--          new Array(5).fill(null)-->
<!--              .map(() => {-->
<!--                return {-->
<!--                  email: faker.internet.email(),-->
<!--                  id: faker.datatype.number()-->
<!--                }-->
<!--              }))-->
<!--    }, 700)-->
<!--  });-->
<!--}-->

<!--export default defineComponent({-->
<!--  components: {-->
<!--    NInput, NSpin-->
<!--  },-->
<!--  setup() {-->

<!--    const {data, loading, run} = useRequest(testService, {-->
<!--      throttleInterval: 1000,-->
<!--      manual: true-->
<!--    })-->

<!--    const handleInput = () => {-->
<!--      run();-->
<!--    }-->

<!--    return {-->
<!--      handleInput,-->
<!--      data,-->
<!--      loading,-->
<!--      emails: computed(() => {-->
<!--        return data.value || [];-->
<!--      })-->
<!--    }-->
<!--  }-->
<!--})-->

<!--</script>-->

<!--<style lang="scss">-->
<!--.pagination-container {-->
<!--  height: 420px;-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  justify-content: space-between;-->

<!--  &__list {-->
<!--    height: 370px;-->
<!--    overflow: auto;-->

<!--    &-suffix {-->
<!--      margin-right: 20px;-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</style>-->