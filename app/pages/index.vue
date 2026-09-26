<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { CompressionResult, OriginalInfo } from '~/composables/useImageCompressor'

type WorkflowState = 'idle' | 'file-selected' | 'compressing' | 'ready' | 'error'

const { validateFile, loadOriginalInfo, compress, revokeUrl } = useImageCompressor()

const showWorkbench = ref(false)
const quality = ref(0.8)
const originalInfo = ref<OriginalInfo | null>(null)
const compressedResult = ref<CompressionResult | null>(null)
const errorMessage = ref<string | null>(null)
const toastMessage = ref<string | null>(null)
const hasDownloaded = ref(false)
const compressProgress = ref(0)

const state = ref<WorkflowState>('idle')

let progressTimer: ReturnType<typeof setInterval> | null = null

const isCompressing = computed(() => state.value === 'compressing')

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

function onQualityInput(value: number) {
  quality.value = value
}

function onQualityChange(value: number) {
  quality.value = value
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

function onPaste(event: ClipboardEvent) {
  const item = Array.from(event.clipboardData?.items || []).find((i) => i.type.startsWith('image/'))
  const file = item?.getAsFile()
  if (file) {
    processFile(file)
  }
}

function onEsc(event: KeyboardEvent) {
  if (event.key === 'Escape' && showWorkbench.value) {
    closeWorkbench()
  }
}

onMounted(() => {
  window.addEventListener('paste', onPaste)
  window.addEventListener('keydown', onEsc)
})

onBeforeUnmount(() => {
  window.removeEventListener('paste', onPaste)
  window.removeEventListener('keydown', onEsc)
  stopProgressTimer()
  cleanupUrls()
})
</script>

<template>
  <main class="mx-auto w-full max-w-6xl px-4 pb-10 pt-8 md:px-6">
    <section class="mb-8 text-center">
      <h1 class="text-4xl font-bold tracking-tight md:text-5xl">在线压缩图像</h1>
      <p class="mx-auto mt-4 max-w-2xl text-base text-brand-muted md:text-lg">
        减小文件体积，更快地分享图像，且不损失画质。支持拖拽、点击和粘贴上传。
      </p>
    </section>

    <section class="mx-auto max-w-4xl">
      <UploadZone :has-image="!!originalInfo" @upload="processFile" />

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

  <CompressionWorkbench
    :open="showWorkbench"
    :original-info="originalInfo"
    :compressed-result="compressedResult"
    :quality="quality"
    :is-compressing="isCompressing"
    :compress-progress="compressProgress"
    :has-downloaded="hasDownloaded"
    @close="closeWorkbench"
    @quality-input="onQualityInput"
    @quality-change="onQualityChange"
    @download="downloadImage"
  />

  <Transition name="toast">
    <div v-if="errorMessage" class="fixed left-1/2 top-6 z-[60] -translate-x-1/2 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-lg" role="alert">
      {{ errorMessage }}
    </div>
  </Transition>

  <Transition name="toast">
    <div v-if="toastMessage" class="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-lg" role="status" aria-live="polite">
      {{ toastMessage }}
    </div>
  </Transition>
</template>
