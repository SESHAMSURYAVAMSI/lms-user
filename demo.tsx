// import { IconType } from "react-icons";
// import {
//   FaHome,
//   FaUsers,
//   FaBookOpen,
//   FaFileAlt,
//   FaCog,
//   FaAddressCard,
//   FaRegistered,
//   FaPercentage,
//   FaWrench,
//   FaUtensils,
// } from "react-icons/fa";

// export interface SideTab {
//   name: string;
//   icon: IconType;
//   baseUrl: string;
//   subtabs: { name: string; icon: IconType }[];
// }

// const sideTabs: SideTab[] = [
//   { name: "Dashboard", icon: FaHome, baseUrl: "dashboard", subtabs: [] },
//   {
//     name: "Registration",
//     icon: FaAddressCard,
//     baseUrl: "registration",
//     subtabs: [
//       { name: "Summary", icon: FaFileAlt },
//       { name: "Conference Registrations", icon: FaRegistered },
//       { name: "Workshop Registrations", icon: FaUsers },
//       { name: "Accompanying Registrations", icon: FaUsers },
//       { name: "Benquet Registrations", icon: FaUsers },
//       { name: "Slab Categories", icon: FaFileAlt },
//       { name: "Meal Preferences", icon: FaUtensils },
//       { name: "Workshop Category", icon: FaFileAlt },
//       { name: "Workshops", icon: FaFileAlt },
//       { name: "Discount Codes", icon: FaPercentage },
//       { name: "Registration Form", icon: FaFileAlt },
//       { name: "Cancellation Policy T&C", icon: FaFileAlt },
//       { name: "Registration Settings", icon: FaWrench },
//     ],
//   },
//   {
//     name: "Abstract",
//     icon: FaBookOpen,
//     baseUrl: "abstract",
//     subtabs: [
//       { name: "Summary", icon: FaFileAlt },
//       { name: "All Abstracts", icon: FaFileAlt },
//       { name: "Abstract Categories", icon: FaFileAlt },
//       { name: "Abstract Types", icon: FaFileAlt },
//       { name: "Reviewers", icon: FaFileAlt },
//       { name: "Abstract Settings", icon: FaCog },
//     ],
//   },
//   {
//     name: "Faculty",
//     icon: FaUsers,
//     baseUrl: "faculty",
//     subtabs: [
//       { name: "Summary", icon: FaFileAlt },
//       { name: "All Faculty", icon: FaFileAlt },
//       { name: "Convert To Faculty", icon: FaFileAlt },
//       { name: "Faculty Categories", icon: FaFileAlt },
//       { name: "Faculty Allocation", icon: FaFileAlt },
//       { name: "Faculty Settings", icon: FaCog },
//     ],
//   },
//   {
//     name: "Agenda",
//     icon: FaUsers,
//     baseUrl: "agenda",
//     subtabs: [
//       { name: "Summary", icon: FaFileAlt },
//       { name: "Sessions", icon: FaFileAlt },
//       { name: "Session Types", icon: FaFileAlt },
//       { name: "Session Halls", icon: FaFileAlt },
//       { name: "Talk", icon: FaFileAlt },
//     ],
//   },
//   {
//     name: "Exhibitors",
//     icon: FaUsers,
//     baseUrl: "exhibitors",
//     subtabs: [
//       { name: "Summary", icon: FaFileAlt },
//       { name: "All Exhibitors", icon: FaFileAlt },
//       { name: "Hall Name", icon: FaFileAlt },
//       { name: "Floor Plan", icon: FaFileAlt },
//       { name: "Booths", icon: FaFileAlt },
//       { name: "Exhibitor Category", icon: FaFileAlt },
//       { name: "Exhibitor Settings", icon: FaCog },
//     ],
//   },
//   {
//     name: "Sponsors",
//     icon: FaUsers,
//     baseUrl: "sponsors",
//     subtabs: [
//       { name: "Summary", icon: FaFileAlt },
//       { name: "All Sponsors", icon: FaFileAlt },
//       { name: "Registration Quota", icon: FaFileAlt },
//       { name: "Accommodation Quota", icon: FaFileAlt },
//       { name: "Travel Quota", icon: FaFileAlt },
//       { name: "Hall Name", icon: FaFileAlt },
//       { name: "Booths", icon: FaFileAlt },
//       { name: "Sponsor Category", icon: FaFileAlt },
//       { name: "Sponsor Settings", icon: FaCog },
//     ],
//   },
//   {
//     name: "Travel",
//     icon: FaUsers,
//     baseUrl: "travel",
//     subtabs: [
//       { name: "Summary", icon: FaFileAlt },
//       { name: "All Travels", icon: FaFileAlt },
//       { name: "Travel Desk Team", icon: FaFileAlt },
//       { name: "Reports", icon: FaFileAlt },
//       { name: "Travel Settings", icon: FaCog },
//     ],
//   },
//   {
//     name: "Accomodation",
//     icon: FaUsers,
//     baseUrl: "accomodation",
//     subtabs: [
//       { name: "Summary", icon: FaFileAlt },
//       { name: "All Accomodation", icon: FaFileAlt },
//     ],
//   },
//   {
//     name: "Marketing",
//     icon: FaUsers,
//     baseUrl: "marketing",
//     subtabs: [
//       { name: "Summary", icon: FaFileAlt },
//       { name: "Email Campaign", icon: FaFileAlt },
//       { name: "SMS Campaign", icon: FaFileAlt },
//       { name: "WhatsApp Campaign", icon: FaFileAlt },
//       { name: "Reports", icon: FaFileAlt },
//       { name: "Marketing Settings", icon: FaCog },
//     ],
//   },
//   {
//     name: "Communication",
//     icon: FaUsers,
//     baseUrl: "communication",
//     subtabs: [
//       { name: "Summary", icon: FaFileAlt },
//       { name: "Automated Emails", icon: FaFileAlt },
//       { name: "Scheduled Email", icon: FaFileAlt },
//       { name: "Email Records", icon: FaFileAlt },
//       { name: "Reports", icon: FaFileAlt },
//       { name: "Communication Settings", icon: FaCog },
//     ],
//   },
//   {
//     name: "Accounting",
//     icon: FaUsers,
//     baseUrl: "accounting",
//     subtabs: [
//       { name: "Summary", icon: FaFileAlt },
//       { name: "All Accounting", icon: FaFileAlt },
//       { name: "Reports", icon: FaFileAlt },
//       { name: "Account Settings", icon: FaCog },
//     ],
//   },
//   {
//     name: "Badging & Scanning",
//     icon: FaUsers,
//     baseUrl: "badgings",
//     subtabs: [
//       { name: "Summary", icon: FaFileAlt },
//       { name: "Badging Settings", icon: FaCog },
//     ],
//   },
//   {
//     name: "Presentations",
//     icon: FaUsers,
//     baseUrl: "presentations",
//     subtabs: [
//       { name: "Summary", icon: FaFileAlt },
//       { name: "All Presentations", icon: FaFileAlt },
//       { name: "Presentation Settings", icon: FaCog },
//     ],
//   },
//   {
//     name: "Event App",
//     icon: FaUsers,
//     baseUrl: "eventapp",
//     subtabs: [
//       { name: "Summary", icon: FaFileAlt },
//       { name: "Get Event App", icon: FaFileAlt },
//       { name: "Event App Settings", icon: FaCog },
//     ],
//   },
// ];

// export default sideTabs;

