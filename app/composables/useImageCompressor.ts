import imageCompression from 'browser-image-compression'

export interface CompressionResult {
  blob: Blob
  dataUrl: string
  width: number
  height: number
  size: number
}

export interface OriginalInfo {
  file: File
  dataUrl: string
  width: number
  height: number
  size: number
  name: string
  type: string
}

export function useImageCompressor() {
  const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

  function validateFile(file: File): string | null {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return '不支持的图片格式，请选择 JPEG、PNG 或 WebP 格式'
    }
    if (file.size > MAX_FILE_SIZE) {
      return '图片大小超过 50MB，请选择更小的文件'
    }
    return null
  }

  async function loadOriginalInfo(file: File): Promise<OriginalInfo> {
    const dataUrl = URL.createObjectURL(file)
    const dimensions = await getImageDimensions(dataUrl)
    return {
      file,
      dataUrl,
      width: dimensions.width,
      height: dimensions.height,
      size: file.size,
      name: file.name,
      type: file.type,
    }
  }

  async function compress(
    file: File,
    quality: number
  ): Promise<CompressionResult> {
    const options = {
      maxSizeMB: (file.size / 1024 / 1024) * quality,
      maxWidthOrHeight: 4096,
      useWebWorker: true,
      initialQuality: quality,
      alwaysKeepResolution: true,
      preserveExif: false,
    }

    const compressedFile = await imageCompression(file, options)
    const dataUrl = URL.createObjectURL(compressedFile)
    const dimensions = await getImageDimensions(dataUrl)

    return {
      blob: compressedFile,
      dataUrl,
      width: dimensions.width,
      height: dimensions.height,
      size: compressedFile.size,
    }
  }

  function getImageDimensions(dataUrl: string): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight })
      img.onerror = () => reject(new Error('无法加载图片'))
      img.src = dataUrl
    })
  }

  function revokeUrl(url: string) {
    URL.revokeObjectURL(url)
  }

  return {
    MAX_FILE_SIZE,
    ALLOWED_TYPES,
    validateFile,
    loadOriginalInfo,
    compress,
    revokeUrl,
  }
}
