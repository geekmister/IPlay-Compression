<script setup lang="ts">
import { computed } from 'vue'
import type { CompressionResult, OriginalInfo } from '~/composables/useImageCompressor'
import { calcCompressionRatio, formatFileSize } from '~/utils/format'

const props = defineProps<{
  originalInfo: OriginalInfo | null
  compressedResult: CompressionResult | null
  quality: number
}>()

const emit = defineEmits<{
  (e: 'quality-input', value: number): void
  (e: 'quality-change', value: number): void
}>()

const compressionRatio = computed(() => {
  if (!props.originalInfo || !props.compressedResult) return 0
  return calcCompressionRatio(props.originalInfo.size, props.compressedResult.size)
})

const sliderStyle = computed(() => {
  const percent = (props.quality - 0.1) / (1 - 0.1)
  const fillPos = percent * 100
  return {
    background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${fillPos}%, #e2e8f0 ${fillPos}%, #e2e8f0 100%)`
  }
})

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('quality-input', Number(target.value))
}

function onChange(event: Event) {
  const target = event.target as HTMLInputElement
  emit('quality-change', Number(target.value))
}
</script>

<template>
  <aside class="overflow-y-auto border-b border-brand-line p-4 lg:border-b-0 lg:border-r lg:p-6">
    <div class="space-y-3 text-xs lg:space-y-4 lg:text-sm">
      <div>
        <p class="text-brand-muted">大小</p>
        <p class="mt-0.5 text-base font-semibold lg:mt-1 lg:text-lg">
          {{ formatFileSize(originalInfo?.size || 0) }}
          <span class="px-1">→</span>
          <span class="rounded-md bg-emerald-100 px-1.5 py-0.5 text-xs text-emerald-700 lg:rounded-lg lg:px-2 lg:py-1 lg:text-sm">{{ formatFileSize(compressedResult?.size || 0) }}</span>
        </p>
      </div>
      <div>
        <p class="text-brand-muted">分辨率</p>
        <p class="mt-0.5 text-base font-semibold lg:mt-1 lg:text-lg">
          {{ originalInfo?.width || 0 }}×{{ originalInfo?.height || 0 }}
          <span class="px-1">→</span>
          <span class="rounded-md bg-emerald-100 px-1.5 py-0.5 text-xs text-emerald-700 lg:rounded-lg lg:px-2 lg:py-1 lg:text-sm">
            {{ compressedResult?.width || 0 }}×{{ compressedResult?.height || 0 }}
          </span>
        </p>
      </div>
    </div>

    <div class="my-4 border-t border-brand-line lg:my-6"></div>

    <div>
      <div class="mb-2 flex items-center justify-between">
        <label for="qualityRange" class="text-base font-semibold lg:text-lg">压缩级别</label>
        <span class="text-xl font-bold text-primary-600 lg:text-2xl">{{ Math.round(quality * 100) }}%</span>
      </div>
      <input
        id="qualityRange"
        type="range"
        min="0.1"
        max="1"
        step="0.01"
        :value="quality"
        :aria-valuemin="10"
        :aria-valuemax="100"
        :aria-valuenow="Math.round(quality * 100)"
        :style="sliderStyle"
        @input="onInput"
        @change="onChange"
      >
      <div class="mt-1.5 flex justify-between text-xs text-brand-muted lg:mt-2">
        <span>更高质量</span>
        <span>更小文件</span>
      </div>
      <p v-if="compressionRatio > 0 && compressionRatio < 5" class="mt-2 text-xs text-amber-600 lg:mt-3">该图片可能已高度压缩，效果不明显。</p>
    </div>
  </aside>
</template>
