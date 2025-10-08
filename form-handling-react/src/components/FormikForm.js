import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const FormikForm = () => {
  const [status, setStatus] = useState({ success: "", error: "" });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setStatus({ success: "", error: "" });

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setStatus({ success: "User registered successfully!", error: "" });
        resetForm();
      } else {
        setStatus({ success: "", error: "Registration failed. Try again." });
      }
    } catch (err) {
      setStatus({ success: "", error: "Network error. Please try again." });
    }

    setSubmitting(false);
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2>User Registration (Formik + Yup)</h2>

      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            {/* Username Field */}
            <div style={{ marginBottom: "12px" }}>
              <label>Username:</label>
              <Field
                type="text"
                name="username"
                style={{ width: "100%", padding: "8px", marginTop: "4px" }}
              />
              <ErrorMessage name="username" component="div" style={{ color: "red" }} />
            </div>

            {/* Email Field */}
            <div style={{ marginBottom: "12px" }}>
              <label>Email:</label>
              <Field
                type="email"
                name="email"
                style={{ width: "100%", padding: "8px", marginTop: "4px" }}
              />
              <ErrorMessage name="email" component="div" style={{ color: "red" }} />
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: "12px" }}>
              <label>Password:</label>
              <Field
                type="password"
                name="password"
                style={{ width: "100%", padding: "8px", marginTop: "4px" }}
              />
              <ErrorMessage name="password" component="div" style={{ color: "red" }} />
            </div>

            {/* Status Messages */}
            {status.error && <p style={{ color: "red" }}>{status.error}</p>}
            {status.success && <p style={{ color: "green" }}>{status.success}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: "100%",
                padding: "10px",
                background: "green",
                color: "white",
                border: "none",
                borderRadius: "5px",
              }}
            >
              {isSubmitting ? "Submitting..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikForm;
