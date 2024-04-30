import AuthRequiredSection from "@/features/auth/sections/AuthRequiredSection";

export default async function Home() {
  return (
    <div className="page-content-wrapper">
      <AuthRequiredSection></AuthRequiredSection>
    </div>
  );
}
