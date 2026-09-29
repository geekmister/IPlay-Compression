<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

function handleError() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-brand-bg px-4 text-brand-text">
    <h1 class="text-6xl font-bold text-primary-600">{{ props.error?.statusCode || 500 }}</h1>
    <p class="mt-4 text-xl font-semibold">{{ props.error?.statusMessage || '出错了' }}</p>
    <button class="btn btn-primary mt-8" @click="handleError">返回首页</button>
  </div>
</template>
