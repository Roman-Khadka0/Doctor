import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/forgotPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (data.status === "ok") {
        setMessage("✅ Password reset email sent successfully!");
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("❌ An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#4AA8B570] px-4">
      <div className="bg-white shadow-lg rounded-xl flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
        {/* Left Illustration Section */}
        <div className="md:w-1/2 bg-[#f1f7fe] flex items-center justify-center p-8">
          <img
            src="https://cdn-icons-png.flaticon.com/512/6195/6195700.png" // Use your own image or hosted illustration
            alt="Forgot Password Illustration"
            className="w-3/4 max-w-xs"
          />
        </div>

        {/* Right Form Section */}
        <div className="md:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-6 text-[#258C9B] text-center">Forgot Your Password?</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Your Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#258C9B]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#258C9B] text-white py-2 px-4 rounded-lg hover:bg-[#1e6f80] transition"
            >
              {loading ? "Sending..." : "RESET PASSWORD"}
            </button>
          </form>

          {message && (
            <p className="text-green-600 text-sm mt-4 text-center">{message}</p>
          )}
          {error && (
            <p className="text-red-600 text-sm mt-4 text-center">{error}</p>
          )}

          <button
            onClick={() => navigate(-1)}
            className="mt-4 w-full text-[#258C9B] border border-[#258C9B] py-2 px-4 rounded-lg hover:bg-[#258C9B] hover:text-white transition"
          >
            Back to login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
