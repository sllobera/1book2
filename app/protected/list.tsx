import { ChevronRightIcon } from "@radix-ui/react-icons";

import classNames from "classnames";  
import { useState } from "react";
function countvol(acc: string | any[])
{
    var o=0;
    for (let i = 0; i < acc.length; i++) {
        if(acc[i][4].toLowerCase()=="sell")
        {o-=Number(acc[i][0])}
        else
        {o+=Number(acc[i][0]);}
            
     
      }
      return o.toFixed(1);
}
function format1(n: number, ) {
    var o = n<0?"-":""
    if(n <0){n = -n};
  
    return o + n.toFixed(2).replace(/./g, function(c: string, i: number, a: string | any[]) {
      return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c; 
    });
  }
export default function List({ name ,equity,deposit,pl,pos}: { name: string ,equity:number,deposit:number,pl:number,pos:any[]}){
  const [selectedind, setIndex] = useState('');

return[ 

    <ul key={name}
      role="list"
      className="divide-y divide-gray-400 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 "
    >
      
        <li key={name} onClick={()=>{if(selectedind == name ){setIndex('') }else{setIndex(name) }}} className={classNames("relative border-l-4  flex justify-between gap-x-6 px-1 py-1 hover:bg-gray-50 sm:px-6",{
 'border-green-600':equity-deposit>=0,
  'border-red-600':equity-deposit<0


 })}


        >
          <div className="flex min-w-0 gap-x-4">
            
            <div className="min-w-0 flex-auto">
              <p className="text-xs font-semibold leading-6 text-gray-900">
                
                  <span className="absolute inset-x-0 -top-px bottom-0 text-gray-600" />
                  
             
             
             
                  { name} - (<span className={classNames("" , {'text-blue-600':Number(countvol(pos))>=0,
                  'text-red-600':Number(countvol(pos))<0,
             
             
                })}>{pos.length}</span>)
                
              </p>
              <p className=" flex text-xs leading-5 text-green-800">
                <a href={`mailto:${equity}`} className="relative truncate hover:underline text-gray-900">
                  {format1(equity)}
                </a>
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-x-4">
            <div className="sm:flex sm:flex-col sm:items-end">
              <p className="text-xs leading-6 text-green-700 text-right">{"$"+format1(pl)}</p>
              {equity ? (
                <p className={classNames(" text-xs leading-5 ",
                  {'text-green-600':equity-deposit>=0,
                   'text-red-600':equity-deposit<0
             
             
                  })}>
           {"$"+format1(equity-deposit)}
                </p>
              ) : (
                <div className=" flex items-center gap-x-1.5">
                  <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">Online</p>
                </div>
              )}
            </div>
            <ChevronRightIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
          </div>
          
         
        </li>
       {selectedind == name &&  <table className="min-w-full divide-y divide-gray-300">
            
              <tbody className="bg-white">
                {pos.map((person) => (
                  <tr key={person.email} className="even:bg-gray-50">
                    <td className="whitespace-nowrap py-1 pl-2 pr-1 text-xs font-medium text-gray-900 sm:pl-3">
                      {person[2]}
                    </td>
                    <td className="whitespace-nowrap px-1 py-2 text-xs text-blue-500">    {person[0]}</td>
                    <td className="whitespace-nowrap px-1 py-2 text-xs text-gray-500">    {person[1]}</td>
                    <td className="whitespace-nowrap px-1 py-2 text-sm text-gray-500 text-right">    {person[3]}</td>
                   
                  </tr>
                ))}
              </tbody>
            </table>}
    </ul>
 
  


]}

