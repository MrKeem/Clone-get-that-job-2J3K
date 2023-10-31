import { useState, useEffect } from "react";
import axios from "axios";
import RecruiterSidebar from "@/components/RecruiterSidebar.jsx";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import money_dollar_circle_fill from "@/images/posting-job-page/money_dollar_circle_fill.png";
import { useToast } from "@/components/ui/use-toast";

//const navigate = useNavigate();

const postJobSchema = yup.object({
  jobTitle: yup.string().required("JOB TITLE is a required field"),
  jobCategory: yup.string().required("JOB CATEGORY is a required field"),
  jobType: yup.string().required("JOB TYPE is a required field"),
  salaryRangeMin: yup
    .number()
    .positive("SALARY MIN is not a positive number.")
    .integer()
    .typeError("SALARY MIN is not a positive number.")
    .required(),
  salaryRangeMax: yup
    .number()
    .positive("SALARY MAX is not a positive number.")
    .integer()
    .typeError("SALARY MAX is not a positive number.")
    .required(),
  aboutJobPosition: yup
    .string()
    .required("ABOUT THE JOB POSITION is a required field"),
  mandatoryRequirement: yup
    .string()
    .required("MANDATORY REQUIREMENTS is a required field"),
  optionalRequirement: yup
    .string()
    .required("OPTIONAL REQUIREMENTS is a required field"),
});

function CreateJobPosting() {
  const form = useForm({ resolver: yupResolver(postJobSchema) });
  const navigate = useNavigate();
  const { toast } = useToast();

  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [newcategory, setNewcategory] = useState("");

  const getCategories = async () => {
    try {
      const results = await axios.get(
        "https://clone-get-that-job-2-j3-k-backend.vercel.app/category"
      );
      //const categories = results.data.result;
      setCategories(results.data.result);
      console.log("Categories get successful");
    } catch (error) {
      console.error("Error: unable to load categories", error);
    }
  };

  const getTypes = async () => {
    try {
      const results = await axios.get(
        "https://clone-get-that-job-2-j3-k-backend.vercel.app/type"
      );
      //const categories = results.data.result;
      setTypes(results.data.result);
      console.log("Types get successful");
    } catch (error) {
      console.error("Error: unable to load Types", error);
    }
  };

  useEffect(() => {
    getCategories();
    getTypes();
    console.log("categories are", categories);
    console.log("Types are", types);
  }, []);

  const createCategory = async () => {
    try {
      const capitalizedValue =
        newcategory.charAt(0).toUpperCase() +
        newcategory.slice(1).toLowerCase();
      const fetchCategory = {
        category_name: capitalizedValue,
      };
      console.log(fetchCategory);
      await axios.post(
        "https://clone-get-that-job-2-j3-k-backend.vercel.app/category",
        fetchCategory
      );
      console.log("Create new category successful");
      toast({
        description: "Create new category successful.",
      });
      getCategories();
    } catch (error) {
      console.error("Error: unable to post", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      try {
        console.log(data);
        await axios.post(
          "https://clone-get-that-job-2-j3-k-backend.vercel.app/jobs",
          data
        );
        console.log("Posting successful");
        toast({
          description: "Post job successful.",
        });
      } catch (error) {
        console.error("Error: unable to post", error);
      }
      navigate("/recruiter/jobpostings");
    } catch (error) {
      console.error("Error during posting job", error);
    }
  };

  return (
    <>
      <div className="flex flex-row">
        <RecruiterSidebar />
        <div className="bg-Background w-full flex justify-center">
          <div className="w-[960px] py-8 space-y-4">
            <div className="Title text-Headline4 text-DarkGray font-Montserrat font-normal">
              Create new job posting
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="PersonalInfo w-full p-2 ">
                  <div className="text-Headline5 text-DarkGray font-Montserrat font-normal">
                    Main information
                  </div>
                  <div className="w-[300px] ">
                    <FormField
                      control={form.control}
                      name="jobTitle"
                      defaultValue=""
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>JOB TITLE</FormLabel>
                          <FormControl>
                            <Input placeholder="Software engineer" {...field} />
                          </FormControl>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="jobCategory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>JOB CATEGORY</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select or create a category" />
                              </SelectTrigger>
                            </FormControl>

                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Categories</SelectLabel>
                              </SelectGroup>
                              <div className="flex flex-row max-w-[282px] pl-5 items-center space-x-2">
                                <Input
                                  type="text"
                                  placeholder="Create a category"
                                  className="flex-initial w-full"
                                  value={newcategory}
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    setNewcategory(e.target.value);
                                    console.log(e.target.value);
                                  }}
                                />
                                <Button
                                  size="secondary"
                                  className="flex-initial w-2/5"
                                  onClick={createCategory}
                                >
                                  Create
                                </Button>
                              </div>
                              <ScrollArea className="h-40 w-full ">
                                {categories.map((category, key) => {
                                  return (
                                    <SelectItem
                                      value={category.category_name}
                                      key={key}
                                    >
                                      {category.category_name}
                                    </SelectItem>
                                  );
                                })}
                              </ScrollArea>
                            </SelectContent>
                          </Select>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="jobType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>TYPE</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a type" />
                              </SelectTrigger>
                            </FormControl>

                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Types</SelectLabel>
                              </SelectGroup>
                              <ScrollArea className="h-40 w-full ">
                                {types.map((type, key) => {
                                  return (
                                    <SelectItem
                                      value={type.type_name}
                                      key={key}
                                    >
                                      {type.type_name}
                                    </SelectItem>
                                  );
                                })}
                              </ScrollArea>
                            </SelectContent>
                          </Select>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <label
                      htmlFor="inputLabel"
                      className="text-DarkGray text-Overline font-Inter font-normal tracking-[1.5px]"
                    >
                      SALARY RANGE
                    </label>
                    <div className=" w-[231px] flex flex-row items-center ">
                      <FormField
                        control={form.control}
                        name="salaryRangeMin"
                        defaultValue=""
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel></FormLabel>
                            <FormControl>
                              <Input
                                placeholder="min"
                                className="pl-9 bg-origin-padding bg-[url('@/images/posting-job-page/money_dollar_circle_fill.png')] bg-no-repeat bg-[length:20px_20px] bg-[center_left_8px] "
                                {...field}
                              ></Input>
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <hr className="w-[11px] h-[2px] mx-2 rounded-[2px] bg-LightGray" />
                      {/* url('@/images/posting-job-page/money_dollar_circle_fill.png')*/}
                      <FormField
                        control={form.control}
                        name="salaryRangeMax"
                        defaultValue=""
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel></FormLabel>
                            <FormControl>
                              <Input
                                placeholder="max"
                                className="pl-9 bg-origin-padding bg-[url('@/images/posting-job-page/money_dollar_circle_fill.png')] bg-no-repeat bg-[length:20px_20px] bg-[center_left_8px] "
                                {...field}
                              />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="ProfessionalInfo w-full p-2 ">
                  <div className="text-Headline5 text-DarkGray font-Montserrat font-normal">
                    Additional information
                  </div>
                  <div className="w-full ">
                    <FormField
                      control={form.control}
                      name="aboutJobPosition"
                      defaultValue=""
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ABOUT THE JOB POSITION</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe the main functions and characteristics of your job position"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="mandatoryRequirement"
                      defaultValue=""
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>MANDATORY REQUIREMENTS</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="List each mandatory requirement in a new line"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="optionalRequirement"
                      defaultValue=""
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>OPTIONAL REQUIREMENTS</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="List each optional requirement in a new line"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="h-10 w-[153px]"
                  variant="default"
                  size="secondary"
                >
                  POST THIS JOB
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
export default CreateJobPosting;
