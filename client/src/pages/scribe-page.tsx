export default function ScribePage() {
  return (
    <div className="w-full h-full">
      <iframe
        src="https://scribe.athelas.com"
        className="w-full h-full border-0"
        title="Scribe"
        style={{ minHeight: '600px', height: '100vh' }}
      />
    </div>
  );
}