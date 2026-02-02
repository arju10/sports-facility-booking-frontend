// import React, { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { motion } from 'framer-motion';
// import { Search, MapPin, Clock, Filter, X } from 'lucide-react';
// import MainLayout from '@/components/layout/MainLayout';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Slider } from '@/components/ui/slider';
// import { Link } from 'react-router-dom';
// import facilityService, { Facility } from '@/services/facilityService';

// // Mock data for development
// const mockFacilities: Facility[] = [
//   {
//     _id: '1',
//     name: 'Premium Football Stadium',
//     description: 'Professional-grade football stadium with natural grass and floodlights.',
//     image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
//     location: 'Gulshan, Dhaka',
//     pricePerHour: 2500,
//     isDeleted: false,
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
//   {
//     _id: '2',
//     name: 'Elite Tennis Complex',
//     description: 'Indoor and outdoor tennis courts with professional equipment.',
//     image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
//     location: 'Dhanmondi, Dhaka',
//     pricePerHour: 1800,
//     isDeleted: false,
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
//   {
//     _id: '3',
//     name: 'Indoor Basketball Arena',
//     description: 'State-of-the-art indoor basketball court with AC and seating.',
//     image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
//     location: 'Banani, Dhaka',
//     pricePerHour: 2200,
//     isDeleted: false,
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
//   {
//     _id: '4',
//     name: 'Olympic Swimming Pool',
//     description: 'Olympic-sized swimming pool with changing rooms and lockers.',
//     image: 'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
//     location: 'Uttara, Dhaka',
//     pricePerHour: 1500,
//     isDeleted: false,
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
//   {
//     _id: '5',
//     name: 'Badminton Center',
//     description: 'Multiple badminton courts with professional flooring.',
//     image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
//     location: 'Mirpur, Dhaka',
//     pricePerHour: 1200,
//     isDeleted: false,
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
//   {
//     _id: '6',
//     name: 'Cricket Training Ground',
//     description: 'Full-sized cricket ground with practice nets and pavilion.',
//     image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
//     location: 'Mohammadpur, Dhaka',
//     pricePerHour: 3000,
//     isDeleted: false,
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
//   {
//     _id: '7',
//     name: 'Volleyball Court',
//     description: 'Beach and indoor volleyball courts available.',
//     image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
//     location: 'Bashundhara, Dhaka',
//     pricePerHour: 1000,
//     isDeleted: false,
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
//   {
//     _id: '8',
//     name: 'Table Tennis Hall',
//     description: 'Multiple table tennis tables with professional equipment.',
//     image: 'https://images.unsplash.com/photo-1558171013-50e1d1e3d14d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
//     location: 'Motijheel, Dhaka',
//     pricePerHour: 800,
//     isDeleted: false,
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
// ];

// const ITEMS_PER_PAGE = 9;

// const Facilities: React.FC = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [priceRange, setPriceRange] = useState([0, 5000]);
//   const [showFilters, setShowFilters] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);

//   const { data: facilities = mockFacilities, isLoading } = useQuery({
//     queryKey: ['facilities'],
//     queryFn: facilityService.getAllFacilities,
//     staleTime: 5 * 60 * 1000,
//   });

//   // Filter facilities
//   const filteredFacilities = facilities.filter((facility) => {
//     const matchesSearch =
//       facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       facility.location.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesPrice =
//       facility.pricePerHour >= priceRange[0] && facility.pricePerHour <= priceRange[1];
//     return matchesSearch && matchesPrice && !facility.isDeleted;
//   });

//   // Pagination
//   const totalPages = Math.ceil(filteredFacilities.length / ITEMS_PER_PAGE);
//   const paginatedFacilities = filteredFacilities.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   const clearFilters = () => {
//     setSearchQuery('');
//     setPriceRange([0, 5000]);
//     setCurrentPage(1);
//   };

//   return (
//     <MainLayout>
//       <div className="min-h-screen bg-background pt-20">
//         {/* Hero Section */}
//         <section className="bg-secondary py-16">
//           <div className="container mx-auto px-4">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="text-center"
//             >
//               <h1 className="mb-4 font-display text-4xl font-bold text-secondary-foreground">
//                 Explore Our <span className="text-primary">Facilities</span>
//               </h1>
//               <p className="mx-auto mb-8 max-w-2xl text-secondary-foreground/70">
//                 Discover premium sports venues near you. Book your favorite facility and get ready
//                 to play!
//               </p>

//               {/* Search Bar */}
//               <div className="mx-auto flex max-w-2xl gap-2">
//                 <div className="relative flex-1">
//                   <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
//                   <Input
//                     type="text"
//                     placeholder="Search by name or location..."
//                     value={searchQuery}
//                     onChange={(e) => {
//                       setSearchQuery(e.target.value);
//                       setCurrentPage(1);
//                     }}
//                     className="h-12 pl-12 bg-background"
//                   />
//                 </div>
//                 <Button
//                   variant="outline"
//                   className="h-12 gap-2 bg-background"
//                   onClick={() => setShowFilters(!showFilters)}
//                 >
//                   <Filter className="h-5 w-5" />
//                   Filters
//                 </Button>
//               </div>
//             </motion.div>
//           </div>
//         </section>

//         {/* Filters Panel */}
//         {showFilters && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             className="border-b bg-muted/50"
//           >
//             <div className="container mx-auto px-4 py-6">
//               <div className="flex flex-wrap items-end gap-6">
//                 <div className="w-full max-w-sm">
//                   <label className="mb-2 block text-sm font-medium">
//                     Price Range: ৳{priceRange[0]} - ৳{priceRange[1]}
//                   </label>
//                   <Slider
//                     value={priceRange}
//                     onValueChange={(value) => {
//                       setPriceRange(value);
//                       setCurrentPage(1);
//                     }}
//                     max={5000}
//                     step={100}
//                     className="py-4"
//                   />
//                 </div>
//                 <Button variant="ghost" onClick={clearFilters} className="gap-2">
//                   <X className="h-4 w-4" />
//                   Clear Filters
//                 </Button>
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* Facilities Grid */}
//         <section className="py-12">
//           <div className="container mx-auto px-4">
//             {isLoading ? (
//               <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//                 {Array.from({ length: 6 }).map((_, i) => (
//                   <div key={i} className="h-80 animate-pulse rounded-xl bg-muted" />
//                 ))}
//               </div>
//             ) : paginatedFacilities.length === 0 ? (
//               <div className="py-20 text-center">
//                 <p className="text-lg text-muted-foreground">
//                   No facilities found matching your criteria.
//                 </p>
//                 <Button onClick={clearFilters} className="mt-4">
//                   Clear Filters
//                 </Button>
//               </div>
//             ) : (
//               <>
//                 <p className="mb-6 text-muted-foreground">
//                   Showing {paginatedFacilities.length} of {filteredFacilities.length} facilities
//                 </p>

//                 <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//                   {paginatedFacilities.map((facility, index) => (
//                     <motion.div
//                       key={facility._id}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: index * 0.05 }}
//                       className="sport-card group"
//                     >
//                       <div className="relative h-48 overflow-hidden">
//                         <img
//                           src={facility.image}
//                           alt={facility.name}
//                           className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//                       </div>

//                       <div className="p-5">
//                         <h3 className="mb-2 font-display text-lg font-semibold text-card-foreground">
//                           {facility.name}
//                         </h3>

//                         <div className="mb-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
//                           <div className="flex items-center gap-1">
//                             <MapPin className="h-4 w-4 text-primary" />
//                             <span>{facility.location}</span>
//                           </div>
//                           <div className="flex items-center gap-1">
//                             <Clock className="h-4 w-4 text-primary" />
//                             <span>৳{facility.pricePerHour}/hr</span>
//                           </div>
//                         </div>

//                         <Link to={`/facilities/${facility._id}`}>
//                           <Button variant="outline" className="w-full">
//                             View Details
//                           </Button>
//                         </Link>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>

//                 {/* Pagination */}
//                 {totalPages > 1 && (
//                   <div className="mt-12 flex justify-center gap-2">
//                     <Button
//                       variant="outline"
//                       onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//                       disabled={currentPage === 1}
//                     >
//                       Previous
//                     </Button>
//                     {Array.from({ length: totalPages }).map((_, i) => (
//                       <Button
//                         key={i}
//                         variant={currentPage === i + 1 ? 'default' : 'outline'}
//                         onClick={() => setCurrentPage(i + 1)}
//                         className="w-10"
//                       >
//                         {i + 1}
//                       </Button>
//                     ))}
//                     <Button
//                       variant="outline"
//                       onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
//                       disabled={currentPage === totalPages}
//                     >
//                       Next
//                     </Button>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </section>
//       </div>
//     </MainLayout>
//   );
// };

// export default Facilities;


import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Search, MapPin, DollarSign, Filter } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import facilityService, { Facility } from '@/services/facilityService';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Facilities = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);

  // Fetch facilities from backend - NO MOCK DATA
  const { data: facilities = [], isLoading, error } = useQuery({
    queryKey: ['facilities'],
    queryFn: () => facilityService.getAllFacilities(),
  });

  // Filter facilities based on search and price
  const filteredFacilities = facilities.filter((facility) => {
    const matchesSearch = 
      facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facility.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facility.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPrice = 
      facility.pricePerHour >= priceRange[0] && 
      facility.pricePerHour <= priceRange[1];

    return matchesSearch && matchesPrice && !facility.isDeleted;
  });

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <CardHeader>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mt-2"></div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold text-red-600">Error loading facilities</h2>
          <p className="text-gray-600 mt-2">Please try again later or contact support.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Our Facilities</h1>
          <p className="text-gray-600">
            Browse and book from our wide range of sports facilities
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by name, location, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing {filteredFacilities.length} of {facilities.length} facilities
          </p>
        </div>

        {/* Facilities Grid */}
        {filteredFacilities.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No facilities found</p>
            <p className="text-sm text-gray-500 mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredFacilities.map((facility) => (
              <motion.div
                key={facility._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full flex flex-col">
                  {/* Image */}
                  <div className="h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={facility.image || 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600'}
                      alt={facility.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <CardHeader>
                    <CardTitle>{facility.name}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {facility.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {facility.location}
                      </div>
                      <div className="flex items-center text-lg font-bold text-primary">
                        <DollarSign className="h-5 w-5" />
                        {facility.pricePerHour}/hour
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Link to={`/facilities/${facility._id}`} className="w-full">
                      <Button className="w-full">View Details</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Facilities;