export default function VideoContent({ url }: { url?: string }) {
  if (!url) return null;

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="text-lg font-semibold text-center mb-4">
        Video Content
      </h2>

      <div className="aspect-video rounded-xl overflow-hidden shadow">
        <iframe
          src={url}
          className="w-full h-full"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </div>
    </div>
  );
}
