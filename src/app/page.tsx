import { TripApp } from "@/components/TripApp";
import tripData from "@/data/trip.json";
import type { TripData } from "@/types/trip";

export default function Home() {
  return <TripApp initialData={tripData as TripData} />;
}
