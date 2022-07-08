import React from "react";
import styles from "src/styles/Home.module.css";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="w-auto h-auto text-center">
      <a
        href="https://future-tech-association.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className={styles.logo}>
          <Image
            src="/futuretech_logo.svg"
            alt="futuretech Logo"
            width={216}
            height={48}
          />
        </span>
      </a>
    </footer>
  );
};
