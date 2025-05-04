
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MentorCard from "@/components/mentors/MentorCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  X,
  Calendar,
  Sliders
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { mentors } from "@/lib/data";

const Mentors = () => {
  const [showFilters, setShowFilters] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Hero section */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h1 className="text-3xl font-bold mb-3">Find Your Mentor</h1>
            <p className="text-gray-600 mb-4 max-w-3xl">
              Connect with industry experts who can provide personalized guidance, code reviews, and career advice to accelerate your tech journey.
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
                
                <div className="mb-4">
                  <label htmlFor="search-mentors" className="block text-sm font-medium mb-1 text-gray-700">
                    Search mentors
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search-mentors"
                      placeholder="Name or specialty..."
                      className="pl-9"
                    />
                  </div>
                </div>
                
                <Accordion type="single" collapsible className="w-full" defaultValue="specialty">
                  {/* Specialty filter */}
                  <AccordionItem value="specialty">
                    <AccordionTrigger>Specialty</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="spec-webdev" 
                            className="h-4 w-4 border-gray-300 rounded text-techblue focus:ring-techblue" 
                          />
                          <label htmlFor="spec-webdev" className="ml-2 text-sm text-gray-700">
                            Web Development
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="spec-datascience" 
                            className="h-4 w-4 border-gray-300 rounded text-techblue focus:ring-techblue" 
                          />
                          <label htmlFor="spec-datascience" className="ml-2 text-sm text-gray-700">
                            Data Science
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="spec-devops" 
                            className="h-4 w-4 border-gray-300 rounded text-techblue focus:ring-techblue" 
                          />
                          <label htmlFor="spec-devops" className="ml-2 text-sm text-gray-700">
                            DevOps
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="spec-design" 
                            className="h-4 w-4 border-gray-300 rounded text-techblue focus:ring-techblue" 
                          />
                          <label htmlFor="spec-design" className="ml-2 text-sm text-gray-700">
                            UI/UX Design
                          </label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Experience filter */}
                  <AccordionItem value="experience">
                    <AccordionTrigger>Experience</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="exp-5plus" 
                            className="h-4 w-4 border-gray-300 rounded text-techblue focus:ring-techblue" 
                          />
                          <label htmlFor="exp-5plus" className="ml-2 text-sm text-gray-700">
                            5+ years
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="exp-10plus" 
                            className="h-4 w-4 border-gray-300 rounded text-techblue focus:ring-techblue" 
                          />
                          <label htmlFor="exp-10plus" className="ml-2 text-sm text-gray-700">
                            10+ years
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="exp-15plus" 
                            className="h-4 w-4 border-gray-300 rounded text-techblue focus:ring-techblue" 
                          />
                          <label htmlFor="exp-15plus" className="ml-2 text-sm text-gray-700">
                            15+ years
                          </label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Availability filter */}
                  <AccordionItem value="availability">
                    <AccordionTrigger>Availability</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="avail-weekends" 
                            className="h-4 w-4 border-gray-300 rounded text-techblue focus:ring-techblue" 
                          />
                          <label htmlFor="avail-weekends" className="ml-2 text-sm text-gray-700">
                            Weekends
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="avail-evenings" 
                            className="h-4 w-4 border-gray-300 rounded text-techblue focus:ring-techblue" 
                          />
                          <label htmlFor="avail-evenings" className="ml-2 text-sm text-gray-700">
                            Weekday Evenings
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="avail-flexible" 
                            className="h-4 w-4 border-gray-300 rounded text-techblue focus:ring-techblue" 
                          />
                          <label htmlFor="avail-flexible" className="ml-2 text-sm text-gray-700">
                            Flexible
                          </label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Price range filter */}
                  <AccordionItem value="price">
                    <AccordionTrigger>Hourly Rate</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="rate-under100" 
                            className="h-4 w-4 border-gray-300 rounded text-techblue focus:ring-techblue" 
                          />
                          <label htmlFor="rate-under100" className="ml-2 text-sm text-gray-700">
                            Under R$100/hour
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="rate-100to150" 
                            className="h-4 w-4 border-gray-300 rounded text-techblue focus:ring-techblue" 
                          />
                          <label htmlFor="rate-100to150" className="ml-2 text-sm text-gray-700">
                            R$100 - R$150/hour
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="rate-over150" 
                            className="h-4 w-4 border-gray-300 rounded text-techblue focus:ring-techblue" 
                          />
                          <label htmlFor="rate-over150" className="ml-2 text-sm text-gray-700">
                            Over R$150/hour
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
            
            {/* Mentors list */}
            <div className={`w-full ${showFilters ? 'lg:w-3/4' : 'w-full'}`}>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold mb-4 md:mb-0">Available Mentors <span className="text-gray-500 text-lg">({mentors.length})</span></h2>
                  <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative flex-grow md:w-64">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search mentors..."
                        className="pl-9"
                      />
                    </div>
                    
                    <Button variant="outline" className="flex items-center whitespace-nowrap">
                      <Calendar className="mr-2 h-4 w-4" />
                      Availability
                    </Button>
                    
                    <Button variant="outline" className="flex items-center whitespace-nowrap md:hidden" onClick={() => setShowFilters(!showFilters)}>
                      <Sliders className="mr-2 h-4 w-4" />
                      Filters
                    </Button>
                  </div>
                </div>

                {/* Filter chips */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <Button variant="outline" size="sm" className="rounded-full">
                    Web Development
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full bg-techpurple/10 text-techpurple border-techpurple">
                    Weekends
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    5+ years experience
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    Under R$150/hour
                  </Button>
                </div>
                
                {/* Mentors grid */}
                <div className="grid grid-cols-1 gap-6">
                  {mentors.map(mentor => (
                    <MentorCard key={mentor.id} mentor={mentor} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Mentors;
