import express from 'express'
import fs from 'fs/promises'
import path from 'path'
import config from '../../config'

const PORT = config.port
const manualRouter = express.Router()

manualRouter.get('/', async (_req, res): Promise<void> => {
    //Declarations
    const imgsPath = `${path.resolve(__dirname, '../../../img/full')}`

    let responseStaticHTML = `
        <h1 style="display: flex;justify-content: center;">API Manual </h1>
        <p style="display: flex;justify-content: center;">You Can Use The API as Follows:</p>
        <p style="display: flex;justify-content: center; color:red; font-weight: bold;">-- Note! Don't Add ".jpg" in the name --</p>
        <p style="display: flex;justify-content: center;">http://localhost:${PORT}/api/images/?filename="filename"&height="heigh"&width="width"</p>
        <p style="display: flex;justify-content: center;">Available images List: </p>
        <ol>
    `

    const allImages: string[] | null = await fs.readdir(imgsPath).catch(() => {
        res.status(500).send('Cannot Read Images') // If Error Status 500 => Cannot found The Path
        return null
    })

    //Error Handeling
    if (!allImages) {
        return
    }

    //Response
    allImages.forEach((file: string): void => {
        responseStaticHTML = responseStaticHTML + `<li>${file}</li>`
    })

    res.status(200).send(`${responseStaticHTML}</ol>`)
})

export default manualRouter
