
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Star, Clock, User, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Course } from "@/lib/data";
import { useTranslations } from "@/hooks/useTranslations";

interface CourseCardProps {
  course: Course;
  featured?: boolean;
}

const CourseCard = ({ course, featured = false }: CourseCardProps) => {
  const { id, title, provider, description, image_url, imageUrl, level, category, duration, rating, reviews, price, tags } = course;
  const { t } = useTranslations();
  
  // Format price to show as currency
  const formattedPrice = new Intl.NumberFormat('pt-BR', { 
    style: 'currency', 
    currency: 'BRL' 
  }).format(price);

  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${featured ? 'border-l-4 border-techpurple' : ''}`}>
      <div className="relative">
        <img 
          src={imageUrl || image_url || '/placeholder.svg'} 
          alt={title} 
          className="w-full h-48 object-cover"
        />
        {featured && (
          <div className="absolute top-4 right-4 bg-techpurple text-white text-xs font-bold px-3 py-1 rounded-full">
            {t('courses.featured')}
          </div>
        )}
        <div className="absolute top-4 left-4">
          <Badge variant="outline" className="bg-white font-medium">
            {provider}
          </Badge>
        </div>
        <div className="absolute bottom-4 left-4">
          <Badge className="bg-white text-gray-800 font-medium">
            {level}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg line-clamp-2 hover:text-techblue transition-colors">
            <Link to={`/courses/${id}`}>{title}</Link>
          </h3>
          <Badge variant={category === 'Web Development' ? 'default' : 'outline'} className="ml-2 shrink-0">
            {category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
        
        <div className="flex items-center text-sm space-x-4">
          <div className="flex items-center">
            <Clock size={16} className="mr-1 text-gray-500" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            <Star size={16} className="mr-1 text-yellow-500" />
            <span>{rating} ({reviews})</span>
          </div>
        </div>
        
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 4).map((tag, index) => (
              <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                {tag}
              </Badge>
            ))}
            {tags.length > 4 && (
              <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                +{tags.length - 4}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between items-center pt-2 border-t">
        <span className="font-bold text-lg">{formattedPrice}</span>
        <Button className="bg-techblue hover:bg-techblue/90">
          <Link to={`/courses/${id}`}>{t('courses.viewCourse')}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
