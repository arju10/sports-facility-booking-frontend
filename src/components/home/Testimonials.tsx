import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  content: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Ahmed Rahman',
    role: 'Football Enthusiast',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    rating: 5,
    content: 'SportBook has revolutionized how our team books practice sessions. The platform is incredibly easy to use, and the facilities are always top-notch. Highly recommended!',
  },
  {
    id: 2,
    name: 'Fatima Khatun',
    role: 'Tennis Player',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    rating: 5,
    content: 'I love how I can check availability in real-time and book my favorite tennis court instantly. The payment process is smooth and secure. Great experience every time!',
  },
  {
    id: 3,
    name: 'Karim Hassan',
    role: 'Basketball Coach',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    rating: 5,
    content: 'As a coach, I need reliable booking for my training sessions. SportBook delivers every time. The customer support is excellent and always helpful.',
  },
  {
    id: 4,
    name: 'Sarah Ahmed',
    role: 'Swimming Instructor',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    rating: 5,
    content: 'Finding quality swimming pools for my classes was always a challenge until I discovered SportBook. Now I have access to the best facilities in the city!',
  },
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="bg-secondary py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="mb-2 inline-block rounded-full bg-primary/20 px-4 py-1 text-sm font-medium text-primary">
            Testimonials
          </span>
          <h2 className="mb-4 font-display text-3xl font-bold text-secondary-foreground md:text-4xl">
            What Our <span className="text-primary">Users Say</span>
          </h2>
          <p className="mx-auto max-w-2xl text-secondary-foreground/70">
            Don't just take our word for it. Here's what our satisfied customers have to say about
            their experience with SportBook.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative mx-auto max-w-4xl">
          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrev}
            className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 text-foreground shadow-lg hover:bg-background md:-left-12"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNext}
            className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 text-foreground shadow-lg hover:bg-background md:-right-12"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Testimonial Card */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl bg-background p-8 shadow-xl md:p-12"
          >
            <Quote className="mb-6 h-12 w-12 text-primary/20" />

            <p className="mb-8 text-lg text-foreground/80 md:text-xl">
              "{testimonials[currentIndex].content}"
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-primary/20"
                />
                <div>
                  <h4 className="font-display font-semibold text-foreground">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>

              <div className="flex gap-1">
                {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Dots Indicator */}
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-secondary-foreground/30 hover:bg-secondary-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
