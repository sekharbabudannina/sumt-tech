export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  brand: string;
  shortDesc: string;
  specs: string[];
  imageUrl: string;
  isPopular?: boolean;
}

export type ProductCategory =
  | 'All'
  | 'Motherboards'
  | 'Processors'
  | 'RAM'
  | 'Hard Disk Drives (HDD)'
  | 'Solid State Drives (SSD)'
  | 'Pen Drives'
  | 'LED Monitors'
  | 'Keyboards & Mice'
  | 'Computer Cables'
  | 'Power Supplies & Cabinets';

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  imageUrl: string;
  commonIssues: string[];
  turnaroundTime: string;
}

export interface BookingRequest {
  id?: string;
  customerName: string;
  mobileNumber: string;
  whatsappNumber?: string;
  email?: string;
  deviceType: 'Desktop' | 'Laptop' | 'All-in-One' | 'Other' | string;
  brandModel: string;
  serviceRequired: string;
  problemDescription: string;
  preferredDate: string;
  preferredTime: string;
  serviceLocation: string;
  additionalNotes?: string;
  honeypot?: string;
  status?: string;
  createdAt?: string;
}

export interface EnquiryRequest {
  id?: string;
  fullName: string;
  phone: string;
  email?: string;
  enquiryType: 'Sales' | 'Maintenance' | 'General Enquiry' | 'Product Price Quote';
  subject: string;
  productName?: string;
  productCategory?: string;
  message: string;
  honeypot?: string;
  status?: string;
  createdAt?: string;
}
