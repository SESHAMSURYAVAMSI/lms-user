// Describes the details of a single video spoken by the speaker
export interface SpeakerVideo {
  topicId: string;
  title: string;
  thumbnail: string | null;
  videoDuration: string;
  videoLink: string; 
  eventId: string;
  eventName: string;
  eventRegType: 'FREE' | 'PAID';
  userEnrollmentStatus: 'ENROLLED' | 'NOT_ENROLLED';
}

// Describes the main details of the speaker
export interface SpeakerDetailsInfo {
  id: string;
  name: string;
  image: string | null;
  affiliation: string;
  location: string;
  totalVideos: number;
  totalMinutes: number;
}

// Describes the entire data object received from the API
export interface SpeakerPageData {
  speakerDetails: SpeakerDetailsInfo;
  videos: SpeakerVideo[];
}