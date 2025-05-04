
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CourseList from "@/components/courses/CourseList";
import { Button } from "@/components/ui/button";
import {
  Filter,
  X,
  ChevronDown,
  Sliders,
  BookOpen,
  Star
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Slider
} from "@/components/ui/slider";
import { courses } from "@/lib/data";

const Courses = () => {
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states would be implemented here in a real application
  const [priceRange, setPriceRange] = useState([0, 200]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Hero section */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h1 className="text-3xl font-bold mb-3">Explore Courses</h1>
            <p className="text-gray-600 mb-4 max-w-3xl">
              Discover a wide range of tech courses from top providers. Filter by category, level, or price to find the perfect match for your learning journey.
            </p>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="mr-2 h-4 w-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters sidebar */}
            {showFilters && (
              <div className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-sm h-fit">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg">Filters</h3>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setShowFilters(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <Accordion type="single" collapsible className="w-full" defaultValue="category">
                  {/* Category filter */}
                  <AccordionItem value="category">
                    <AccordionTrigger>Category</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="cat-webdev" 
                            className="h-4 w-4 border-gray-300 rounded text-techblue focus:ring-techblue" 
                          />
                          <label htmlFor="cat-webdev" className="ml-2 text-sm text-gray-700">
                            Web Development
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="cat-datascience" 
                            className="h-4 w-4 border-gray-300 rounded text-techblue focus:ring-techblue" 
                          />
                          <label htmlFor="cat-datascience" className="ml-2 text-sm text-gray-700">
                            Data Science
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="cat-programming" 
                            className="h-4 w-4 border-gray-300 rounded text-techblue focus:ring-techblue" 
                          />
                          <label htmlFor="cat-programming" className="ml-2 text-sm text-gray-700">
                            Programming
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="cat-devops" 
                            className="h-4 w-4 border-gray-300 rounded text-techblue focus:ring-techblue" 
                          />
                          <label htmlFor="cat-devops" className="ml-2 text-sm text-gray-700">
                            DevOps
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="cat-design" 
                            className="h-4 w-4 border-gray-300 rounded text-techblue focus:ring-techblue" 
                          />
                          <label htmlFor="cat-design" className="ml-2 text-sm text-gray-700">
                            Design
                          </label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Level filter */}
                  <AccordionItem value="level">
                    <AccordionTrigger>Level</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="level-beginner" 
                            className="h-4 w-4 border-gray-300 rounded text-techblue focus:ring-techblue" 
                          />
                          <label htmlFor="level-beginner" className="ml-2 text-sm text-gray-700">
                            Beginner
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="level-intermediate" 
                            className="h-4 w-4 border-gray-300 rounded text-techblue focus:ring-techblue" 
                          />
                          <label htmlFor="level-intermediate" className="ml-2 text-sm text-gray-700">
                            Intermediate
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="level-advanced" 
                            className="h-4 w-4 border-gray-300 rounded text-techblue focus:ring-techblue" 
                          />
                          <label htmlFor="level-advanced" className="ml-2 text-sm text-gray-700">
                            Advanced
                          </label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Provider filter */}
                  <AccordionItem value="provider">
                    <AccordionTrigger>Provider</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="provider-udemy" 
                            className="h-4 w-4 border-gray-300 rounded text-techblue focus:ring-techblue" 
                          />
                          <label htmlFor="provider-udemy" className="ml-2 text-sm text-gray-700">
                            Udemy
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="provider-alura" 
                            className="h-4 w-4 border-gray-300 rounded text-techblue focus:ring-techblue" 
                          />
                          <label htmlFor="provider-alura" className="ml-2 text-sm text-gray-700">
                            Alura
                          </label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Price range filter */}
                  <AccordionItem value="price">
                    <AccordionTrigger>Price</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <Slider
                          value={priceRange}
                          max={200}
                          step={5}
                          onValueChange={setPriceRange}
                          className="mt-6"
                        />
                        <div className="flex items-center justify-between">
                          <span className="text-sm">
                            R$ {priceRange[0]}
                          </span>
                          <span className="text-sm">
                            R$ {priceRange[1]}
                          </span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Rating filter */}
                  <AccordionItem value="rating">
                    <AccordionTrigger>Rating</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="rating-4.5" 
                            className="h-4 w-4 border-gray-300 rounded text-techblue focus:ring-techblue" 
                          />
                          <label htmlFor="rating-4.5" className="ml-2 text-sm text-gray-700 flex items-center">
                            <span className="flex items-center">
                              4.5 & up <Star className="h-3 w-3 text-yellow-500 ml-1" />
                            </span>
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="rating-4.0" 
                            className="h-4 w-4 border-gray-300 rounded text-techblue focus:ring-techblue" 
                          />
                          <label htmlFor="rating-4.0" className="ml-2 text-sm text-gray-700 flex items-center">
                            <span className="flex items-center">
                              4.0 & up <Star className="h-3 w-3 text-yellow-500 ml-1" />
                            </span>
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="rating-3.5" 
                            className="h-4 w-4 border-gray-300 rounded text-techblue focus:ring-techblue" 
                          />
                          <label htmlFor="rating-3.5" className="ml-2 text-sm text-gray-700 flex items-center">
                            <span className="flex items-center">
                              3.5 & up <Star className="h-3 w-3 text-yellow-500 ml-1" />
                            </span>
                          </label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <div className="mt-6 space-y-3">
                  <Button className="w-full bg-techblue hover:bg-techblue/90">
                    Apply Filters
                  </Button>
                  <Button variant="outline" className="w-full">
                    Reset
                  </Button>
                </div>
              </div>
            )}
            
            {/* Courses list */}
            <div className={`w-full ${showFilters ? 'lg:w-3/4' : 'w-full'}`}>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <CourseList courses={courses} />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Courses;
