import { Disclosure } from "@headlessui/react"
import { MenuIcon, XIcon } from "@heroicons/react/outline"
import Link from "next/link"
import Team from "../pages/team"

const navigation = ["Home", "Share", "How it Works", "Team"]

export default function Navbar({ lastUpdated }) {

  function onClick(event) {
    return (
      console.log(event)
    )
  }
  return (
    <Disclosure as="nav" className="shadow-lg bg-white w-full">
      {({ open }) => (
        <>
          <div className="flex items-center justify-between w-full h-16 px-4 lg:px-20">
            <div className="lg:flex lg:ml-8 mr-20 sm:ml-10">
              <svg
                width="146"
                height="27"
                viewBox="0 0 146 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.7859 9.94096C14.2018 6.6994 11.5166 4.19729 7.71553 4.19729C3.20826 4.19729 0 7.73119 0 13.2427C0 18.7542 3.20826 22.2881 7.71553 22.2881C11.5166 22.2881 14.2018 19.7774 14.7859 16.5445H13.1469C12.65 18.9606 10.514 20.7748 7.71553 20.7748C4.3329 20.7748 1.57798 18.1351 1.57798 13.2427C1.57798 8.36747 4.3329 5.71059 7.71553 5.71059C10.514 5.71059 12.65 7.53343 13.1469 9.94096H14.7859Z"
                  fill="#4F46EF"
                />
                <path
                  d="M46.2605 4.43804H44.5517L51.0467 22.0474H52.7903L59.2853 4.43804H57.5766L51.997 19.958H51.8401L46.2605 4.43804Z"
                  fill="#4F46EF"
                />
                <path
                  d="M63.9757 4.43804H62.3454V22.0474H63.9757V4.43804Z"
                  fill="#4F46EF"
                />
                <path
                  d="M73.9535 22.0474C79.3239 22.0474 82.3839 18.737 82.3927 13.1997C82.3927 7.72259 79.3762 4.43804 74.2674 4.43804H68.7227V22.0474H73.9535ZM70.353 20.6029V5.88256H74.1715C78.5044 5.88256 80.806 8.64261 80.8147 13.1997C80.8147 17.7998 78.4608 20.6029 73.8576 20.6029H70.353Z"
                  fill="#4F46EF"
                />
                <path
                  d="M87.2595 22.1764C87.957 22.1764 88.515 21.6175 88.515 20.9382C88.515 20.2503 87.957 19.7 87.2595 19.7C86.5708 19.7 86.0041 20.2503 86.0041 20.9382C86.0041 21.6175 86.5708 22.1764 87.2595 22.1764Z"
                  fill="#4F46EF"
                />
                <path
                  d="M96.3547 22.3483C98.5866 22.3483 99.9466 21.1274 100.505 19.958H100.6V22.0474H102.152V13.0793C102.152 9.53684 99.4497 8.65981 97.4009 8.65981C95.3521 8.65981 93.2424 9.45945 92.3357 11.6176L93.809 12.1421C94.2972 11.0071 95.5091 10.0355 97.4445 10.0355C99.4758 10.0355 100.6 11.1361 100.6 12.9418V13.2513C100.6 14.2487 99.345 14.2659 97.0958 14.5411C94.0706 14.9108 91.9521 15.7448 91.9521 18.3587C91.9521 20.9038 93.9224 22.3483 96.3547 22.3483ZM96.564 20.9468C94.8116 20.9468 93.5039 20.0268 93.5039 18.4275C93.5039 16.8282 94.8291 16.1575 97.0958 15.8824C98.1942 15.7534 100.147 15.5127 100.6 15.0741V16.983C100.6 19.1497 99.0399 20.9468 96.564 20.9468Z"
                  fill="#4F46EF"
                />
                <path
                  d="M106.28 22.0474H107.832V13.5179C107.832 11.5574 109.358 10.1387 111.45 10.1387C111.86 10.1387 112.243 10.2075 112.383 10.2247V8.66841C112.174 8.65981 111.816 8.64261 111.563 8.64261C109.881 8.64261 108.442 9.53684 107.902 10.8696H107.789V8.84037H106.28V22.0474Z"
                  fill="#4F46EF"
                />
                <path
                  d="M115.031 22.0474H116.583V13.5866C116.583 11.5316 117.969 10.0699 119.826 10.0699C121.657 10.0699 122.72 11.2737 122.72 13.0621V22.0474H124.307V13.3545C124.307 11.4543 125.458 10.0699 127.498 10.0699C129.268 10.0699 130.445 11.1189 130.445 13.1997V22.0474H131.997V13.1997C131.997 10.2419 130.453 8.66841 127.969 8.66841C126.016 8.66841 124.604 9.60562 124.002 11.0673H123.889C123.296 9.57123 122.119 8.66841 120.271 8.66841C118.518 8.66841 117.211 9.50244 116.679 10.8696H116.539V8.84037H115.031V22.0474Z"
                  fill="#4F46EF"
                />
                <path
                  d="M136.706 27C138.38 27 139.61 26.0542 140.325 24.1368L146 8.86617L144.309 8.84037L140.333 20.0268H140.211L136.236 8.84037H134.553L139.479 22.1764L138.991 23.5177C138.25 25.5125 137.203 25.865 135.625 25.3749L135.207 26.7249C135.521 26.871 136.096 27 136.706 27Z"
                  fill="#4F46EF"
                />
                <path
                  d="M30.4999 24.1372C24.3815 24.1372 19.3756 19.2 19.3756 13.1657C19.3756 7.13142 24.3815 2.19428 30.4999 2.19428C36.6182 2.19428 41.6242 7.13142 41.6242 13.1657C41.6242 19.2 36.6182 24.1372 30.4999 24.1372ZM30.4999 3.29142C24.9377 3.29142 20.488 7.68 20.488 13.1657C20.488 18.6514 24.9377 23.04 30.4999 23.04C36.062 23.04 40.5117 18.6514 40.5117 13.1657C40.5117 7.68 36.062 3.29142 30.4999 3.29142Z"
                  fill="#4F46EF"
                />
                <path
                  d="M30.4997 5.48572C30.166 5.48572 29.9435 5.26629 29.9435 4.93715V0.548572C29.9435 0.219429 30.166 0 30.4997 0C30.8335 0 31.0559 0.219429 31.0559 0.548572V4.93715C31.0559 5.26629 30.8335 5.48572 30.4997 5.48572Z"
                  fill="#4F46EF"
                />
                <path
                  d="M30.4997 5.48572C30.166 5.48572 29.9435 5.26629 29.9435 4.93715V0.548572C29.9435 0.219429 30.166 0 30.4997 0C30.8335 0 31.0559 0.219429 31.0559 0.548572V4.93715C31.0559 5.26629 30.8335 5.48572 30.4997 5.48572Z"
                  fill="#4F46EF"
                />
                <path
                  d="M43.2927 13.7143H38.843C38.5093 13.7143 38.2868 13.4949 38.2868 13.1657C38.2868 12.8366 38.5093 12.6171 38.843 12.6171H43.2927C43.6264 12.6171 43.8489 12.8366 43.8489 13.1657C43.8489 13.4949 43.6264 13.7143 43.2927 13.7143Z"
                  fill="#4F46EF"
                />
                <path
                  d="M30.4997 26.3315C30.166 26.3315 29.9435 26.112 29.9435 25.7829V21.3943C29.9435 21.0652 30.166 20.8457 30.4997 20.8457C30.8335 20.8457 31.0559 21.0652 31.0559 21.3943V25.7829C31.0559 26.112 30.8335 26.3315 30.4997 26.3315Z"
                  fill="#4F46EF"
                />
                <path
                  d="M22.1564 13.7143H17.7067C17.373 13.7143 17.1505 13.4949 17.1505 13.1657C17.1505 12.8366 17.373 12.6171 17.7067 12.6171H22.1564C22.4902 12.6171 22.7127 12.8366 22.7127 13.1657C22.7127 13.4949 22.4902 13.7143 22.1564 13.7143Z"
                  fill="#4F46EF"
                />
                <path
                  d="M37.4043 18.081C37.3934 18.6736 36.8931 19.1504 36.286 19.1341C35.4917 19.1127 34.9716 18.2637 35.3567 17.5557L34.0724 16.4701C32.9189 17.679 31.2651 18.2404 29.6277 18.0113C29.4817 17.9908 29.3917 17.8428 29.4401 17.7054L29.7835 16.7313C29.825 16.6135 29.7618 16.4848 29.6424 16.4439C29.4985 16.3945 29.3776 16.4696 29.339 16.5789C29.2642 16.7912 28.7723 18.1869 28.6944 18.4078C28.9277 18.5613 29.0817 18.8232 29.0817 19.12C29.0817 19.5919 28.6926 19.9756 28.2141 19.9756C27.7356 19.9756 27.3466 19.5919 27.3466 19.12C27.3466 18.6385 27.7521 18.2471 28.2465 18.2651L28.4459 17.6996C27.531 17.3374 26.7456 16.7224 26.1802 15.9419L25.3965 16.4408C25.6477 17.1077 25.1815 17.817 24.4817 17.8823C23.8086 17.9452 23.2443 17.3988 23.2908 16.738C23.3543 15.8341 24.4765 15.4039 25.1409 16.0513L25.9246 15.5527C24.9075 13.836 25.0076 11.6732 26.2096 10.0477L25.2936 9.32494C24.5849 9.889 23.5234 9.38936 23.5234 8.48966C23.5234 7.89796 24.0116 7.41648 24.6115 7.41648C25.4147 7.41648 25.9436 8.2517 25.5878 8.96282C25.6695 9.02724 28.0031 10.8685 28.0487 10.9045C28.1542 10.9877 28.3101 10.9669 28.3888 10.8559C28.4606 10.7546 28.4342 10.6143 28.3364 10.5371L27.0487 9.52116C26.9334 9.43017 26.9301 9.25754 27.0427 9.16336C28.6559 7.81512 30.8778 7.61858 32.6607 8.51437L33.0003 7.92316C32.2611 7.26556 32.7368 6.05324 33.7283 6.05324C34.3283 6.05324 34.8165 6.53473 34.8165 7.12643C34.8165 7.84734 34.1067 8.36381 33.4094 8.15248C33.2295 8.46558 32.7709 9.26403 32.5786 9.59892C32.5119 9.71489 32.5576 9.86336 32.6812 9.92236C32.794 9.97619 32.9302 9.92828 32.9919 9.82076L33.3203 9.2491C33.3938 9.12121 33.567 9.0929 33.6799 9.18877C34.3659 9.77098 34.8943 10.529 35.192 11.3913L35.6699 11.255C35.6391 10.83 36.0125 10.375 36.5369 10.375C37.034 10.375 37.4346 10.7892 37.4027 11.2861C37.3744 11.7255 37.0015 12.077 36.5552 12.0861C36.2439 12.0925 35.9686 11.9364 35.8108 11.6979L35.3229 11.8371C35.6803 13.3081 35.3562 14.8857 34.3789 16.118L35.6632 17.2036C36.3908 16.6634 37.4205 17.2007 37.4043 18.081ZM28.0818 14.7257C28.7142 14.7257 29.2287 14.2183 29.2287 13.5945C29.2287 12.9708 28.7142 12.4633 28.0818 12.4633C27.4494 12.4633 26.9348 12.9708 26.9348 13.5945C26.9348 14.2183 27.4494 14.7257 28.0818 14.7257ZM30.0228 10.578C30.2822 10.578 30.4933 10.3698 30.4933 10.1139C30.4933 9.85803 30.2822 9.64986 30.0228 9.64986C29.7633 9.64986 29.5522 9.85803 29.5522 10.1139C29.5522 10.3698 29.7633 10.578 30.0228 10.578ZM34.0224 13.6815C34.0224 12.642 33.1649 11.7962 32.1108 11.7962C31.0568 11.7962 30.1992 12.642 30.1992 13.6815C30.1992 14.7211 31.0568 15.5669 32.1108 15.5669C33.1649 15.5669 34.0224 14.7211 34.0224 13.6815ZM32.1108 12.2603C31.3162 12.2603 30.6698 12.8979 30.6698 13.6815C30.6698 14.4652 31.3162 15.1028 32.1108 15.1028C32.9054 15.1028 33.5519 14.4652 33.5519 13.6815C33.5519 12.8979 32.9054 12.2603 32.1108 12.2603ZM28.0818 12.9274C27.7088 12.9274 27.4054 13.2267 27.4054 13.5945C27.4054 13.9624 27.7088 14.2616 28.0818 14.2616C28.4548 14.2616 28.7582 13.9624 28.7582 13.5945C28.7582 13.2267 28.4548 12.9274 28.0818 12.9274Z"
                  fill="#4F46EF"
                />
              </svg>
              <p className="lg:mx-6 sm:mx-1 sm:text-xs text-sm lg:pt-2 text-gray-400">
                Last updated {Math.floor((Date.now() - lastUpdated)/60000)} minutes ago
              </p>
            </div>
            <div className="hidden md:block sm:ml-20 sm:mr-0 space-x-4 justify-end lg:ml-20">
              <Link href='/'>
                <a className="hover:bg-gray-700 text-gray focus:bg-red hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
              </Link>
              <Link href='/coming'>
                <a className="hover:bg-gray-700 text-gray hover:text-white px-3 py-2 rounded-md text-sm font-medium">Blog</a>
              </Link>
              <Link href='/coming'>
                <a className="hover:bg-gray-700 text-gray hover:text-white px-3 py-2 rounded-md text-sm font-medium">Share</a>
              </Link>
              <Link href='/team'>
                <a className="hover:bg-gray-700 text-gray hover:text-white px-3 py-2 rounded-md text-sm font-medium">Team</a>
              </Link>
              {/* {navigation.map((item, itemIdx) =>
                itemIdx === 0 ? (
                  <a
                    key={item}
                    href={"/"+item.toLocaleLowerCase()}
                    className="bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {item}
                  </a>
                ) : (
                  <a
                    key={item}
                    href="#"
                    className="text-gray-300 hover:bg-gray-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {item}
                  </a>
                )
              )} */}
            </div>
            <div className="-mr-2 flex md:hidden">
              {/* Mobile menu button */}
              <Disclosure.Button className="bg-gray-300 inline-flex items-center justify-center p-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-white">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
          </div>
          <Disclosure.Panel className="md:hidden">
            <div className="px-2 grid pt-2 pb-3 space-y-1 sm:px-3">
              {/* {navigation.map((item, itemIdx) => (
                <a
                  key={item}
                  href="/"
                  className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  {item}
                </a>
              ))} */}
              <Link href='/'>
                <a className="hover:bg-gray-700 text-gray hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
              </Link>
              <Link href='/coming'>
                <a className="hover:bg-gray-700 text-gray hover:text-white px-3 py-2 rounded-md text-sm font-medium">Blog</a>
              </Link>
              <Link href='/coming'>
                <a className="hover:bg-gray-700 text-gray hover:text-white px-3 py-2 rounded-md text-sm font-medium">Share</a>
              </Link>
              <Link href='/team'>
                <a className="hover:bg-gray-700 text-gray hover:text-white px-3 py-2 rounded-md text-sm font-medium">Team</a>
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
