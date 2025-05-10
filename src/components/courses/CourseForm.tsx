import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { useTranslations } from "@/hooks/useTranslations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CourseFormData, createCourse, updateCourse } from "@/services/courseService";
import { Course } from "@/lib/data";

// Define form schema using zod
const courseFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  provider: z.string().min(2, "Provider must be at least 2 characters"),
  image_url: z.string().url("Must be a valid URL").or(z.string().length(0)),
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
  category: z.string().min(2, "Category must be at least 2 characters"),
  duration: z.string().min(2, "Duration must be at least 2 characters"),
  price: z.coerce.number().min(0, "Price must be at least 0"),
  rating: z.coerce.number().min(0, "Rating must be at least 0").max(5, "Rating must be at most 5").optional(),
  reviews: z.coerce.number().min(0, "Reviews must be at least 0").optional(),
  featured: z.boolean().optional(),
  tags: z.string().transform(val => val.split(',').map(tag => tag.trim())).optional(),
});

type CourseFormValues = z.infer<typeof courseFormSchema>;

interface CourseFormProps {
  initialData?: Course;
  isEditing?: boolean;
}

const CourseForm = ({ initialData, isEditing = false }: CourseFormProps) => {
  const { t } = useTranslations();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Convert tags array to comma-separated string for form display
  const formattedData = initialData ? {
    ...initialData,
    tags: initialData.tags ? initialData.tags.join(", ") : "",
    // Keep image_url as is
  } : undefined;

  // Initialize the form with zod resolver
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: formattedData || {
      title: "",
      description: "",
      provider: "",
      image_url: "",
      level: "Beginner",
      category: "",
      duration: "",
      price: 0,
      rating: 0,
      reviews: 0,
      featured: false,
      tags: "",
    },
  });

  const onSubmit = async (data: CourseFormValues) => {
    setIsSubmitting(true);
    try {
      // Parse the numeric values
      const courseData: CourseFormData = {
        title: data.title,
        description: data.description,
        provider: data.provider,
        image_url: data.image_url || null,
        level: data.level,
        category: data.category,
        duration: data.duration,
        price: Number(data.price),
        rating: Number(data.rating || 0),
        reviews: Number(data.reviews || 0),
        featured: Boolean(data.featured),
        tags: Array.isArray(data.tags) ? data.tags : 
              typeof data.tags === 'string' ? data.tags.split(',').map(tag => tag.trim()) : [],
      };

      if (isEditing && initialData?.id) {
        await updateCourse(initialData.id, courseData);
        toast({
          title: t('courses.updated'),
          description: t('courses.updateSuccess'),
        });
      } else {
        await createCourse(courseData);
        toast({
          title: t('courses.created'),
          description: t('courses.createSuccess'),
        });
      }
      navigate('/courses');
    } catch (error) {
      console.error("Error submitting course:", error);
      toast({
        title: t('courses.error'),
        description: t('courses.submissionError'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title Field */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('courses.title')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('courses.titlePlaceholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Provider Field */}
          <FormField
            control={form.control}
            name="provider"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('courses.provider')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('courses.providerPlaceholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image URL Field */}
          <FormField
            control={form.control}
            name="image_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('courses.imageUrl')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('courses.imageUrlPlaceholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Level Field */}
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('courses.level')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('courses.selectLevel')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Beginner">{t('courses.levels.beginner')}</SelectItem>
                    <SelectItem value="Intermediate">{t('courses.levels.intermediate')}</SelectItem>
                    <SelectItem value="Advanced">{t('courses.levels.advanced')}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category Field */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('courses.category')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('courses.selectCategory')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Web Development">{t('courses.categories.webDevelopment')}</SelectItem>
                    <SelectItem value="Data Science">{t('courses.categories.dataScience')}</SelectItem>
                    <SelectItem value="Programming">{t('courses.categories.programming')}</SelectItem>
                    <SelectItem value="DevOps">{t('courses.categories.devOps')}</SelectItem>
                    <SelectItem value="Design">{t('courses.categories.design')}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Duration Field */}
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('courses.duration')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('courses.durationPlaceholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price Field */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('courses.price')}</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" min="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Rating Field */}
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('courses.rating')}</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" min="0" max="5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Reviews Field */}
          <FormField
            control={form.control}
            name="reviews"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('courses.reviews')}</FormLabel>
                <FormControl>
                  <Input type="number" min="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tags Field */}
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2">
                <FormLabel>{t('courses.tags')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('courses.tagsPlaceholder')} {...field} />
                </FormControl>
                <FormMessage />
                <p className="text-xs text-gray-500">{t('courses.tagsHelp')}</p>
              </FormItem>
            )}
          />

          {/* Description Field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2">
                <FormLabel>{t('courses.description')}</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder={t('courses.descriptionPlaceholder')} 
                    rows={5}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Featured Field */}
          <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="h-4 w-4 border-gray-300 rounded text-techblue focus:ring-techblue"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>{t('courses.featured')}</FormLabel>
                  <p className="text-sm text-gray-500">{t('courses.featuredHelp')}</p>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/courses')}
            disabled={isSubmitting}
          >
            {t('common.cancel')}
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? t('common.submitting') : isEditing ? t('common.update') : t('common.create')}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CourseForm;
