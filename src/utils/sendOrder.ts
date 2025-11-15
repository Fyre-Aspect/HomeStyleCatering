export interface OrderData {
  fullName: string;
  phone: string;
  email: string;
  dish: string;
  quantity: number;
  notes: string;
  contactPreference: 'email' | 'phone';
  timestamp: string;
}

/**
 * Placeholder function for sending order via email
 * This will be replaced with actual backend integration later
 */
export async function sendOrderEmail(orderData: OrderData): Promise<boolean> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Log the order data (for development purposes)
  console.log('📧 Order Email Placeholder');
  console.log('---------------------------');
  console.log('To: homestylecateringkwc@gmail.com');
  console.log('Subject: New Order from ' + orderData.fullName);
  console.log('\nOrder Details:');
  console.log('Customer:', orderData.fullName);
  console.log('Phone:', orderData.phone);
  console.log('Email:', orderData.email);
  console.log('Dish:', orderData.dish);
  console.log('Quantity:', orderData.quantity);
  console.log('Notes:', orderData.notes || 'None');
  console.log('Contact Preference:', orderData.contactPreference);
  console.log('Order Time:', new Date(orderData.timestamp).toLocaleString());
  console.log('---------------------------');

  // TODO: Implement actual email sending logic
  // Example integration points:
  // - SendGrid API
  // - Resend API
  // - Nodemailer with SMTP
  // - Next.js API route with email service

  // Return success for now
  return true;
}

/**
 * Placeholder function for SMS notification
 * This will be replaced with actual backend integration later
 */
export async function sendOrderSMS(orderData: OrderData): Promise<boolean> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  console.log('📱 SMS Notification Placeholder');
  console.log('--------------------------------');
  console.log('To: ' + orderData.phone);
  console.log('Message: Thank you for your order! We received your order for ' + orderData.dish + ' and will contact you shortly.');
  console.log('--------------------------------');

  // TODO: Implement actual SMS sending logic
  // Example integration points:
  // - Twilio API
  // - AWS SNS
  // - Next.js API route with SMS service

  return true;
}
