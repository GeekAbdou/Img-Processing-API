import supertest from 'supertest'
import fs from 'fs/promises'
import { Stats } from 'fs'
import path from 'path'
import sizeOf from 'image-size'

import app from '../main'

const request = supertest(app)

describe('Test GET /api/images Router', () => {
    //Error Tests
    it('Error 404 if image not found', async () => {
        const response = await request.get(
            '/api/images?filename=noIMGtest&height=10&width=10'
        )
        expect(response.status).toBe(404)
    })

    it('Error 400 if missing parameters width but the img is exsisting', async () => {
        const response = await request.get(
            '/api/images?filename=okTest&height=10'
        )
        expect(response.status).toBe(400)
    })

    it('Error 400 if missing parameters height but the img is exsisting', async () => {
        const response = await request.get(
            '/api/images?filename=okTest&width=10'
        )
        expect(response.status).toBe(400)
    })

    it('Error 400 if no parameters but the img is existing', async () => {
        const response = await request.get('/api/images?filename=okTest')
        expect(response.status).toBe(400)
    })

    //OK tests
    it('status 200 if URL is okay and Img is existing ', async () => {
        const response = await request.get(
            '/api/images/?filename=okTest&height=200&width=400'
        )
        expect(response.status).toBe(200)
    })

    it('Test API Return functionality', (oK): void => {
        request
            .get('/api/images/?filename=okTest&height=200&width=400')
            .then(() => {
                fs.stat(
                    path.resolve(
                        __dirname,
                        '../../img/thumb/okTest-200x400.jpg'
                    )
                ).then((fileStat: Stats) => expect(fileStat).not.toBeNull())
                oK()
            })
    })

    it('check width and height of the thumb', (oK): void => {
        request
            .get('/api/images/?filename=okTest&height=200&width=400')
            .then(() => {
                const dim = sizeOf(
                    path.resolve(
                        __dirname,
                        '../../img/thumb/okTest-200x400.jpg'
                    )
                )
                expect(dim.height).toEqual(200)
                expect(dim.width).toEqual(400)
                oK()
            })
    })
})
