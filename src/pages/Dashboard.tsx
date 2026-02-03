import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, X, Eye } from 'lucide-react';
import { format } from 'date-fns';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import bookingService, { Booking } from '@/services/bookingService';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

// Mock bookings for development
const mockBookings: Booking[] = [
  {
    _id: '1',
    date: '2025-01-28',
    startTime: '10:00',
    endTime: '12:00',
    user: 'user1',
    facility: {
      _id: '1',
      name: 'Premium Football Stadium',
      description: 'Professional-grade football stadium.',
      image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      location: 'Gulshan, Dhaka',
      pricePerHour: 2500,
      isDeleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    payableAmount: 5000,
    isBooked: 'confirmed',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '2',
    date: '2025-01-30',
    startTime: '14:00',
    endTime: '16:00',
    user: 'user1',
    facility: {
      _id: '2',
      name: 'Elite Tennis Complex',
      description: 'Indoor and outdoor tennis courts.',
      image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      location: 'Dhanmondi, Dhaka',
      pricePerHour: 1800,
      isDeleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    payableAmount: 3600,
    isBooked: 'unconfirmed',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const { data: bookings = mockBookings, isLoading, refetch } = useQuery({
    queryKey: ['userBookings'],
    queryFn: bookingService.getUserBookings,
  });

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await bookingService.cancelBooking(bookingId);
      toast.success('Booking cancelled successfully');
      refetch();
    } catch (error) {
      toast.error('Failed to cancel booking');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-success">Confirmed</Badge>;
      case 'unconfirmed':
        return <Badge className="bg-warning">Pending Payment</Badge>;
      case 'canceled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display text-3xl font-bold">
              Welcome back, <span className="text-primary">{user?.name}</span>!
            </h1>
            <p className="mt-2 text-muted-foreground">
              Manage your bookings and explore new facilities
            </p>
          </motion.div>

          {/* Quick Stats */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-xl border bg-card p-6"
            >
              <div className="text-3xl font-bold text-primary">{bookings.length}</div>
              <div className="text-muted-foreground">Total Bookings</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl border bg-card p-6"
            >
              <div className="text-3xl font-bold text-success">
                {bookings.filter((b) => b.isBooked === 'confirmed').length}
              </div>
              <div className="text-muted-foreground">Confirmed</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-xl border bg-card p-6"
            >
              <div className="text-3xl font-bold text-warning">
                {bookings.filter((b) => b.isBooked === 'unconfirmed').length}
              </div>
              <div className="text-muted-foreground">Pending Payment</div>
            </motion.div>
          </div>

          {/* Bookings Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="mb-4 font-display text-2xl font-bold">My Bookings</h2>

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-32 animate-pulse rounded-xl bg-muted" />
                ))}
              </div>
            ) : bookings.length === 0 ? (
              <div className="rounded-xl border bg-card p-12 text-center">
                <Calendar className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 font-semibold">No bookings yet</h3>
                <p className="mb-4 text-muted-foreground">
                  Start by exploring our facilities and making your first booking!
                </p>
                <Button onClick={() => window.location.href = '/facilities'}>
                  Browse Facilities
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking, index) => {
                  const facility = typeof booking.facility === 'object' ? booking.facility : null;
                  return (
                    <motion.div
                      key={booking._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex flex-col gap-4 rounded-xl border bg-card p-4 sm:flex-row sm:items-center"
                    >
                      {facility && (
                        <img
                          src={facility.image}
                          alt={facility.name}
                          className="h-24 w-full rounded-lg object-cover sm:w-32"
                        />
                      )}

                      <div className="flex-1">
                        <div className="mb-2 flex items-start justify-between">
                          <h3 className="font-semibold">{facility?.name || 'Facility'}</h3>
                          {getStatusBadge(booking.isBooked)}
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{format(new Date(booking.date), 'MMM d, yyyy')}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{booking.startTime} - {booking.endTime}</span>
                          </div>
                          {facility && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{facility.location}</span>
                            </div>
                          )}
                        </div>

                        <div className="mt-2 font-semibold text-primary">
                          ৳{booking.payableAmount}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Eye className="h-4 w-4" />
                          Details
                        </Button>

                        {booking.isBooked !== 'canceled' && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm" className="gap-1">
                                <X className="h-4 w-4" />
                                Cancel
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to cancel this booking? This action cannot be
                                  undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleCancelBooking(booking._id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Yes, Cancel
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
