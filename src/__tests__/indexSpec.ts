import supertest from 'supertest'
import app from '../main'

const request = supertest(app)

describe('Test Get / endpoint server', () => {
    it('Get the / endpoint', async () => {
        const response = await request.get('/')
        expect(response.status).toBe(200)
    })
})
