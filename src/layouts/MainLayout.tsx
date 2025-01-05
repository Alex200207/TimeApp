import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { FC, PropsWithChildren } from "react";

interface MainLayoutProps extends PropsWithChildren {
    onAddCity: (newCity: string) => void;
  }


const MainLayout: FC<MainLayoutProps> = ({ children , onAddCity }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header onAddCity={onAddCity} />

      <main className="flex-grow flex justify-center items-center">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
