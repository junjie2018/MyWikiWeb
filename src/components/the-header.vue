<template>
  <a-layout-header class="header">
    <div class="logo"/>
    <a-menu
        theme="dark"
        mode="horizontal"
        v-model:selectedKeys="selectedKeys1"
        :style="{ lineHeight: '64px' }"
    >
      <a-menu-item key="/">
        <router-link to="/">首页</router-link>
      </a-menu-item>
      <a-menu-item key="/admin/ebook">
        <router-link to="/admin/ebook">电子书管理</router-link>
      </a-menu-item>
      <a-menu-item key="/about">
        <router-link to="/about">关于我们</router-link>
      </a-menu-item>
      <a-menu-item key="/antd/table/antd-table-001">
        <router-link to="/antd/table/antd-table-001">Antd Table 001</router-link>
      </a-menu-item>
      <a-menu-item key="/antd/table/antd-table-002">
        <router-link to="/antd/table/antd-table-002">Antd Table 002</router-link>
      </a-menu-item>
      <a-menu-item key="/antd/table/antd-table-003">
        <router-link to="/antd/table/antd-table-003">Antd Table 003</router-link>
      </a-menu-item>
      <a-menu-item key="/antd/table/antd-table-004">
        <router-link to="/antd/table/antd-table-004">Antd Table 004</router-link>
      </a-menu-item>
      <a-menu-item key="/antd/table/antd-table-005">
        <router-link to="/antd/table/antd-table-005">Antd Table 005</router-link>
      </a-menu-item>
      <a-menu-item key="/antd/table/antd-table-006">
        <router-link to="/antd/table/antd-table-006">Antd Table 006</router-link>
      </a-menu-item>
      <a-menu-item key="/antd/table/antd-table-007">
        <router-link to="/antd/table/antd-table-007">Antd Table 007</router-link>
      </a-menu-item>

      <a-menu-item key="/vue-request/vue-request-001">
        <router-link to="/vue-request/vue-request-001">Vue Request 001</router-link>
      </a-menu-item>
      <a-menu-item key="/vue-request/vue-request-002">
        <router-link to="/vue-request/vue-request-002">Vue Request 002</router-link>
      </a-menu-item>
      <a-menu-item key="/vue-request/vue-request-003">
        <router-link to="/vue-request/vue-request-003">Vue Request 003</router-link>
      </a-menu-item>
      <a-menu-item key="/vue-request/vue-request-004">
        <router-link to="/vue-request/vue-request-004">Vue Request 004</router-link>
      </a-menu-item>
      <a-menu-item key="/vue-request/vue-request-005">
        <router-link to="/vue-request/vue-request-005">Vue Request 005</router-link>
      </a-menu-item>
      <a-menu-item key="/vue-request/vue-request-006">
        <router-link to="/vue-request/vue-request-006">Vue Request 006</router-link>
      </a-menu-item>
      <a-menu-item key="/vue-request/vue-request-007">
        <router-link to="/vue-request/vue-request-007">Vue Request 007</router-link>
      </a-menu-item>
      <a-menu-item key="/vue-request/vue-request-008">
        <router-link to="/vue-request/vue-request-008">Vue Request 008</router-link>
      </a-menu-item>
      <a-menu-item key="/vue-request/vue-request-009">
        <router-link to="/vue-request/vue-request-009">Vue Request 009</router-link>
      </a-menu-item>
      <a-menu-item key="/axios/axios-001">
        <router-link to="/axios/axios-001">Axios 001</router-link>
      </a-menu-item>
    </a-menu>


  </a-layout-header>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'the-header',
});
</script>