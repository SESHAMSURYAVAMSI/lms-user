import DashboardHeader from "@/app/components/common/DashboardHeader"; // <-- CORRECTED IMPORT PATH
import Sidebar from "@/app/components/common/Sidebar";
import Footor from "@/app/components/common/footer";
import { UserProvider } from "@/app/context/UserContext"; // Import the provider

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Wrap the entire layout with the UserProvider to make user data
    // available to all nested components, including the header.
    <UserProvider>
      <div className="flex min-h-screen font-poppins bg-[#FAFAFA]">
        {/* The Sidebar is assumed to have a fixed position and a width of 64 (w-64) */}
        <Sidebar />
        
        {/* Main content container with a left margin to account for the sidebar */}
        <div className="flex-1 ml-64 flex flex-col">
          {/* The Header is assumed to have a fixed position and a height of 20 (h-20) */}
          <DashboardHeader />
          
          {/* The main content area grows to fill available space */}
          <main className="mt-20 p-6 flex-1">
            {children}
          </main>

          {/* The Footer is placed at the bottom of the main content column */}
          <Footor />
        </div>
      </div>
    </UserProvider>
  );
}

