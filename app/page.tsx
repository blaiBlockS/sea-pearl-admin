import LoginForm from "../components/pages/home/loginForm";
import { redirect } from "next/navigation";

/**
 * @로그인_페이지
 */
export default function Home() {
  // const token = cookies().get('your_token_name')?.value
  const token = null; // httpOnly쿠키 가져옴?

  if (token) {
    redirect("/dashboard/main"); // 서버에서 바로 리다이렉트
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoginForm />
    </div>
  );
}
