import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import attendanceImage from "../assets/features/attendance.png";
import employeeImage from "../assets/features/employee.png";


interface FeatureProps {
  title: string;
  description: string;
  image: string;
}

const features: FeatureProps[] = [
  {
    title: "Attendance Management",
    description:
      "Generate daily and monthly attendance reports with ease.",
    image: attendanceImage,
  },
  // {
  //   title: "Mission/Assignment Management",
  //   description:
  //     "Streamline mission creation, approval, and rejection processes.",
  //   image: '',
  // },
  {
    title: "Employee Management",
    description:
      "Maintain comprehensive employee profiles with detailed information. Monitor overtime and manage leave requests effortlessly.",
    image: employeeImage,
  },
];

const featureList: string[] = [
  "Dark/Light theme",
  "Multi-language support",
  "Project Management",
  "Mission/Assignment Management",
  "Attendance Management",
  "Employee Management"
];

export const Features = () => {
  return (
    <section
      id="features"
      className="container py-24 sm:py-32 space-y-8"
    >
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        Features{" "}
        {/* <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Features
        </span> */}
      </h2>

      <div className="flex flex-wrap md:justify-center gap-4">
        {featureList.map((feature: string) => (
          <div key={feature}>
            <Badge
              variant="secondary"
              className="text-sm"
            >
              {feature}
            </Badge>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ title, description, image }: FeatureProps) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>

            <CardFooter>
              <img
                src={image}
                alt="About feature"
                className="w-[200px] lg:w-[300px] mx-auto"
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
