import { Button } from "./ui/button";
import { HeroCards } from "./HeroCards";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";
import { API_URL, RECAPTCHA_SITE_KEY } from "@/configs/env-config";

const formSchema = z.object({
  name: z.string().min(2, "Company name is required"),
  owner_name: z.string().min(2, "Owner name is required"),
  link: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  contact_phone: z.string().min(8, "Phone number is required"),
  address: z.string().min(2, "Address is required"),
  captcha: z.string(),
});

export const Hero = () => {
  const [open, setOpen] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      owner_name: "",
      link: "",
      contact_phone: undefined,
      address: "",
      captcha: "",
    },
  });

  const onCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
    form.setValue("captcha", token || "");
  };


  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!captchaToken) {
      toast.error("Please verify you are human");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/company/v01/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData: any = await response.json();

      if (!response.ok) {
        throw new Error('Server responded with an error');
      }

      setOpen(false);
      form.reset();

      if (responseData.code !== 200) {
        throw new Error(responseData.message);
      }

      toast.success("Company registered successfully. We will contact you shortly.");

    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
    }
  };


  useEffect(() => {
    if (!open) {
      setCaptchaToken(null);
      form.reset();
    }
  }, [open, form]);

  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6 w-full">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text">
              Welcome
            </span>{" "}
            to MekHR.com
          </h1>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          All-in-one HR system SaaS solution designed to simplify and optimize human resource processes. Built with cutting-edge technology.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <a href="mailto:info@cam-mob.com">
            <Button className="w-full md:w-1/3">Schedule a Demo</Button>
          </a>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full md:w-1/3">
                Sign Up Now
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Sign Up Your Company</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter company name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="owner_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Owner Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter owner name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Website (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contact_phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Phone</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter company address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-center my-4">
                    <ReCAPTCHA
                      sitekey={RECAPTCHA_SITE_KEY}
                      onChange={onCaptchaChange}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting
                      ? "Submitting..."
                      // : !captchaToken
                      //   ? "Please Verify Captcha"
                      : "Submit"
                    }
                  </Button>

                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="z-10 w-full h-full flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <HeroCards />
        </div>
      </div>

      <div className="shadow"></div>
    </section>
  );
};