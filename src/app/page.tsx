"use client"
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <a href = "/dashboard">
          <Image
            className={styles.logo}
            src="/Cedric Millar Logo.png"
            alt="Next.js logo"
            width={180}
            height={180}
            priority
          />
        </a>
      </main>
    </div>
    
  );
}
