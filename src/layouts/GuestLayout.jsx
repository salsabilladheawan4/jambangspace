import React from 'react';
import NavbarGuest from '../components/NavbarGuest';
import FooterGuest from '../components/FooterGuest';
import LandingPage from '../pages/LandingPage';

const GuestLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#faf6f1] font-sans" style={{ fontFamily: "'Georgia', serif" }}>
      <NavbarGuest />
      <main>
        <LandingPage/>
      </main>
      <FooterGuest />
    </div>
  );
};

export default GuestLayout;