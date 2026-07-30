// ========================================
// SEND ORDER EMAIL (Vercel Serverless Function)
// Sends an order confirmation / invoice email via Resend
// when a customer completes checkout.
// ========================================

module.exports = async (req, res) => {

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {

        const { order } = req.body || {};

        if (!order || !order.email || !order.order_number) {
            return res.status(400).json({ error: "Missing required order data" });
        }

        const paymentLabel =
            order.payment_method === "chime" ? "Chime" : "Zelle";

        const fullName =
            [order.first_name, order.last_name].filter(Boolean).join(" ");

        const total = Number(order.total || 0).toFixed(2);

        const html = buildInvoiceHtml({
            fullName,
            orderNumber: order.order_number,
            paymentLabel,
            total
        });

        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                from: "TEAS ACCESS <orders@teasaccess.com>",
                to: order.email,
                reply_to: "support@teasaccess.com",
                subject: `Your TEAS ACCESS Order ${order.order_number}`,
                html
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Resend error:", data);
            return res.status(502).json({ error: "Failed to send email", details: data });
        }

        return res.status(200).json({ success: true, id: data.id });

    } catch (err) {

        console.error("send-order-email error:", err);

        return res.status(500).json({ error: "Server error" });

    }

};

// ========================================
// EMAIL TEMPLATE
// ========================================

function buildInvoiceHtml({ fullName, orderNumber, paymentLabel, total }) {

    return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#F7FAFF;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7FAFF;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;">

          <tr>
            <td style="background:linear-gradient(135deg,#0A4FAF,#2E86FF);background-color:#0A4FAF;padding:30px 40px;">
              <span style="color:#ffffff;font-size:22px;font-weight:bold;">TEAS ACCESS</span>
            </td>
          </tr>

          <tr>
            <td style="padding:40px;">

              <h1 style="margin:0 0 10px;font-size:22px;color:#1E293B;">
                Thanks for your order${fullName ? `, ${fullName}` : ""}!
              </h1>

              <p style="margin:0 0 25px;font-size:15px;line-height:1.7;color:#6B7280;">
                We've received your order for the <strong>ATI TEAS 7 Ultimate Success System</strong>.
                Here's a summary of what you submitted:
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #EEF2F7;border-radius:12px;margin-bottom:25px;">
                <tr>
                  <td style="padding:16px 20px;border-bottom:1px solid #EEF2F7;font-size:14px;color:#6B7280;">Order Number</td>
                  <td style="padding:16px 20px;border-bottom:1px solid #EEF2F7;font-size:14px;color:#1E293B;text-align:right;font-weight:600;">${orderNumber}</td>
                </tr>
                <tr>
                  <td style="padding:16px 20px;border-bottom:1px solid #EEF2F7;font-size:14px;color:#6B7280;">Product</td>
                  <td style="padding:16px 20px;border-bottom:1px solid #EEF2F7;font-size:14px;color:#1E293B;text-align:right;">ATI TEAS 7 Ultimate Success System</td>
                </tr>
                <tr>
                  <td style="padding:16px 20px;border-bottom:1px solid #EEF2F7;font-size:14px;color:#6B7280;">Payment Method</td>
                  <td style="padding:16px 20px;border-bottom:1px solid #EEF2F7;font-size:14px;color:#1E293B;text-align:right;">${paymentLabel}</td>
                </tr>
                <tr>
                  <td style="padding:16px 20px;font-size:15px;color:#1E293B;font-weight:700;">Total</td>
                  <td style="padding:16px 20px;font-size:18px;color:#0A4FAF;text-align:right;font-weight:700;">$${total}</td>
                </tr>
              </table>

              <div style="background:#EEF6FF;border-radius:12px;padding:20px;margin-bottom:25px;">
                <p style="margin:0;font-size:14px;line-height:1.7;color:#0A4FAF;">
                  <strong>What happens next:</strong><br>
                  Our team will follow up shortly with the ${paymentLabel} payment details for your order.
                  Once you've sent your payment, simply reply to this email with a screenshot of your
                  payment confirmation, and we'll verify it and deliver your study guide right away.
                </p>
              </div>

              <p style="margin:0;font-size:13px;line-height:1.6;color:#9CA3AF;">
                No payment has been collected yet &mdash; this email is a confirmation of your order only.
                If you have any questions, just reply to this email and we'll get back to you.
              </p>

            </td>
          </tr>

          <tr>
            <td style="padding:20px 40px;background:#F7FAFF;text-align:center;">
              <span style="font-size:12px;color:#9CA3AF;">&copy; ${new Date().getFullYear()} TEAS ACCESS. All rights reserved.</span>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

}