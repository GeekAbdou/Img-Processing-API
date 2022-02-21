import dotenv from 'dotenv'
dotenv.config()
console.log(process.env)

const { PORT } = process.env

export default {
  port: PORT,
}
