import { SignIn } from "@clerk/nextjs"

function SignInPage() {
  return (
    <div className ="flex flex-col items-center justify-center gap-4 p-4">

    <h1 className="font-semibold text-4xl">Welcome Back 🙋‍♂️ </h1>
    <p className="text-xl">Sign in to continue to your Account</p>
    <SignIn/>
    </div>
  )
}

export default SignInPage