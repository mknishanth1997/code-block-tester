type DisplayProps = {
  children: React.ReactNode;
};

export default function Display({ children }: DisplayProps) {
  return (
    <div className="mx-auto w-full max-w-3xl rounded-[28px] border border-zinc-700 bg-zinc-900 p-4 shadow-2xl">
      {/* Fake Browser Header */}
      <div className="mb-4 flex items-center justify-between border-b border-zinc-700 pb-3">
        {/* Browser dots */}
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>

        {/* Fake URL */}
        <p className="text-sm text-zinc-400">live-preview</p>
      </div>

      {/* Screen */}
      <div className="min-h-[300px] rounded-2xl border border-zinc-800 bg-white p-6 text-black">
        {children}
      </div>
    </div>
  );
}
