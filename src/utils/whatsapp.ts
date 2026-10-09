export const WHATSAPP_PHONE = '9398808876';
export const WHATSAPP_INTERNATIONAL = '+919398808876';
export const PHONE_DISPLAY = '9398808876';

export const WHATSAPP_TEMPLATES = {
  serviceBooking: 'Hello SUMT Technologies, I would like to book a computer repair or maintenance service. Please contact me.',
  productEnquiry: 'Hello SUMT Technologies, I am interested in your computer products and hardware accessories. Please share the details.',
  generalEnquiry: 'Hello SUMT Technologies, I would like more information about your services.',
};

export function getWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/91${WHATSAPP_PHONE}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function getProductWhatsAppUrl(productName: string, category?: string): string {
  const msg = `Hello SUMT Technologies, I am interested in ${productName}${category ? ` (${category})` : ''}. Please share the best price and availability in Vizag.`;
  return getWhatsAppUrl(msg);
}

export function getBookingConfirmationWhatsAppUrl(bookingId: string, name: string, device: string, service: string): string {
  const msg = `Hello SUMT Technologies, I have submitted a service booking request.\n• Booking ID: ${bookingId}\n• Name: ${name}\n• Device: ${device}\n• Service: ${service}\nPlease contact me to confirm the appointment.`;
  return getWhatsAppUrl(msg);
}
