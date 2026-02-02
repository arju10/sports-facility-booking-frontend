import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award, Heart } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';

const teamMembers = [
  {
    name: 'Ahmed Rahman',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    bio: 'Sports enthusiast with 15+ years in sports facility management.',
  },
  {
    name: 'Fatima Khatun',
    role: 'Chief Technology Officer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    bio: 'Tech leader passionate about building seamless digital experiences.',
  },
  {
    name: 'Karim Hassan',
    role: 'Head of Operations',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    bio: 'Operations expert ensuring smooth facility partnerships.',
  },
  {
    name: 'Sarah Ahmed',
    role: 'Customer Success Lead',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    bio: 'Dedicated to making every booking experience memorable.',
  },
];

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To make sports facility booking effortless and accessible for everyone, promoting an active and healthy lifestyle.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We partner only with premium facilities that meet our high standards for quality and safety.',
  },
  {
    icon: Heart,
    title: 'Passion for Sports',
    description: 'Every team member shares a deep passion for sports and understands the importance of quality venues.',
  },
  {
    icon: Users,
    title: 'Community First',
    description: 'We\'re building a community of sports enthusiasts who share our vision of accessible sports for all.',
  },
];

const milestones = [
  { year: '2020', title: 'SportBook Founded', description: 'Started with just 10 facilities in Dhaka.' },
  { year: '2021', title: 'Reached 100 Facilities', description: 'Expanded across major cities in Bangladesh.' },
  { year: '2022', title: '10,000 Happy Users', description: 'Milestone of satisfied customers achieved.' },
  { year: '2023', title: 'Mobile App Launch', description: 'Launched iOS and Android applications.' },
  { year: '2024', title: '500+ Premium Facilities', description: 'Now the largest sports booking platform in Bangladesh.' },
];

const About: React.FC = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-background pt-20">
        {/* Hero Section */}
        <section className="bg-secondary py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-3xl text-center"
            >
              <span className="mb-2 inline-block rounded-full bg-primary/20 px-4 py-1 text-sm font-medium text-primary">
                About Us
              </span>
              <h1 className="mb-6 font-display text-4xl font-bold text-secondary-foreground md:text-5xl">
                Empowering Sports, <span className="text-primary">One Booking</span> at a Time
              </h1>
              <p className="text-lg text-secondary-foreground/70">
                SportBook was born from a simple idea: everyone deserves easy access to quality
                sports facilities. We're on a mission to connect sports enthusiasts with the
                perfect venues for their games.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 font-display text-3xl font-bold">
                Our <span className="text-primary">Values</span>
              </h2>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl border bg-card p-6 text-center"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-semibold">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-muted/50 py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 font-display text-3xl font-bold">
                Meet Our <span className="text-primary">Team</span>
              </h2>
              <p className="text-muted-foreground">
                The passionate people behind SportBook
              </p>
            </motion.div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group rounded-xl border bg-card p-6 text-center transition-shadow hover:shadow-lg"
                >
                  <div className="relative mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-110"
                    />
                  </div>
                  <h3 className="font-display font-semibold">{member.name}</h3>
                  <p className="mb-2 text-sm text-primary">{member.role}</p>
                  <p className="text-xs text-muted-foreground">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 font-display text-3xl font-bold">
                Our <span className="text-primary">Journey</span>
              </h2>
            </motion.div>

            <div className="mx-auto max-w-3xl">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative flex gap-6 pb-8 last:pb-0"
                >
                  <div className="flex flex-col items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {milestone.year}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="h-full w-0.5 bg-primary/20" />
                    )}
                  </div>
                  <div className="pt-2">
                    <h3 className="font-display font-semibold">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default About;
