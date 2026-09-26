<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { CompressionResult, OriginalInfo } from '~/composables/useImageCompressor'

defineProps<{
  originalInfo: OriginalInfo | null
  compressedResult: CompressionResult | null
  isCompressing: boolean
  compressProgress: number
}>()

const previewRef = ref<HTMLDivElement | null>(null)
const splitPosition = ref(50)
const isSplitterDragging = ref(false)

function updateSplitterPosition(clientX: number) {
  const preview = previewRef.value
  if (!preview) return
  const rect = preview.getBoundingClientRect()
  const next = ((clientX - rect.left) / rect.width) * 100
  splitPosition.value = Math.min(100, Math.max(0, next))
}

function startDragging() {
  isSplitterDragging.value = true
}

function startTouchDragging() {
  isSplitterDragging.value = true
}

function onMouseMove(event: MouseEvent) {
  if (!isSplitterDragging.value) return
  updateSplitterPosition(event.clientX)
}

function onTouchMove(event: TouchEvent) {
  if (!isSplitterDragging.value || !event.touches[0]) return
  updateSplitterPosition(event.touches[0].clientX)
}

function stopDragging() {
  isSplitterDragging.value = false
}

function nudgeSplitter(delta: number) {
  splitPosition.value = Math.min(100, Math.max(0, splitPosition.value + delta))
}

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', stopDragging)
  window.addEventListener('touchmove', onTouchMove, { passive: false })
  window.addEventListener('touchend', stopDragging)
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', stopDragging)
  window.removeEventListener('touchmove', onTouchMove)
  window.removeEventListener('touchend', stopDragging)
})
</script>

<template>
  <section class="flex min-h-0 flex-1 flex-col p-3 lg:p-6">
    <div class="mb-1.5 flex items-center justify-between px-1 text-xs text-brand-muted lg:mb-2">
      <span class="flex items-center gap-1.5"><span class="inline-block h-1.5 w-1.5 rounded-full bg-slate-400 lg:h-2 lg:w-2"></span>原始</span>
      <span class="flex items-center gap-1.5"><span class="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 lg:h-2 lg:w-2"></span>压缩</span>
    </div>
    <div ref="previewRef" class="relative min-h-[180px] flex-1 overflow-hidden rounded-xl bg-slate-100 lg:min-h-0 lg:rounded-2xl">
      <!-- 压缩后图片（底层，完整显示） -->
      <img v-if="compressedResult" :src="compressedResult.dataUrl" alt="压缩后预览" class="absolute inset-0 h-full w-full object-contain">
      <!-- 原图（上层，通过 clip-path 裁剪左侧区域） -->
      <img
        v-if="originalInfo"
        :src="originalInfo.dataUrl"
        alt="原图预览"
        class="absolute inset-0 h-full w-full object-contain"
        :style="{ clipPath: `inset(0 ${100 - splitPosition}% 0 0)` }"
      >

      <div
        class="compare-splitter"
        :style="{ left: `${splitPosition}%` }"
        role="slider"
        aria-label="原图压缩图对比滑块"
        aria-orientation="horizontal"
        :aria-valuemin="0"
        :aria-valuemax="100"
        :aria-valuenow="Math.round(splitPosition)"
        tabindex="0"
        @mousedown="startDragging"
        @touchstart.prevent="startTouchDragging"
        @keydown.left.prevent="nudgeSplitter(-2)"
        @keydown.right.prevent="nudgeSplitter(2)"
      >
        <span class="splitter-icon">↔</span>
      </div>

      <Transition name="compressing-overlay">
        <div v-if="isCompressing" class="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-2xl bg-white/80 backdrop-blur-sm">
          <div class="relative h-14 w-14">
            <svg class="h-14 w-14 -rotate-90" viewBox="0 0 56 56">
              <circle cx="28" cy="28" r="24" fill="none" stroke="currentColor" stroke-width="4" class="text-primary-200"></circle>
              <circle cx="28" cy="28" r="24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" :stroke-dasharray="`${compressProgress * 1.508} 150.8`" class="text-primary-600 transition-[stroke-dasharray] duration-300"></circle>
            </svg>
            <span class="absolute inset-0 flex items-center justify-center text-xs font-bold text-primary-700">{{ Math.round(compressProgress) }}%</span>
          </div>
          <p class="mt-3 text-sm font-medium text-slate-700">正在压缩…</p>
        </div>
      </Transition>
    </div>
  </section>
</template>
