import { CircleIcon } from "@radix-ui/react-icons"
import { BarsArrowUpIcon, PlusIcon, UsersIcon ,PlusCircleIcon} from '@heroicons/react/20/solid'
import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client";

  

import Loader from './loader';
  
  
var accountlist: any[] = [];
var people: any[] = [];
export default function Addpeople() {
  const supabase = createClient();
  const acacc = async (acc: any) => {
    
const { error } = await supabase
.from('accounts')
.insert({ accountid: acc })

setAcc("");

getData();
  }

  const getusers = async () =>{
    const { data: users } = await supabase.from("profiles").select("id,first_name,last_name,email");
   
if(users)
     setPeople(users);
  }
  
  const getData = async () => {
    
   
    const { data: notes } = await supabase.from('accounts').select("accountid")
    
    accountlist=[];
    if(notes){
      for(var i=0;i<notes.length;i++)
   {
   
 accountlist.push(notes[i].accountid);
}

       getusers();
  
  
}}
useEffect(() => {getData()},[])
const [accid, setAcc] = useState(''); 
const [people, setPeople] = useState([{}] as any); 
const [selectedind, setIndex] = useState('');
  return (
    
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
    <div className="px-4 py-5 sm:px-6">
    <div>
      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
        Add Account 
      </label>
      <div className="mt-2 flex rounded-md shadow-sm">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <UsersIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
          </div>
        
          <input
          value={accid} // ...force the input's value to match the state variable...
          onChange={e => setAcc(e.target.value)} // ...
            id="email"
            name="email"
            type="email"
            placeholder="Account Number"
            className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900  placeholder:text-gray-400 sm:text-sm sm:leading-6"
          /> 
        </div>
        <button
        onClick={()=>{ acacc(accid); } }
          type="button"
          className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm bg-blue-50 font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <PlusCircleIcon aria-hidden="true" className="-ml-0.5 h-5 w-5 text-gray-400" />
          Add
        </button>
      </div>
    </div>
      {/* We use less vertical padding on card headers on desktop than on body sections */}

    </div>
    <div className="px-4 py-5 sm:p-6"> 

    { accountlist.length >0 ?accountlist.map((acc,index)=> (

    <button key={index} 
        type="button"
        className="rounded-full ml-1 mt-1 bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {acc}
      </button>)):<Loader/>}

</div>
      <ul role="list" className="divide-y divide-gray-100">
      {people.map((person: {
        id: string; first_name: string; last_name: string; email: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; surname: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; lastSeen: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; lastSeenDateTime: string | undefined; 
},id: string | null | undefined) => (
        <li key={person.id} className="flex justify-between gap-x-6 py-5"  onClick={()=>{if(selectedind == person.id ){setIndex('') }else{setIndex(person.id) }}}>
          <div className="flex min-w-0 gap-x-4">
         
            <div className="min-w-0 flex-auto ml-5">
              <p className="text-sm font-semibold leading-6 text-gray-900 text-nowrap">{person.first_name + " " +person.last_name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500 text-nowrap">{person.email}</p>
            </div>
          </div>
          <div className=" s">
           
              <div className="px-4 py-5 sm:p-6"> 

    { accountlist.length >0 ?accountlist.map((acc,index)=> (

    <button key={index} 
        type="button"
        className="rounded-full ml-1 mt-1 bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {acc}
      </button>)):<Loader/>}

</div>
            
          </div>
        </li>
      ))}
    </ul>




   
   
    
  </div>
   
  )
}
