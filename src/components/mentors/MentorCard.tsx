
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Mentor } from "@/lib/data";
import { useTranslations } from "@/hooks/useTranslations";

interface MentorCardProps {
  mentor: Mentor;
}

const MentorCard = ({ mentor }: MentorCardProps) => {
  const { id, name, role, company, imageUrl, specialties, yearsOfExperience, rating, reviews, availability, hourlyRate, bio } = mentor;
  const { t } = useTranslations();
  
  // Format hourly rate to show as currency
  const formattedHourlyRate = new Intl.NumberFormat('pt-BR', { 
    style: 'currency', 
    currency: 'BRL' 
  }).format(hourlyRate);

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="pb-0">
        <div className="flex items-start space-x-4">
          <img 
            src={imageUrl} 
            alt={name} 
            className="rounded-full h-16 w-16 object-cover border-2 border-gray-100"
          />
          <div className="space-y-1">
            <Link to={`/mentors/${id}`} className="hover:text-techblue transition-colors">
              <h3 className="font-bold text-lg">{name}</h3>
            </Link>
            <div className="text-gray-600 text-sm">
              {role} at {company}
            </div>
            <div className="flex items-center text-sm">
              <Star size={16} className="mr-1 text-yellow-500" />
              <span>{rating} ({reviews} {t('mentors.reviews')}) • {yearsOfExperience} {t('mentors.yearsExp')}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 pt-4">
        <p className="text-gray-600 text-sm line-clamp-2">{bio}</p>
        
        {specialties && specialties.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium">{t('mentors.specialties')}</div>
            <div className="flex flex-wrap gap-1">
              {specialties.map((specialty, index) => (
                <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-600">
            <Calendar size={16} className="mr-1 text-gray-500" />
            <span>{availability}</span>
          </div>
          <div className="font-semibold">{formattedHourlyRate}{t('mentors.hourly')}</div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-2 border-t">
        <Button variant="outline">{t('mentors.viewProfile')}</Button>
        <Button className="bg-techpurple hover:bg-techpurple/90">{t('mentors.scheduleSession')}</Button>
      </CardFooter>
    </Card>
  );
};

export default MentorCard;
