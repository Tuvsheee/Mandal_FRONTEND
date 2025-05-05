import React from "react";
import { 
  Tv, Wifi, Bed, Shirt, Bath, ShowerHead, Coffee, UtensilsCrossed, 
  Waves, WashingMachine, Microwave, Thermometer, AirVent, Car, Snowflake, 
  Lightbulb, ParkingCircle, Lock, Speaker, Fan, Sofa, AlarmCheck, 
  BaggageClaim, Dumbbell, Leaf, ChefHat, DoorOpen, Key 
} from "lucide-react";

// Define the service options array
const serviceOptions = [
  { name: "Cable TV", icon: <Tv />, value: "cable_tv" },
  { name: "Wi-Fi", icon: <Wifi />, value: "wifi" },
  { name: "Bedsheets", icon: <Bed />, value: "bedsheets" },
  { name: "Closet & Iron", icon: <Shirt />, value: "closet_iron" },
  { name: "Bathtub", icon: <Bath />, value: "bathtub" },
  { name: "Shower", icon: <ShowerHead />, value: "shower" },
  { name: "Towels", icon: <Waves />, value: "towels" },
  { name: "Washing machine", icon: <WashingMachine />, value: "washing_machine" },
  { name: "Kettle", icon: <Thermometer />, value: "kettle" },
  { name: "Microwave", icon: <Microwave />, value: "microwave" },
  { name: "Kitchen utensils", icon: <UtensilsCrossed />, value: "kitchen_utensils" },
  { name: "Coffee machine", icon: <Coffee />, value: "coffee_machine" },
  { name: "Air Conditioning", icon: <Snowflake />, value: "air_conditioning" },
  { name: "Heating", icon: <Thermometer />, value: "heating" },
  { name: "Ventilation", icon: <AirVent />, value: "ventilation" },
  { name: "Private Parking", icon: <ParkingCircle />, value: "private_parking" },
  { name: "Car Rental", icon: <Car />, value: "car_rental" },
  { name: "Smart Lock", icon: <Lock />, value: "smart_lock" },
  { name: "Security Alarm", icon: <AlarmCheck />, value: "security_alarm" },
  { name: "Sound System", icon: <Speaker />, value: "sound_system" },
  { name: "Ceiling Fan", icon: <Fan />, value: "ceiling_fan" },
  { name: "Sofa Bed", icon: <Sofa />, value: "sofa_bed" },
  { name: "Luggage Storage", icon: <BaggageClaim />, value: "luggage_storage" },
  { name: "Gym / Fitness", icon: <Dumbbell />, value: "gym" },
  { name: "Eco-friendly", icon: <Leaf />, value: "eco_friendly" },
  { name: "Restaurant Service", icon: <ChefHat />, value: "restaurant_service" },
  { name: "Keyless Entry", icon: <Key />, value: "keyless_entry" },
  { name: "24/7 Room Service", icon: <DoorOpen />, value: "room_service" },
  { name: "Energy-efficient Lights", icon: <Lightbulb />, value: "energy_lights" },
];

interface Service {
  name: string;
  icon: JSX.Element;
  value: string;
}

interface ServiceListProps {
  services: string[]; 
}

const ServiceList: React.FC<ServiceListProps> = ({ services }) => {
  // Filter only the services that match the backend data
  const filteredServices: Service[] = serviceOptions.filter((service) =>
    services.includes(service.value)
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {filteredServices.length > 0 ? (
        filteredServices.map((service: Service) => (
          <div
            key={service.value}
            className="flex items-center gap-2 p-3   dark:bg-gray-800"
          >
            {service.icon}
            <span className="text-lg">{service.name}</span>
          </div>
        ))
      ) : (
        <p>No services available.</p>
      )}
    </div>
  );
};

export default ServiceList;
