import React from "react";
import Link from "next/link";
import { Title } from "@mantine/core";

export const Header = () => {
  return (
    <header className="flex justify-center gap-4 py-6 text-gray-600 bg-gray-200">
      <Link href="/">
        <a className=" md:text-xl lg:text-4xl items-center text-center flex justify-items-center">
          <Title>案件管理システム</Title>
        </a>
      </Link>
    </header>
  );
};
