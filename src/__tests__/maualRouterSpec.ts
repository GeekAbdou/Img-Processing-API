import supertest from 'supertest'
import app from '../main'

const request = supertest(app)

describe('Test GET manual Router', () => {
    it('Get /api/manual', async () => {
        const response = await request.get('/api/manual')
        expect(response.status).toBe(200)
    })
})
