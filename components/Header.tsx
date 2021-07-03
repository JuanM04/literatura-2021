import clsx from "clsx";
import Link from "next/link";

export default function Header({ bigHeader = false }) {
  return (
    <header className="mb-4 max-w-screen-xl border-b-2 border-black mx-auto">
      <p
        className={clsx(
          "font-black uppercase tracking-widest text-red-500 text-center",
          bigHeader ? "text-6xl sm:text-7xl mt-16 mb-8" : "text-4xl mt-8 mb-4"
        )}
      >
        <Link href="/">
          <a>Ensayos</a>
        </Link>
      </p>
      <nav className="flex justify-center items-center gap-4 sm:gap-8 px-2 text-sm sm:text-base text-center leading-none">
        <a href="#sobre-el-proyecto">Sobre el proyecto</a>
        <a href="#">Versión impresa</a>
        <a href="#">Escribinos una reseña</a>
      </nav>
    </header>
  );
}
