import React from "react";
import Image from "next/image";

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <span className="text-xl font-bold">VISPA</span>
      </div>

      {/* Navigation Links */}
      <div className="flex w-full justify-evenly mx-3 lg:w-1/2 lg:mr-auto">
        {["Home", "Learn", "Play", "Awards", "About"].map((link) => (
          <a
            key={link}
            href={`/${link.toLowerCase()}`}
            className="text-gray-700 hover:text-black transition-colors"
          >
            {link}
          </a>
        ))}
      </div>

      {/* Profile Picture */}
      <div className="flex items-center rounded-full">
        <Image
          src="/Image/profile-picture.jpg"
          alt="Profile Picture"
          width={40}
          height={40}
          className="rounded-full border border-gray-300"
        />
      </div>
    </nav>
  );
};

export default Navbar;
