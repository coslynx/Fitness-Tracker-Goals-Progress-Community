import React from 'react';
import Image from 'next/image';

const Logo = () => {
  return (
    <Image
      src="/public/images/logo.svg"
      alt="Fitness Tracker Logo"
      width={100}
      height={30}
      className="cursor-pointer"
    />
  );
};

export default Logo;