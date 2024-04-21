import PropertyCard from "./PropertyCard";

interface IPropertyListSectionProps {}

export default function PropertyListSection() {
  return (
    <div className="w-full px-[80px]">
      <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-1 gap-6">
        <PropertyCard></PropertyCard>
        <PropertyCard></PropertyCard>
        <PropertyCard></PropertyCard>
        <PropertyCard></PropertyCard>
        <PropertyCard></PropertyCard>
        <PropertyCard></PropertyCard>
      </div>
    </div>
  );
}
