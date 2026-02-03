// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, Loader2 } from 'lucide-react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { useAuth } from '@/contexts/AuthContext';

// const registerSchema = z.object({
//   name: z.string().min(2, 'Name must be at least 2 characters'),
//   email: z.string().email('Please enter a valid email address'),
//   password: z.string().min(6, 'Password must be at least 6 characters'),
//   confirmPassword: z.string(),
//   phone: z.string().min(10, 'Please enter a valid phone number'),
//   address: z.string().min(5, 'Address must be at least 5 characters'),
// }).refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords don't match",
//   path: ['confirmPassword'],
// });

// type RegisterFormData = z.infer<typeof registerSchema>;

// const Register: React.FC = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const { register: registerUser, isLoading } = useAuth();
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<RegisterFormData>({
//     resolver: zodResolver(registerSchema),
//   });

//   const onSubmit = async (data: RegisterFormData) => {
//     const success = await registerUser({
//       name: data.name,
//       email: data.email,
//       password: data.password,
//       phone: data.phone,
//       address: data.address,
//     });
//     if (success) {
//       navigate('/dashboard');
//     }
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Left Side - Image */}
//       <div className="hidden lg:block lg:w-1/2">
//         <div className="relative h-full w-full">
//           <img
//             src="https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
//             alt="Sports"
//             className="h-full w-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-br from-secondary/80 to-primary/80" />
//           <div className="absolute inset-0 flex items-center justify-center p-12">
//             <div className="text-center text-white">
//               <h2 className="mb-4 font-display text-4xl font-bold">
//                 Join SportBook
//               </h2>
//               <p className="text-lg text-white/80">
//                 Create your account and start booking premium sports facilities today
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right Side - Form */}
//       <div className="flex w-full flex-col justify-center px-4 py-12 lg:w-1/2 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="mx-auto w-full max-w-md"
//         >
//           {/* Logo */}
//           <Link to="/" className="mb-8 flex items-center gap-2">
//             <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
//               <span className="font-display text-xl font-bold text-primary-foreground">S</span>
//             </div>
//             <span className="font-display text-xl font-bold">
//               Sport<span className="text-primary">Book</span>
//             </span>
//           </Link>

//           <h1 className="mb-2 font-display text-3xl font-bold">Create Account</h1>
//           <p className="mb-8 text-muted-foreground">
//             Fill in your details to get started
//           </p>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             {/* Name */}
//             <div className="space-y-2">
//               <Label htmlFor="name">Full Name</Label>
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
//                 <Input
//                   id="name"
//                   placeholder="John Doe"
//                   className="pl-10"
//                   {...register('name')}
//                 />
//               </div>
//               {errors.name && (
//                 <p className="text-sm text-destructive">{errors.name.message}</p>
//               )}
//             </div>

//             {/* Email */}
//             <div className="space-y-2">
//               <Label htmlFor="email">Email Address</Label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="you@example.com"
//                   className="pl-10"
//                   {...register('email')}
//                 />
//               </div>
//               {errors.email && (
//                 <p className="text-sm text-destructive">{errors.email.message}</p>
//               )}
//             </div>

//             {/* Phone */}
//             <div className="space-y-2">
//               <Label htmlFor="phone">Phone Number</Label>
//               <div className="relative">
//                 <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
//                 <Input
//                   id="phone"
//                   placeholder="+880 1234-567890"
//                   className="pl-10"
//                   {...register('phone')}
//                 />
//               </div>
//               {errors.phone && (
//                 <p className="text-sm text-destructive">{errors.phone.message}</p>
//               )}
//             </div>

//             {/* Address */}
//             <div className="space-y-2">
//               <Label htmlFor="address">Address</Label>
//               <div className="relative">
//                 <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
//                 <Input
//                   id="address"
//                   placeholder="123 Main Street, Dhaka"
//                   className="pl-10"
//                   {...register('address')}
//                 />
//               </div>
//               {errors.address && (
//                 <p className="text-sm text-destructive">{errors.address.message}</p>
//               )}
//             </div>

//             {/* Password */}
//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
//                 <Input
//                   id="password"
//                   type={showPassword ? 'text' : 'password'}
//                   placeholder="••••••••"
//                   className="pl-10 pr-10"
//                   {...register('password')}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
//                 >
//                   {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                 </button>
//               </div>
//               {errors.password && (
//                 <p className="text-sm text-destructive">{errors.password.message}</p>
//               )}
//             </div>

//             {/* Confirm Password */}
//             <div className="space-y-2">
//               <Label htmlFor="confirmPassword">Confirm Password</Label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
//                 <Input
//                   id="confirmPassword"
//                   type={showPassword ? 'text' : 'password'}
//                   placeholder="••••••••"
//                   className="pl-10"
//                   {...register('confirmPassword')}
//                 />
//               </div>
//               {errors.confirmPassword && (
//                 <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
//               )}
//             </div>

//             {/* Submit Button */}
//             <Button type="submit" className="w-full glow-button" disabled={isLoading}>
//               {isLoading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Creating account...
//                 </>
//               ) : (
//                 'Create Account'
//               )}
//             </Button>
//           </form>

//           <p className="mt-6 text-center text-sm text-muted-foreground">
//             Already have an account?{' '}
//             <Link to="/login" className="font-medium text-primary hover:underline">
//               Sign in
//             </Link>
//           </p>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Register;





import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, Loader2, UserCog } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  role: z.enum(['user', 'admin'], {
    required_error: 'Please select a role',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register: registerUser, isLoading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'user', // Default to user
    },
  });

  const selectedRole = watch('role');

  const onSubmit = async (data: RegisterFormData) => {
    console.log('📤 Attempting signup with:', { 
      name: data.name, 
      email: data.email,
      role: data.role 
    });
    
    const success = await registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      address: data.address,
      role: data.role, // Include role
    });
    
    if (success) {
      console.log('✅ Signup successful, navigating...');
      // Navigate based on role
      if (data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      console.error('❌ Signup failed');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Image */}
      <div className="hidden lg:block lg:w-1/2">
        <div className="relative h-full w-full">
          <img
            src="https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Sports"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/80 to-primary/80" />
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="text-center text-white">
              <h2 className="mb-4 font-display text-4xl font-bold">
                Join SportBook
              </h2>
              <p className="text-lg text-white/80">
                Create your account and start booking premium sports facilities today
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex w-full flex-col justify-center px-4 py-12 lg:w-1/2 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mx-auto w-full max-w-md"
        >
          {/* Logo */}
          <Link to="/" className="mb-8 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="font-display text-xl font-bold text-primary-foreground">S</span>
            </div>
            <span className="font-display text-xl font-bold">
              Sport<span className="text-primary">Book</span>
            </span>
          </Link>

          <h1 className="mb-2 font-display text-3xl font-bold">Create Account</h1>
          <p className="mb-8 text-muted-foreground">
            Fill in your details to get started
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="pl-10"
                  {...register('name')}
                />
              </div>
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="At least 6 characters"
                  className="pl-10 pr-10"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  className="pl-10 pr-10"
                  {...register('confirmPassword')}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+8801234567890"
                  className="pl-10"
                  {...register('phone')}
                />
              </div>
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone.message}</p>
              )}
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="address"
                  type="text"
                  placeholder="123 Main St, City, Country"
                  className="pl-10"
                  {...register('address')}
                />
              </div>
              {errors.address && (
                <p className="text-sm text-destructive">{errors.address.message}</p>
              )}
            </div>

            {/* Role Selection - NEW! */}
            <div className="space-y-2">
              <Label htmlFor="role">Select Role</Label>
              <div className="relative">
                <UserCog className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground z-10" />
                <Select
                  value={selectedRole}
                  onValueChange={(value: 'user' | 'admin') => setValue('role', value)}
                >
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">
                      <div className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>User - Book facilities</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="admin">
                      <div className="flex items-center">
                        <UserCog className="mr-2 h-4 w-4" />
                        <span>Admin - Manage facilities</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {errors.role && (
                <p className="text-sm text-destructive">{errors.role.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full glow-button" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
