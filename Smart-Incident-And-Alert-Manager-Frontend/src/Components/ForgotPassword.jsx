export default function ForgotPassword({ onSwitchForm }) {
  
  const [email, setEmail] = useState("");


  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6">Forgot Password ?</h2>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Send Reset Link
        </button>
      </form>
      <p className="text-sm text-center mt-4">
        Don’t have an account?{" "}
        <span
          onClick={() => onSwitchForm("signup")}
          className="text-blue-600 cursor-pointer hover:underline"
        >
          Sign up
        </span>
      </p>
    </>
  );
}
