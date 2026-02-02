// import React from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import { motion } from 'framer-motion';
// import { MapPin, Clock, Calendar, ArrowLeft, Star, Users, Wifi, Car, Coffee } from 'lucide-react';
// import MainLayout from '@/components/layout/MainLayout';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import facilityService, { Facility } from '@/services/facilityService';

// // Mock data for development
// const mockFacility: Facility = {
//   _id: '1',
//   name: 'Premium Football Stadium',
//   description: 'Experience the thrill of playing on our professional-grade football stadium. Featuring natural grass turf maintained to international standards, powerful floodlights for evening matches, and seating for spectators. Our stadium offers everything you need for a memorable game, whether it\'s a friendly match or a competitive tournament. The facility includes changing rooms, shower facilities, and a refreshment area.',
//   image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
//   location: 'Gulshan, Dhaka',
//   pricePerHour: 2500,
//   isDeleted: false,
//   createdAt: new Date().toISOString(),
//   updatedAt: new Date().toISOString(),
// };

// const amenities = [
//   { icon: Wifi, label: 'Free WiFi' },
//   { icon: Car, label: 'Parking' },
//   { icon: Coffee, label: 'Refreshments' },
//   { icon: Users, label: 'Changing Rooms' },
// ];

// const galleryImages = [
//   'https://images.unsplash.com/photo-1459865264687-595d652de67e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//   'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//   'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//   'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
// ];

// const FacilityDetails: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [selectedImage, setSelectedImage] = React.useState(0);

//   const { data: facility = mockFacility, isLoading } = useQuery({
//     queryKey: ['facility', id],
//     queryFn: () => facilityService.getFacilityById(id!),
//     enabled: !!id,
//   });

//   if (isLoading) {
//     return (
//       <MainLayout>
//         <div className="min-h-screen pt-20">
//           <div className="container mx-auto px-4 py-12">
//             <div className="animate-pulse space-y-8">
//               <div className="h-96 rounded-xl bg-muted" />
//               <div className="h-8 w-1/2 rounded bg-muted" />
//               <div className="h-24 rounded bg-muted" />
//             </div>
//           </div>
//         </div>
//       </MainLayout>
//     );
//   }

//   return (
//     <MainLayout>
//       <div className="min-h-screen bg-background pt-20">
//         <div className="container mx-auto px-4 py-8">
//           {/* Back Button */}
//           <Link to="/facilities">
//             <Button variant="ghost" className="mb-6 gap-2">
//               <ArrowLeft className="h-4 w-4" />
//               Back to Facilities
//             </Button>
//           </Link>

//           <div className="grid gap-8 lg:grid-cols-3">
//             {/* Left Column - Images & Details */}
//             <div className="lg:col-span-2">
//               {/* Image Gallery */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="space-y-4"
//               >
//                 <div className="relative h-96 overflow-hidden rounded-2xl">
//                   <img
//                     src={galleryImages[selectedImage]}
//                     alt={facility.name}
//                     className="h-full w-full object-cover"
//                   />
//                   <div className="absolute bottom-4 left-4 flex gap-2">
//                     <Badge className="bg-primary/90">Available</Badge>
//                     <Badge variant="secondary" className="gap-1">
//                       <Star className="h-3 w-3 fill-accent text-accent" />
//                       4.8
//                     </Badge>
//                   </div>
//                 </div>

//                 <div className="flex gap-2 overflow-x-auto pb-2">
//                   {galleryImages.map((img, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setSelectedImage(index)}
//                       className={`relative h-20 w-24 flex-shrink-0 overflow-hidden rounded-lg transition-all ${
//                         selectedImage === index
//                           ? 'ring-2 ring-primary ring-offset-2'
//                           : 'opacity-70 hover:opacity-100'
//                       }`}
//                     >
//                       <img src={img} alt="" className="h-full w-full object-cover" />
//                     </button>
//                   ))}
//                 </div>
//               </motion.div>

//               {/* Facility Info */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.1 }}
//                 className="mt-8 space-y-6"
//               >
//                 <div>
//                   <h1 className="mb-2 font-display text-3xl font-bold">{facility.name}</h1>
//                   <div className="flex flex-wrap gap-4 text-muted-foreground">
//                     <div className="flex items-center gap-1">
//                       <MapPin className="h-4 w-4 text-primary" />
//                       <span>{facility.location}</span>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <Clock className="h-4 w-4 text-primary" />
//                       <span>Open 6AM - 10PM</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <h2 className="mb-3 font-display text-xl font-semibold">About this Facility</h2>
//                   <p className="leading-relaxed text-muted-foreground">{facility.description}</p>
//                 </div>

//                 {/* Amenities */}
//                 <div>
//                   <h2 className="mb-3 font-display text-xl font-semibold">Amenities</h2>
//                   <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
//                     {amenities.map((amenity, index) => (
//                       <div
//                         key={index}
//                         className="flex items-center gap-2 rounded-lg border bg-card p-3"
//                       >
//                         <amenity.icon className="h-5 w-5 text-primary" />
//                         <span className="text-sm">{amenity.label}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Rules */}
//                 <div>
//                   <h2 className="mb-3 font-display text-xl font-semibold">Rules & Guidelines</h2>
//                   <ul className="space-y-2 text-muted-foreground">
//                     <li>• Arrive 15 minutes before your booking time</li>
//                     <li>• Wear appropriate sports attire and footwear</li>
//                     <li>• No smoking or alcohol on premises</li>
//                     <li>• Report any damages immediately</li>
//                     <li>• Cancel at least 24 hours in advance for full refund</li>
//                   </ul>
//                 </div>
//               </motion.div>
//             </div>

//             {/* Right Column - Booking Card */}
//             <div className="lg:col-span-1">
//               <motion.div
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.2 }}
//                 className="sticky top-24 rounded-2xl border bg-card p-6 shadow-lg"
//               >
//                 <div className="mb-6 text-center">
//                   <span className="text-sm text-muted-foreground">Price per hour</span>
//                   <div className="font-display text-4xl font-bold text-primary">
//                     ৳{facility.pricePerHour}
//                   </div>
//                 </div>

//                 <div className="mb-6 rounded-lg bg-muted/50 p-4">
//                   <div className="flex items-center gap-2 text-sm">
//                     <Calendar className="h-4 w-4 text-primary" />
//                     <span>Check availability and book your slot</span>
//                   </div>
//                 </div>

//                 <Link to={`/booking/${facility._id}`}>
//                   <Button className="w-full glow-button text-lg" size="lg">
//                     Book Now
//                   </Button>
//                 </Link>

//                 <p className="mt-4 text-center text-xs text-muted-foreground">
//                   Free cancellation up to 24 hours before your booking
//                 </p>
//               </motion.div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default FacilityDetails;




import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, DollarSign, Calendar, Clock } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import facilityService from '@/services/facilityService';
import bookingService from '@/services/bookingService';
import authService from '@/services/authService';
import { toast } from 'sonner';

const FacilityDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [bookingData, setBookingData] = useState({
    date: '',
    startTime: '',
    endTime: '',
  });

  // Fetch facility details
  const { data: facility, isLoading } = useQuery({
    queryKey: ['facility', id],
    queryFn: () => facilityService.getFacilityById(id!),
    enabled: !!id,
  });

  // Create booking mutation
  const createBookingMutation = useMutation({
    mutationFn: bookingService.createBooking,
    onSuccess: () => {
      toast.success('Booking created successfully!');
      navigate('/dashboard');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create booking');
    },
  });

  const handleBooking = () => {
    if (!authService.isAuthenticated()) {
      toast.error('Please login to make a booking');
      navigate('/login');
      return;
    }

    if (!bookingData.date || !bookingData.startTime || !bookingData.endTime) {
      toast.error('Please fill all booking details');
      return;
    }

    createBookingMutation.mutate({
      facility: id!,
      ...bookingData,
    });
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!facility) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold">Facility not found</h2>
          <Button onClick={() => navigate('/facilities')} className="mt-4">
            Back to Facilities
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Facility Image and Info */}
          <div>
            <div className="h-96 rounded-lg overflow-hidden mb-6">
              <img
                src={facility.image || 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800'}
                alt={facility.name}
                className="w-full h-full object-cover"
              />
            </div>

            <h1 className="text-4xl font-bold mb-4">{facility.name}</h1>
            <p className="text-gray-600 mb-6">{facility.description}</p>

            <div className="space-y-4">
              <div className="flex items-center text-lg">
                <MapPin className="h-5 w-5 mr-3 text-primary" />
                <span>{facility.location}</span>
              </div>
              <div className="flex items-center text-2xl font-bold text-primary">
                <DollarSign className="h-6 w-6 mr-2" />
                <span>{facility.pricePerHour}/hour</span>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Book This Facility</CardTitle>
                <CardDescription>
                  Select your preferred date and time
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={bookingData.date}
                    onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={bookingData.startTime}
                      onChange={(e) => setBookingData({ ...bookingData, startTime: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={bookingData.endTime}
                      onChange={(e) => setBookingData({ ...bookingData, endTime: e.target.value })}
                    />
                  </div>
                </div>

                <Button
                  className="w-full"
                  onClick={handleBooking}
                  disabled={createBookingMutation.isPending}
                >
                  {createBookingMutation.isPending ? 'Booking...' : 'Book Now'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FacilityDetails;