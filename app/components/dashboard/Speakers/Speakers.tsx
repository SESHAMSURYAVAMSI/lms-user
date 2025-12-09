// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { CalendarDays, MapPin, Video, SlidersHorizontal, Search } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { speakers } from "@/app/data/speakers";

// export default function SpeakersPage() {
//   const [search, setSearch] = useState("");
//   const [sortBy, setSortBy] = useState<"alphabetical" | "videos">("alphabetical");
//   const [visibleCount, setVisibleCount] = useState(12);

//   const sortedSpeakers = [...speakers].sort((a, b) => {
//     if (sortBy === "alphabetical") return a.name.localeCompare(b.name);
//     if (sortBy === "videos") return b.videos - a.videos;
//     return 0;
//   });

//   const filteredSpeakers = sortedSpeakers
//     .filter((sp) => sp.name.toLowerCase().includes(search.toLowerCase()))
//     .slice(0, visibleCount);

//   const handleLoadMore = () => setVisibleCount(speakers.length);

//   return (
//     <div className="space-y-6 p-1">
//       <h1 className="text-xl font-semibold text-black mb-2">Speakers</h1>

//       {/* Sort & Search */}
//       <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
//         <div className="relative w-full sm:w-1/2">
//           <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="pl-9 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#00694A] focus:outline-none"
//           />
//         </div>

//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button
//               variant="outline"
//               className="border border-[#FF6600] text-[#FF6600] hover:bg-[#FF6600] hover:text-white flex items-center gap-2"
//             >
//               <SlidersHorizontal className="h-4 w-4" />
//               Sort By
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end" className="w-40">
//             <DropdownMenuItem
//               onClick={() => setSortBy("alphabetical")}
//               className={sortBy === "alphabetical" ? "bg-[#FF6600] text-white" : ""}
//             >
//               Newest First
//             </DropdownMenuItem>
//             <DropdownMenuItem
//               onClick={() => setSortBy("videos")}
//               className={sortBy === "videos" ? "bg-[#FF6600] text-white" : ""}
//             >
//               Popularity
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>

//       {/* Speakers Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 max-w-[1400px] mx-auto">
//         {filteredSpeakers.map((speaker) => (
//           <Link
//             key={speaker.id}
//             href={`/dashboard/speakers/${speaker.id}`}
//             className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white flex gap-4 items-center hover:shadow-md transition"
//           >
//             <div className="w-20 h-20 flex-shrink-0 rounded-full overflow-hidden bg-gray-100">
//               <Image
//                 src={speaker.image}
//                 alt={speaker.name}
//                 width={80}
//                 height={80}
//                 className="object-cover"
//               />
//             </div>

//             <div className="flex flex-col">
//               <h2 className="text-[#FF6600] font-semibold text-sm">{speaker.name}</h2>
//               <div className="flex items-center text-sm text-[#1A1A1A] mt-1">
//                 <CalendarDays className="w-4 h-4 mr-2 text-[#1A1A1A]" />
//                 <span>{speaker.institute}</span>
//               </div>
//               <div className="flex items-center text-sm text-[#1A1A1A] mt-1">
//                 <MapPin className="w-4 h-4 mr-2 text-[#1A1A1A]" />
//                 <span>{speaker.location}</span>
//               </div>
//               <div className="flex items-center text-sm text-[#1A1A1A] mt-1">
//                 <Video className="w-4 h-4 mr-2 text-[#1A1A1A]" />
//                 <span>{speaker.videos} Videos</span>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>

//       {visibleCount < speakers.length && (
//         <div className="text-center pt-4">
//           <Button
//             onClick={handleLoadMore}
//             className="text-white bg-[#00694A] hover:bg-[#004d36]"
//           >
//             Load More . . .
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }
