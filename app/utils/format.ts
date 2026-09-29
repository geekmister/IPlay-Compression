/**
 * 格式化文件大小为人类可读字符串
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  const k = 1024
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const size = bytes / Math.pow(k, i)
  return `${size.toFixed(1)} ${units[i]}`
}

/**
 * 计算压缩率百分比
 */
export function calcCompressionRatio(originalSize: number, compressedSize: number): number {
  if (originalSize <= 0) return 0
  return Math.round((1 - compressedSize / originalSize) * 100)
}
