import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="py-4">
      <Link href="/">
        <div className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Pokemon Logo"
            className="mr-2 w-10 h-10"
            width={40}
            height={40}
          />
          <h1 className="text-3xl font-bold text-gray-900">Pokédex</h1>
        </div>
      </Link>
    </header>
  );
};

export default Header;
