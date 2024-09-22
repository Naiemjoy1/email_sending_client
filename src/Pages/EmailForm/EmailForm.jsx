import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmailForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  const onSubmit = async (data) => {
    const recipientsArray = data.recipients
      .split(";")
      .map((email) => email.trim()); // Trim whitespace
    if (recipientsArray.length === 0) {
      setError("recipients", {
        type: "manual",
        message: "Please enter at least one recipient.",
      });
      return; // Prevent further execution
    }

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/api/contact", {
        recipients: recipientsArray,
        message: data.message,
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Error sending emails");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Message</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            type="text"
            name="message"
            placeholder="Message"
            {...register("message", { required: true })}
          ></textarea>
          {errors.message && <span>This field is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Recipients</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            type="text"
            name="recipients"
            placeholder="Recipient emails separated by semicolon (;) "
            {...register("recipients", { required: true })}
          ></textarea>
          {errors.recipients && (
            <span>{errors.recipients.message || "This field is required"}</span>
          )}
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary" disabled={isLoading}>
            {isLoading ? "Sending..." : "Submit"}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EmailForm;
