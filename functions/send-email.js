const nodemailer = require('nodemailer');

// Configure email transporter
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Helper function to get document path based on brand
const getDocumentPath = (docType, brand = 'default') => {
  const brandName = brand !== 'default' ? `-${brand}` : '';
  return `/assets/documents/${docType}${brandName}.pdf`;
};

// Email templates
const emailTemplates = {
  pre_approval: (partner) => ({
    subject: 'Partnership Pre-Approval - The Fortress',
    html: `
      <div>
        <h2>Dear ${partner.name},</h2>
        <p>We are pleased to inform you that your partnership application with ${partner.company} has been pre-approved!</p>
        <p>As the next step, please review the attached wholesale catalog and NDA document.</p>
        <p>Once you've signed the NDA, please reply to this email with the signed document attached.</p>
        <p>We look forward to building a successful partnership with you.</p>
        <p>Best regards,<br>The Fortress Team</p>
      </div>
    `,
    attachments: [
      {
        filename: 'catalog-wholesale.pdf',
        path: getDocumentPath('catalog-wholesale'),
      },
      {
        filename: 'nda-template.pdf',
        path: getDocumentPath('nda-template'),
      }
    ]
  }),

  nda_signed: (partner) => ({
    subject: 'Pro Forma Invoice - The Fortress Partnership',
    html: `
      <div>
        <h2>Dear ${partner.name},</h2>
        <p>Thank you for signing and returning the NDA. We have received your document and processed it.</p>
        <p>Please find the attached Pro Forma Invoice for your initial order. Payment details are included in the invoice.</p>
        <p>Once payment is verified, we will send you the final distribution agreement and provide access to our partner portal.</p>
        <p>If you have any questions about the invoice, please don't hesitate to contact us.</p>
        <p>Best regards,<br>The Fortress Team</p>
      </div>
    `,
    attachments: [
      {
        filename: 'proforma-invoice.pdf',
        path: getDocumentPath('proforma-invoice-template'),
      }
    ]
  }),

  payment_verified: (partner) => ({
    subject: 'Welcome to The Fortress Partner Network!',
    html: `
      <div>
        <h2>Dear ${partner.name},</h2>
        <p>We are delighted to confirm that your payment has been verified and your partnership is now active!</p>
        <p>Please find the attached final distribution agreement for your records.</p>
        <p>Your access credentials for the partner portal are:</p>
        <p>
          <strong>Portal URL:</strong> https://thefortress.com/partner<br>
          <strong>Email:</strong> ${partner.email}<br>
          <strong>Temporary Password:</strong> ${partner.id.substring(0, 8)}
        </p>
        <p>Please log in and change your password immediately. Through the portal, you can place orders, track shipments, and access marketing materials.</p>
        <p>Welcome to The Fortress family!</p>
        <p>Best regards,<br>The Fortress Team</p>
      </div>
    `,
    attachments: [
      {
        filename: 'distribution-agreement.pdf',
        path: getDocumentPath('distribution-agreement-final'),
      }
    ]
  })
};

// Main handler function
exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    const { partnerId, status, brand } = JSON.parse(event.body);

    // Get partners data (in a real app, this would be from a database)
    const partners = require('../src/data/partners.json');
    const partner = partners.find(p => p.id === partnerId);

    if (!partner) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Partner not found' }),
      };
    }

    // Update partner status
    partner.status = status;
    partner.updated_at = new Date().toISOString();

    // Get the appropriate email template
    let emailConfig;
    if (status === 'pre_approved') {
      emailConfig = emailTemplates.pre_approval(partner);
    } else if (status === 'nda_signed') {
      emailConfig = emailTemplates.nda_signed(partner);
    } else if (status === 'payment_verified') {
      emailConfig = emailTemplates.payment_verified(partner);
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid status for email notification' }),
      };
    }

    // Send email
    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: partner.email,
      subject: emailConfig.subject,
      html: emailConfig.html,
      attachments: emailConfig.attachments,
    };

    await transporter.sendMail(mailOptions);

    // In a real app, you would also update the database here
    // For this example, we'll just return success

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: `Email sent successfully for status: ${status}`,
        partner: {
          id: partner.id,
          name: partner.name,
          status: partner.status,
          updated_at: partner.updated_at
        }
      }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error sending email', error: error.message }),
    };
  }
};
