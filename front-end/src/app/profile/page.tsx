import Navbar from "@/components/ui/navbar";
import FloatingNavbar from "@/components/ui/floating-navbar";
import ProfileStats from "@/components/profile/ProfileStats";

import ProfilePicture from "@/components/profile/ProfilePicture";
import ContinueCourseSection from "@/components/home/ContinueCourseSection";
import FooterSection from "@/components/home/FooterSection";

export default async function Profile() {
  return (
    <div className="relative  w-full h-screen">
      <Navbar />
      <FloatingNavbar />
      <div className="flex md:flex-row justify-center mx-auto w-fit items-center gap-10 flex-col mt-24">
        <ProfilePicture />
        <ProfileStats />
      </div>
      <ContinueCourseSection />
      <FooterSection />
    </div>
  );
}
