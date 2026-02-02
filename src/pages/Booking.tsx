import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock, MapPin, CreditCard, Loader2, Check } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import facilityService, { Facility, AvailabilitySlot } from '@/services/facilityService';
import bookingService from '@/services/bookingService';

// Mock data
const mockFacility: Facility = {
  _id: '1',
  name: 'Premium Football Stadium',
  description: 'Professional-grade football stadium.',
  image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  location: 'Gulshan, Dhaka',
  pricePerHour: 2500,
  isDeleted: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const mockSlots: AvailabilitySlot[] = [
  { startTime: '08:00', endTime: '09:00', isBooked: false },
  { startTime: '09:00', endTime: '10:00', isBooked: true },
  { startTime: '10:00', endTime: '11:00', isBooked: false },
  { startTime: '11:00', endTime: '12:00', isBooked: false },
  { startTime: '12:00', endTime: '13:00', isBooked: true },
  { startTime: '13:00', endTime: '14:00', isBooked: false },
  { startTime: '14:00', endTime: '15:00', isBooked: false },
  { startTime: '15:00', endTime: '16:00', isBooked: false },
  { startTime: '16:00', endTime: '17:00', isBooked: true },
  { startTime: '17:00', endTime: '18:00', isBooked: false },
  { startTime: '18:00', endTime: '19:00', isBooked: false },
  { startTime: '19:00', endTime: '20:00', isBooked: false },
];

const Booking: React.FC = () => {
  const { facilityId } = useParams<{ facilityId: string }>();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedSlots, setSelectedSlots] = useState<AvailabilitySlot[]>([]);
  const [step, setStep] = useState(1);

  const { data: facility = mockFacility } = useQuery({
    queryKey: ['facility', facilityId],
    queryFn: () => facilityService.getFacilityById(facilityId!),
    enabled: !!facilityId,
  });

  const { data: availableSlots = mockSlots, isLoading: slotsLoading, refetch: refetchSlots } = useQuery({
    queryKey: ['availability', facilityId, selectedDate],
    queryFn: () => facilityService.checkAvailability(facilityId!, format(selectedDate!, 'yyyy-MM-dd')),
    enabled: !!facilityId && !!selectedDate,
  });

  const bookingMutation = useMutation({
    mutationFn: bookingService.createBooking,
    onSuccess: () => {
      toast.success('Booking created successfully!');
      setStep(3);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create booking');
    },
  });

  const handleSlotSelect = (slot: AvailabilitySlot) => {
    if (slot.isBooked) return;

    const isSelected = selectedSlots.some(
      (s) => s.startTime === slot.startTime && s.endTime === slot.endTime
    );

    if (isSelected) {
      setSelectedSlots(selectedSlots.filter((s) => s.startTime !== slot.startTime));
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  const handleCheckAvailability = () => {
    if (!selectedDate) {
      toast.error('Please select a date');
      return;
    }
    refetchSlots();
    setStep(2);
  };

  const calculateTotal = () => {
    return selectedSlots.length * facility.pricePerHour;
  };

  const handleConfirmBooking = () => {
    if (selectedSlots.length === 0) {
      toast.error('Please select at least one time slot');
      return;
    }

    // Sort slots and get start/end time
    const sortedSlots = [...selectedSlots].sort((a, b) => 
      a.startTime.localeCompare(b.startTime)
    );

    bookingMutation.mutate({
      facility: facilityId!,
      date: format(selectedDate!, 'yyyy-MM-dd'),
      startTime: sortedSlots[0].startTime,
      endTime: sortedSlots[sortedSlots.length - 1].endTime,
    });
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Progress Steps */}
          <div className="mb-8 flex justify-center">
            <div className="flex items-center gap-4">
              {[1, 2, 3].map((s) => (
                <React.Fragment key={s}>
                  <div
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-full font-semibold transition-colors',
                      step >= s
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {step > s ? <Check className="h-5 w-5" /> : s}
                  </div>
                  {s < 3 && (
                    <div
                      className={cn(
                        'h-1 w-16 rounded transition-colors',
                        step > s ? 'bg-primary' : 'bg-muted'
                      )}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="rounded-xl border bg-card p-6"
                >
                  <h2 className="mb-6 font-display text-2xl font-bold">Select Date</h2>

                  <div className="flex flex-col items-center gap-6">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      className="rounded-md border pointer-events-auto"
                    />

                    <Button
                      onClick={handleCheckAvailability}
                      disabled={!selectedDate}
                      className="w-full max-w-sm glow-button"
                    >
                      Check Availability
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="rounded-xl border bg-card p-6"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="font-display text-2xl font-bold">Select Time Slots</h2>
                    <Button variant="ghost" onClick={() => setStep(1)}>
                      Change Date
                    </Button>
                  </div>

                  <p className="mb-4 text-muted-foreground">
                    Available slots for {selectedDate && format(selectedDate, 'MMMM d, yyyy')}
                  </p>

                  {slotsLoading ? (
                    <div className="flex justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
                      {availableSlots.map((slot, index) => {
                        const isSelected = selectedSlots.some(
                          (s) => s.startTime === slot.startTime
                        );
                        return (
                          <button
                            key={index}
                            onClick={() => handleSlotSelect(slot)}
                            disabled={slot.isBooked}
                            className={cn(
                              'rounded-lg border p-3 text-center transition-all',
                              slot.isBooked
                                ? 'cursor-not-allowed bg-muted text-muted-foreground line-through'
                                : isSelected
                                ? 'border-primary bg-primary text-primary-foreground'
                                : 'hover:border-primary hover:bg-primary/10'
                            )}
                          >
                            <div className="text-sm font-medium">{slot.startTime}</div>
                            <div className="text-xs opacity-70">to {slot.endTime}</div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  <div className="mt-6 flex gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="h-4 w-4 rounded border bg-muted" />
                      <span>Booked</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="h-4 w-4 rounded border" />
                      <span>Available</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="h-4 w-4 rounded bg-primary" />
                      <span>Selected</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-xl border bg-card p-8 text-center"
                >
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/20">
                    <Check className="h-10 w-10 text-success" />
                  </div>
                  <h2 className="mb-2 font-display text-2xl font-bold">Booking Confirmed!</h2>
                  <p className="mb-6 text-muted-foreground">
                    Your booking has been successfully created. You will receive a confirmation
                    email shortly.
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button variant="outline" onClick={() => navigate('/dashboard')}>
                      View My Bookings
                    </Button>
                    <Button onClick={() => navigate('/facilities')}>
                      Book Another Facility
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-xl border bg-card p-6">
                <h3 className="mb-4 font-display text-lg font-semibold">Booking Summary</h3>

                {/* Facility Info */}
                <div className="mb-4 flex gap-4">
                  <img
                    src={facility.image}
                    alt={facility.name}
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-medium">{facility.name}</h4>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{facility.location}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 border-t pt-4">
                  {selectedDate && (
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        <span>Date</span>
                      </div>
                      <span className="font-medium">{format(selectedDate, 'MMM d, yyyy')}</span>
                    </div>
                  )}

                  {selectedSlots.length > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Duration</span>
                      </div>
                      <span className="font-medium">{selectedSlots.length} hour(s)</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <span>Rate per hour</span>
                    <span>৳{facility.pricePerHour}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t pt-4">
                  <span className="font-semibold">Total</span>
                  <span className="font-display text-2xl font-bold text-primary">
                    ৳{calculateTotal()}
                  </span>
                </div>

                {step === 2 && selectedSlots.length > 0 && (
                  <Button
                    onClick={handleConfirmBooking}
                    className="mt-6 w-full glow-button gap-2"
                    disabled={bookingMutation.isPending}
                  >
                    {bookingMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4" />
                        Proceed to Payment
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Booking;
