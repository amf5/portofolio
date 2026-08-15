import nodemailer from 'nodemailer';
import "dotenv/config.js";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});


export const sendEmail = async (to, message,otp) => {
    try {
        
       const fixedBody = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Email Verification</title>

<style>
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{
    font-family:Arial,Helvetica,sans-serif;
    background:#f5f7fb;
    padding:40px 15px;
    color:#333;
}

.wrapper{
    max-width:600px;
    margin:auto;
}

.card{
    background:#ffffff;
    border-radius:16px;
    overflow:hidden;
    box-shadow:0 10px 30px rgba(0,0,0,.08);
}

.header{
    background:linear-gradient(135deg,#2563eb,#4f46e5);
    padding:35px;
    text-align:center;
    color:white;
}

.logo{
    width:70px;
    height:70px;
    background:white;
    color:#2563eb;
    font-size:34px;
    font-weight:bold;
    border-radius:50%;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    margin-bottom:15px;
}

.header h1{
    font-size:28px;
}

.content{
    padding:40px;
}

.content h2{
    margin-bottom:15px;
}

.content p{
    color:#666;
    line-height:1.7;
    font-size:15px;
}

.code{
    margin:35px 0;
    text-align:center;
    font-size:40px;
    font-weight:bold;
    letter-spacing:12px;
    color:#2563eb;
    background:#eef4ff;
    border:2px dashed #2563eb;
    padding:18px;
    border-radius:12px;
}

.info{
    background:#f8fafc;
    border-left:4px solid #2563eb;
    padding:15px;
    border-radius:8px;
    margin-top:20px;
    color:#555;
}

.footer{
    padding:25px;
    text-align:center;
    background:#fafafa;
    color:#999;
    font-size:13px;
}

.footer a{
    color:#2563eb;
    text-decoration:none;
}
</style>
</head>

<body>

<div class="wrapper">

<div class="card">

<div class="header">
<div class="logo">S</div>
<h1>Story AI</h1>
</div>

<div class="content">

<h2>Email Verification</h2>

<p>Hello,</p>

<p>
Thank you .
Please use the verification code below to ${message}.
</p>

<div class="code">Code:
${otp}
</div>

<div class="info">
<b>⏳ This code will expire in 5 minutes.</b><br><br>
For your security, never share this code with anyone.
</div>

</div>

<div class="footer">
If you didn't request this email, you can safely ignore it.<br><br>

© ${new Date().getFullYear()} Story AI. All rights reserved.
</div>

</div>

</div>

</body>
</html>
`;

        const result = await transporter.sendMail({
            from: process.env.SMTP_FROM || 'noreply@eventflow.com',
            to,
            subject: '🔐 Your Verification Code',
            html: fixedBody,
        });

        if (result.messageId) {
            return {
                success: true,
                message: '✅ Email sent successfully',
                messageId: result.messageId,
                accepted: result.accepted,
                rejected: result.rejected,
                response: result.response,
            };
        }
    } catch (error) {
        console.error(' Email error:', error);
        return { success: false, error: error.message };
    }
};