 "use client"

import { DashboardIcon,BarChartIcon ,RowsIcon ,PersonIcon,ExitIcon} from '@radix-ui/react-icons'
import { createClient } from "@/utils/supabase/client";

import { redirect } from "next/navigation";
 
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as Toggle from '@radix-ui/react-toggle';

import Grid from './grid';
import List from './list';
import Loader from './loader';
import Addpeople from './people';
import TradingViewWidget from './chart';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation'

var useremail=""
var socket: WebSocket;

var accountlist: any[] = [];

export default    function ProtectedPage() {
  const [isload , setLoad] = useState(true);
  const supabase = createClient();
 
   
  const [dis, setValue] = React.useState('list');
  const [connected,setConnected]=useState(true);
  const [chart, setChart] = React.useState(true);
  const [pep, setPep] = React.useState('addperson');  
  const [equity, setEquity] = useState(444);
  const [positions, setPositions] = useState([]);
  const [total, setTotal] = useState(0);
  const [ accounts, setAccounts] =  useState([] as any);
  const [email, setEmail] = React.useState("" as any);
  const router = useRouter()
  
  const showchart = async () => {
   chart ? setChart(false):setChart(true)
  };
  const signOut = async () => {
   
   const { error } = await supabase.auth.signOut()
   console.log("kerror " + error);
   
   router.push("/login");
 };
 
 
   
  const socketCloseListener = (email: string | undefined) => {
    setConnected(true);
    
    socket = new WebSocket('WSS://www.kaostrading.com/sock?'+email
    );
    socket.addEventListener('message', socketMessageListener);
    socket.addEventListener('open', socketOpenListener);
   socket.addEventListener('close', socketCloseListenerp);

}

const socketOpenListener = () => {
  console.log('Connected!!');
setConnected(true);
  
};

const socketCloseListenerp = () => {
  console.log('disconected!!');
  
setConnected(false);
  
};
const socketMessageListener = (event: { data: string; }) => {

  if(JSON.parse(event.data).account != "123456")

  if (accountlist.findIndex(x => x.account === JSON.parse(event.data).account) < 0) 
    {
        accountlist.push(JSON.parse(event.data)); 
    }
    else
    {

        accountlist[accountlist.findIndex(x => x.account === JSON.parse(event.data).account)]=(JSON.parse(event.data));
      
    }
  setEquity(Number(JSON.parse(event.data).equity));
  setEquity(Number(JSON.parse(event.data).equity));
  setPositions(JSON.parse(event.data).positions);

  var opi =accountlist.sort(function(a,b){return b[0]-a[0]})
  setAccounts(opi);
  
   }

 useEffect(() => {
  setLoad(true)

  const getData = async () => {
    const  { data}  = await supabase.auth.getUser();
    if(!data.user)
    {
      router.push("/login");

    }
    else{
      setEmail(data.user.email)
    }
    const { data: notes } = await supabase.from('account_access2').select("accounts").eq("id",data.user?.id)

    let opi="";
    if(notes){
   
opi="|"+notes[0]!.accounts
  
    socketCloseListener(data.user?.email+"+"+opi)
     
    }
    
  }
  getData().then(response =>{setLoad(false)})
}, [connected])
 

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
   
        <Toggle.Root className="Toggle2 mr-2"  onClick={showchart}>

    
 
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
   
  <Toggle.Root className="Toggle ml-2" aria-label="Toggle italic" onClick={signOut}>
    <ExitIcon  />
  </Toggle.Root>
 
        </div>
      </nav></header>
      </div>

      <div className="flex-1 flex flex-col gap-20   w-full">
      <main className="flex-1 flex flex-col gap-6 w-full">
        {isload ? <Loader/>:""}
     { dis =="grid"  && connected && <div key="name" className="grid  gap-4 grid-cols-2 md:grid-cols-4 px-2 py-2">
  
 { accountlist.map((acc,index)=> (
<Grid name={acc.account} equity={acc.equity} key={index} deposit={acc.deposit} pl={acc.pl} pos={acc.positions}/>
))}

      
      </div>}
      
      
      { dis =="list" && connected && <div key="name" className="grid   grid-cols-1 md:grid-cols-1">

  { accountlist.map((acc,index) => (
 <List name={acc.account} equity={acc.equity} key={index} deposit={acc.deposit } pl={acc.pl} pos={acc.positions}/>
 ))}
 
       
       </div>}
       
  
       { dis =="addperson" && (email=="sllobera@gmail.com" || email=="mb@kaostrading.com")&& <div key="addpersoj" className="p-10">

{ 
<Addpeople/>}

     
     </div>}
    
<div className="bg-white p-5 bottom-2 w-full"> 
 {chart ? <TradingViewWidget></TradingViewWidget>:""}
 {/*} <AdvancedRealTimeChart theme="light" hide_legend={true} hide_side_toolbar={true} enable_publishing={false} toolbar_bg="#f1f3f6" symbol='PEPPERSTONE:NAS100' interval= "30" style='1' height="360" width="100%" ></AdvancedRealTimeChart>*/}
  </div>  </main>
      </div>

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
