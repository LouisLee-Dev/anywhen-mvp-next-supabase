"use Client";

import PropertyCategoriesSelector from "../components/PropertyCategoriesSelector";
import PropertyListSection from "../components/PropertyListSection";

export default function LandingSection() {
  return (
    <div className="w-full">
      <PropertyCategoriesSelector></PropertyCategoriesSelector>
      <PropertyListSection></PropertyListSection>
    </div>
  );
}
