import Link from "next/link";
import style from "./menu.module.scss";

export function Menu() {
  return (
    <ul className={style.menu}>
      <li className={style["menu-item"]}>
        <Link href="/">Home</Link>
      </li>
      <li className={style["menu-item"]}>
        <Link href="/contact">Contact</Link>
      </li>
      <li className={style["menu-item"]}>
        <Link href="/contact/team">Team</Link>
      </li>
      <li className={style["menu-item"]}>
        <Link href="/contact/about-us">About us</Link>
      </li>
      <li className={style["menu-item"]}>
        <Link href="/posts">Posts</Link>
      </li>
    </ul>
  );
}
