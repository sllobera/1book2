import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";


export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/protected");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
  };

  return (
    <>    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
       
        
        <form className="flex-1 flex flex-col w-full justify-center gap-2 ">
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="px-4 py-2 bg-inherit border mb-6"
            name="email"
            placeholder="you@example.com"
            required />
          <label className="text-sm" htmlFor="password">
            Password
          </label>
          <input
            className="px-4 py-2 bg-inherit border mb-6"
            type="password"
            name="password"
            placeholder="••••••••"
            required />
          <SubmitButton
            formAction={signIn}
            className="order rounded-md bg-blue-700 px-4 py-2 text-white mb-2"
            pendingText="Signing In..."
          >
            Sign In
          </SubmitButton>
          <SubmitButton
            formAction={signUp}
            className="border rounded-md px-4 py-2 text-foreground mb-2"
            pendingText="Signing Up..."
          >
            Sign Up
          </SubmitButton>
          {searchParams?.message && (
            <p className="mt-4 p-4   text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>
        </div>
        <footer className="w-full border-t p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            KAOS
          </a>
        </p>
      </footer>
      </>
   
  );
}
