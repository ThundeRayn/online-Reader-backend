import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env['PORT'] || 3001

const allowedOrigins = [
  'http://localhost:5173',
  'https://www.online-reader-thebaid.top',
  'https://online-reader-thebaid.top',
]
app.use(cors({ origin: allowedOrigins }))
app.use(express.json())

// Zoho SMTP transporter
const transporter = nodemailer.createTransport({
  host: 'smtppro.zohocloud.ca',
  port: 465,
  secure: true,
  auth: {
    user: process.env['ZOHO_EMAIL'],
    pass: process.env['ZOHO_PASSWORD'],
  },
})

// Click batching for 催更
let clickCount = 0
let batchTimer: ReturnType<typeof setTimeout> | null = null

app.post('/api/send-email', (req, res) => {
  clickCount++
  console.log(`催更 click #${clickCount}`)

  if (!batchTimer) {
    batchTimer = setTimeout(async () => {
      const count = clickCount
      clickCount = 0
      batchTimer = null

      try {
        await transporter.sendMail({
          from: process.env['ZOHO_EMAIL'],
          to: process.env['ZOHO_EMAIL'],
          subject: `有人催更了 ${count} 次！`,
          text: `某读者在过去一分钟内催更了 ${count} 次！\n时间: ${new Date().toLocaleString()}`,
        })
        console.log(`Batched email sent: ${count} clicks`)
      } catch (error) {
        console.error('Failed to send batched email:', error)
      }
    }, 60_000)
  }

  res.json({ success: true })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
