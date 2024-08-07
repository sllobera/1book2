import { ChevronRightIcon } from "@radix-ui/react-icons";

function format1(n: number, ) {
    var o = n<0?"-":""
    if(n <0){n = -n};
  
    return o + n.toFixed(2).replace(/./g, function(c: string, i: number, a: string | any[]) {
      return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c; 
    });
  }
export default function List({ name ,equity,deposit,pl,pos}: { name: string ,equity:number,deposit:number,pl:number,pos:any[]}){


return[ 

    <ul key={name}
      role="list"
      className="divide-y divide-gray-400 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 "
    >
      
        <li key={name} className="relative border-l-4 border-blue-500 flex justify-between gap-x-6 px-1 py-1 hover:bg-gray-50 sm:px-6">
          <div className="flex min-w-0 gap-x-4">
            
            <div className="min-w-0 flex-auto">
              <p className="text-xs font-semibold leading-6 text-gray-900">
                <a href={name}>
                  <span className="absolute inset-x-0 -top-px bottom-0" />
                  { name} - ({pos.length})
                </a>
              </p>
              <p className=" flex text-xs leading-5 text-green-800">
                <a href={`mailto:${equity}`} className="relative truncate hover:underline">
                  {format1(equity)}
                </a>
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-x-4">
            <div className="sm:flex sm:flex-col sm:items-end">
              <p className="text-xs leading-6 text-green-700 text-right">{"$"+format1(pl)}</p>
              {equity ? (
                <p className=" text-xs leading-5 text-gray-500 text-red-700">
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
      
    </ul>
 
  


]}