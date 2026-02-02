// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "@/contexts/AuthContext";
// import ProtectedRoute from "@/components/ProtectedRoute";

// // Pages
// import Index from "./pages/Index";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Facilities from "./pages/Facilities";
// import FacilityDetails from "./pages/FacilityDetails";
// import Booking from "./pages/Booking";
// import Dashboard from "./pages/Dashboard";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import NotFound from "./pages/NotFound";
// import Unauthorized from "./pages/Unauthorized";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 5 * 60 * 1000,
//       retry: 1,
//     },
//   },
// });

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <AuthProvider>
//       <TooltipProvider>
//         <Toaster />
//         <Sonner position="top-right" richColors />
//         <BrowserRouter>
//           <Routes>
//             {/* Public Routes */}
//             <Route path="/" element={<Index />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/facilities" element={<Facilities />} />
//             <Route path="/facilities/:id" element={<FacilityDetails />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/contact" element={<Contact />} />
                    
//             {/* Protected User Routes */}
//             <Route
//               path="/dashboard"
//               element={
//                 <ProtectedRoute>
//                   <Dashboard />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/booking/:facilityId"
//               element={
//                 <ProtectedRoute>
//                   <Booking />
//                 </ProtectedRoute>
//               }
//             />
            
//             {/* Protected Admin Routes */}
//             <Route
//               path="/admin/dashboard"
//               element={
//                 <ProtectedRoute requireAdmin>
//                   <AdminDashboard />
//                 </ProtectedRoute>
//               }
//             />
            
//             {/* Error Pages */}
//             <Route path="/unauthorized" element={<Unauthorized />} />
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </BrowserRouter>
//       </TooltipProvider>
//     </AuthProvider>
//   </QueryClientProvider>
// );

// export default App;






import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Facilities from "./pages/Facilities";
import FacilityDetails from "./pages/FacilityDetails";
import Booking from "./pages/Booking";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-right" richColors />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/facilities/:id" element={<FacilityDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
                    
            {/* Protected User Routes */}
            <Route
              path="/dashboard"
              element={
                
                  <Dashboard />
              
              }
            />
            <Route
              path="/booking/:facilityId"
              element={
             
                  <Booking />
           
              }
            />
            
            {/* Protected Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
         
                  <AdminDashboard />
 
              }
            />
            
            {/* Error Pages */}
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
