export default function Login() {
    return(
        <>
         
        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>

        <form className="space-y-4">
          
          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="block text-right w-full text-sm mt-1 text-blue-600 cursor-pointer hover:underline">
            Forgot password?
          </span>
          </div>
          

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>

        </form>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <span className="text-blue-600 cursor-pointer hover:underline">
            Sign up
          </span>
        </p>

        </>
    );

}