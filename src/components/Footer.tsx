import { AiFillGithub, AiFillTwitterCircle } from 'react-icons/ai';
import VercelLogo from '~/assets/vercel.svg';

const Footer = () => {
    return (
        <footer className="mt-2 fixed md:relative left-0 right-0 bottom-0 flex flex-row items-center justify-between px-3 lg:px-6 py-2 bg-white dark:bg-gray-800 border-t z-10">
            <div className="flex items-center">
                <a
                    href="https://github.com/covidarmy/frontend/"
                    className="p-2 -ml-2"
                    aria-label="Github"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <AiFillGithub className="text-3xl text-black" />
                </a>

                <a
                    href="https://twitter.com/covid_army"
                    className="p-2"
                    aria-label="Twitter"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <AiFillTwitterCircle className="text-3xl text-blue-500" />
                </a>
            </div>

            <a
                href="https://vercel.com/?utm_source=Covidarmy&utm_campaign=oss"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
            >
                Powered by
                <div className="ml-2">
                    <VercelLogo />
                </div>
            </a>
        </footer>
    );
};

export default Footer;
