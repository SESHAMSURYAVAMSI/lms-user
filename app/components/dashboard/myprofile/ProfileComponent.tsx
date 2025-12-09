"use client";

import { useState } from "react";
import type { ProfileData } from "@/app/types/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface Props {
  initialData: ProfileData;
  onProfileUpdate: (user: ProfileData) => void; // Function to update the global context
}

// Helper to get a valid image URL or a fallback
const getImageUrl = (path: string | null): string => {
    if (path) {
        if (path.startsWith("http")) return path;
        return `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL || ""}${path}`;
    }
    return '/profile.jpeg';
};

export default function ProfileComponent({ initialData, onProfileUpdate }: Props) {
  const [form, setForm] = useState<ProfileData>(initialData);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [previewPhoto, setPreviewPhoto] = useState<string>(getImageUrl(initialData.profilePhoto));
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = (name: keyof ProfileData, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhotoFile(file);
      setPreviewPhoto(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const formData = new FormData();
      
      // Append all text fields from the form state
      Object.keys(form).forEach(key => {
        // We don't need to send fields that shouldn't be updated, like _id
        // The backend handles which fields to update from what's provided.
        if (key !== '_id' && key !== 'profilePhoto') {
           formData.append(key, form[key as keyof ProfileData] || '');
        }
      });

      // Append the new photo file if one was selected
      if (photoFile) {
        formData.append('file', photoFile);
      }

      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
      const token = localStorage.getItem("token"); // Ensure this key is correct

      const response = await fetch(`${backendUrl}/auth/me`, {
        method: "PUT",
        headers: {
          // Do not set Content-Type; the browser does it for FormData
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to update profile.");
      }

      alert("Profile updated successfully!");
      
      const updatedUser = result.user;
      
      // Update the local form state
      setForm(updatedUser);
      // **CRUCIAL STEP**: Update the global context via the passed function
      onProfileUpdate(updatedUser); 
      // Update the preview image with the new URL from the server
      setPreviewPhoto(getImageUrl(updatedUser.profilePhoto));
      // Clear the temporarily stored file
      setPhotoFile(null);

    } catch (error: any) {
      alert(`Update Failed: ${error.message}`);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-[#F6FAFF] p-6 sm:p-8 rounded-xl ">
      <div className="mb-8 border-b pb-6 border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Photo</h2>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src={previewPhoto}
            alt="Profile Photo"
            width={100}
            height={100}
            className="rounded-full object-cover w-[100px] h-[100px] border-4 border-white shadow-md"
            onError={(e) => { (e.target as HTMLImageElement).src = '/profile.jpeg'; }}
          />
          <div>
            <Label htmlFor="photoUpload" className="text-orange-600 font-semibold cursor-pointer hover:underline text-lg">
              Select Photo
              <Input id="photoUpload" type="file" accept="image/*" className="sr-only" onChange={handlePhotoChange} />
            </Label>
            <p className="text-sm text-gray-600 mt-1">
              File size: Up to 5MB<br />
              Supported file types: JPG, JPEG, PNG
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" type="text" value={form.fullName || ''} onChange={(e) => handleChange("fullName", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="prefix">Prefix</Label>
            <Input id="prefix" type="text" value={form.prefix || ''} onChange={(e) => handleChange("prefix", e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="designation">Designation</Label>
            <Input id="designation" type="text" value={form.designation || ''} onChange={(e) => handleChange("designation", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="affiliationHospital">Affiliation/College/Hospital</Label>
            <Input id="affiliationHospital" type="text" value={form.affiliationHospital || ''} onChange={(e) => handleChange("affiliationHospital", e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile No.</Label>
            <Input id="mobile" type="tel" value={form.mobile || ''} onChange={(e) => handleChange("mobile", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={form.email || ''} disabled className="bg-gray-200 cursor-not-allowed" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select onValueChange={(value) => handleChange("country", value)} value={form.country || ''}>
                <SelectTrigger className="w-full"><SelectValue placeholder="-Select-" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="India">India</SelectItem>
                    <SelectItem value="USA">USA</SelectItem>
                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Select onValueChange={(value) => handleChange("state", value)} value={form.state || ''}>
                <SelectTrigger className="w-full"><SelectValue placeholder="-Select-" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="Telangana">Telangana</SelectItem>
                    <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="Karnataka">Karnataka</SelectItem>
                </SelectContent>
                </Select>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Select onValueChange={(value) => handleChange("city", value)} value={form.city || ''}>
                <SelectTrigger className="w-full"><SelectValue placeholder="-Select-" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                    <SelectItem value="Mumbai">Mumbai</SelectItem>
                    <SelectItem value="Bengaluru">Bengaluru</SelectItem>
                </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="pincode">Pincode</Label>
                <Input id="pincode" type="text" value={form.pincode || ''} onChange={(e) => handleChange("pincode", e.target.value)} />
            </div>
        </div>
        <div className="flex justify-start pt-4">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-2.5 rounded-lg w-32" disabled={isUpdating}>
            {isUpdating ? <Loader2 className="animate-spin" /> : "Update"}
          </Button>
        </div>
      </form>
    </div>
  );
}

