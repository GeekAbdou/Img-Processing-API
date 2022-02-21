import fs from 'fs/promises'
import { Buffer } from 'buffer'
import sharp from 'sharp'

interface resizeParams {
    width: number
    height: number
    pathFullImage: string
    pathThumbImage: string
}

const imgResizer = async ({
    width,
    height,
    pathFullImage,
    pathThumbImage,
}: resizeParams): Promise<Buffer> => {
    const data: Buffer | null = await fs
        .readFile(pathFullImage)
        .catch(() => null)

    if (!data) {
        return Promise.reject()
    }

    const imageBuffer: Buffer | null = await sharp(data)
        .resize(width, height)
        .toBuffer()
        .catch(() => null)

    if (!imageBuffer) {
        return Promise.reject()
    }

    return fs
        .writeFile(pathThumbImage, imageBuffer)
        .then(() => {
            return imageBuffer
        })
        .catch(() => {
            return Promise.reject()
        })
}

export default { imgResizer }
