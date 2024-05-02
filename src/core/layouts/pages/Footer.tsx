import {
  Copyright,
  MailIcon,
  PhoneIcon,
  LocateIcon,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <div className="w-full bg-[#1C2F4F] px-[8rem] py-[2rem] text-[#EAECF0]">
      <div className="grid grid-cols-5">
        <div className="space-y-4">
          <div className="text-2xl">anywhen</div>
          <div className="space-y-3">
            <div className="flex items-center">
              <PhoneIcon className="mr-2" size={18}></PhoneIcon>
              <span>+1 000 000 0000</span>
            </div>
            <div className="flex items-center">
              <MailIcon className="mr-2" size={18}></MailIcon>
              <span>support@anywhen.com</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2" size={18}></MapPin>
              <span>Toronto, Ontario, Canada</span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h6> Services </h6>
          <ul className="space-y-2">
            <li>Property Management</li>
            <li>Property Rental</li>
            <li>Property Sales</li>
            <li>Property Maintenance</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h6> Property Manager </h6>
          <ul className="space-y-2">
            <li>Property Management</li>
            <li>Property Rental</li>
            <li>Property Sales</li>
            <li>Property Maintenance</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h6> Renter </h6>
          <ul className="space-y-2">
            <li>Property Management</li>
            <li>Property Rental</li>
            <li>Property Sales</li>
            <li>Property Maintenance</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h6> Social </h6>
          <ul className="space-y-2">
            <li>Property Management</li>
            <li>Property Rental</li>
            <li>Property Sales</li>
            <li>Property Maintenance</li>
          </ul>
        </div>
      </div>
      {/* <div className="flex h-5 items-center space-x-4 text-sm">
        <div>
          <span className="text-lg text-gray-500">Features</span>
        </div>
        <div>
          <span className="text-lg text-gray-500">About</span>
        </div>
        <div>
          <span className="text-lg text-gray-500">Testmonials</span>
        </div>
        <div>
          <span className="text-lg text-gray-500">Contact</span>
        </div>
        <div>
          <span className="text-lg text-gray-500">Download</span>
        </div>
      </div> */}
      <div className="flex w-full flex-col items-center justify-center gap-2 pt-16">
        <span className="text-gray-400">Toronto, Ontario, Canada</span>
        <span className="flex items-center text-gray-400">
          <Copyright size={16} />
          <span className="ml-1">2024 anywhen Inc. All rights reserved.</span>
        </span>
      </div>
    </div>
  );
}
