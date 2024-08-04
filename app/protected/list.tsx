import { ChevronRightIcon } from "@radix-ui/react-icons";

  
export default function List({ name ,role}: { name: string ,role:string}){


return[ 

    <ul key={name}
      role="list"
      className="divide-y divide-gray-400 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 "
    >
      
        <li key={name} className="relative border-l-4 border-blue-500 flex justify-between gap-x-6 px-1 py-1 hover:bg-gray-50 sm:px-6">
          <div className="flex min-w-0 gap-x-4">
            
            <div className="min-w-0 flex-auto">
              <p className="text-xs font-semibold leading-6 text-gray-900">
                <a href={role}>
                  <span className="absolute inset-x-0 -top-px bottom-0" />
                  { name}
                </a>
              </p>
              <p className=" flex text-xs leading-5 text-gray-500">
                <a href={`mailto:${role}`} className="relative truncate hover:underline">
                  {role}
                </a>
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-x-4">
            <div className="sm:flex sm:flex-col sm:items-end">
              <p className="text-xs leading-6 text-gray-900">{role}</p>
              {role ? (
                <p className=" text-xs leading-5 text-gray-500">
                  Last seen <time dateTime={name}>{role}</time>
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