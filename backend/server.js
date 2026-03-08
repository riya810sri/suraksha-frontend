/**
 * Suraksha Backend Server
 * Handles SOS alerts - sends SMS, Calls, WhatsApp & Telegram messages
 * 
 * FREE Mode: Telegram & Email (no cost)
 * PAID Mode: Twilio SMS & Calls (requires credits)
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Telegram Configuration
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

/**
 * POST /api/send-telegram-alert
 * Sends FREE Telegram messages to all emergency contacts
 */
app.post('/api/send-telegram-alert', async (req, res) => {
  try {
    const { userName, userEmail, location, contacts } = req.body;

    if (!contacts || !Array.isArray(contacts) || contacts.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No emergency contacts provided'
      });
    }

    if (!TELEGRAM_BOT_TOKEN) {
      return res.status(500).json({
        success: false,
        error: 'Telegram bot token not configured'
      });
    }

    const googleMapsLink = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
    
    const results = {
      total: contacts.length,
      sent: 0,
      failed: 0,
      details: []
    };

    // Message template
    const message = `🚨 *SOS EMERGENCY ALERT!* 🚨\n\n` +
      `*${userName || userEmail}* needs immediate help!\n\n` +
      `📍 *Location:*\n${googleMapsLink}\n\n` +
      `Please contact them immediately!\n\n` +
      `_This is an automated alert from Suraksha Safety App_`;

    // Process each contact
    for (const contact of contacts) {
      const contactResult = {
        name: contact.name || 'Unknown',
        telegramId: contact.telegramId,
        success: false,
        error: null
      };

      try {
        if (!contact.telegramId) {
          contactResult.error = 'No Telegram ID';
          results.failed++;
          results.details.push(contactResult);
          continue;
        }

        // Send Telegram message
        const response = await fetch(`${TELEGRAM_API}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            chat_id: contact.telegramId,
            text: message,
            parse_mode: 'Markdown'
          })
        });

        const data = await response.json();

        if (data.ok) {
          contactResult.success = true;
          results.sent++;
          console.log(`✅ Telegram sent to ${contact.name}`);
        } else {
          contactResult.error = data.description || 'Failed to send';
          results.failed++;
          console.error(`❌ Telegram failed for ${contact.name}:`, data.description);
        }

      } catch (error) {
        contactResult.error = error.message;
        results.failed++;
        console.error(`❌ Error sending to ${contact.name}:`, error.message);
      }

      results.details.push(contactResult);

      // Small delay between messages
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('\n🚨 Telegram Alert Summary:');
    console.log(`Total: ${results.total}`);
    console.log(`Sent: ${results.sent}`);
    console.log(`Failed: ${results.failed}\n`);

    res.json({
      success: true,
      message: 'Telegram alerts sent successfully',
      ...results
    });

  } catch (error) {
    console.error('❌ Telegram Alert Error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/send-sos-alert
 * Sends SMS and calls via Twilio (PAID)
 */
app.post('/api/send-sos-alert', async (req, res) => {
  try {
    const { userName, userEmail, location, contacts } = req.body;

    if (!contacts || !Array.isArray(contacts) || contacts.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No emergency contacts provided'
      });
    }

    const googleMapsLink = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
    
    const results = {
      total: contacts.length,
      smsSent: 0,
      callsInitiated: 0,
      failed: 0,
      details: []
    };

    // Check if Twilio is configured
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
      console.warn('⚠️ Twilio not configured, skipping SMS/Calls');
      return res.json({
        success: true,
        message: 'Twilio not configured - use Telegram instead',
        ...results
      });
    }

    // Initialize Twilio only if configured
    const twilio = (await import('twilio')).default;
    const twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

    // Process each contact
    for (const contact of contacts) {
      const contactResult = {
        name: contact.name || 'Unknown',
        phone: contact.phone,
        smsSuccess: false,
        callSuccess: false,
        error: null
      };

      try {
        // Format phone number
        let formattedPhone = contact.phone.replace(/[^\d+]/g, '');
        if (!formattedPhone.startsWith('+') && formattedPhone.length === 10) {
          formattedPhone = '+91' + formattedPhone;
        }

        // Send SMS
        try {
          const smsMessage = `🚨 SOS EMERGENCY ALERT! 🚨\n\n${userName || userEmail} needs immediate help!\n\n📍 Location: ${googleMapsLink}\n\nPlease contact them immediately!`;

          await twilioClient.messages.create({
            body: smsMessage,
            from: TWILIO_PHONE_NUMBER,
            to: formattedPhone
          });

          contactResult.smsSuccess = true;
          results.smsSent++;
          console.log(`✅ SMS sent to ${contact.name} (${formattedPhone})`);
        } catch (smsError) {
          console.error(`❌ SMS failed for ${contact.name}:`, smsError.message);
          contactResult.error = `SMS: ${smsError.message}`;
        }

        // Wait before making call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Initiate Call
        try {
          await twilioClient.calls.create({
            twiml: `
              <Response>
                <Say voice="alice" language="en-IN">
                  Emergency alert! ${userName || userEmail} needs immediate help. 
                  Please check your messages and contact them immediately.
                </Say>
              </Response>
            `,
            to: formattedPhone,
            from: TWILIO_PHONE_NUMBER
          });

          contactResult.callSuccess = true;
          results.callsInitiated++;
          console.log(`✅ Call initiated to ${contact.name} (${formattedPhone})`);
        } catch (callError) {
          console.error(`❌ Call failed for ${contact.name}:`, callError.message);
          contactResult.error = contactResult.error 
            ? `${contactResult.error}, Call: ${callError.message}` 
            : `Call: ${callError.message}`;
        }

      } catch (error) {
        console.error(`❌ Error processing contact ${contact.name}:`, error.message);
        contactResult.error = error.message;
        results.failed++;
      }

      results.details.push(contactResult);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    res.json({
      success: true,
      message: 'SOS alerts processed',
      ...results
    });

  } catch (error) {
    console.error('❌ SOS Alert Error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/health
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Suraksha Backend is running',
    mode: TELEGRAM_BOT_TOKEN ? 'FREE (Telegram)' : 'PAID (Twilio required)',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log('🚀 Suraksha Backend Server');
  console.log(`📡 Running on http://localhost:${PORT}`);
  console.log(`💰 Mode: ${TELEGRAM_BOT_TOKEN ? 'FREE (Telegram)' : 'Twilio not configured'}`);
  console.log('\n✅ Ready to send SOS alerts!');
});
