export interface ProfileData {
  photo: string;
  fullName: string;
  prefix: string;
  designation: string;
  affiliation: string;
  mobile: string;
  email: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
}

export const profileData: ProfileData = {
  photo: "/profile.jpeg", // Using a placeholder image
  fullName: "Manpreet Singh Dhillon",
  prefix: "Dr",
  designation: "Senior Consultant",
  affiliation: "Apollo Hospital, Jubilee Hills",
  mobile: "4512666232",
  email: "abc@gmail.com",
  country: "India",
  state: "Telangana",
  city: "Hyderabad",
  pincode: "500033",
};