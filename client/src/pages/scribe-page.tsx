export default function ScribePage() {
  return (
    <div className="flex-1 p-0">
      <div className="bg-white rounded border border-gray-200 h-full">
        <iframe
          src="https://scribe.athelas.com"
          className="w-full h-full border-0 rounded"
          title="Scribe"
        />
      </div>
    </div>
  );
}