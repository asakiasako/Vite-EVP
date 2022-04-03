<script setup>
import { ref, reactive } from 'vue'

const appVersion = ref()
const appName = ref()
const pyInfo = ref({})
const visibleState = reactive({
  antd: false,
  ipc: false,
  backend: false
})

function antDesign () {
  visibleState.antd = true
}

async function appInfo () {
  appVersion.value = await window.electronAPI.app.getVersion()
  appName.value = await window.electronAPI.app.getName()
  visibleState.ipc = true
}

function backendInfo () {
  window.rpcClient.request({
    route: ':get-python-info'
  }).then(res => {
    pyInfo.value = res
    visibleState.backend = true
  })
}
</script>

<template>
  <div :style="{ textAlign: 'center' }">
    <a-space>
      <a-button @click="antDesign">Ant Design</a-button>
      <a-button @click="appInfo">Electron IPC</a-button>
      <a-button @click="backendInfo">Python Backend</a-button>
    </a-space>
  </div>

  <a-modal v-model:visible="visibleState.antd" title="Ant Design">
    <p>Ant Design of Vue is working properly.</p>
    <template #footer>
      <a-button key="ok" type="primary" @click="visibleState.antd=false">OK</a-button>
    </template>
  </a-modal>

  <a-modal v-model:visible="visibleState.ipc" title="Inter-Process Communication">
    <p>Inter-Process Communication between Main and Renderer processes is working properly.</p>
    <a-descriptions title="Application Information" :column="1">
      <a-descriptions-item label="Name">{{appName}}</a-descriptions-item>
      <a-descriptions-item label="Version">{{appVersion}}</a-descriptions-item>
    </a-descriptions>
    <template #footer>
      <a-button key="ok" type="primary" @click="visibleState.ipc=false">OK</a-button>
    </template>
  </a-modal>

  <a-modal v-model:visible="visibleState.backend" title="Python Backend">
    <p>RPC Server in Python is working properly.</p>
    <p>NOT IMPLEMENTED</p>
    <a-descriptions title="Python Information" :column="1">
      <a-descriptions-item v-for="(item, key) in pyInfo" :key="key" :label="key">{{item}}</a-descriptions-item>
    </a-descriptions>
    <template #footer>
      <a-button key="ok" type="primary" @click="visibleState.backend=false">OK</a-button>
    </template>
  </a-modal>
</template>
