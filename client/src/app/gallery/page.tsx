import Gallery3DTimeline from "@/components/Gallery/Gallery3DTimeline";

const page = () => {
  return (
    <main className="min-h-screen bg-primary-650">
      {/* Compact Hero Section */}
      <section className="relative pt-24 pb-8 md:pt-28 md:pb-12 overflow-hidden bg-primary-650">
        {/* Subtle background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary-350/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 text-center px-4">
          {/* Professional typography */}
          <p className="text-primary-350 text-xs md:text-sm tracking-[0.3em] uppercase font-medium mb-3">
            Moments Captured
          </p>
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-primary-200 to-white"
            style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "-0.02em" }}
          >
            Our Gallery
          </h1>
          <p 
            className="text-white/50 text-sm md:text-base max-w-lg mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Relive the moments of innovation and creativity
          </p>
        </div>

        {/* Decorative line */}
        <div className="flex justify-center mt-6">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary-350 to-transparent" />
        </div>
      </section>

      {/* 3D Timeline Gallery */}
      <Gallery3DTimeline />

      {/* Minimal footer section */}
      <section className="relative py-8 bg-primary-650">
        <div className="text-center">
          <p className="text-white/30 text-xs tracking-widest uppercase">
            Hover to pause • Click to expand
          </p>
        </div>
      </section>
    </main>
  );
};

export default page;
