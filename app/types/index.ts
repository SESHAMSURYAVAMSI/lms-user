export interface Topic {
  _id: string;
  topic: string;
  video_link: string;
  thumbnail: string;
  video_duration: string;
  session_id?: string;
  event_id?: string;
  speakerName?: string;
  eventName?: string;
  sessionName?: string;
}

export interface Session {
  _id: string;
  name: string;
  topics: Topic[];
}

// This interface represents the data from the /events/public/details/:id endpoint
export interface EventDetails {
  _id: string;
  fullName: string;
  start_date: string;
  end_date: string;
  venue: string;
  image: string;
  regType: 'PAID' | 'FREE';
  amount: number;
  duration: number;
  isEnrolled: boolean;
  enrollmentStatus: string | null;
  totalSessions: number;
  totalVideos: number;
  sessions: Session[];
}

// This interface represents the data from the /topics/video-player/:topicId endpoint
export interface VideoPlayerData {
    eventName: string;
    sessionName: string;
    currentTopic: Topic;
    sessionPlaylist: Topic[];
}

export interface VideoPlayerPageData {
  eventName: string;
  sessionName: string;
  currentTopic: Topic;
  sessionPlaylist: Topic[];
}