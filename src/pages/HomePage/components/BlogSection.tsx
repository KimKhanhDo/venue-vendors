import { BLOGS } from '@/data';
import BlogCard from './BlogCard';

const BlogSection = () => {
  return (
    <section className="container pt-0 pb-30">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-12 flex flex-col items-center text-center">
          {/* Badge */}
          <div className="bg-secondary/12 border-secondary/25 mb-8 flex items-center gap-2 rounded-full border px-5 py-2">
            <span className="bg-secondary h-2 w-2 rounded-full" />
            <p className="text-secondary text-sm font-medium tracking-widest uppercase">From Our Blog</p>
          </div>

          <h2 className="text-primary mb-4 text-3xl font-semibold">Insights &amp; Inspiration</h2>
          <p className="text-dark-100 text-md max-w-md leading-relaxed">
            Tips, trends and success stories to help you plan your perfect event.
          </p>
        </header>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
          {BLOGS.map((blog) => (
            <BlogCard key={blog.id} {...blog} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default BlogSection;
