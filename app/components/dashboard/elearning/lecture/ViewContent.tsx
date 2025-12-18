import Image from "next/image";
import { LectureAsset } from "@/app/data/elearning/lectureContent";

export default function ViewContent({
  assets,
}: {
  assets: LectureAsset[];
}) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-4">
      <h2 className="text-lg font-semibold text-[#252641] text-center">
        View Content
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {assets.map((asset, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 flex items-center gap-4"
          >
            {/* IMAGE */}
            {asset.type === "image" && (
              <Image
                src={asset.url}
                alt={asset.title}
                width={120}
                height={80}
                className="rounded-md object-cover"
              />
            )}

            {/* PDF / DOC */}
            {(asset.type === "pdf" || asset.type === "doc") && (
              <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-lg text-sm font-medium">
                {asset.type.toUpperCase()}
              </div>
            )}

            <div className="flex-1">
              <p className="text-sm font-medium mb-2">
                {asset.title}
              </p>

              <div className="flex gap-3">
                <a
                  href={asset.url}
                  target="_blank"
                  className="px-3 py-1.5 text-xs rounded-md bg-[#1F5C9E] text-white"
                >
                  View
                </a>

                <a
                  href={asset.url}
                  download
                  className="px-3 py-1.5 text-xs rounded-md border border-[#1F5C9E] text-[#1F5C9E]"
                >
                  Download
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
