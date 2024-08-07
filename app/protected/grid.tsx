
import classNames from "classnames";  

function format1(n: number, ) {
  var o = n<0?"-":""
  if(n <0){n = -n};

  return o + n.toFixed(2).replace(/./g, function(c: string, i: number, a: string | any[]) {
    return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c; 
  });
}
export default function Grid({ name ,equity,deposit,pos,pl}: { name: string ,equity:number,deposit:number,pl:number,pos:any[]}){


return[ 

    <div key={name} className={classNames("relative flex border-l-4 mt-3 items-center space-x-3 rounded-lg border  bg-white px-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
      ,
     {'border-green-600':equity-deposit>=0,
      'border-red-600':equity-deposit<0


     }
    )} >
     
      <div className="min-w-0 flex-1">

      <li key={name} className="relative  border-blue-500 flex justify-between ">
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
          
          </div>
        </li>
      </div>
    </div>
 
  


]}