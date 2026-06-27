import React, { useState, useEffect } from 'react';

interface SafeImageProps {
  src?: string;
  alt?: string;
  className?: string;
  referrerPolicy?: string;
  loading?: 'lazy' | 'eager';
  onClick?: React.MouseEventHandler<HTMLImageElement>;
  style?: React.CSSProperties;
  fallbackType?: 'lab' | 'person' | 'graduation' | 'campus' | 'workshop' | 'general';
}

export default function SafeImage({ src, alt, fallbackType = 'general', className, ...props }: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [fallbackTriggered, setFallbackTriggered] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setFallbackTriggered(false);
  }, [src]);

  const handleImageError = () => {
    if (fallbackTriggered) return;
    setFallbackTriggered(true);

    let fallbackUrl = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"; // General Education fallback

    if (fallbackType === 'lab') {
      fallbackUrl = "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800"; // Modern tech lab
    } else if (fallbackType === 'person') {
      fallbackUrl = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=500"; // Educator/student professional
    } else if (fallbackType === 'graduation') {
      fallbackUrl = "https://images.unsplash.com/photo-1532649538693-f3a2ec1bf8bd?auto=format&fit=crop&q=80&w=800"; // Graduation celebration
    } else if (fallbackType === 'campus') {
      fallbackUrl = "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"; // Institute building
    } else if (fallbackType === 'workshop') {
      fallbackUrl = "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800"; // Seminar/Bootcamp
    }

    setImgSrc(fallbackUrl);
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleImageError}
      className={className}
      {...props}
    />
  );
}
