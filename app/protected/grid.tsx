
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


export default function Grid({ name ,equity,deposit,pos,pl}: { name: string ,equity:number,deposit:number,pl:number,pos:any[]}){

  const [selectedind, setIndex] = useState('');
return[ 

    <div key={name} className={classNames("relative flex border-l-4 mt-3 space-x-3 rounded-lg border  bg-white px-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
      ,
     {'border-green-600':equity-deposit>=0,
      'border-red-600':equity-deposit<0


     }
    )} >
     
      <div className="min-w-0 flex-1">

      <li key={name}  onClick={()=>{if(selectedind == name ){setIndex('') }else{setIndex(name) }}} className="relative  border-blue-500 flex justify-between ">
          <div className="flex min-w-0 gap-x-4">
            
            <div className="min-w-0 flex-auto">
              <p className="text-xs font-semibold leading-6 text-gray-900">
              
                  <span className="absolute inset-x-0 -top-px bottom-0" />
                  { name} - (<span className={classNames("" , {'text-blue-600':Number(countvol(pos))>=0,
                      'text-red-600':Number(countvol(pos))<0,
             
             
                })}>{pos.length}</span>)
                
              </p>
              <p className=" flex text-xs leading-5 text-green-800">
                <a href={`mailto:${equity}`} className="relative truncate hover:underline text-gray-900">
                  {format1(equity)} - (<span className={classNames("" , {'text-blue-600':Number(countvol(pos))>=0,
                  'text-red-600':Number(countvol(pos))<0,
             
             
                })}>{countvol(pos)}</span>)
                </a>
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-start gap-x-4">
            <div className="sm:flex sm:flex-col sm:items-end">
            <p className={classNames(" text-xs leading-5 ",
                  {'text-green-600':pl>=0,
                   'text-red-600':pl<0
             
             
                  })}>
           {"$"+format1(pl)}
                </p>
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
          
          </div>
         
        </li> {selectedind && <table className="min-w-full divide-y divide-gray-300">
            
            <tbody className="bg-white">
              {pos.map((person) => (
                <tr key={person.email} className="even:bg-gray-50">
                  <td className="whitespace-nowrap py-1   text-xs font-medium text-gray-900 sm:pl-3">
                    {person[2]}
                  </td>
                  <td className={classNames("text-xs text-right leading-5 whitespace-nowrap px-1 py-2 text-xs",
                  {'text-red-600':person[4]=="Sell",
                   'text-blue-600':person[4]=="Buy"
             
             
                  })}  >   {person[0]}</td>
                  <td className={classNames(" text-xs text-right   whitespace-nowrap px-1 py-2 text-xs",
                  {'text-green-600':Number(person[1])>=0,
                   'text-red-600':Number(person[1])<0
             
             
                  })}  >   ${person[1]}</td>
                  <td className="whitespace-nowrap px-1 py-2 text-xs text-gray-500 text-right pr-2">    ${person[3]}</td>
                 
                </tr>
              ))}
            </tbody>
          </table>}
      </div>
    </div>
 
  


]}