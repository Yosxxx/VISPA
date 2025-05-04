// components/ProfileCard.tsx
import Image from "next/image";

export default function ProfilePicture() {
  return (
    <section className="flex flex-col items-center text-center p-6  dark:bg-gray-900 rounded-lg max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>

      <div className="w-40 h-40 relative mb-4">
        <Image
          src="/Image/profile-picture.jpg" // Replace with your actual path
          alt="Profile Picture"
          layout="fill"
          objectFit="cover"
          className="rounded-full border-2 border-white shadow-md"
        />
      </div>

      <h2 className="text-xl font-semibold">hani</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Joined February 2025
      </p>
    </section>
  );
}
