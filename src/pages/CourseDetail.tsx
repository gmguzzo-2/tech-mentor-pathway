
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslations } from "@/hooks/useTranslations";
import { fetchCourseById, deleteCourse } from "@/services/courseService";
import { Course } from "@/lib/data";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
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
} from "@/components/ui/alert-dialog";
import {
  Clock,
  BookOpen,
  User,
  Star,
  Edit,
  Trash2,
  ArrowLeft
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { t } = useTranslations();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const isOwner = user && course?.user_id === user.id;
  
  useEffect(() => {
    const loadCourse = async () => {
      try {
        if (id) {
          const courseData = await fetchCourseById(id);
          
          // Ensure level is one of the allowed values
          let level: "Beginner" | "Intermediate" | "Advanced" = "Beginner";
          if (courseData.level === "Intermediate" || courseData.level === "Advanced") {
            level = courseData.level;
          }
          
          // Format data to match Course interface
          const formattedCourse: Course = {
            ...courseData,
            level,
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

  const handleDelete = async () => {
    if (!id) return;
    
    setIsDeleting(true);
    try {
      await deleteCourse(id);
      toast({
        title: t('courses.deleted'),
        description: t('courses.deleteSuccess'),
      });
      navigate('/courses');
    } catch (err) {
      console.error("Error deleting course:", err);
      toast({
        title: t('courses.error'),
        description: t('courses.deleteError'),
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Format price to show as currency
  const formattedPrice = course?.price 
    ? new Intl.NumberFormat('pt-BR', { 
        style: 'currency', 
        currency: 'BRL' 
      }).format(course.price)
    : '';

  // Use image_url first, then fall back to imageUrl for backwards compatibility
  const imageSource = course?.image_url || course?.imageUrl || '/placeholder.svg';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Back button */}
          <Button
            variant="ghost"
            className="mb-4 flex items-center"
            onClick={() => navigate('/courses')}
          >
            <ArrowLeft size={16} className="mr-2" />
            {t('common.back')}
          </Button>

          {isLoading ? (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <Skeleton className="h-64 w-full" />
              <div className="p-6 space-y-4">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-24 w-full" />
                <div className="flex space-x-4">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
            </div>
          ) : error ? (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <p className="text-red-500 text-lg">{error}</p>
              <Button
                className="mt-4"
                onClick={() => navigate('/courses')}
              >
                {t('common.backToCourses')}
              </Button>
            </div>
          ) : course ? (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Course Image */}
              <div className="relative h-64">
                <img 
                  src={imageSource} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                />
                {isOwner && (
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Button 
                      variant="outline" 
                      className="bg-white"
                      onClick={() => navigate(`/courses/edit/${id}`)}
                    >
                      <Edit size={16} className="mr-2" />
                      {t('common.edit')}
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                          <Trash2 size={16} className="mr-2" />
                          {t('common.delete')}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>{t('courses.confirmDelete')}</AlertDialogTitle>
                          <AlertDialogDescription>
                            {t('courses.deleteWarning')}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                            {isDeleting ? t('common.deleting') : t('common.delete')}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
              </div>
              
              {/* Course Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Badge>{course.provider}</Badge>
                      <Badge variant="outline">{course.level}</Badge>
                      <Badge variant="secondary">{course.category}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-techblue">{formattedPrice}</div>
                    {course.featured && (
                      <Badge className="bg-techpurple mt-2">{t('courses.featured.label')}</Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm mb-6">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1 text-gray-500" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Star size={16} className="mr-1 text-yellow-500" />
                    <span>{course.rating} ({course.reviews})</span>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-3">{t('courses.description')}</h2>
                  <p className="text-gray-700 whitespace-pre-line">{course.description}</p>
                </div>
                
                {course.tags && course.tags.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">{t('courses.tags')}</h2>
                    <div className="flex flex-wrap gap-2">
                      {course.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="pt-6 mt-8 border-t border-gray-200">
                  <Button className="w-full md:w-auto bg-techblue hover:bg-techblue/90">
                    {t('courses.enroll')}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <p className="text-gray-500 text-lg">{t('courses.notFound')}</p>
              <Button
                className="mt-4"
                onClick={() => navigate('/courses')}
              >
                {t('common.backToCourses')}
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CourseDetail;
