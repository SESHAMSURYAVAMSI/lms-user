export interface ProfileData {
  _id: string;
  prefix: string;
  fullName: string;
  email: string;
  mobile: string;
  country: string;
  designation: string;
  affiliationHospital: string; // Matched to backend model
  state: string;
  city: string;
  pincode: string;
  profilePhoto: string | null; // Can be a URL or null
}