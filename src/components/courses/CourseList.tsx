
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Filter, 
  SortAsc, 
  ChevronDown,
  BookOpen,
  Sliders
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

interface CourseListProps {
  courses: Course[];
  title?: string;
  showFilters?: boolean;
}

const CourseList = ({ courses, title = "Courses", showFilters = true }: CourseListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  
  // Placeholder for filtered/sorted courses
  const displayedCourses = courses;
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // In a real app, you would filter courses based on searchTerm
  };
  
  // Handle sort selection change
  const handleSortChange = (value: string) => {
    setSortBy(value);
    // In a real app, you would sort courses based on sortBy
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">{title} <span className="text-gray-500 text-lg">({courses.length})</span></h2>
        
        {showFilters && (
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search courses..."
                className="pl-9"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-full sm:w-48">
                <div className="flex items-center">
                  <SortAsc className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Sort by" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Most Popular</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="rating-high">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Filters
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
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
            All Filters
          </Button>
        </div>
      )}
      
      {displayedCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCourses.map((course, index) => (
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
          <h3 className="text-xl font-medium text-gray-700">No courses found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default CourseList;
