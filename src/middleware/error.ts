import { Response, Request, NextFunction } from 'express'
import Error from '../interfaces/error'

const errorMiddlewareError = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const status = error.status || 500
    const message = error.message || 'something went wrong!'
    res.status(status).json({ status, message })
}

export default errorMiddlewareError
