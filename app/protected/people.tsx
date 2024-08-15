import { CircleIcon } from "@radix-ui/react-icons"
import { BarsArrowUpIcon, PlusIcon, UsersIcon ,PlusCircleIcon} from '@heroicons/react/20/solid'
import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client";
import React from 'react';

import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

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
const [selected, setSelected] = useState(people)
  return (
    
    <div className="divide-y divide-gray-200   rounded-lg bg-white shadow">
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
        className="rounded-full ml-1 mt-1 bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        {acc}
      </button>)):<Loader/>}

</div>
     
   <div className="px-4 py-5 sm:px-6">
   {people.length >0  &&
   <Listbox value={selected} onChange={setSelected}>
      <Label className="block text-sm font-medium leading-6 text-gray-900">Assigned Accouns</Label>
      <div className="relative mt-2">
        <ListboxButton className="relative  cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6">
          <span className="block truncate">{selected.first_name?selected.first_name +" "+ selected.last_name:"Select user"}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
        >
          {people.length >0 ?people.map((person: { id: Key ,first_name: string,last_name:string }) => (
            <ListboxOption
              key={person.id}
              value={person}
              className="group relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 data-[focus]:bg-blue-600 data-[focus]:text-white"
            >
              <span className="block truncate font-normal group-data-[selected]:font-semibold">{person.first_name + person.last_name} </span>

              <span className="absolute inset-y-0 left-0 flex items-center pl-1.5 text-blue-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                <CheckIcon aria-hidden="true" className="h-5 w-5" />
              </span>
            </ListboxOption>
          )):<Loader/>}
        </ListboxOptions>
      </div>
    </Listbox>}
    
   </div>



   
   
    
  </div>
   
  )
}
