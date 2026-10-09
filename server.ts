import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readData<T>(filePath: string, defaultData: T[]): T[] {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), 'utf-8');
      return defaultData;
    }
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return defaultData;
  }
}

function writeData<T>(filePath: string, data: T[]): boolean {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
    return false;
  }
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // Health check
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      business: 'SUMT Technologies',
      city: 'Visakhapatnam (Vizag)',
      phone: '9398808876',
      time: new Date().toISOString(),
    });
  });

  // Handle Bookings
  app.post('/api/bookings', (req: Request, res: Response) => {
    const {
      customerName,
      mobileNumber,
      whatsappNumber,
      email,
      deviceType,
      brandModel,
      serviceRequired,
      problemDescription,
      preferredDate,
      preferredTime,
      serviceLocation,
      additionalNotes,
      honeypot,
    } = req.body;

    // Spam check
    if (honeypot) {
      return res.status(400).json({ error: 'Spam detected' });
    }

    if (!customerName || !mobileNumber || !deviceType || !serviceRequired || !problemDescription) {
      return res.status(400).json({
        error: 'Please fill in all required fields: Name, Mobile, Device Type, Service Required, and Problem Description.',
      });
    }

    const cleanPhone = String(mobileNumber).trim();
    if (cleanPhone.replace(/\D/g, '').length < 10) {
      return res.status(400).json({
        error: 'Please enter a valid 10-digit mobile number.',
      });
    }

    const bookings = readData<any>(BOOKINGS_FILE, []);
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingId = `SUMT-BK-${Date.now().toString().slice(-4)}${randomSuffix}`;

    const newBooking = {
      id: bookingId,
      customerName: String(customerName).trim(),
      mobileNumber: cleanPhone,
      whatsappNumber: whatsappNumber ? String(whatsappNumber).trim() : cleanPhone,
      email: email ? String(email).trim() : '',
      deviceType: String(deviceType).trim(),
      brandModel: brandModel ? String(brandModel).trim() : 'Not specified',
      serviceRequired: String(serviceRequired).trim(),
      problemDescription: String(problemDescription).trim(),
      preferredDate: preferredDate || new Date().toISOString().split('T')[0],
      preferredTime: preferredTime || 'Anytime during working hours',
      serviceLocation: serviceLocation ? String(serviceLocation).trim() : 'Visakhapatnam',
      additionalNotes: additionalNotes ? String(additionalNotes).trim() : '',
      status: 'Received - Pending Confirmation',
      createdAt: new Date().toISOString(),
    };

    bookings.unshift(newBooking);
    const saved = writeData(BOOKINGS_FILE, bookings);

    if (!saved) {
      return res.status(500).json({ error: 'Failed to record service booking. Please try calling 9398808876 directly.' });
    }

    return res.status(201).json({
      success: true,
      bookingId,
      message: 'Service booking request received successfully! SUMT Technologies team will contact you shortly to confirm the appointment.',
      booking: newBooking,
    });
  });

  app.get('/api/bookings', (_req: Request, res: Response) => {
    const bookings = readData(BOOKINGS_FILE, []);
    res.json({ bookings, total: bookings.length });
  });

  // Handle Product & General Enquiries
  app.post('/api/enquiries', (req: Request, res: Response) => {
    const {
      fullName,
      phone,
      email,
      enquiryType,
      subject,
      message,
      productName,
      productCategory,
      honeypot,
    } = req.body;

    if (honeypot) {
      return res.status(400).json({ error: 'Spam detected' });
    }

    if (!fullName || !phone || !message) {
      return res.status(400).json({
        error: 'Please provide your Full Name, Phone Number, and Message.',
      });
    }

    const cleanPhone = String(phone).trim();
    if (cleanPhone.replace(/\D/g, '').length < 10) {
      return res.status(400).json({
        error: 'Please enter a valid 10-digit phone number.',
      });
    }

    const enquiries = readData<any>(ENQUIRIES_FILE, []);
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const enquiryId = `SUMT-ENQ-${Date.now().toString().slice(-4)}${randomSuffix}`;

    const newEnquiry = {
      id: enquiryId,
      fullName: String(fullName).trim(),
      phone: cleanPhone,
      email: email ? String(email).trim() : '',
      enquiryType: enquiryType || 'General Enquiry',
      subject: subject ? String(subject).trim() : (productName ? `Price Quote for ${productName}` : 'General Inquiry'),
      productName: productName || null,
      productCategory: productCategory || null,
      message: String(message).trim(),
      status: 'New',
      createdAt: new Date().toISOString(),
    };

    enquiries.unshift(newEnquiry);
    const saved = writeData(ENQUIRIES_FILE, enquiries);

    if (!saved) {
      return res.status(500).json({ error: 'Failed to record enquiry. Please contact 9398808876 directly.' });
    }

    return res.status(201).json({
      success: true,
      enquiryId,
      message: 'Enquiry submitted successfully! Our technical team in Visakhapatnam will get in touch with you promptly.',
      enquiry: newEnquiry,
    });
  });

  app.get('/api/enquiries', (_req: Request, res: Response) => {
    const enquiries = readData(ENQUIRIES_FILE, []);
    res.json({ enquiries, total: enquiries.length });
  });

  // Setup Vite or Static File Serving
  if (process.env.NODE_ENV === 'production' && fs.existsSync(path.resolve(__dirname, 'dist'))) {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {},
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SUMT Technologies server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
