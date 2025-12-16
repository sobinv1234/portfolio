const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// Configure nodemailer transporter
// For production, use Gmail App Password or SendGrid/Mailgun
// For emulator/local dev, use ethereal (fake SMTP) or log only
const getTransporter = async () => {
  const env = process.env.NODE_ENV || 'development';
  
  if (env === 'production') {
    // In production, use environment variables or Secret Manager
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD
      }
    });
  } else {
    // For emulator/development: use ethereal test account or log
    // In a real setup, you'd create an ethereal account or use a test service
    // For now, just return a mock transporter that logs
    return {
      sendMail: async (mailOptions) => {
        console.log('📧 Email would be sent:', mailOptions);
        return { messageId: 'test-' + Date.now() };
      }
    };
  }
};

// Firestore-triggered function: send email notification on new contact
exports.sendContactNotification = functions
  .region('us-central1')
  .firestore
  .document('contacts/{docId}')
  .onCreate(async (snap, context) => {
    const data = snap.data();
    const docId = context.params.docId;

    console.log('📨 New contact submission received:', data);

    try {
      const transporter = await getTransporter();

      const mailOptions = {
        from: process.env.GMAIL_USER || 'noreply@portfolio.local',
        to: process.env.ADMIN_EMAIL || 'admin@portfolio.local',
        subject: `New Contact Form Submission from ${data.name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message.replace(/\n/g, '<br>')}</p>
          <p><small>Submission ID: ${docId}</small></p>
        `
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('✅ Email sent successfully:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('❌ Error sending email:', error);
      return { success: false, error: error.message };
    }
  });
