import Link from "next/link";

export default async function GetStartRenterPage() {
  return (
    <div className="auth-content-wrapper">
      <div className="space-y-4 py-8 lg:px-[8rem]">
        <h1 className="flex items-center text-2xl font-semibold text-gray-600">
          What Renters win!
        </h1>
        <div className="text-lg font-semibold text-gray-500">No Fees</div>
        <div className="text-lg font-semibold text-gray-500">
          Intuitive Booking Process
        </div>
        <div className="text-lg font-semibold text-gray-500">
          User Verified Listing Details
        </div>
        <div className="text-lg font-semibold text-gray-500">
          Real Time Pricing
        </div>
        <div className="text-lg font-semibold text-gray-500">
          Useful Reviews
        </div>
        <div className="text-lg font-semibold text-gray-500">No Search</div>
        <div className="flex flex-col items-center justify-center space-y-4 py-2">
          <Link
            className="w-[320px] rounded-md bg-primary px-8 py-4 text-center text-xl text-white"
            href="/auth/signin"
          >
            Join as a Renter
          </Link>
          <div className="px-4 py-2">
            If you don&#39;t have account, click here to{" "}
            <Link href="/auth/signup" className="font-semibold text-[#1890ff]">
              Sign Up.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
