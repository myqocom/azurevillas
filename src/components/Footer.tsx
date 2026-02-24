export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <span className="text-xl font-serif text-white">Azzura Villas</span>
          </div>

          <div className="text-center text-sm">
            <p>
              Copyright {currentYear} Azzura Villas. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
