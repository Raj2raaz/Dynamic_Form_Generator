import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Schema validation using Zod
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  companySize: z.string().min(1, "Company size is required"),
  industry: z.enum(["tech", "healthcare", "finance", "retail", "other"], {
    message: "Industry is required",
  }),
  timeline: z
    .string()
    .min(1, "Timeline is required")
    .refine((value) => ["immediate", "short", "medium", "long"].includes(value), {
      message: "Invalid timeline",
    }),
  comments: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

type FormProps = {
  onSubmit: (data: FormData) => void;
  formData: FormData;
};

const Form: React.FC<FormProps> = ({ onSubmit, formData }) => {
  const { register, handleSubmit, reset, formState: { errors, isValid }, getValues } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
    mode: "onChange"
  });

  useEffect(() => {
    reset(formData); // Reset form with new formData when it changes
  }, [formData]);

  // Function to download form data as JSON
  const downloadJson = () => {
    if (isValid) { // Ensure valid form data before downloading
      const data = getValues();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "form-data.json";
      a.click();

      URL.revokeObjectURL(url);
    } else {
      // Show a pop-up message if form data is invalid
      alert("You must fill the form correctly before downloading!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="mb-5">
        <h3 className="mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 md:text-xl lg:text-xl dark:text-white">
          Project Requirements Survey
        </h3>
        <p className="text-red-400">
          Please fill out this survey about your project needs**
        </p>
      </div>
      <div>
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
        <input
          {...register("name")}
          id="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
        <input
          {...register("email")}
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="companySize" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company Size</label>
        <select
          {...register("companySize")}
          id="companySize"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        >
          <option value="">Select company size</option>
          <option value="1-50">1-50</option>
          <option value="51-200">51-200</option>
          <option value="200-1000">200-1000</option>
          <option value="1000+">1000+</option>
        </select>
        {errors.companySize && <p className="text-red-500">{errors.companySize.message}</p>}
      </div>

      <div className="mb-5">
        <label htmlFor="industry" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Select Industry
        </label>
        <div className="flex flex-col">
          {["tech", "healthcare", "finance", "retail", "other"].map((value) => (
            <label key={value} className="flex items-center mb-4 text-gray-900 dark:text-gray-300">
              <input
                id="industry"
                type="radio"
                value={value}
                {...register("industry")}
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="ms-2 text-sm font-medium capitalize">{value}</span>
            </label>
          ))}
        </div>
        {errors.industry && <p className="text-red-500 text-sm">{errors.industry.message}</p>}
      </div>

      <div className="mb-5">
        <label htmlFor="timeline" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Project Timeline
        </label>
        <select
          id="timeline"
          {...register("timeline")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        >
          <option value="">Select a timeline</option>
          <option value="immediate">Immediate (within 1 month)</option>
          <option value="short">Short-term (1-3 months)</option>
          <option value="medium">Medium-term (3-6 months)</option>
          <option value="long">Long-term (6+ months)</option>
        </select>
        {errors.timeline && <p className="text-red-500 text-sm">{errors.timeline.message}</p>}
      </div>

      <div>
        <label htmlFor="comments" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Comments</label>
        <textarea
          {...register("comments")}
          id="comments"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {errors.comments && <p className="text-red-500">{errors.comments.message}</p>}
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg w-full sm:w-auto"
        >
          Submit
        </button>

        <button
          type="button"
          onClick={downloadJson}
          className="md:mx-4 px-4 py-2 bg-green-500 text-white rounded-lg w-full sm:w-auto"
        >
          Download JSON
        </button>

        <button
          type="reset"
          data-testid="resetBtn"
          className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-6 py-3 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 w-full sm:w-auto"
          onClick={() => reset(formData)}
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default Form;

