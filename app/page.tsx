import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';
import Image from 'next/image';

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 animate-gradient">
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
            ✨ ChillVibez Blog ✨
          </h1>
          <p className="text-xl text-white/90 drop-shadow-md">
            A chill space for thoughts, ideas, and inspiration
          </p>
        </div>
        <div className="space-y-8">
          {allPostsData.map(({ id, date, title, excerpt, image }: any) => (
            <article
              key={id}
              className="bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-300"
            >
              {image && (
                <div className="relative h-56 w-full">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-8">
                <Link href={`/posts/${id}`}>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-purple-700 hover:to-pink-700 transition-all">
                    {title}
                  </h2>
                </Link>
                <p className="text-sm text-purple-600 dark:text-purple-400 mt-2 font-medium">
                  📅 {date}
                </p>
                <p className="text-gray-700 mt-4 text-lg leading-relaxed">{excerpt}</p>
                <Link
                  href={`/posts/${id}`}
                  className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl"
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
