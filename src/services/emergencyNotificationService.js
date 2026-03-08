/**
 * Emergency Notification Service
 * Sends alerts to emergency contacts when SOS is triggered
 * 
 * THREE MODES:
 * 1. Telegram Mode (FREE) - Uses Telegram Bot API
 * 2. Backend Mode (PAID) - Uses Twilio via backend API for actual SMS/calls
 * 3. Frontend Mode (Fallback) - Uses tel:/sms: links to open dialer/SMS app
 */

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3001';
const USE_BACKEND = import.meta.env.VITE_USE_BACKEND === 'true';
const USE_TELEGRAM = import.meta.env.VITE_USE_TELEGRAM === 'true';

/**
 * Validates phone number format
 * @param {string} phoneNumber - Phone number to validate
 * @returns {boolean} - Whether phone number is valid
 */
export const isValidPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return false;
  const cleaned = phoneNumber.replace(/[^\d+]/g, '');
  const digits = cleaned.replace(/\D/g, '');
  return digits.length >= 10;
};

/**
 * Formats phone number for tel/sms links
 * @param {string} phoneNumber - Raw phone number
 * @returns {string} - Cleaned phone number
 */
const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return '';
  const formatted = phoneNumber.replace(/[^\d+]/g, '');
  if (!formatted.startsWith('+') && formatted.length === 10) {
    return '+91' + formatted;
  }
  return formatted;
};

/**
 * Sends SOS alert via Telegram Bot API - 100% FREE! ✅
 * @param {string} userName - Name of the user triggering SOS
 * @param {string} userEmail - Email of the user
 * @param {object} location - User's current location
 * @param {Array} contacts - Array of emergency contacts with telegramId
 * @returns {Promise<object>} - Notification results
 */
export const sendSOSViaTelegram = async (userName, userEmail, location, contacts) => {
  try {
    const response = await fetch(`${BACKEND_API_URL}/api/send-telegram-alert`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName,
        userEmail,
        location,
        contacts
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send Telegram alerts');
    }

    const result = await response.json();
    console.log('✅ Telegram alerts sent:', result);
    return result;
  } catch (error) {
    console.error('❌ Telegram error:', error);
    throw error;
  }
};

/**
 * Sends SOS alert via backend API (Twilio) - PAID
 * @param {string} userName - Name of the user triggering SOS
 * @param {string} userEmail - Email of the user
 * @param {object} location - User's current location
 * @param {Array} contacts - Array of emergency contacts
 * @returns {Promise<object>} - Notification results
 */
export const sendSOSViaBackend = async (userName, userEmail, location, contacts) => {
  try {
    const response = await fetch(`${BACKEND_API_URL}/api/send-sos-alert`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName,
        userEmail,
        location,
        contacts
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send SOS alerts');
    }

    const result = await response.json();
    console.log('✅ SOS alerts sent via backend:', result);
    return result;
  } catch (error) {
    console.error('❌ Backend SOS error:', error);
    throw error;
  }
};

/**
 * Sends SMS to emergency contact with SOS alert
 * @param {string} phoneNumber - Contact's phone number
 * @param {string} userName - Name of the user triggering SOS
 * @param {object} location - User's current location (latitude, longitude)
 * @returns {boolean} - Success status
 */
export const sendSMSToContact = (phoneNumber, userName, location) => {
  try {
    const formattedPhone = formatPhoneNumber(phoneNumber);
    if (!formattedPhone) {
      console.error('Invalid phone number');
      return false;
    }

    // Create SOS message with location
    const message = `🚨 SOS EMERGENCY ALERT! 🚨\n\n${userName} needs immediate help!\n\n📍 Location:\nhttps://www.google.com/maps?q=${location.latitude},${location.longitude}\n\nPlease contact them immediately!`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);

    // Create SMS link (works on both iOS and Android)
    // iOS uses '&' for body separator, Android uses '?'
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const smsLink = isIOS 
      ? `sms:${formattedPhone}&body=${encodedMessage}`
      : `sms:${formattedPhone}?body=${encodedMessage}`;

    // Open SMS app
    window.location.href = smsLink;

    console.log('SMS initiated to:', formattedPhone);
    return true;
  } catch (error) {
    console.error('Error sending SMS:', error);
    return false;
  }
};

/**
 * Initiates call to emergency contact
 * @param {string} phoneNumber - Contact's phone number
 * @returns {boolean} - Success status
 */
export const callContact = (phoneNumber) => {
  try {
    const formattedPhone = formatPhoneNumber(phoneNumber);
    if (!formattedPhone) {
      console.error('Invalid phone number');
      return false;
    }

    // Create tel link to initiate call
    const telLink = `tel:${formattedPhone}`;

    // Open phone dialer
    window.location.href = telLink;

    console.log('Call initiated to:', formattedPhone);
    return true;
  } catch (error) {
    console.error('Error initiating call:', error);
    return false;
  }
};

/**
 * Notifies all emergency contacts via SMS and Call
 * @param {Array} contacts - Array of emergency contacts
 * @param {string} userName - Name of the user triggering SOS
 * @param {object} location - User's current location
 * @returns {object} - Notification results
 */
export const notifyAllEmergencyContacts = (contacts, userName, location) => {
  const results = {
    total: contacts.length,
    smsSent: 0,
    callsInitiated: 0,
    failed: 0,
    invalid: 0,
    details: []
  };

  if (!contacts || contacts.length === 0) {
    console.warn('No emergency contacts to notify');
    alert('⚠️ No Emergency Contacts Found!\n\nPlease add emergency contacts in your dashboard to receive SOS alerts.\n\nGo to: Dashboard → Emergency Contacts → Add Contact');
    return results;
  }

  // Validate and filter contacts
  const validContacts = contacts.filter(contact => {
    const isValid = isValidPhoneNumber(contact.phone);
    if (!isValid) {
      results.invalid++;
      results.details.push({
        name: contact.name || 'Unknown',
        phone: contact.phone,
        error: 'Invalid phone number'
      });
      console.error('Invalid phone number for contact:', contact.name, contact.phone);
    }
    return isValid;
  });

  if (validContacts.length === 0) {
    alert('⚠️ No Valid Phone Numbers!\n\nAll emergency contacts have invalid phone numbers.\n\nPlease update contact phone numbers with at least 10 digits.');
    return results;
  }

  // Notify each valid contact
  validContacts.forEach((contact, index) => {
    const contactResult = {
      name: contact.name || 'Contact ' + (index + 1),
      phone: contact.phone,
      smsSuccess: false,
      callSuccess: false
    };

    // Add small delay between each notification for better UX
    setTimeout(() => {
      // Send SMS
      const smsSuccess = sendSMSToContact(contact.phone, userName, location);
      if (smsSuccess) {
        results.smsSent++;
        contactResult.smsSuccess = true;
      } else {
        results.failed++;
      }

      // Add delay before initiating call
      setTimeout(() => {
        const callSuccess = callContact(contact.phone);
        if (callSuccess) {
          results.callsInitiated++;
          contactResult.callSuccess = true;
        } else {
          results.failed++;
        }
      }, 500 * index); // Stagger calls by 500ms each

    }, 300 * index); // Stagger SMS by 300ms each

    results.details.push(contactResult);
  });

  return results;
};

/**
 * Sends notification to a single contact (both SMS and Call)
 * @param {object} contact - Emergency contact object
 * @param {string} userName - Name of the user triggering SOS
 * @param {object} location - User's current location
 * @param {number} delay - Delay before sending (ms)
 * @returns {object} - Notification result
 */
export const notifySingleContact = (contact, userName, location, delay = 0) => {
  const result = {
    name: contact.name,
    phone: contact.phone,
    smsSuccess: false,
    callSuccess: false
  };

  setTimeout(() => {
    // Send SMS first
    result.smsSuccess = sendSMSToContact(contact.phone, userName, location);

    // Then initiate call after short delay
    setTimeout(() => {
      result.callSuccess = callContact(contact.phone);
    }, 1000);

  }, delay);

  return result;
};

/**
 * Opens Google Maps with user's location
 * @param {object} location - Location object with latitude and longitude
 */
export const openLocationInMaps = (location) => {
  if (!location || !location.latitude || !location.longitude) {
    console.error('Invalid location');
    return;
  }

  const mapsUrl = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
  window.open(mapsUrl, '_blank');
};

/**
 * Creates a shareable location link
 * @param {object} location - Location object
 * @returns {string} - Google Maps URL
 */
export const createLocationLink = (location) => {
  if (!location || !location.latitude || !location.longitude) {
    return '';
  }
  return `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
};

export default {
  sendSMSToContact,
  callContact,
  notifyAllEmergencyContacts,
  notifySingleContact,
  openLocationInMaps,
  createLocationLink,
  formatPhoneNumber,
  isValidPhoneNumber
};
