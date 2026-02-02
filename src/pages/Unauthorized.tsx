import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldX, Home, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Unauthorized: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
          className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-destructive/10"
        >
          <ShieldX className="h-12 w-12 text-destructive" />
        </motion.div>

        <h1 className="mb-4 font-display text-3xl font-bold md:text-4xl">
          Access Denied
        </h1>

        <p className="mb-8 max-w-md text-muted-foreground">
          You don't have permission to access this page. This area is restricted to authorized
          personnel only.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/">
            <Button size="lg" className="gap-2">
              <Home className="h-5 w-5" />
              Back to Home
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="outline" className="gap-2">
              <LogIn className="h-5 w-5" />
              Login
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Unauthorized;
