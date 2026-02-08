import LoginForm from "../Components/LoginForm";
export default function Login() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-slate-700">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
       <LoginForm />
      </div>
    </div>
  );
}
