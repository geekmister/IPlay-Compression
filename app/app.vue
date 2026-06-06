<template>
  <div class="min-h-screen bg-brand-bg text-brand-text">
    <nav class="sticky top-0 z-40 border-b border-brand-line/70 bg-white/85 px-4 py-3 backdrop-blur-md">
      <div class="mx-auto flex w-full max-w-6xl items-center justify-between">
        <div class="flex items-center gap-2 text-lg font-bold text-primary-600">
          <span>✦</span>
          <span>IPlay</span>
          <span class="text-brand-muted">图像压缩</span>
        </div>
        <div class="flex items-center gap-2">
          <a href="https://geekmister.github.io/IPlay/" target="_blank" rel="noreferrer" class="crumb">工具主页</a>
        </div>
      </div>
    </nav>

    <main class="mx-auto w-full max-w-6xl px-4 pb-10 pt-8 md:px-6">
      <section class="mb-8 text-center">
        <h1 class="text-4xl font-bold tracking-tight md:text-5xl">在线压缩图像</h1>
        <p class="mx-auto mt-4 max-w-2xl text-base text-brand-muted md:text-lg">
          减小文件体积，更快地分享图像，且不损失画质。支持拖拽、点击和粘贴上传。
        </p>
      </section>

      <section class="mx-auto max-w-4xl">
        <div class="rounded-3xl border-2 border-primary-200/70 p-4 md:p-6">
          <div
            class="upload-box cursor-pointer rounded-3xl border-2 px-6 py-16"
            :class="{ dragging: isDragging, 'has-image': !!originalInfo }"
            role="button"
            tabindex="0"
            aria-label="点击或拖拽上传图片"
            @click="triggerFileInput"
            @keydown.enter="triggerFileInput"
            @keydown.space.prevent="triggerFileInput"
            @dragover.prevent="onDragOver"
            @dragleave.prevent="onDragLeave"
            @drop.prevent="onDrop"
          >
            <div class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-4xl text-slate-700 shadow-md">+</div>
            <p class="text-3xl font-semibold text-primary-700 md:text-4xl">上传或拖放您的图像</p>
            <p class="mt-5 text-sm text-brand-muted">大小限制：50 MB · 支持 JPG / PNG / WEBP</p>
            <p class="mt-2 text-xs text-brand-muted">提示：支持拖拽、点击上传，电脑端还支持 Ctrl/Cmd + V 粘贴图片</p>
            <input ref="fileInputRef" type="file" accept="image/jpeg,image/png,image/webp" class="hidden" @change="handleFileSelect" />
          </div>
        </div>

        <div class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div class="meta-pill justify-center py-2 text-sm">无质量损失</div>
          <div class="meta-pill justify-center py-2 text-sm">易于使用</div>
          <div class="meta-pill justify-center py-2 text-sm">闪电般快速</div>
        </div>

        <p class="mt-6 text-center text-xs text-brand-muted">
          上传文件，即表示您同意我们的使用条款和隐私政策。所有处理在本地完成，图片不上传。
        </p>
      </section>
    </main>

    <transition name="modal-backdrop">
      <div v-if="showWorkbench" class="modal-backdrop" @click.self="closeWorkbench">
        <transition name="modal-panel">
          <section
            v-if="showWorkbench"
            class="modal-panel"
            role="dialog"
            aria-modal="true"
            aria-label="图像压缩窗口"
          >
            <header class="flex items-start justify-between border-b border-brand-line px-5 py-3 lg:px-6 lg:py-4">
              <div>
                <h2 class="text-xl font-bold lg:text-2xl">选择图像压缩级别</h2>
                <p class="mt-1 text-xs text-brand-muted lg:text-sm">调整质量以减小文件大小，实时预览压缩结果。</p>
              </div>
              <button class="text-2xl leading-none text-brand-muted hover:text-primary-600 lg:text-3xl" aria-label="关闭弹窗" @click="closeWorkbench">×</button>
            </header>

            <div class="grid min-h-0 flex-1 grid-cols-1 gap-0 overflow-hidden lg:grid-cols-[300px_1fr]">
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
                    @input="onQualityInput"
                    @change="onQualityChange"
                  >
                  <div class="mt-1.5 flex justify-between text-xs text-brand-muted lg:mt-2">
                    <span>更高质量</span>
                    <span>更小文件</span>
                  </div>
                  <p v-if="compressionRatio > 0 && compressionRatio < 5" class="mt-2 text-xs text-amber-600 lg:mt-3">该图片可能已高度压缩，效果不明显。</p>
                </div>
              </aside>

              <section class="flex min-h-0 flex-1 flex-col p-3 lg:p-6">
                <div class="mb-1.5 flex items-center justify-between px-1 text-xs text-brand-muted lg:mb-2">
                  <span class="flex items-center gap-1.5"><span class="inline-block h-1.5 w-1.5 rounded-full bg-slate-400 lg:h-2 lg:w-2"></span>原始</span>
                  <span class="flex items-center gap-1.5"><span class="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 lg:h-2 lg:w-2"></span>压缩</span>
                </div>
                <div class="relative min-h-[180px] flex-1 overflow-hidden rounded-xl bg-slate-100 lg:min-h-0 lg:rounded-2xl">
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

                  <transition name="compressing-overlay">
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
                  </transition>
                </div>
              </section>
            </div>

            <footer class="border-t border-brand-line p-3 lg:p-4">
              <button
                class="btn btn-primary w-full text-sm lg:text-base"
                :disabled="!compressedResult || isCompressing"
                :class="{ 'animate-pulse-once': !hasDownloaded && !!compressedResult && !isCompressing, 'opacity-60 cursor-not-allowed': isCompressing }"
                @click="downloadImage"
              >
                <span v-if="isCompressing" class="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                <svg v-else-if="compressedResult && !isCompressing" class="mr-2 h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M7.5 12l4.5 4.5m0 0l4.5-4.5m-4.5 4.5V3" />
                </svg>
                {{ isCompressing ? '压缩中…' : '应用并下载' }}
              </button>
            </footer>
          </section>
        </transition>
      </div>
    </transition>

    <transition name="toast">
      <div v-if="errorMessage" class="fixed left-1/2 top-6 z-[60] -translate-x-1/2 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-lg" role="alert">
        {{ errorMessage }}
      </div>
    </transition>

    <transition name="toast">
      <div v-if="toastMessage" class="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-lg" role="status" aria-live="polite">
        {{ toastMessage }}
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { CompressionResult, OriginalInfo } from './composables/useImageCompressor'
import { calcCompressionRatio, formatFileSize } from './utils/format'

type WorkflowState = 'idle' | 'file-selected' | 'compressing' | 'ready' | 'error'

const { validateFile, loadOriginalInfo, compress, revokeUrl } = useImageCompressor()

const fileInputRef = ref<HTMLInputElement | null>(null)
const showWorkbench = ref(false)
const isDragging = ref(false)

const state = ref<WorkflowState>('idle')
const quality = ref(0.8)
const splitPosition = ref(50)
const isSplitterDragging = ref(false)

const originalInfo = ref<OriginalInfo | null>(null)
const compressedResult = ref<CompressionResult | null>(null)
const errorMessage = ref<string | null>(null)
const toastMessage = ref<string | null>(null)
const hasDownloaded = ref(false)
const compressProgress = ref(0)

let debounceTimer: ReturnType<typeof setTimeout> | null = null
let progressTimer: ReturnType<typeof setInterval> | null = null

const isCompressing = computed(() => state.value === 'compressing')
const compressionRatio = computed(() => {
  if (!originalInfo.value || !compressedResult.value) return 0
  return calcCompressionRatio(originalInfo.value.size, compressedResult.value.size)
})

const sliderStyle = computed(() => {
  const percent = (quality.value - 0.1) / (1 - 0.1)
  const fillPos = percent * 100
  return {
    background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${fillPos}%, #e2e8f0 ${fillPos}%, #e2e8f0 100%)`
  }
})

function triggerFileInput() {
  fileInputRef.value?.click()
}

function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    processFile(file)
  }
  target.value = ''
}

function onDragOver() {
  isDragging.value = true
}

function onDragLeave() {
  isDragging.value = false
}

function onDrop(event: DragEvent) {
  isDragging.value = false
  const file = event.dataTransfer?.files?.[0]
  if (file) {
    processFile(file)
  }
}

function onPaste(event: ClipboardEvent) {
  const item = Array.from(event.clipboardData?.items || []).find((i) => i.type.startsWith('image/'))
  const file = item?.getAsFile()
  if (file) {
    processFile(file)
  }
}

async function processFile(file: File) {
  errorMessage.value = null
  hasDownloaded.value = false

  const validationError = validateFile(file)
  if (validationError) {
    state.value = 'error'
    errorMessage.value = validationError
    return
  }

  try {
    cleanupUrls()
    quality.value = 0.8
    state.value = 'file-selected'
    originalInfo.value = await loadOriginalInfo(file)
    showWorkbench.value = true
    await runCompression()
  } catch {
    state.value = 'error'
    errorMessage.value = '图片加载失败，请重试。'
  }
}

async function runCompression(silent = false) {
  if (!originalInfo.value) return

  if (!silent) {
    state.value = 'compressing'
    compressProgress.value = 0
    startProgressTimer()
  }

  try {
    const result = await compress(originalInfo.value.file, quality.value)
    // 先赋值新结果再释放旧 URL，避免图片短暂消失闪烁
    const oldDataUrl = compressedResult.value?.dataUrl
    compressedResult.value = result
    if (oldDataUrl) {
      revokeUrl(oldDataUrl)
    }
    stopProgressTimer()
    if (!silent) {
      compressProgress.value = 100
      setTimeout(() => {
        state.value = 'ready'
      }, 200)
    } else {
      state.value = 'ready'
    }
  } catch {
    stopProgressTimer()
    state.value = 'error'
    errorMessage.value = '压缩失败，请重试。'
  }
}

function startProgressTimer() {
  stopProgressTimer()
  progressTimer = setInterval(() => {
    if (compressProgress.value < 90) {
      compressProgress.value += Math.random() * 8 + 2
      if (compressProgress.value > 90) compressProgress.value = 90
    }
  }, 200)
}

function stopProgressTimer() {
  if (progressTimer) {
    clearInterval(progressTimer)
    progressTimer = null
  }
}

function onQualityInput(event: Event) {
  const target = event.target as HTMLInputElement
  quality.value = Number(target.value)
}

function onQualityChange(event: Event) {
  const target = event.target as HTMLInputElement
  quality.value = Number(target.value)
  runCompression()
}

function closeWorkbench() {
  showWorkbench.value = false
}

function cleanupUrls() {
  if (originalInfo.value) revokeUrl(originalInfo.value.dataUrl)
  if (compressedResult.value) revokeUrl(compressedResult.value.dataUrl)
}

function downloadImage() {
  if (!compressedResult.value || !originalInfo.value) return

  const url = URL.createObjectURL(compressedResult.value.blob)
  const a = document.createElement('a')
  const originalName = originalInfo.value.name.replace(/\.[^.]+$/, '')
  const ext = originalInfo.value.name.split('.').pop() || 'jpg'
  a.href = url
  a.download = `${originalName}_compressed.${ext}`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)

  hasDownloaded.value = true
  toastMessage.value = '已下载到本地'
  setTimeout(() => {
    toastMessage.value = null
  }, 2000)
}

function updateSplitterPosition(clientX: number) {
  const preview = document.querySelector('.compare-splitter')?.parentElement
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

function onEsc(event: KeyboardEvent) {
  if (event.key === 'Escape' && showWorkbench.value) {
    closeWorkbench()
  }
}

onMounted(() => {
  window.addEventListener('paste', onPaste)
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', stopDragging)
  window.addEventListener('touchmove', onTouchMove, { passive: false })
  window.addEventListener('touchend', stopDragging)
  window.addEventListener('keydown', onEsc)
})

onBeforeUnmount(() => {
  window.removeEventListener('paste', onPaste)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', stopDragging)
  window.removeEventListener('touchmove', onTouchMove)
  window.removeEventListener('touchend', stopDragging)
  window.removeEventListener('keydown', onEsc)
  if (debounceTimer) clearTimeout(debounceTimer)
  stopProgressTimer()
  cleanupUrls()
})
</script>

<style>
.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, -8px);
}

.compressing-overlay-enter-active,
.compressing-overlay-leave-active {
  transition: opacity 0.15s ease;
}

.compressing-overlay-enter-from,
.compressing-overlay-leave-to {
  opacity: 0;
}


</style>
