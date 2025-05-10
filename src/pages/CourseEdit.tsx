
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CourseForm from "@/components/courses/CourseForm";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslations } from "@/hooks/useTranslations";
import { fetchCourseById } from "@/services/courseService";
import { Course } from "@/lib/data";
import { Skeleton } from "@/components/ui/skeleton";

const CourseEdit = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isLoading: authLoading } = useAuth();
  const { t } = useTranslations();
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadCourse = async () => {
      try {
        if (id) {
          const courseData = await fetchCourseById(id);
          // Make sure we have a properly formatted course object
          const formattedCourse: Course = {
            ...courseData,
            imageUrl: courseData.image_url // For backward compatibility
          };
          setCourse(formattedCourse);
        }
      } catch (err) {
        console.error("Error loading course:", err);
        setError(t('courses.loadError'));
      } finally {
        setIsLoading(false);
      }
    };

    loadCourse();
  }, [id, t]);
  
  // If not logged in and finished loading, redirect to auth page
  if (!authLoading && !user) {
    return <Navigate to="/auth" replace />;
  }

  // Check if the user is the owner of the course
  if (!authLoading && !isLoading && course && user && course.user_id !== user.id) {
    return <Navigate to="/courses" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h1 className="text-2xl font-bold mb-6">
              {t('courses.edit')}: {isLoading ? <Skeleton className="h-6 w-64 inline-block" /> : course?.title}
            </h1>
            
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-500">{error}</p>
              </div>
            ) : course ? (
              <CourseForm initialData={course} isEditing />
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">{t('courses.notFound')}</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CourseEdit;
