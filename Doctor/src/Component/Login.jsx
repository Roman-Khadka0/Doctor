import { useState } from "react";
import { Lock, Mail } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
    console.log(JSON.stringify(email));
    console.log(JSON.stringify(password));
    console.log(JSON.stringify(rememberMe));

  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: "#EAE7DD" }}>
      <div className="w-full max-w-md p-6 shadow-xl bg-white rounded-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Login</h2>
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full border rounded-lg px-10 py-2 focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full border rounded-lg px-10 py-2 focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="form-checkbox" 
                  style={{ background: "#99775C" }}
                />
                <span>Remember me</span>
              </label>
            </div>

            <button 
                type="submit" 
                className="w-full py-2 rounded-lg"
                style={{ backgroundColor: "#99775C", color: "white" }}
            >
                Login
            </button>
            <div>
            <a href="#" className="text-sm hover:underline text-xl" 
               style={{ text: "#99775C" }}>
              Forgot password? Help is on your way!!
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
