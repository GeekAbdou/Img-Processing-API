import express from 'express'
import imageRouter from './router/imgRouter'
import manualRouter from './router/manual'

const router = express.Router()

router.use('/images', imageRouter)
router.use('/manual', manualRouter)

export default router
