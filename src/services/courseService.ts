
import { supabase } from "@/integrations/supabase/client";
import { Course } from "@/lib/data";

export type CourseFormData = {
  title: string;
  description?: string | null;
  provider: string;
  image_url?: string | null;
  level: string;
  category: string;
  duration: string;
  rating?: number;
  reviews?: number;
  price: number;
  tags?: string[];
  featured?: boolean;
};

/**
 * Fetches all courses from the database.
 */
export const fetchCourses = async () => {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }

  return data;
};

/**
 * Fetches a course by ID.
 */
export const fetchCourseById = async (id: string) => {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching course with ID ${id}:`, error);
    throw error;
  }

  return data;
};

/**
 * Creates a new course.
 */
export const createCourse = async (courseData: CourseFormData) => {
  const { data, error } = await supabase
    .from('courses')
    .insert([{
      ...courseData,
      user_id: (await supabase.auth.getUser()).data.user?.id
    }])
    .select()
    .single();

  if (error) {
    console.error("Error creating course:", error);
    throw error;
  }

  return data;
};

/**
 * Updates an existing course.
 */
export const updateCourse = async (id: string, courseData: Partial<CourseFormData>) => {
  const { data, error } = await supabase
    .from('courses')
    .update({
      ...courseData,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating course with ID ${id}:`, error);
    throw error;
  }

  return data;
};

/**
 * Deletes a course.
 */
export const deleteCourse = async (id: string) => {
  const { error } = await supabase
    .from('courses')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Error deleting course with ID ${id}:`, error);
    throw error;
  }

  return true;
};
