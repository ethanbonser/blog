import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';
import Image from 'next/image';

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
          My Blog
        </h1>
        <div className="space-y-8">
          {allPostsData.map(({ id, date, title, excerpt, image }: any) => (
            <article key={id} className="bg-white dark:bg-zinc-900 rounded-lg overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800">
              {image && (
                <div className="relative h-48 w-full">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <Link href={`/posts/${id}`}>
                  <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {title}
                  </h2>
                </Link>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">{date}</p>
                <p className="text-zinc-700 dark:text-zinc-300 mt-3">{excerpt}</p>
                <Link
                  href={`/posts/${id}`}
                  className="inline-block mt-4 text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Read more →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
