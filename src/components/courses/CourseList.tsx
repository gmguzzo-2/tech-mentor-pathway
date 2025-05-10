
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Filter, 
  SortAsc, 
  ChevronDown,
  BookOpen,
  Sliders,
  Plus
} from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import CourseCard from "./CourseCard";
import { Course } from "@/lib/data";
import { useTranslations } from "@/hooks/useTranslations";
import { fetchCourses } from "@/services/courseService";
import { Link, useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";

interface CourseListProps {
  courses?: Course[];
  title?: string;
  showFilters?: boolean;
  showCreateButton?: boolean;
}

const CourseList = ({ courses: propsCourses, title, showFilters = true, showCreateButton = false }: CourseListProps) => {
  const { t } = useTranslations();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(!propsCourses);
  const [error, setError] = useState<string | null>(null);
  
  // Load courses from Supabase if not provided as props
  useEffect(() => {
    if (propsCourses) {
      setCourses(propsCourses);
      return;
    }
    
    const loadCourses = async () => {
      try {
        const data = await fetchCourses();
        // Map database fields to match Course interface if needed
        const formattedData: Course[] = data.map(course => ({
          ...course,
          imageUrl: course.image_url
        }));
        setCourses(formattedData);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError(t('courses.loadError'));
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCourses();
  }, [propsCourses, t]);
  
  // Filter courses based on search term
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort courses based on selected sort option
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime();
      case 'rating-high':
        return b.rating - a.rating;
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'popularity':
      default:
        return b.reviews - a.reviews;
    }
  });
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle sort selection change
  const handleSortChange = (value: string) => {
    setSortBy(value);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-bold">{title || t('courses.title')} </h2>
          {!isLoading && <span className="text-gray-500 text-lg">({filteredCourses.length})</span>}
        </div>
        
        {showFilters && (
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t('courses.search')}
                className="pl-9"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-full sm:w-48">
                <div className="flex items-center">
                  <SortAsc className="mr-2 h-4 w-4" />
                  <SelectValue placeholder={t('courses.sortBy')} />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">{t('courses.popular')}</SelectItem>
                <SelectItem value="newest">{t('courses.newest')}</SelectItem>
                <SelectItem value="rating-high">{t('courses.highestRated')}</SelectItem>
                <SelectItem value="price-low">{t('courses.priceLowHigh')}</SelectItem>
                <SelectItem value="price-high">{t('courses.priceHighLow')}</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              {t('courses.filters')}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            
            {showCreateButton && user && (
              <Button 
                className="bg-techblue hover:bg-techblue/90 flex items-center"
                onClick={() => navigate('/courses/create')}
              >
                <Plus className="mr-2 h-4 w-4" />
                {t('courses.create')}
              </Button>
            )}
          </div>
        )}
      </div>
      
      {showFilters && (
        <div className="flex flex-wrap gap-2 pb-4">
          <Button variant="outline" size="sm" className="rounded-full">
            Web Development
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Data Science
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Programming
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Beginner
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Udemy
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Alura
          </Button>
          <Button variant="outline" size="sm" className="rounded-full bg-techpurple/10 text-techpurple border-techpurple">
            <Sliders className="mr-1 h-3 w-3" />
            {t('courses.allFilters')}
          </Button>
        </div>
      )}
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-lg border shadow-sm overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <div className="p-6 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-16 w-full" />
                <div className="flex justify-between">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-medium text-gray-700">{error}</h3>
          <p className="text-gray-500 mt-2">{t('courses.tryAgainLater')}</p>
        </div>
      ) : sortedCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCourses.map((course, index) => (
            <CourseCard 
              key={course.id} 
              course={course}
              featured={index === 0 && showFilters}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-medium text-gray-700">{t('courses.noCourses')}</h3>
          <p className="text-gray-500 mt-2">{t('courses.adjustSearch')}</p>
          {showCreateButton && user && (
            <Button 
              className="bg-techblue hover:bg-techblue/90 mt-4 flex items-center"
              onClick={() => navigate('/courses/create')}
            >
              <Plus className="mr-2 h-4 w-4" />
              {t('courses.createFirst')}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseList;
