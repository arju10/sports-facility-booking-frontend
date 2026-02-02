// import React, { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { motion } from 'framer-motion';
// import { 
//   LayoutDashboard, 
//   Building2, 
//   Calendar, 
//   Users, 
//   Plus, 
//   Edit, 
//   Trash2, 
//   Search,
//   UserPlus,
//   Menu,
//   X
// } from 'lucide-react';
// import MainLayout from '@/components/layout/MainLayout';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import { useAuth } from '@/contexts/AuthContext';
// import facilityService, { Facility } from '@/services/facilityService';
// import bookingService, { Booking } from '@/services/bookingService';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { toast } from 'sonner';
// import { format } from 'date-fns';

// // Mock data
// const mockFacilities: Facility[] = [
//   {
//     _id: '1',
//     name: 'Premium Football Stadium',
//     description: 'Professional-grade football stadium.',
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
//     description: 'Indoor and outdoor tennis courts.',
//     image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
//     location: 'Dhanmondi, Dhaka',
//     pricePerHour: 1800,
//     isDeleted: false,
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
// ];

// const mockBookings: Booking[] = [
//   {
//     _id: '1',
//     date: '2025-01-28',
//     startTime: '10:00',
//     endTime: '12:00',
//     user: { _id: 'u1', name: 'John Doe', email: 'john@example.com', phone: '123', role: 'user', address: 'Dhaka' },
//     facility: mockFacilities[0],
//     payableAmount: 5000,
//     isBooked: 'confirmed',
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
// ];

// type TabType = 'overview' | 'facilities' | 'bookings' | 'add-admin';

// const AdminDashboard: React.FC = () => {
//   const { user } = useAuth();
//   const [activeTab, setActiveTab] = useState<TabType>('overview');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [facilityForm, setFacilityForm] = useState({
//     name: '',
//     description: '',
//     pricePerHour: 0,
//     location: '',
//     image: '',
//   });
//   const [adminForm, setAdminForm] = useState({
//     name: '',
//     email: '',
//     password: '',
//     phone: '',
//     address: '',
//   });

//   const { data: facilities = mockFacilities, refetch: refetchFacilities } = useQuery({
//     queryKey: ['adminFacilities'],
//     queryFn: facilityService.getAllFacilities,
//   });

//   const { data: bookings = mockBookings } = useQuery({
//     queryKey: ['adminBookings'],
//     queryFn: bookingService.getAllBookings,
//   });

//   const handleCreateFacility = async () => {
//     try {
//       await facilityService.createFacility(facilityForm);
//       toast.success('Facility created successfully!');
//       refetchFacilities();
//       setFacilityForm({ name: '', description: '', pricePerHour: 0, location: '', image: '' });
//     } catch (error) {
//       toast.error('Failed to create facility');
//     }
//   };

//   const handleDeleteFacility = async (id: string) => {
//     try {
//       await facilityService.deleteFacility(id);
//       toast.success('Facility deleted successfully!');
//       refetchFacilities();
//     } catch (error) {
//       toast.error('Failed to delete facility');
//     }
//   };

//   const tabs = [
//     { id: 'overview' as TabType, label: 'Overview', icon: LayoutDashboard },
//     { id: 'facilities' as TabType, label: 'Facilities', icon: Building2 },
//     { id: 'bookings' as TabType, label: 'Bookings', icon: Calendar },
//     { id: 'add-admin' as TabType, label: 'Add Admin', icon: UserPlus },
//   ];

//   return (
//     <MainLayout showFooter={false}>
//       <div className="flex min-h-screen pt-16">
//         {/* Mobile Sidebar Toggle */}
//         <button
//           onClick={() => setSidebarOpen(!sidebarOpen)}
//           className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg lg:hidden"
//         >
//           {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//         </button>

//         {/* Sidebar */}
//         <aside
//           className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-sidebar pt-20 transition-transform lg:relative lg:translate-x-0 lg:pt-0 ${
//             sidebarOpen ? 'translate-x-0' : '-translate-x-full'
//           }`}
//         >
//           <div className="flex h-full flex-col p-4">
//             <div className="mb-6">
//               <h2 className="font-display text-lg font-bold text-sidebar-foreground">
//                 Admin Panel
//               </h2>
//               <p className="text-sm text-sidebar-foreground/70">{user?.name}</p>
//             </div>

//             <nav className="space-y-2">
//               {tabs.map((tab) => (
//                 <button
//                   key={tab.id}
//                   onClick={() => {
//                     setActiveTab(tab.id);
//                     setSidebarOpen(false);
//                   }}
//                   className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors ${
//                     activeTab === tab.id
//                       ? 'bg-sidebar-primary text-sidebar-primary-foreground'
//                       : 'text-sidebar-foreground hover:bg-sidebar-accent'
//                   }`}
//                 >
//                   <tab.icon className="h-5 w-5" />
//                   {tab.label}
//                 </button>
//               ))}
//             </nav>
//           </div>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 overflow-auto p-6">
//           {activeTab === 'overview' && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//             >
//               <h1 className="mb-6 font-display text-3xl font-bold">Dashboard Overview</h1>

//               <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//                 <div className="rounded-xl border bg-card p-6">
//                   <div className="mb-2 flex items-center gap-2 text-muted-foreground">
//                     <Building2 className="h-5 w-5" />
//                     <span>Total Facilities</span>
//                   </div>
//                   <div className="font-display text-3xl font-bold text-primary">
//                     {facilities.filter(f => !f.isDeleted).length}
//                   </div>
//                 </div>
//                 <div className="rounded-xl border bg-card p-6">
//                   <div className="mb-2 flex items-center gap-2 text-muted-foreground">
//                     <Calendar className="h-5 w-5" />
//                     <span>Total Bookings</span>
//                   </div>
//                   <div className="font-display text-3xl font-bold text-accent">
//                     {bookings.length}
//                   </div>
//                 </div>
//                 <div className="rounded-xl border bg-card p-6">
//                   <div className="mb-2 flex items-center gap-2 text-muted-foreground">
//                     <Users className="h-5 w-5" />
//                     <span>Confirmed</span>
//                   </div>
//                   <div className="font-display text-3xl font-bold text-success">
//                     {bookings.filter(b => b.isBooked === 'confirmed').length}
//                   </div>
//                 </div>
//                 <div className="rounded-xl border bg-card p-6">
//                   <div className="mb-2 flex items-center gap-2 text-muted-foreground">
//                     <Calendar className="h-5 w-5" />
//                     <span>Pending</span>
//                   </div>
//                   <div className="font-display text-3xl font-bold text-warning">
//                     {bookings.filter(b => b.isBooked === 'unconfirmed').length}
//                   </div>
//                 </div>
//               </div>

//               <div className="rounded-xl border bg-card p-6">
//                 <h2 className="mb-4 font-display text-xl font-semibold">Recent Bookings</h2>
//                 <div className="space-y-4">
//                   {bookings.slice(0, 5).map((booking) => {
//                     const facility = typeof booking.facility === 'object' ? booking.facility : null;
//                     const bookingUser = typeof booking.user === 'object' ? booking.user : null;
//                     return (
//                       <div key={booking._id} className="flex items-center justify-between border-b pb-4 last:border-0">
//                         <div>
//                           <div className="font-medium">{facility?.name}</div>
//                           <div className="text-sm text-muted-foreground">
//                             {bookingUser?.name} • {format(new Date(booking.date), 'MMM d, yyyy')}
//                           </div>
//                         </div>
//                         <Badge className={booking.isBooked === 'confirmed' ? 'bg-success' : 'bg-warning'}>
//                           {booking.isBooked}
//                         </Badge>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </motion.div>
//           )}

//           {activeTab === 'facilities' && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//             >
//               <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
//                 <h1 className="font-display text-3xl font-bold">Facilities</h1>

//                 <div className="flex gap-4">
//                   <div className="relative">
//                     <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                     <Input
//                       placeholder="Search facilities..."
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       className="pl-10"
//                     />
//                   </div>

//                   <Dialog>
//                     <DialogTrigger asChild>
//                       <Button className="gap-2">
//                         <Plus className="h-4 w-4" />
//                         Add Facility
//                       </Button>
//                     </DialogTrigger>
//                     <DialogContent>
//                       <DialogHeader>
//                         <DialogTitle>Add New Facility</DialogTitle>
//                         <DialogDescription>
//                           Fill in the details to add a new sports facility.
//                         </DialogDescription>
//                       </DialogHeader>
//                       <div className="space-y-4 py-4">
//                         <div>
//                           <Label>Name</Label>
//                           <Input
//                             value={facilityForm.name}
//                             onChange={(e) => setFacilityForm({ ...facilityForm, name: e.target.value })}
//                             placeholder="Facility name"
//                           />
//                         </div>
//                         <div>
//                           <Label>Description</Label>
//                           <Textarea
//                             value={facilityForm.description}
//                             onChange={(e) => setFacilityForm({ ...facilityForm, description: e.target.value })}
//                             placeholder="Facility description"
//                           />
//                         </div>
//                         <div>
//                           <Label>Price Per Hour (৳)</Label>
//                           <Input
//                             type="number"
//                             value={facilityForm.pricePerHour}
//                             onChange={(e) => setFacilityForm({ ...facilityForm, pricePerHour: Number(e.target.value) })}
//                           />
//                         </div>
//                         <div>
//                           <Label>Location</Label>
//                           <Input
//                             value={facilityForm.location}
//                             onChange={(e) => setFacilityForm({ ...facilityForm, location: e.target.value })}
//                             placeholder="Facility location"
//                           />
//                         </div>
//                         <div>
//                           <Label>Image URL</Label>
//                           <Input
//                             value={facilityForm.image}
//                             onChange={(e) => setFacilityForm({ ...facilityForm, image: e.target.value })}
//                             placeholder="https://example.com/image.jpg"
//                           />
//                         </div>
//                       </div>
//                       <DialogFooter>
//                         <Button onClick={handleCreateFacility}>Create Facility</Button>
//                       </DialogFooter>
//                     </DialogContent>
//                   </Dialog>
//                 </div>
//               </div>

//               <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//                 {facilities
//                   .filter((f) => !f.isDeleted && f.name.toLowerCase().includes(searchQuery.toLowerCase()))
//                   .map((facility) => (
//                     <div key={facility._id} className="rounded-xl border bg-card overflow-hidden">
//                       <img
//                         src={facility.image}
//                         alt={facility.name}
//                         className="h-40 w-full object-cover"
//                       />
//                       <div className="p-4">
//                         <h3 className="font-semibold">{facility.name}</h3>
//                         <p className="text-sm text-muted-foreground">{facility.location}</p>
//                         <p className="mt-2 font-medium text-primary">৳{facility.pricePerHour}/hr</p>
//                         <div className="mt-4 flex gap-2">
//                           <Button variant="outline" size="sm" className="flex-1 gap-1">
//                             <Edit className="h-4 w-4" />
//                             Edit
//                           </Button>
//                           <Button
//                             variant="destructive"
//                             size="sm"
//                             className="gap-1"
//                             onClick={() => handleDeleteFacility(facility._id)}
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//               </div>
//             </motion.div>
//           )}

//           {activeTab === 'bookings' && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//             >
//               <h1 className="mb-6 font-display text-3xl font-bold">All Bookings</h1>

//               <div className="rounded-xl border bg-card overflow-hidden">
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead className="border-b bg-muted/50">
//                       <tr>
//                         <th className="p-4 text-left font-medium">Facility</th>
//                         <th className="p-4 text-left font-medium">User</th>
//                         <th className="p-4 text-left font-medium">Date</th>
//                         <th className="p-4 text-left font-medium">Time</th>
//                         <th className="p-4 text-left font-medium">Amount</th>
//                         <th className="p-4 text-left font-medium">Status</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {bookings.map((booking) => {
//                         const facility = typeof booking.facility === 'object' ? booking.facility : null;
//                         const bookingUser = typeof booking.user === 'object' ? booking.user : null;
//                         return (
//                           <tr key={booking._id} className="border-b last:border-0">
//                             <td className="p-4">{facility?.name}</td>
//                             <td className="p-4">{bookingUser?.name || 'N/A'}</td>
//                             <td className="p-4">{format(new Date(booking.date), 'MMM d, yyyy')}</td>
//                             <td className="p-4">{booking.startTime} - {booking.endTime}</td>
//                             <td className="p-4 font-medium">৳{booking.payableAmount}</td>
//                             <td className="p-4">
//                               <Badge className={booking.isBooked === 'confirmed' ? 'bg-success' : 'bg-warning'}>
//                                 {booking.isBooked}
//                               </Badge>
//                             </td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </motion.div>
//           )}

//           {activeTab === 'add-admin' && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//             >
//               <h1 className="mb-6 font-display text-3xl font-bold">Add New Admin</h1>

//               <div className="mx-auto max-w-lg rounded-xl border bg-card p-6">
//                 <div className="space-y-4">
//                   <div>
//                     <Label>Full Name</Label>
//                     <Input
//                       value={adminForm.name}
//                       onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
//                       placeholder="Admin name"
//                     />
//                   </div>
//                   <div>
//                     <Label>Email</Label>
//                     <Input
//                       type="email"
//                       value={adminForm.email}
//                       onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
//                       placeholder="admin@example.com"
//                     />
//                   </div>
//                   <div>
//                     <Label>Password</Label>
//                     <Input
//                       type="password"
//                       value={adminForm.password}
//                       onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
//                       placeholder="••••••••"
//                     />
//                   </div>
//                   <div>
//                     <Label>Phone</Label>
//                     <Input
//                       value={adminForm.phone}
//                       onChange={(e) => setAdminForm({ ...adminForm, phone: e.target.value })}
//                       placeholder="+880 1234-567890"
//                     />
//                   </div>
//                   <div>
//                     <Label>Address</Label>
//                     <Input
//                       value={adminForm.address}
//                       onChange={(e) => setAdminForm({ ...adminForm, address: e.target.value })}
//                       placeholder="Admin address"
//                     />
//                   </div>
//                   <Button className="w-full" onClick={() => toast.success('Admin created successfully!')}>
//                     Create Admin Account
//                   </Button>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </main>
//       </div>
//     </MainLayout>
//   );
// };

// export default AdminDashboard;



import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit, Trash2, Upload } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import facilityService, { Facility } from '@/services/facilityService';
import bookingService from '@/services/bookingService';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const queryClient = useQueryClient();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    pricePerHour: '',
    location: '',
  });

  // Fetch facilities
  const { data: facilities = [], isLoading: facilitiesLoading } = useQuery({
    queryKey: ['facilities'],
    queryFn: () => facilityService.getAllFacilities(),
  });

  // Fetch bookings
  const { data: bookings = [], isLoading: bookingsLoading } = useQuery({
    queryKey: ['allBookings'],
    queryFn: () => bookingService.getAllBookings(),
  });

  // Create facility mutation
  const createMutation = useMutation({
    mutationFn: facilityService.createFacility,
    onSuccess: () => {
      toast.success('Facility created successfully');
      queryClient.invalidateQueries({ queryKey: ['facilities'] });
      setIsCreateModalOpen(false);
      resetForm();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create facility');
    },
  });

  // Delete facility mutation
  const deleteMutation = useMutation({
    mutationFn: facilityService.deleteFacility,
    onSuccess: () => {
      toast.success('Facility deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['facilities'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete facility');
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.description || !formData.pricePerHour || !formData.location) {
      toast.error('Please fill all fields');
      return;
    }

    createMutation.mutate({
      ...formData,
      pricePerHour: parseFloat(formData.pricePerHour),
      image: imageFile || undefined,
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this facility?')) {
      deleteMutation.mutate(id);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      pricePerHour: '',
      location: '',
    });
    setImageFile(null);
    setImagePreview('');
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage facilities and bookings</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{facilities.length}</div>
              <p className="text-sm text-gray-600">Total Facilities</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{bookings.length}</div>
              <p className="text-sm text-gray-600">Total Bookings</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {bookings.filter(b => b.isBooked === 'confirmed').length}
              </div>
              <p className="text-sm text-gray-600">Active Bookings</p>
            </CardContent>
          </Card>
        </div>

        {/* Facilities Section */}
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Facilities</CardTitle>
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Facility
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Facility</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="name">Facility Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Football Stadium"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe the facility..."
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Price per Hour (৳)</Label>
                      <Input
                        id="price"
                        type="number"
                        value={formData.pricePerHour}
                        onChange={(e) => setFormData({ ...formData, pricePerHour: e.target.value })}
                        placeholder="1000"
                      />
                    </div>

                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="Dhaka, Bangladesh"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="image">Facility Image</Label>
                    <div className="mt-2">
                      <label
                        htmlFor="image"
                        className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary"
                      >
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="text-center">
                            <Upload className="mx-auto h-8 w-8 text-gray-400" />
                            <p className="mt-2 text-sm text-gray-600">
                              Click to upload image
                            </p>
                          </div>
                        )}
                      </label>
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    onClick={handleSubmit}
                    disabled={createMutation.isPending}
                  >
                    {createMutation.isPending ? 'Creating...' : 'Create Facility'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {facilitiesLoading ? (
              <p>Loading facilities...</p>
            ) : facilities.length === 0 ? (
              <p className="text-center text-gray-600 py-8">No facilities yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Image</th>
                      <th className="text-left p-4">Name</th>
                      <th className="text-left p-4">Location</th>
                      <th className="text-left p-4">Price/Hour</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {facilities.map((facility) => (
                      <tr key={facility._id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <img
                            src={facility.image || 'https://via.placeholder.com/100'}
                            alt={facility.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        </td>
                        <td className="p-4 font-medium">{facility.name}</td>
                        <td className="p-4">{facility.location}</td>
                        <td className="p-4">৳{facility.pricePerHour}</td>
                        <td className="p-4">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(facility._id)}
                            disabled={deleteMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Bookings Section */}
        <Card>
          <CardHeader>
            <CardTitle>All Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {bookingsLoading ? (
              <p>Loading bookings...</p>
            ) : bookings.length === 0 ? (
              <p className="text-center text-gray-600 py-8">No bookings yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Facility</th>
                      <th className="text-left p-4">User</th>
                      <th className="text-left p-4">Date</th>
                      <th className="text-left p-4">Time</th>
                      <th className="text-left p-4">Amount</th>
                      <th className="text-left p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking._id} className="border-b hover:bg-gray-50">
                        <td className="p-4">{booking.facility.name}</td>
                        <td className="p-4">{booking.user.name}</td>
                        <td className="p-4">{new Date(booking.date).toLocaleDateString()}</td>
                        <td className="p-4">{booking.startTime} - {booking.endTime}</td>
                        <td className="p-4">৳{booking.payableAmount}</td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              booking.isBooked === 'confirmed'
                                ? 'bg-green-100 text-green-800'
                                : booking.isBooked === 'canceled'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {booking.isBooked}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;