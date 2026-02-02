import React from 'react';
import { motion } from 'framer-motion';
import { Search, CalendarCheck, Trophy } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Search',
    description: 'Browse through our extensive list of premium sports facilities and find the perfect venue for your game.',
    color: 'primary',
  },
  {
    icon: CalendarCheck,
    title: 'Book',
    description: 'Select your preferred date and time slot. Secure your booking with our easy and safe payment process.',
    color: 'accent',
  },
  {
    icon: Trophy,
    title: 'Play',
    description: 'Show up at your booked venue and enjoy your game. It\'s that simple! No hassle, just sports.',
    color: 'success',
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="bg-muted/50 py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-2 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            Easy Process
          </span>
          <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Book your favorite sports facility in just three simple steps. Our streamlined process
            makes it easy to get on the field.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-1/2 top-24 hidden h-0.5 w-2/3 -translate-x-1/2 bg-gradient-to-r from-primary via-accent to-success lg:block" />

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative text-center"
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-secondary text-sm font-bold text-secondary-foreground">
                  {index + 1}
                </div>

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-${step.color}/10 shadow-lg`}
                >
                  <step.icon className={`h-12 w-12 text-${step.color}`} />
                </motion.div>

                {/* Content */}
                <h3 className="mb-3 font-display text-xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
