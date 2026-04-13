export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'appetizers' | 'soups' | 'mains' | 'sides' | 'desserts' | 'drinks';
  is_available: boolean;
  image_url?: string;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  event_time: string;
  location: string;
  price?: number;
  image_url?: string;
  is_published: boolean;
  capacity?: number;
  created_at: string;
}

export interface BookingSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  space: 'great_hall' | 'oak_room' | 'bar_lounge' | 'full_venue';
  event_date: string;
  guest_count: number;
  event_type: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  created_at: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  membership_type: 'individual' | 'family' | 'senior' | 'student';
  joined_date: string;
  is_active: boolean;
  notes?: string;
  created_at: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  category: 'events' | 'dining' | 'spaces' | 'archive' | 'general';
  sort_order: number;
  is_published: boolean;
  created_at: string;
}

export interface ArchiveItem {
  id: string;
  title: string;
  description: string;
  year?: number;
  decade?: string;
  image_url?: string;
  document_url?: string;
  category: 'history' | 'documents' | 'photos' | 'artifacts';
  is_published: boolean;
  created_at: string;
}
