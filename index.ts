import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { cueNotificationTemplate } from './templates/cue-notification.js'

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

// Send email via ZeptoMail HTTP API (bypasses Render's SMTP port block)
async function sendEmail(subject: string, htmlBody: string) {
  const response = await fetch('https://api.zeptomail.ca/v1.1/email', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Zoho-enczapikey ${process.env['ZEPTOMAIL_API_KEY']}`,
    },
    body: JSON.stringify({
      from: { address: process.env['ZOHO_EMAIL'] },
      to: [{ email_address: { address: process.env['ZOHO_EMAIL'] } }],
      subject,
      htmlbody: htmlBody,
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`ZeptoMail error: ${response.status} ${err}`)
  }
}

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
        const time = new Date().toLocaleString()
        await sendEmail(
          `有人催更了 ${count} 次！`,
          cueNotificationTemplate(count, time)
        )
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
