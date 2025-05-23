import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { MessageSquareMore, User, Mail, Eye, EyeOff, Lock, Loader2, Loader } from "lucide-react";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

// import toast from 'react-hot-toast';

const SignUpPage = () => {
  const [showpassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  // we will chekc if all the data are valid or not 
  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) {
      signup(formData);
    }

  };

  return (
    <div className="flex flex-col justify-center items-center p-6 sm:p-12">
      <div className="w-full max-w-md space-y-8">



        {/* LOGO */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2 group">
            <div
              className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
            >
              {/* this is logo from lucide react  */}
              <MessageSquareMore className="size-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mt-2">ChatterBox</h1>
            <p className="text-base-content/60">Get started with your new Account</p>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Full Name</span>
            </label>


            <div className="relative">
              {/* ICON */}
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className=" size-5 text-base-content/40" />
              </div>
              <input
                type="text"
                className={`input input-  bordered w-full pl-10`}
                placeholder="Utkarsh Gupta"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>
          </div>
          {/* Name text box ends here */}

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="size-5 text-base-content/40" />
              </div>
              <input
                type="email"
                className={`input input-bordered w-full pl-10`}
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>
          {/* Email ends here */}

          {/* Password */}
          <div className='form-control'>
            <label className='label'>
              <span className='label-text font-medium'>Password</span>
            </label>
            {/* icon */}
            <div className='relative'>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="size-5 text-base-content/40" />
              </div>
              <input
                // showpassword initialized in the state (initially false) 
                type={showpassword ? "text" : "password"}
                className={`input input-bordered w-full pl-10`}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showpassword)}
              >
                {showpassword ? (
                  <EyeOff className="size-5 text-base-content/40" />
                ) : (
                  <Eye className="size-5 text-base-content/40" />
                )}
              </button>

            </div>
          </div>
          {/* password ends here */}

          {/* sumbit button at the starts */}
          <button type='sumbit' className="btn btn-primary w-full" disabled={isSigningUp}>
            {isSigningUp ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Create Account"
            )}

          </button>
          {/* sumbit button ends here */}

        </form>
        {/* form ends here */}

        {/* already have an account to navigate to login page */}

        <div className='text-center'>
          <p className='text-based-content/60'>
            Already have an account?
            <Link to="login" className='link link-primary'>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;