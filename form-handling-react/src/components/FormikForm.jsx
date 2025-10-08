import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const FormikForm = () => {
  const handleSubmit = async (values, { resetForm, setSubmitting, setStatus }) => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setStatus({ success: "User registered successfully!" });
        resetForm();
      } else {
        setStatus({ error: "Registration failed." });
      }
    } catch (err) {
      setStatus({ error: "Network error. Try again." });
    }
    setSubmitting(false);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>User Registration (Formik + Yup)</h2>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form>
            <div style={{ marginBottom: "12px" }}>
              <label>Username:</label>
              <Field type="text" name="username" style={{ width: "100%", padding: "8px", marginTop: "4px" }} />
              <ErrorMessage name="username" component="div" style={{ color: "red" }} />
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label>Email:</label>
              <Field type="email" name="email" style={{ width: "100%", padding: "8px", marginTop: "4px" }} />
              <ErrorMessage name="email" component="div" style={{ color: "red" }} />
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label>Password:</label>
              <Field type="password" name="password" style={{ width: "100%", padding: "8px", marginTop: "4px" }} />
              <ErrorMessage name="password" component="div" style={{ color: "red" }} />
            </div>

            {status?.error && <p style={{ color: "red" }}>{status.error}</p>}
            {status?.success && <p style={{ color: "green" }}>{status.success}</p>}

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
