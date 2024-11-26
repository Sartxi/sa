'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [section, setSection] = useState();
  
  return (
    <div className={styles.page}>
      <Image
        className={styles.logo}
        src="/sa_icon.svg"
        alt="SA logo"
        width={280}
        height={130}
        priority
      />
      {section}
    </div>
  );
}
