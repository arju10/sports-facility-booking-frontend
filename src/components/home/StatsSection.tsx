import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Building2, Users, Calendar, Trophy } from 'lucide-react';

interface Stat {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  color: string;
}

const stats: Stat[] = [
  {
    icon: Building2,
    value: 500,
    suffix: '+',
    label: 'Premium Facilities',
    color: 'primary',
  },
  {
    icon: Users,
    value: 10000,
    suffix: '+',
    label: 'Happy Users',
    color: 'accent',
  },
  {
    icon: Calendar,
    value: 50000,
    suffix: '+',
    label: 'Successful Bookings',
    color: 'success',
  },
  {
    icon: Trophy,
    value: 100,
    suffix: '%',
    label: 'Satisfaction Rate',
    color: 'primary',
  },
];

const AnimatedCounter: React.FC<{ target: number; suffix: string }> = ({ target, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const StatsSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-secondary to-primary/20 py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-5" />

      <div className="container relative mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-2 inline-block rounded-full bg-primary/20 px-4 py-1 text-sm font-medium text-primary">
            Our Impact
          </span>
          <h2 className="mb-4 font-display text-3xl font-bold text-secondary-foreground md:text-4xl">
            Trusted by <span className="text-primary">Thousands</span>
          </h2>
          <p className="mx-auto max-w-2xl text-secondary-foreground/70">
            Join our growing community of sports enthusiasts who trust SportBook for their facility
            booking needs.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="stats-counter group relative overflow-hidden rounded-2xl bg-background/10 p-8 text-center backdrop-blur-sm transition-all hover:bg-background/20"
            >
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-${stat.color}/20`}
              >
                <stat.icon className={`h-8 w-8 text-${stat.color}`} />
              </motion.div>

              {/* Counter */}
              <div className="mb-2 font-display text-4xl font-bold text-secondary-foreground">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>

              {/* Label */}
              <p className="text-secondary-foreground/70">{stat.label}</p>

              {/* Glow Effect */}
              <div className={`absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-${stat.color}/10 blur-3xl transition-all group-hover:bg-${stat.color}/20`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
