
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff, LogIn, UserPlus } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type FormData = z.infer<typeof loginSchema>;

const Auth = () => {
  const { user, signIn, signUp, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslations();

  const form = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // If user is already logged in, redirect to home page
  if (user) {
    return <Navigate to="/" replace />;
  }

  const toggleMode = () => {
    setIsLogin(!isLogin);
    form.reset();
  };

  const onSubmit = async (data: FormData) => {
    try {
      if (isLogin) {
        const { error } = await signIn(data.email, data.password);
        if (error) throw error;
        navigate("/");
      } else {
        const { error } = await signUp(data.email, data.password);
        if (error) throw error;
        toast({
          title: "Account created",
          description: "Please check your email to confirm your account",
        });
        setIsLogin(true);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <div className="bg-gradient-to-r from-techblue to-techpurple rounded-md w-12 h-12 flex items-center justify-center mb-4">
            {isLogin ? <LogIn size={24} className="text-white" /> : <UserPlus size={24} className="text-white" />}
          </div>
          <h1 className="text-2xl font-bold">{isLogin ? t('auth.login') : t('auth.signup')}</h1>
          <p className="text-gray-600 text-center mt-2">
            {isLogin ? t('auth.loginSubtitle') : t('auth.signupSubtitle')}
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('auth.email')}</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="you@example.com" 
                      autoComplete="email" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('auth.password')}</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••"
                        autoComplete={isLogin ? "current-password" : "new-password"}
                        {...field} 
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 top-0 h-full"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full bg-techblue hover:bg-techblue/90" 
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2" />
                  {t('auth.processing')}
                </div>
              ) : isLogin ? t('auth.loginButton') : t('auth.signupButton')}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center">
          <button
            onClick={toggleMode}
            className="text-techblue hover:underline text-sm"
          >
            {isLogin ? t('auth.noAccount') : t('auth.hasAccount')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
