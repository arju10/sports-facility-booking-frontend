import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen overflow-hidden hero-gradient">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-30" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
        />
      </div>

      <div className="container relative mx-auto flex min-h-screen items-center px-4 pt-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-primary/20 px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
              #1 Sports Booking Platform
            </motion.span>

            <h1 className="mb-6 font-display text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Book Your Perfect{' '}
              <span className="gradient-text">Sports Venue</span>{' '}
              Today
            </h1>

            <p className="mb-8 max-w-lg text-lg text-white/70">
              Discover and book premium sports facilities near you. From football fields to tennis
              courts, find the perfect venue for your game with just a few clicks.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/facilities">
                <Button size="lg" className="glow-button group gap-2 text-lg">
                  Book Now
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-white/20 bg-transparent text-lg text-white hover:bg-white/10"
              >
                <Play className="h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex flex-wrap gap-8"
            >
              {[
                { value: '500+', label: 'Facilities' },
                { value: '10K+', label: 'Happy Users' },
                { value: '50K+', label: 'Bookings' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="font-display text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image/Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main Image Card */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Sports Facility"
                  className="h-[500px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -left-8 top-20 rounded-xl bg-white p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-2xl">⚽</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Football Field</div>
                    <div className="text-sm text-muted-foreground">Available Now</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -right-8 bottom-20 rounded-xl bg-white p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                    <span className="text-2xl">🎾</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Tennis Court</div>
                    <div className="text-sm text-muted-foreground">3 Slots Left</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/50"
        >
          <span className="text-sm">Scroll Down</span>
          <div className="h-10 w-6 rounded-full border-2 border-white/30 p-1">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-2 w-2 rounded-full bg-white/50"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
