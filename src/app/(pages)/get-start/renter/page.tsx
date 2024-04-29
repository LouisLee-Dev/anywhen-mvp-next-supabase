import RenterSignInSection from "@/features/get-start/RenterSignInSection";
export default function GetStartRenter() {
  return (
    <div className="w-full">
      <div className="flex flex-col lg:px-[8rem]">
        <div className="flex flex-col items-center justify-center">
          <RenterSignInSection />
        </div>
      </div>
    </div>
  );
}
