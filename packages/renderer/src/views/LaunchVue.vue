<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

async function waitForRpcReady () {
  await window.rpcClient.waitForReady()
  router.push({ name: 'home' })
}

onMounted(waitForRpcReady)
</script>

<template>
  <div id="launch">
    <a-spin size="large" tip="Launching RPC service..."></a-spin>
  </div>
</template>

<style>
#launch {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
