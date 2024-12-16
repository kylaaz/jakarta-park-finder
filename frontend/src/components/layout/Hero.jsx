function Hero() {
  const scrollToMainContent = () => {
    document.getElementById('main-content').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative min-h-[500px] md:min-h-[550px] lg:min-h-[600px] flex items-center justify-center"
      style={{
        backgroundImage: `
          linear-gradient(to bottom,
          #2D5A27,
          #2D5A27 10%,
          #3F7A3A 30%,
          #538D4D 60%,
          #85B06C 80%,
          #FFFFFF)
        `,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-6xl font-bold text-white mb-6">Jakarta Park Finder</h1>
        <p className="text-xl text-white mb-10">
          Discover, Explore, and Connect with Jakarta&apos;s Urban Green Spaces
        </p>

        <div className="flex justify-center space-x-6">
          <button
            onClick={scrollToMainContent}
            className="bg-white text-green-800 px-8 py-3 rounded-full hover:bg-green-50 transition"
          >
            Explore Map
          </button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white/20 transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
