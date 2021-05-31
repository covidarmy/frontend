import * as React from "react";
import WhatsappLogo from "../assets/whatsapp.svg";
import LocationFilter from "./LocationFilter";
import ResourceFilter from "./ResourceFilter";
import TweetsList from "./TweetsList";
import Footer from "./Footer";
import { isDesktop, isMobile, isTablet } from "react-device-detect";

export const Dashboard = () => {
  return (
    <>
      <main className="container mx-auto p-2 grid md:grid-cols-2 md:gap-8 lg:mt-4">
        <div className="flex flex-col">
          <LocationFilter />
          <ResourceFilter />
          {isDesktop && <Footer />}
        </div>
        <div>
          <TweetsList />
          <div className="shadow-2xl rounded-full p-2 bg-green-600 fixed bottom-3 right-6 w-12 cursor-pointer">
            <a
              href="https://wa.me/917404255034?text=Hi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Whatsapp Bot"
            >
              <WhatsappLogo />
            </a>
          </div>
          {(isMobile || isTablet) && <Footer />}
        </div>
      </main>
    </>
  );
};
