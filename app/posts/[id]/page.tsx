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
      return `<img src="${src}" alt="${alt}" class="rounded-lg my-6 w-full" />`;
    }
  );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <main className="max-w-3xl mx-auto px-6 py-16">
        <Link
          href="/"
          className="inline-block text-blue-600 dark:text-blue-400 hover:underline mb-8"
        >
          ← Back to all posts
        </Link>
        <article className="bg-white dark:bg-zinc-900 rounded-lg overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800">
          {postData.image && (
            <div className="relative h-64 w-full">
              <Image
                src={postData.image}
                alt={postData.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="p-8">
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
              {postData.title}
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8">{postData.date}</p>
            <div className="prose prose-zinc dark:prose-invert max-w-none">
              <div
                className="text-zinc-700 dark:text-zinc-300"
                dangerouslySetInnerHTML={{ __html: contentWithImages }}
              />
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
