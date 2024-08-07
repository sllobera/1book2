
import classNames from "classnames";  

function format1(n: number, ) {
  var o = n<0?"-":""
  if(n <0){n = -n};

  return o + n.toFixed(2).replace(/./g, function(c: string, i: number, a: string | any[]) {
    return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c; 
  });
}
export default function Grid({ name ,equity}: { name: string ,equity:number}){


return[ 

    <div key={name} className={classNames("relative flex border-l-4 mt-3 items-center space-x-3 rounded-lg border  bg-white px-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
      ,
     {'border-green-600':equity>0}
    )} >
     
      <div className="min-w-0 flex-1">

        <a href="#" className="focus:outline-none">
          <span aria-hidden="true" className="absolute inset-0" />
          <p className="text-sm font-medium text-gray-900">{name}</p>
          <p className="truncate text-sm text-gray-500">{format1(equity)}</p>
        </a>
      </div>
    </div>
 
  


]}