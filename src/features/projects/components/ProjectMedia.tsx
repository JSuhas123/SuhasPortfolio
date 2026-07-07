import type { ProjectImage } from "@/data/projects/types";
import Image from "next/image";

interface ProjectMediaProps {
  readonly images: readonly ProjectImage[];
}

/**
 * Responsive image gallery for project screenshots and diagrams.
 * Uses next/image for optimization. Caption shown below each image.
 * Layout: 1 column on mobile, 2 columns on tablet+.
 */
export function ProjectMedia({ images }: ProjectMediaProps) {
  if (images.length === 0) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {images.map((img) => (
        <figure
          key={img.alt}
          className="border-border bg-surface-raised overflow-hidden rounded-xl border"
        >
          <div className="relative aspect-video">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="(min-width: 640px) 50vw, 100vw"
              loading="lazy"
            />
          </div>
          {img.caption && (
            <figcaption className="text-muted px-4 py-2.5 text-xs">
              {img.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
