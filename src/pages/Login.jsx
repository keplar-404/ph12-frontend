import SocialLogin from "../components/shared/SocialLogin";
import Form from "../components/others/login/Form";
import { handleGithubSignIn, handleGoogleSignIn } from "../services/auth/socialLogin";

export default function Login() {
  const socialLogin = [
    {
      name: "Google",
      img: "https://tailus.io/sources/blocks/social/preview/images/google.svg",
      func: handleGoogleSignIn,
    },
    {
      name: "Github",
      img: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
      func: handleGithubSignIn,
    },
  ];

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl balboo">
              Log in your account
            </h1>

            <p className="mt-4 text-gray-500 cabin">
              Log in to your account and help the community to grow a world wide
              leading organization for helping pet animals.
            </p>
          </div>
          <Form />

          <p className="text-2xl font-bold sm:text-3xl balboo my-[2rem] text-center">
            Or
          </p>
          <div className="flex flex-col gap-3">
            {socialLogin.map((data, index) => (
              <SocialLogin
                key={index}
                img={data.img}
                name={data.name}
                action={data.func}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
