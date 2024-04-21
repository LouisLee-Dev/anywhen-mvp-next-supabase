import { HeartHandshakeIcon, StarIcon } from "lucide-react";

interface IPropertyCardProps {}

export default function PropertyCard() {
  return (
    <div className="w-full relative">
      <div className="absolute top-2 right-2 z-10 cursor-pointer hover:text-white">
        <HeartHandshakeIcon size={24}></HeartHandshakeIcon>
      </div>
      <div className="w-full aspect-square rounded-md relative">
        <img
          src="/assets/properties/1.webp"
          className="w-full h-full object-cover rounded-xl"
        ></img>
      </div>
      <div className="mt-3">
        <div className="flex items-center justify-between">
          <span className="font-semibold">Eefde, Netherlands</span>
          <span className="text-sm flex items-center">
            <StarIcon className="mr-1"></StarIcon> 4.88
          </span>
        </div>
        <div className="">Built in 1850</div>
        <div className="">May 9-14</div>
        <div className="flex items-center">
          <span className="font-medium"> $249 CAD </span>
          <span>night</span>
        </div>
      </div>
    </div>
  );
}
