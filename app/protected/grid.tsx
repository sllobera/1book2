
  
export default function Grid({ name ,role}: { name: string ,role:string}){


return[ 

    <div className="relative flex border-l-4 border-green-400 items-center space-x-3 rounded-lg border  bg-white px-2 py-1 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
     
      <div className="min-w-0 flex-1">
        <a href="#" className="focus:outline-none">
          <span aria-hidden="true" className="absolute inset-0" />
          <p className="text-sm font-medium text-gray-900">{name}</p>
          <p className="truncate text-sm text-gray-500">{role}</p>
        </a>
      </div>
    </div>
 
  


]}