
import { Navigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CourseForm from "@/components/courses/CourseForm";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslations } from "@/hooks/useTranslations";

const CourseCreate = () => {
  const { user, isLoading } = useAuth();
  const { t } = useTranslations();
  
  // If not logged in and finished loading, redirect to auth page
  if (!isLoading && !user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h1 className="text-2xl font-bold mb-6">{t('courses.createNew')}</h1>
            <CourseForm />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CourseCreate;
