 "use client"

import { DashboardIcon,BarChartIcon ,RowsIcon ,PersonIcon} from '@radix-ui/react-icons'
import { createClient } from "@/utils/supabase/client";

import { redirect } from "next/navigation";

import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as Toggle from '@radix-ui/react-toggle';

import Grid from './grid';
import List from './list';
import React, { useEffect, useState } from 'react';

var socket: WebSocket;
var connected = false;

export default    function ProtectedPage() {
  const supabase = createClient();
  const [dis, setValue] = React.useState('list');
  const [pep, setPep] = React.useState('addperson');
  const user = supabase.auth.getUser();
  const people = [
    {
      name: 'Leslie Alexander',
      email: 'leslie.alexander@example.com',
      role: 'Co-Founder / CEO',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    }
  ]
  const [equity, setEquity] = useState(444);
  const [positions, setPositions] = useState([]);
  const [total, setTotal] = useState(0);
  if (!user) {
    return redirect("/login");
  }
  
  const socketCloseListener = () => {
       if(!connected){
        
    if (socket) {
        console.log(socket);
        
    }
    socket = new WebSocket('WSS://www.kaostrading.com/sock?test');
    socket.addEventListener('message', socketMessageListener);
    socket.addEventListener('open', socketOpenListener);
    socket.addEventListener('close', socketCloseListener);

}}
const socketOpenListener = () => {
  console.log('Connected!!');
connected = true;
  
};
const socketMessageListener = (event: { data: string; }) => {

  console.log("opi "+JSON.parse(event.data).positions)


  setEquity(Number(JSON.parse(event.data).equity));
  setPositions(JSON.parse(event.data).positions);
   }
  useEffect(() => socketCloseListener(), [])

 

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center h-screen">
      <div className="w-full">

      
      <header className="bg-white w-full">
      <nav aria-label="Global" className="mx-auto drop-shadow-md w-full z-40  bg-white top-0 fixed flex  border-b  items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">KAOS</span>
            <img alt="" src="https://kaos.money/_next/static/media/klogo.1039241a.svg" className="h-8 w-auto" />
          </a>
        </div>
         
        <div className="flex items-start lg:flex lg:flex-1 lg:justify-end">
   
        <Toggle.Root className="Toggle mr-2" aria-label="Toggle italic">
    <BarChartIcon  />
  </Toggle.Root>
 
     <ToggleGroup.Root
    className="ToggleGroup"
    type="single"
    value={dis}
    defaultValue="list"
    aria-label="Text alignment"
    onValueChange={(value) => {
      if (value) setValue(value);
    }}
  >
     <ToggleGroup.Item className="ToggleGroupItem size-6" value="addperson" aria-label="Left aligned">
  <PersonIcon />

    </ToggleGroup.Item>
    <ToggleGroup.Item className="ToggleGroupItem size-6" value="list" aria-label="Left aligned">
      <RowsIcon />
    </ToggleGroup.Item>
    <ToggleGroup.Item className="ToggleGroupItem size-6" value="grid" aria-label="Center aligned">
      <DashboardIcon />
    </ToggleGroup.Item>
    
  </ToggleGroup.Root>
   
        </div>
      </nav></header>
      </div>

      <div className="flex-1 flex flex-col gap-20  pt-3 w-full">
      <main className="flex-1 flex flex-col gap-6 w-full">
     { dis =="grid" && <div key="name" className="grid  gap-4 grid-cols-2 md:grid-cols-4 px-2">
  
 { positions.map((person) => (
<Grid name={person[1]} role={person[2]} key={person[3]}/>
))}

      
      </div>}
      
      
      { dis =="list" && <div key="name" className="grid   grid-cols-1 md:grid-cols-1">

  { positions?positions.map((person) => (
 <List name={person[1]} role={person[2]} key={person[3]}/>
 )):""}
 
       
       </div>}
       
      
      </main>
      </div>
{/* <div className="bg-white min-h-32 fixed bottom-12 w-full"></div>*/}
      <footer className="w-full border-t bg-white sticky drop-shadow-md  bottom-0 p-4 flex justify-center text-center text-xs">
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
