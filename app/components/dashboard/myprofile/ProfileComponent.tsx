"use client";

import { useEffect, useState } from "react";
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
import { useUser } from "@/app/context/UserContext";

interface Props {
  initialData: ProfileData;
}

export default function ProfileComponent({ initialData }: Props) {
  const { user, updateUser } = useUser();

  const [form, setForm] = useState<ProfileData>(initialData);
  const [previewPhoto, setPreviewPhoto] = useState<string>(
    initialData.profilePhoto || "/profile.jpeg"
  );
  const [isUpdating, setIsUpdating] = useState(false);

  /* ✅ SYNC FORM FROM CONTEXT */
  useEffect(() => {
    if (user) {
      setForm(user as ProfileData);
      setPreviewPhoto(user.profilePhoto || "/profile.jpeg");
    }
  }, [user]);

  const handleChange = (
    name: keyof ProfileData,
    value: string
  ) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);

      setPreviewPhoto(imageUrl);
      setForm((prev) => ({
        ...prev,
        profilePhoto: imageUrl,
      }));
    }
  };

  /* ✅ UPDATE CONTEXT (HEADER UPDATES INSTANTLY) */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    setTimeout(() => {
      updateUser({
        ...form,
        profilePhoto: previewPhoto,
      });
      setIsUpdating(false);
      alert("Profile updated successfully!");
    }, 600);
  };

  return (
    <div className="bg-[#F6FAFF] rounded-2xl p-6 sm:p-8 card-shadow">
      
      {/* PROFILE PHOTO */}
      <div className="mb-8 border-b pb-6 border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Profile Photo
        </h2>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src={previewPhoto}
            alt="Profile Photo"
            className="rounded-full object-cover w-[100px] h-[100px] border-4 border-white shadow-md"
            onError={(e) =>
              ((e.target as HTMLImageElement).src =
                "/profile.jpeg")
            }
          />

          <div>
            <Label
              htmlFor="photoUpload"
              className="text-orange-600 font-semibold cursor-pointer hover:underline text-lg"
            >
              Select Photo
            </Label>
            <Input
              id="photoUpload"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handlePhotoChange}
            />
            <p className="text-sm text-gray-600 mt-1">
              File size: Up to 5MB <br />
              Supported file types: JPG, JPEG, PNG
            </p>
          </div>
        </div>
      </div>

      {/* PROFILE FORM */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Full Name + Prefix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input
              value={form.fullName || ""}
              onChange={(e) =>
                handleChange("fullName", e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Prefix</Label>
            <Input
              value={form.prefix || ""}
              onChange={(e) =>
                handleChange("prefix", e.target.value)
              }
            />
          </div>
        </div>

        {/* Designation + Affiliation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Designation</Label>
            <Input
              value={form.designation || ""}
              onChange={(e) =>
                handleChange("designation", e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Affiliation / College / Hospital</Label>
            <Input
              value={form.affiliationHospital || ""}
              onChange={(e) =>
                handleChange(
                  "affiliationHospital",
                  e.target.value
                )
              }
            />
          </div>
        </div>

        {/* Mobile + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Mobile No.</Label>
            <Input
              value={form.mobile || ""}
              onChange={(e) =>
                handleChange("mobile", e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              value={form.email || ""}
              disabled
              className="bg-gray-200 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Country + State */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Country</Label>
            <Select
              value={form.country || ""}
              onValueChange={(v) =>
                handleChange("country", v)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="-Select-" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="India">India</SelectItem>
                <SelectItem value="USA">USA</SelectItem>
                <SelectItem value="United Kingdom">
                  United Kingdom
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>State</Label>
            <Select
              value={form.state || ""}
              onValueChange={(v) =>
                handleChange("state", v)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="-Select-" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Telangana">
                  Telangana
                </SelectItem>
                <SelectItem value="Maharashtra">
                  Maharashtra
                </SelectItem>
                <SelectItem value="Karnataka">
                  Karnataka
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* City + Pincode */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>City</Label>
            <Select
              value={form.city || ""}
              onValueChange={(v) =>
                handleChange("city", v)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="-Select-" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Hyderabad">
                  Hyderabad
                </SelectItem>
                <SelectItem value="Mumbai">
                  Mumbai
                </SelectItem>
                <SelectItem value="Bengaluru">
                  Bengaluru
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Pincode</Label>
            <Input
              value={form.pincode || ""}
              onChange={(e) =>
                handleChange("pincode", e.target.value)
              }
            />
          </div>
        </div>

        {/* SUBMIT */}
        <div className="flex justify-center pt-4">
          <Button
            type="submit"
            disabled={isUpdating}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-2.5 rounded-lg w-32"
          >
            {isUpdating ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Update"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
