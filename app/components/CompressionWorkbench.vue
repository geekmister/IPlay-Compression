<script setup lang="ts">
import type { CompressionResult, OriginalInfo } from '~/composables/useImageCompressor'

defineProps<{
  open: boolean
  originalInfo: OriginalInfo | null
  compressedResult: CompressionResult | null
  quality: number
  isCompressing: boolean
  compressProgress: number
  hasDownloaded: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'quality-input', value: number): void
  (e: 'quality-change', value: number): void
  (e: 'download'): void
}>()
</script>

<template>
  <Transition name="modal-backdrop">
    <div v-if="open" class="modal-backdrop" @click.self="emit('close')">
      <Transition name="modal-panel">
        <section v-if="open" class="modal-panel" role="dialog" aria-modal="true" aria-label="图像压缩窗口">
          <header class="flex items-start justify-between border-b border-brand-line px-5 py-3 lg:px-6 lg:py-4">
            <div>
              <h2 class="text-xl font-bold lg:text-2xl">选择图像压缩级别</h2>
              <p class="mt-1 text-xs text-brand-muted lg:text-sm">调整质量以减小文件大小，实时预览压缩结果。</p>
            </div>
            <button class="text-2xl leading-none text-brand-muted hover:text-primary-600 lg:text-3xl" aria-label="关闭弹窗" @click="emit('close')">×</button>
          </header>

          <div class="grid min-h-0 flex-1 grid-cols-1 gap-0 overflow-hidden lg:grid-cols-[300px_1fr]">
            <CompressionSidebar
              :original-info="originalInfo"
              :compressed-result="compressedResult"
              :quality="quality"
              @quality-input="emit('quality-input', $event)"
              @quality-change="emit('quality-change', $event)"
            />
            <ImageCompare
              :original-info="originalInfo"
              :compressed-result="compressedResult"
              :is-compressing="isCompressing"
              :compress-progress="compressProgress"
            />
          </div>

          <footer class="border-t border-brand-line p-3 lg:p-4">
            <button
              class="btn btn-primary w-full text-sm lg:text-base"
              :disabled="!compressedResult || isCompressing"
              :class="{ 'animate-pulse-once': !hasDownloaded && !!compressedResult && !isCompressing, 'opacity-60 cursor-not-allowed': isCompressing }"
              @click="emit('download')"
            >
              <span v-if="isCompressing" class="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
              <svg v-else-if="compressedResult && !isCompressing" class="mr-2 h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M7.5 12l4.5 4.5m0 0l4.5-4.5m-4.5 4.5V3" />
              </svg>
              {{ isCompressing ? '压缩中…' : '应用并下载' }}
            </button>
          </footer>
        </section>
      </Transition>
    </div>
  </Transition>
</template>
