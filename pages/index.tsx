import clsx from "clsx";
import fs from "fs/promises";
import matter from "gray-matter";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import path from "path";

import { EnsayoMetadata, ensayoMetadataSchema } from "@/utils/validation";

type Props = {
  ensayos: (EnsayoMetadata & { slug: string })[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const files = await fs.readdir(path.join(process.cwd(), "ensayos"));

  const ensayos = await Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const rawdata = await fs.readFile(
          path.join(process.cwd(), "ensayos", file),
          { encoding: "utf-8" }
        );
        const { data } = matter(rawdata);

        return {
          ...ensayoMetadataSchema.parse(data, {
            errorMap: (issue) => ({
              message: `El campo \`${issue.path.join(
                "."
              )}\` es inválido en ${file}`,
            }),
          }),
          slug: file.substr(0, file.length - 3),
        };
      })
  );

  return {
    props: {
      ensayos: [
        ...ensayos,
        ...ensayos,
        ...ensayos,
        ...ensayos,
        ...ensayos,
        ...ensayos,
        ...ensayos,
        ...ensayos,
        ...ensayos,
        ...ensayos,
        ...ensayos,
        ...ensayos,
        ...ensayos,
        ...ensayos,
        ...ensayos,
        ...ensayos,
        ...ensayos,
        ...ensayos,
        ...ensayos,
        ...ensayos,
      ],
    },
    revalidate: 60 * 60 * 24,
  };
};

function Homepage({ ensayos }: Props) {
  const anomalies = [
    "xl:col-start-2 xl:col-end-4 xl:row-start-1 xl:row-end-3",
    "xl:col-start-1 xl:col-end-4 xl:row-start-4",
    "xl:col-start-2 xl:col-end-4 xl:row-start-7",
    "xl:col-start-1 xl:col-end-3 xl:row-start-[8]",
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 justify-center">
      {ensayos.map((ensayo, i) => {
        const anormal = anomalies.length > i;

        return (
          <div
            key={ensayo.slug}
            className={clsx(
              "relative w-full min-h-[300px] rounded-lg overflow-hidden shadow hover:shadow-xl transition-shadow",
              anormal && anomalies[i]
            )}
          >
            <Image
              src={`/assets/${ensayo.slug}/${ensayo.cabezera.src}`}
              alt={ensayo.cabezera.alt}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
            <Link href={`/${ensayo.slug}`}>
              <a className="relative w-full h-full flex justify-center items-center backdrop-brightness-50 hover:backdrop-brightness-[0.75] transition-all">
                <p
                  className={clsx(
                    "text-white font-bold drop-shadow",
                    anormal ? "text-5xl" : "text-3xl"
                  )}
                >
                  {ensayo.titulo}
                </p>
              </a>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

Homepage.bigHeader = true;

export default Homepage;
