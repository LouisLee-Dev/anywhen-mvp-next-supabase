import { RentalRequest } from "../schema";

interface IDashboardSectionProps {
  requests: RentalRequest[];
}

export default function DashboardSection({ requests }: IDashboardSectionProps) {
  return (
    <div className="page-content-wrapper">
      <div className="px-[8rem]">
        <h1 className="w-full">Rental Requests</h1>
        <div className="grid w-full grid-cols-3">
          <div className="col-span-1">
            {requests.map((t) => (
              <div key={t.id}>{t.location}</div>
            ))}
          </div>
          <div className="col-span-2"></div>
        </div>
      </div>
    </div>
  );
}
