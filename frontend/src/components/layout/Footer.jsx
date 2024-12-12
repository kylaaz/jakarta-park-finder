function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#2D5A27] to-[#1F3F1B] text-white py-6 sm:py-8 mt-12 sm:mt-16">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col items-center space-y-4 sm:space-y-6">
          <div className="flex flex-col items-center space-y-2">
            <img src="/logo_jakartaparkfinder.png" alt="Jakarta Park Finder" className="h-16 sm:h-18 md:h-20" />
            <span className="text-xl sm:text-2xl font-semibold">Jakarta Park Finder</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-300">&copy; 2024 Jakarta Park Finder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
