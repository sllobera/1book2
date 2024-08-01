

import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { DashboardIcon, RowsIcon } from '@radix-ui/react-icons'
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import Page from "@/app/protected/db";
import { useState } from 'react';

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';


export default async function ProtectedPage() {
  const supabase = createClient();
 
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center h-screen">
      <div className="w-full">
      
      <header className="bg-white w-full">
      <nav aria-label="Global" className="mx-auto w-full  bg-white top-0 fixed flex  border-b  items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">KAOS</span>
            <img alt="" src="https://kaos.money/_next/static/media/klogo.1039241a.svg" className="h-8 w-auto" />
          </a>
        </div>
         
        <div className="flex items-start lg:flex lg:flex-1 lg:justify-end">
   <RowsIcon className="mr-2"/>
   <DashboardIcon/>
        </div>
      </nav></header>
      </div>

      <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <Header />
        <Page />
        <main className="flex-1 flex flex-col gap-6">
          <h2 className="font-bold text-4xl mb-4">Next opk</h2>
          <FetchDataSteps />
        </main>
      </div>

      <footer className="w-full border-t bg-white sticky bottom-0 p-4 flex justify-center text-center text-xs">
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
    </div>
  );
}
