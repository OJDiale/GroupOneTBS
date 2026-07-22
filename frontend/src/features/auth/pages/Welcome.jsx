import { useState } from 'react';
import Header from '../../../shared/components/Header';
import Footer from '../../../shared/components/Footer';
import backGr from '../../../resources/home-back.jpeg';
import bus from '../../../resources/welcome-bus.png';
import areyengIcon from '../../../resources/areyeng-icon.png';
import tshwaneIcon from '../../../resources/tshwane-logo.jpg';

export default function Welcome() {
  const [language, setLanguage] = useState('en');

  return (
    <div className="min-h-screen flex flex-col bg-emerald-50">
      <Header />

      <main
        className="flex-1 flex items-center justify-center px-4 py-10"
        style={{
          backgroundImage: `url(${backGr})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="flex items-center gap-20 max-w-7xl mx-auto">

          {/* Bus Image */}
          <div className="w-2/5 rounded">
            <img
              src={bus}
              alt="Bus"
              className="w-full h-auto scale-125 rounded-[58px]"
            />
          </div>

          {/* Right Section */}
          <div className="w-3/5 ml-12">

            {/* Large Heading */}
            <h1 className="text-5xl font-bold text-[#163233] leading-tight mb-5">
              Manage your bus card online
            </h1>

            {/* Smaller Heading */}
            <p className="text-3xl font-semibold italic text-[#707275] text-center mb-8 max-w-3xl">
              Your bus card, now in your pocket. No queues. No cash. Just virtual payments.
            </p>

            {/* Information Card */}
            <div className="max-w-4xl rounded-[58px] bg-[#FCFDFE]/70 border border-[#F5F9FD] p-10 shadow-xl text-center sm:p-12">

              <label className="block text-3xl font-semibold italic text-[#595a5a] mb-8">
                Managing your A Re Yeng or Tshwane bus card has never been easier.
                Top up your balance, track your trips, and access your virtual
                card all online, without visiting a station.
              </label>

              {/* Logos */}
              <div className="flex justify-center items-center gap-10">
                <img
                  src={areyengIcon}
                  alt="A Re Yeng"
                  className="w-24 h-auto opacity-80 mix-blend-multiply"
                />

                <img
                  src={tshwaneIcon}
                  alt="Tshwane"
                  className="w-28 h-auto rounded-xl opacity-80 mix-blend-multiply"
                />
              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}