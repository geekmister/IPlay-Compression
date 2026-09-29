<script setup lang="ts">
type IconName = 'sparkles' | 'upload' | 'download' | 'close' | 'compare' | 'arrow-right'

const props = defineProps<{
  name: IconName
}>()

// 统一 SVG 图标集（Heroicons v2 outline 风格，24×24 viewBox，stroke 继承 currentColor）
// 尺寸由使用处的 class 控制，颜色由父级 text-* 控制
const paths: Record<IconName, string[]> = {
  sparkles: [
    'M9.813 15.904 9.75 16.5l-.063-.596a4.5 4.5 0 0 0-3.092-3.092L6 12.75l.596-.063a4.5 4.5 0 0 0 3.092-3.092L9.75 9l.063.596a4.5 4.5 0 0 0 3.092 3.092l.596.062-.596.063a4.5 4.5 0 0 0-3.092 3.092ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z',
  ],
  upload: [
    'M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5',
  ],
  download: [
    'M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3',
  ],
  close: ['M6 18 18 6M6 6l12 12'],
  compare: ['M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5'],
  'arrow-right': ['M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3'],
}
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path v-for="(d, i) in paths[props.name]" :key="i" :d="d" />
  </svg>
</template>
