export function cueNotificationTemplate(count: number, time: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin: 0; padding: 0; background-color: #f5f0eb; font-family: 'Georgia', 'Times New Roman', serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f0eb; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="520" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; border: 1px solid #e0d6cc; overflow: hidden;">

          <!-- Header -->
          <tr>
            <td style="background-color: #1a1a1a; padding: 28px 32px; text-align: center;">
              <img
                src="https://www.online-reader-thebaid.top/sword.png"
                alt="Thebaid"
                width="36"
                height="36"
                style="display: inline-block; vertical-align: middle; margin-right: 10px; filter: brightness(0) invert(1);"
              />
              <span style="color: #d18400; font-size: 22px; font-weight: bold; letter-spacing: 2px; vertical-align: middle;">
                THEBAID
              </span>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 36px 32px;">
              <!-- Title -->
              <h1 style="margin: 0 0 8px 0; font-size: 24px; color: #1a1a1a; text-align: center;">
                有人催更了！
              </h1>
              <p style="margin: 0 0 28px 0; font-size: 14px; color: #999; text-align: center;">
                Reader Engagement Notification
              </p>

              <!-- Count Box -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <table cellpadding="0" cellspacing="0" style="background-color: #fdf8f0; border: 1px solid #e8ddd0; border-radius: 10px; padding: 24px 40px;">
                      <tr>
                        <td align="center">
                          <div style="font-size: 48px; font-weight: bold; color: #d18400; line-height: 1;">
                            ${count}
                          </div>
                          <div style="font-size: 14px; color: #8a7a6a; margin-top: 6px;">
                            次催更 · in the past minute
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 28px; border-top: 1px solid #eee; padding-top: 20px;">
                <tr>
                  <td style="font-size: 13px; color: #888; padding: 4px 0;">
                    ⏰ 时间
                  </td>
                  <td style="font-size: 13px; color: #333; padding: 4px 0; text-align: right;">
                    ${time}
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 13px; color: #888; padding: 4px 0;">
                    📍 来源
                  </td>
                  <td style="font-size: 13px; color: #333; padding: 4px 0; text-align: right;">
                    online-reader-thebaid.top
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #faf7f4; padding: 20px 32px; border-top: 1px solid #eee; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #aaa;">
                此邮件由 Thebaid 阅读器自动发送
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
}
