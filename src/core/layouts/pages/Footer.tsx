import { Separator } from "@/components/ui/separator";
import { Copyright } from "lucide-react";
export default function Footer() {
  return (
    <div className="bottom-0 flex h-52 w-full flex-col items-center justify-center bg-gray-100">
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>
          <span className="text-xl text-gray-500">Features</span>
        </div>
        <Separator orientation="vertical" />
        <div>
          <span className="text-xl text-gray-500">About</span>
        </div>
        <Separator orientation="vertical" />
        <div>
          <span className="text-xl text-gray-500">Testmonials</span>
        </div>
        <Separator orientation="vertical" />
        <div>
          <span className="text-xl text-gray-500">Contact</span>
        </div>
        <Separator orientation="vertical" />
        <div>
          <span className="text-xl text-gray-500">Download</span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 pt-4">
        <span className="text-lg text-gray-400">Toronto, Ontario, Canada</span>
        <span className="flex items-center text-lg text-gray-400">
          <Copyright className="h-5 w-5" />
          2024 anwhen.com All rights reserved.
        </span>
      </div>
    </div>
  );
}
