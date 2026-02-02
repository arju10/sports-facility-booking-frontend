import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Facility {
  id: string;
  name: string;
  image: string;
  location: string;
  pricePerHour: number;
  type: string;
}

const mockFacilities: Facility[] = [
  {
    id: '1',
    name: 'Premium Football Stadium',
    image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    location: 'Gulshan, Dhaka',
    pricePerHour: 2500,
    type: 'Football',
  },
  {
    id: '2',
    name: 'Elite Tennis Complex',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    location: 'Dhanmondi, Dhaka',
    pricePerHour: 1800,
    type: 'Tennis',
  },
  {
    id: '3',
    name: 'Indoor Basketball Arena',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    location: 'Banani, Dhaka',
    pricePerHour: 2200,
    type: 'Basketball',
  },
  {
    id: '4',
    name: 'Olympic Swimming Pool',
    image: 'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    location: 'Uttara, Dhaka',
    pricePerHour: 1500,
    type: 'Swimming',
  },
  {
    id: '5',
    name: 'Badminton Center',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    location: 'Mirpur, Dhaka',
    pricePerHour: 1200,
    type: 'Badminton',
  },
  {
    id: '6',
    name: 'Cricket Training Ground',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    location: 'Mohammadpur, Dhaka',
    pricePerHour: 3000,
    type: 'Cricket',
  },
];

const FeaturedFacilities: React.FC = () => {
  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="mb-2 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            Top Venues
          </span>
          <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">
            Featured <span className="text-primary">Facilities</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Explore our handpicked selection of premium sports facilities. From football fields to
            swimming pools, find the perfect venue for your next game.
          </p>
        </motion.div>

        {/* Facilities Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockFacilities.map((facility, index) => (
            <motion.div
              key={facility.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="sport-card group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={facility.image}
                  alt={facility.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                  {facility.type}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="mb-2 font-display text-lg font-semibold text-card-foreground">
                  {facility.name}
                </h3>

                <div className="mb-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{facility.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>৳{facility.pricePerHour}/hr</span>
                  </div>
                </div>

                <Link to={`/facilities/${facility.id}`}>
                  <Button variant="outline" className="w-full group/btn">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link to="/facilities">
            <Button size="lg" className="glow-button gap-2">
              View All Facilities
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedFacilities;
