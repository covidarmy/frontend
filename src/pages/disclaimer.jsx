import * as React from 'react';
import Footer from '~/components/Footer';
import Navbar from '~/components/Navbar';
import path from 'path';
import fs from 'fs';
import { useTranslation } from '~/context/translation';

const DisclaimerPage = ({ disclaimer }) => {
    const { t } = useTranslation();
    return (
        <div className="w-screen">
            <Navbar />
            <div className="container mx-auto py-10 px-4 lg:px-0">
                <h1 className="font-bold text-5xl mb-6">{t('DISCLAIMER')}</h1>
                {disclaimer.split('\n').map((x, idx) => (
                    <p className="my-8" key={idx}>
                        {x}
                    </p>
                ))}
            </div>
            <Footer />
        </div>
    );
};

export const getStaticProps = async () => {
    const disclaimer = fs.readFileSync(
        path.resolve(process.cwd(), 'data/disclaimer.txt'),
        'utf8'
    );
    return { props: { disclaimer } };
};

export default DisclaimerPage;
