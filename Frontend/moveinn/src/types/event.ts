export interface Event {
    id: string;
    creatorId: string;
    title: string;
    date: string; 
    location: string;
    address: string;
    attendeesCount: number;
    maxAttendees: number;
    category: number;
    description: string;
    organizer: string;
    imageUrl: string;
    tags: string[];
  }
  