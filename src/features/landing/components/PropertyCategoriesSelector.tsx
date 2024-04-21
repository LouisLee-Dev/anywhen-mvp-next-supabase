import { HotelIcon } from "lucide-react";

interface IPropertyCategoriesSelector {}

export default function PropertyCategoriesSelector() {
  return (
    <div className="flex items-center space-x-4 px-[80px]">
      <div className="flex flex-col items-center justify-center space-y-2 p-3 border-b-2 border-white text-gray-600 hover:cursor-pointer hover:text-black hover:border-primary">
        <div>
          <HotelIcon size={24}></HotelIcon>
        </div>
        <div className="text-sm"> Hotel </div>
      </div>
      <div className="flex flex-col items-center justify-center space-y-2 p-3 border-b-2 border-white text-gray-600 hover:cursor-pointer hover:text-black hover:border-primary">
        <div>
          <HotelIcon size={24}></HotelIcon>
        </div>
        <div className="text-sm"> Hotel </div>
      </div>
    </div>
  );
}
