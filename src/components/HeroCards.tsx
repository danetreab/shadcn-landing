import { useTheme } from "./theme-provider";
import { Card } from "./ui/card";
import hr_saas_system_dark from "../assets/hero/hr-saas-system-dark.png";
import hr_saas_system_light from "../assets/hero/hr-saas-system-light.png";

export const HeroCards = () => {

  const { theme } = useTheme();

  return (
    <div className="w-[1200px] h-[600px]">
      <Card className="w-full h-full drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <img
          src={
            theme === "dark"
              ? hr_saas_system_dark
              : hr_saas_system_light
          }
          alt="HR SaaS System"
          className="w-full h-full object-contain rounded-lg"
        />
      </Card>
    </div>
  );
};