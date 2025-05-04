
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Check, Upload } from "lucide-react";
import { skillCategories } from "@/lib/data";

interface Skill {
  name: string;
  level: number;
}

const ProfileForm = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState<number>(1);
  const [selectedTab, setSelectedTab] = useState("personal");

  // Add new skill to the skills array
  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.find(skill => skill.name === newSkill)) {
      setSkills([...skills, { name: newSkill, level: newSkillLevel }]);
      setNewSkill("");
      setNewSkillLevel(1);
    }
  };

  // Remove skill from the skills array
  const handleRemoveSkill = (skillName: string) => {
    setSkills(skills.filter(skill => skill.name !== skillName));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Your Profile</CardTitle>
        <CardDescription>
          Complete your profile to get personalized learning recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="personal" onValueChange={setSelectedTab} value={selectedTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="skills">Skills & Goals</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal" className="space-y-6 mt-6">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center">
                  <Upload className="h-10 w-10 text-gray-500" />
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="absolute bottom-0 right-0 rounded-full" 
                  type="button"
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="Enter your first name" />
              </div>
              <div className="space-y-3">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Enter your last name" />
              </div>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your@email.com" />
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="City, Country" />
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="bio">Professional Bio</Label>
              <Textarea 
                id="bio" 
                placeholder="Tell us about your background, experience, and career aspirations..."
                className="min-h-[120px]"
              />
            </div>
            
            <div className="flex justify-end">
              <Button
                onClick={() => setSelectedTab("skills")}
                className="bg-techblue hover:bg-techblue/90"
              >
                Continue
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="skills" className="space-y-6 mt-6">
            <div className="space-y-3">
              <Label>Current Skills</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {skills.map((skill) => (
                  <Badge key={skill.name} variant="secondary" className="py-1.5 pl-2 pr-1 flex items-center gap-1 bg-gray-100">
                    {skill.name}
                    <span className="bg-techblue text-white rounded-full px-1.5 text-xs">{skill.level}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-5 w-5 p-0 hover:bg-transparent"
                      onClick={() => handleRemoveSkill(skill.name)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
                {skills.length === 0 && (
                  <p className="text-sm text-gray-500">Add skills to your profile to get better recommendations</p>
                )}
              </div>
              
              <div className="flex gap-2">
                <Select
                  value={newSkill}
                  onValueChange={setNewSkill}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select a skill" />
                  </SelectTrigger>
                  <SelectContent>
                    {skillCategories.map((category) => (
                      <div key={category.name}>
                        <div className="px-2 py-1.5 text-sm font-semibold text-gray-500">{category.name}</div>
                        {category.skills.map((skill) => (
                          <SelectItem key={skill} value={skill}>
                            {skill}
                          </SelectItem>
                        ))}
                      </div>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select 
                  value={String(newSkillLevel)}
                  onValueChange={(value) => setNewSkillLevel(Number(value))}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Basic</SelectItem>
                    <SelectItem value="2">2 - Beginner</SelectItem>
                    <SelectItem value="3">3 - Intermediate</SelectItem>
                    <SelectItem value="4">4 - Advanced</SelectItem>
                    <SelectItem value="5">5 - Expert</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button
                  type="button"
                  onClick={handleAddSkill}
                  disabled={!newSkill}
                  className="bg-techblue hover:bg-techblue/90"
                >
                  <Plus className="mr-1 h-4 w-4" /> Add
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="goals">Career Goals</Label>
              <Textarea 
                id="goals" 
                placeholder="What are your career goals? What skills do you want to develop?"
                className="min-h-[120px]"
              />
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="experience">Experience Level</Label>
              <Select defaultValue="mid">
                <SelectTrigger id="experience">
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                  <SelectItem value="junior">Junior (1-3 years)</SelectItem>
                  <SelectItem value="mid">Mid-level (3-5 years)</SelectItem>
                  <SelectItem value="senior">Senior (5-10 years)</SelectItem>
                  <SelectItem value="expert">Expert (10+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setSelectedTab("personal")}
              >
                Back
              </Button>
              <Button
                onClick={() => setSelectedTab("preferences")}
                className="bg-techblue hover:bg-techblue/90"
              >
                Continue
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="preferences" className="space-y-6 mt-6">
            <div className="space-y-3">
              <Label htmlFor="learning-style">Preferred Learning Style</Label>
              <Select defaultValue="visual">
                <SelectTrigger id="learning-style">
                  <SelectValue placeholder="Select your learning style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="visual">Visual (videos, diagrams)</SelectItem>
                  <SelectItem value="reading">Reading/Writing (articles, documentation)</SelectItem>
                  <SelectItem value="interactive">Interactive (coding exercises)</SelectItem>
                  <SelectItem value="project">Project-based learning</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="pace">Learning Pace</Label>
              <Select defaultValue="moderate">
                <SelectTrigger id="pace">
                  <SelectValue placeholder="Select your preferred pace" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relaxed">Relaxed (1-3 hours/week)</SelectItem>
                  <SelectItem value="moderate">Moderate (4-7 hours/week)</SelectItem>
                  <SelectItem value="intensive">Intensive (8-15 hours/week)</SelectItem>
                  <SelectItem value="accelerated">Accelerated (16+ hours/week)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              <Label>Interested in Mentorship?</Label>
              <div className="flex gap-4">
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="mentor-yes" 
                    name="mentorship" 
                    className="h-4 w-4 border-gray-300 text-techblue focus:ring-techblue"
                    defaultChecked 
                  />
                  <label htmlFor="mentor-yes" className="ml-2 text-sm text-gray-700">
                    Yes, I'm interested
                  </label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="mentor-no" 
                    name="mentorship" 
                    className="h-4 w-4 border-gray-300 text-techblue focus:ring-techblue" 
                  />
                  <label htmlFor="mentor-no" className="ml-2 text-sm text-gray-700">
                    Not at this time
                  </label>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Label>Content Preferences</Label>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="content-videos" 
                    name="content-preferences" 
                    className="h-4 w-4 border-gray-300 rounded text-techblue focus:ring-techblue"
                    defaultChecked 
                  />
                  <label htmlFor="content-videos" className="ml-2 text-sm text-gray-700">
                    Video Lessons
                  </label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="content-courses" 
                    name="content-preferences" 
                    className="h-4 w-4 border-gray-300 rounded text-techblue focus:ring-techblue"
                    defaultChecked 
                  />
                  <label htmlFor="content-courses" className="ml-2 text-sm text-gray-700">
                    Full Courses
                  </label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="content-academic" 
                    name="content-preferences" 
                    className="h-4 w-4 border-gray-300 rounded text-techblue focus:ring-techblue" 
                  />
                  <label htmlFor="content-academic" className="ml-2 text-sm text-gray-700">
                    Academic Materials
                  </label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="content-practical" 
                    name="content-preferences" 
                    className="h-4 w-4 border-gray-300 rounded text-techblue focus:ring-techblue"
                    defaultChecked 
                  />
                  <label htmlFor="content-practical" className="ml-2 text-sm text-gray-700">
                    Practical Projects
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setSelectedTab("skills")}
              >
                Back
              </Button>
              <Button className="bg-techblue hover:bg-techblue/90">
                <Check className="mr-2 h-4 w-4" /> Complete Profile
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;
