import Link from "next/link";
import { Outfit } from "next/font/google";
import style from "./page.module.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  weight: ["600"],
});

export default function Button(props) {
  return (
    <button
      className={style.button}
      style={{ backgroundColor: props.bgcolor }}
      type="button"
    >
      <Link
        href={`/${props.route}`}
        className={`${outfit.className} ${props.text}`}
      >
        {props.text}
      </Link>
    </button>
  );
}
