<script setup lang="ts">
const props = defineProps<{
  hasImage: boolean
}>()

const emit = defineEmits<{
  (e: 'upload', file: File): void
}>()

const fileInputRef = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)

function triggerFileInput() {
  fileInputRef.value?.click()
}

function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) emit('upload', file)
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
  if (file) emit('upload', file)
}
</script>

<template>
  <div class="rounded-3xl border-2 border-primary-200/70 p-4 md:p-6">
    <div
      class="upload-box cursor-pointer rounded-3xl border-2 px-6 py-16"
      :class="{ dragging: isDragging, 'has-image': props.hasImage }"
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
      <div class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md">
        <AppIcon name="upload" class="h-9 w-9" />
      </div>
      <p class="text-3xl font-semibold text-primary-700 md:text-4xl">上传或拖放您的图像</p>
      <p class="mt-5 text-sm text-brand-muted">大小限制：50 MB · 支持 JPG / PNG / WEBP</p>
      <p class="mt-2 text-xs text-brand-muted">提示：支持拖拽、点击上传，电脑端还支持 Ctrl/Cmd + V 粘贴图片</p>
      <input ref="fileInputRef" type="file" accept="image/jpeg,image/png,image/webp" class="hidden" @change="handleFileSelect" />
    </div>
  </div>
</template>
