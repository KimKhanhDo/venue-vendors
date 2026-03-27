interface IBlogCardProps {
  img: string;
  tag: string;
  title: string;
  desc: string;
  price: number;
}

const BlogCard = ({ img, tag, title, desc, price }: IBlogCardProps) => {
  return (
    <article className="bg-background border-secondary/18 group flex cursor-pointer flex-col overflow-hidden rounded-2xl border shadow-sm shadow-black/5 [transition:var(--transition-smooth)] hover:shadow-black/10">
      {/* Image */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={img}
          alt={title}
          className="h-full w-full object-cover [transition:var(--transition-smooth)] group-hover:scale-105"
        />
        {/* Tag */}
        <span className="bg-secondary/90 absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-medium text-white">
          {tag}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-4 py-5">
        {/* Title & Desc */}
        <div className="mb-4">
          <h3 className="text-primary mb-2 line-clamp-2 text-lg leading-snug font-medium wrap-break-word">{title}</h3>
          <p className="text-dark-100 line-clamp-3 text-sm leading-relaxed">{desc}</p>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price & Button */}
        <div className="border-secondary/12 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-dark-100 text-xs">Starting from</span>
            <p className="text-primary text-xl font-semibold">${price}</p>
          </div>
          <button className="bg-secondary hover:bg-secondary/80 w-full shrink-0 cursor-pointer rounded-full px-5 py-2 text-sm font-semibold text-white [transition:var(--transition-smooth)] hover:-translate-y-0.5 sm:w-auto">
            Book Now
          </button>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
