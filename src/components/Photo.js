import Image from "next/image";

// A gallery photo (from @/lib/gallery) that fills its positioned parent, with a blur-up placeholder.
export default function Photo({ photo, sizes = "(min-width: 1024px) 33vw, 100vw", className = "", alt, ...rest }) {
  return (
    <Image
      src={photo.src}
      alt={alt ?? photo.alt}
      fill
      sizes={sizes}
      placeholder="blur"
      blurDataURL={photo.blur}
      className={`object-cover ${className}`}
      {...rest}
    />
  );
}
