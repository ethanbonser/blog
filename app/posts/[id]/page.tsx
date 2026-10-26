import { getPostData, getAllPostIds } from '@/lib/posts';
import Link from 'next/link';
import Image from 'next/image';

export const instant = false;

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths.map((path: any) => ({
    id: path.params.id,
  }));
}

export default async function Post({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const postData: any = getPostData(id);

  // Parse markdown images and convert to img tags
  const contentWithImages = postData.content.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    (match: string, alt: string, src: string) => {
      return `<img src="${src}" alt="${alt}" class="rounded-2xl my-8 w-full shadow-xl" />`;
    }
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 animate-gradient">
      <main className="max-w-4xl mx-auto px-6 py-16">
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-white/90 backdrop-blur-sm text-purple-600 font-semibold rounded-full hover:bg-white transition-all shadow-lg mb-8"
        >
          ← Back to all posts
        </Link>
        <article className="bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl">
          {postData.image && (
            <div className="relative h-72 w-full">
              <Image
                src={postData.image}
                alt={postData.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="p-10">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              {postData.title}
            </h1>
            <p className="text-lg text-purple-600 font-medium mb-8">📅 {postData.date}</p>
            <div className="prose prose-lg prose-purple max-w-none">
              <div
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: contentWithImages }}
              />
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
