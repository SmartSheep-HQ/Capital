import { sni } from './network'

export interface SnAttachment {
  id: number
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date | null
  rid: string
  uuid: string
  size: number
  name: string
  alt: string
  mimetype: string
  hash: string
  destination: number
  refCount: number
  contentRating: number
  qualityRating: number
  cleanedAt?: Date | null
  isAnalyzed: boolean
  isSelfRef: boolean
  isIndexable: boolean
  ref?: SnAttachment | null
  refId?: number | null
  poolId?: number | null
  accountId: number
  thumbnailId?: number | null
  thumbnail?: SnAttachment | null
  compressedId?: number | null
  compressed?: SnAttachment | null
  usermeta: Record<string, any>
  metadata: Record<string, any>
}

export async function getAttachment(id: string | number): Promise<SnAttachment> {
  const resp = await sni.get<SnAttachment>('/cgi/uc/attachments/' + id + '/meta')
  return resp.data
}

export async function listAttachment(id: string[]): Promise<SnAttachment[]> {
  const resp = await sni.get<{ data: SnAttachment[] }>('/cgi/uc/attachments', {
    params: {
      id: id.join(','),
      take: id.length,
    },
  })
  return resp.data.data
}

export type MultipartProgress = {
  value: number | null
  current: number
  total: number
}

export type MultipartInfo = {
  rid: string
  fileChunks: Record<string, number>
}

export class UploadAttachmentTask {
  private content: File
  private pool: string
  private multipartSize: number = 0
  private multipartInfo: MultipartInfo | null = null
  private multipartProgress: MultipartProgress = { value: null, current: 0, total: 0 }

  onProgress?: (progress: MultipartProgress) => void
  onSuccess?: (success: boolean) => void
  onError?: (error: string) => void

  constructor(content: File, pool: string) {
    if (!content || !pool) {
      throw new Error('Content and pool are required.')
    }
    this.content = content
    this.pool = pool
  }

  public async submit(): Promise<SnAttachment> {
    const limit = 3

    try {
      await this.createFragment()
      console.log(`[Paperclip] Multipart placeholder has been created with rid ${this.multipartInfo?.rid}`)

      this.multipartProgress.value = 0
      this.multipartProgress.current = 0

      const chunks = Object.keys(this.multipartInfo?.fileChunks || {})
      this.multipartProgress.total = chunks.length

      let result: SnAttachment | null = null

      const uploadChunks = async (chunk: string): Promise<void> => {
        try {
          const resp = await this.uploadOneChunk(chunk)
          this.multipartProgress.current++
          console.log(
            `[Paperclip] Uploaded multipart ${this.multipartProgress.current}/${this.multipartProgress.total}`,
          )
          this.multipartProgress.value = this.multipartProgress.current / this.multipartProgress.total

          if (this.onProgress) this.onProgress(this.multipartProgress)

          result = resp
        } catch (err) {
          console.log(`[Paperclip] Upload multipart ${chunk} failed, retrying in 3 seconds...`)
          await this.delay(3000)
          await uploadChunks(chunk)
        }
      }

      for (let i = 0; i < chunks.length; i += limit) {
        const chunkSlice = chunks.slice(i, i + limit)
        await Promise.all(chunkSlice.map(uploadChunks))
      }

      console.log(`[Paperclip] Entire file has been uploaded in ${this.multipartProgress.total} chunk(s)`)
      if (this.onSuccess) this.onSuccess(true)

      return result!
    } catch (err: any) {
      if (this.onError) this.onError(err.toString())
      throw err
    }
  }

  private async createFragment(): Promise<void> {
    const mimetypeMap: Record<string, string> = {
      mp4: 'video/mp4',
      mov: 'video/quicktime',
      mp3: 'audio/mp3',
      wav: 'audio/wav',
      m4a: 'audio/m4a',
    }

    const fileExtension = this.content.name.split('.').pop() || ''
    const mimetype = mimetypeMap[fileExtension]

    const nameArray = this.content.name.split('.')
    nameArray.pop()

    const resp = await sni.post('/cgi/uc/fragments', {
      pool: this.pool,
      size: this.content.size,
      name: this.content.name,
      alt: nameArray.join('.'),
      mimetype,
    })

    const data = await resp.data

    this.multipartSize = data.chunkSize
    this.multipartInfo = data.meta
  }

  private async uploadOneChunk(chunkId: string): Promise<SnAttachment | null> {
    if (!this.multipartInfo) return null

    const chunkIdx = this.multipartInfo.fileChunks[chunkId]
    const chunk = this.content.slice(chunkIdx * this.multipartSize, (chunkIdx + 1) * this.multipartSize)

    const resp = await sni.post(`/cgi/uc/fragments/${this.multipartInfo.rid}/${chunkId}`, chunk, {
      headers: { 'Content-Type': 'application/octet-stream' },
      timeout: 3 * 60 * 1000,
    })

    if (resp.data['attachment']) {
      return resp.data['attachment'] as SnAttachment
    }
    this.multipartInfo = resp.data['fragment']
    return null
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  public static formatBytes(bytes: number, decimals = 2): string {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
  }
}
