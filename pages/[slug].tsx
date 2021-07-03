import fs from "fs/promises";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";

import { EnsayoMetadata, ensayoMetadataSchema } from "@/utils/validation";

type Props = {
  metadata: EnsayoMetadata;
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
  slug: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = await fs.readdir(path.join(process.cwd(), "ensayos"));
  const ensayos = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.substr(0, file.length - 3));

  return {
    fallback: false,
    paths: ensayos.map((ensayo) => ({ params: { slug: ensayo } })),
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  try {
    const filename = path.join(process.cwd(), "ensayos", `${params?.slug}.md`);

    const stats = await fs.stat(filename);
    if (!stats.isFile()) throw new Error();

    const rawdata = await fs.readFile(filename, { encoding: "utf-8" });

    const { content, data } = matter(rawdata);

    let metadata = ensayoMetadataSchema.parse(data);
    const source = await serialize(content, { scope: metadata });

    return {
      props: {
        metadata,
        source,
        slug: params?.slug as string,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default function EnsayoPage({ metadata, source, slug }: Props) {
  return (
    <div>
      <h1 className="text-center leading-none tracking-tight text-4xl sm:text-5xl md:text-7xl font-bold mt-8">
        {metadata.titulo}
      </h1>
      <div className="flex items-center justify-center gap-2 text-sm md:text-base mt-4 md:mt-8 mb-8">
        <div className="relative rounded-full overflow-hidden w-8 h-8 md:w-12 md:h-12">
          <Image
            src={`/autores/${metadata.autor.instagram}.jpg`}
            alt={metadata.autor.nombre}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div className="leading-none">
          <p>{metadata.autor.nombre}</p>
          <p className="text-gray-600 hover:text-red-500 transition-colors">
            <a
              href={`https://www.instagram.com/${metadata.autor.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              @{metadata.autor.instagram}
            </a>
          </p>
        </div>
      </div>
      <div className="prose prose-red lg:prose-xl mx-auto">
        <Image
          src={`/assets/${slug}/${metadata.cabezera.src}`}
          alt={metadata.cabezera.alt}
          width={700}
          height={400}
          objectFit="cover"
        />
        <MDXRemote {...source} />
      </div>
    </div>
  );
}
