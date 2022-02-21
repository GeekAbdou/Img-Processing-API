import express from 'express'
import fs from 'fs/promises'
import { Stats } from 'fs'
import path from 'path'

import imgResizerInterface from '../../interfaces/imgResizerInterface'

const imageRouter = express.Router()

imageRouter.get('/', async (req, res): Promise<void> => {
    //Declarations
    const filename = req.query['filename']

    const height = req.query['height']
        ? parseInt(req.query['height'] as string, 10)
        : null

    const width = req.query['width']
        ? parseInt(req.query['width'] as string, 10)
        : null

    const pathFullImage = `${path.resolve(
        __dirname,
        `../../../img/full/${filename}.jpg`
    )}`

    const pathThumbImage = `${path.resolve(
        __dirname,
        `../../../img/thumb/${filename}-${height}x${width}.jpg`
    )}`

    //Error Handeling (Unhandled promise rejection appears randomly if not make considerations )
    const fullImage: Stats | null = await fs.stat(pathFullImage).catch(() => {
        res.status(404).send(
            'Image Not Found Please Check Image Name and remove any extensions like (.jpg) and check if the image is JPG Image finally check removing  from the Paramters'
        )
        return null
    })

    if (!filename || !height || !width) {
        res.status(400).send('Please Check URL Parameters')
        return
    }

    if (!fullImage) {
        return
    }

    // Checking Exsiting Thumbnail Image
    const existingThumb: Stats | null = await fs
        .stat(pathThumbImage)
        .catch(() => {
            return null
        })

    //Response
    if (existingThumb) {
        fs.readFile(pathThumbImage)
            .then((buf: Buffer) => {
                res.status(200).contentType('jpg').send(buf)
            })
            .catch(() => {
                res.status(500).send('Error: Cannot Find Thumbnail Image')
            })
    } else {
        imgResizerInterface
            .imgResizer({ width, height, pathFullImage, pathThumbImage })
            .then((resizedImage: Buffer) => {
                res.status(200).contentType('jpg').send(resizedImage)
            })
            .catch(() => {
                res.status(500).send('Error occured processing the image')
            })
    }
})

export default imageRouter
