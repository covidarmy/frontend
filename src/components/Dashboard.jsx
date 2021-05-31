import * as React from 'react';
import WhatsappLogo from '../assets/whatsapp.svg';
import LocationFilter from './LocationFilter';
import ResourceFilter from './ResourceFilter';
import TweetsList from './TweetsList';
import Footer from './Footer';
import { isDesktop, isMobile, isTablet } from 'react-device-detect';

const FAB = () => {
    return (
        <div className="shadow-2xl rounded-full p-2 bg-green-600 fixed bottom-6 right-6 w-12 cursor-pointer">
            <a
                href="https://wa.me/917404255034?text=Hi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Whatsapp Bot"
            >
                <WhatsappLogo />
            </a>
        </div>
    );
};

export const Dashboard = () => {
    return (
        <>
            <main className="container mx-auto p-2 grid grid-cols-1 md:grid-cols-2 md:gap-8 lg:mt-4">
                <div className="flex flex-col">
                    <LocationFilter />
                    <ResourceFilter />
                    {isDesktop && <Footer />}
                </div>
                <TweetsList />
            </main>
            {(isMobile || isTablet) && <FAB />}
        </>
    );
};
