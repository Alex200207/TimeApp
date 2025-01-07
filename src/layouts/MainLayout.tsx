import { FC, PropsWithChildren } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { City, WeatherApiResponse } from "@/types";

interface MainLayoutProps extends PropsWithChildren {
  onAddCity: (newCity: City) => void;
  weather: WeatherApiResponse | null;
}

const MainLayout: FC<MainLayoutProps> = ({ children, onAddCity, }) => {

  return (
    <div className="flex flex-col min-h-screen relative">
   

      <Header onAddCity={onAddCity} />

      <main className="flex-grow flex justify-center items-center w-full px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">{children}</div>
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
