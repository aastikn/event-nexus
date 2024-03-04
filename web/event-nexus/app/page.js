import Image from "next/image";
import styles from "./page.module.css";
import { Roboto, Outfit } from "next/font/google";
import Button from "./button";
import Vartext from "./vartext";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <section className={styles.headingSection}>
          <div className={`${styles.heading} ${outfit.className} `}>
            Need a<br></br>
            <Vartext /> ?
          </div>
          <div className={`${styles.subheading} ${roboto.className} `}>
            Find and hire top-notch services effortlessly.
          </div>
          <div className={styles.buttons}>
            <Button text="SIGN UP" route="user/signup" bgcolor="#8989E2"></Button>
            <Button text="LOG IN" route="user/login" bgcolor="#000000"></Button>
          </div>
        </section>
        <section className={styles.rightSection}>
          <Image
            src="/landing-graphic.svg"
            alt="landing-graphic"
            layout="responsive"
            width={100}
            height={100}
            loading="eager"
          />
        </section>
      </div>
    </>
  );
}
