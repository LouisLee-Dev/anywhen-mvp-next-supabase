import {
  Copyright,
  MailIcon,
  PhoneIcon,
  LocateIcon,
  MapPin,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full bg-[#1C2F4F] lg:px-[8rem] px-4 lg:py-6 py-2 text-[#EAECF0]">
      <div className="lg:grid lg:grid-cols-5 flex flex-col gap-1">
        <div className="space-y-4">
          <div className="text-2xl">anywhen</div>
          <div className="space-y-3">
            <div className="flex items-center">
              <PhoneIcon className="mr-2" size={18}></PhoneIcon>
              <span>+1 000 000 0000</span>
            </div>
            <div className="flex items-center">
              <MailIcon className="mr-2" size={18}></MailIcon>
              <Link href="/contact"><span>Contact Us</span></Link>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2" size={18}></MapPin>
              <span>Toronto, Ontario, Canada</span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h3> Services </h3>
          <ul className="space-y-2 pl-2">
            <li>Property Management</li>
            <li>Property Rental</li>
            <li>Property Maintenance</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3> Property Manager </h3>
          <ul className="space-y-2 pl-2">
            <li>Property Management</li>
            <li>Property Rental</li>
            <li>Property Maintenance</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3> Renter </h3>
          <ul className="space-y-2 pl-2">
            <li>Property Management</li>
            <li>Property Rental</li>
            <li>Property Maintenance</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3> Social </h3>
          <ul className="space-y-2 pl-2">
            <li>Property Management</li>
            <li>Property Rental</li>
            <li>Property Maintenance</li>
          </ul>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-2 lg:pt-8 pt-2">
        <span className="text-gray-400">Toronto, Ontario, Canada</span>
        <span className="flex items-center text-gray-400">
          <Copyright size={16} />
          <span className="ml-1">2024 anywhen Inc. All rights reserved.</span>
        </span>
      </div>
    </div>
  );
}
