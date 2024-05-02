import AuthRequiredSection from "@/features/auth/sections/AuthRequiredSection";

export default async function Home() {
  return <AuthRequiredSection></AuthRequiredSection>;
}
