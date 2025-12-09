// app/types/event-details.ts (or combine with your existing event types)

export interface TopicDetails {
  _id: string;
  topic: string;
  video_link: string;
  thumbnail: string;
  video_duration: string; // e.g., "00:05:30"
  session_id?: string; // Optional, might be null for 'General Session'
  sessionName?: string; // populated by lookup
  speakerName?: string; // populated by lookup
}

export interface SessionDetails {
  _id: string;
  name: string;
  topics: TopicDetails[];
}

export interface EventDetails {
  _id: string;
  fullName: string;
  shortName: string;
  image: string;
  start_date: string; // ISO date string
  end_date: string;   // ISO date string
  venue: string;
  city: string;
  state?: string; // Optional, as not always present in your response
  country?: string; // Optional
  regType: 'FREE' | 'PAID';
  amount: number;
  status: 'ACTIVE' | 'DRAFT' | 'ARCHIVED';
  duration: number; // Total duration in minutes (calculated by backend)
  isEnrolled: boolean;
  enrollmentStatus: string | null;
  totalSessions: number;
  totalVideos: number;
  sessions: SessionDetails[]; // Nested sessions and their topics
}