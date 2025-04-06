"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";


import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle
     } from "@/components/ui/sheet";
     import { VisuallyHidden } from "@radix-ui/react-visually-hidden"; 
import { useEffect, useState } from "react";
import Sidebar from "./sidebar";

const MobileSidebar = () => {

    const [isMounted, setIsMounter] = useState(false);

    useEffect(() =>
    {
        setIsMounter(true);
    }, []);

    if(!isMounted){
        return null;
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
            <Menu/>
        </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
        <VisuallyHidden>
          <SheetTitle>Mobile Sidebar</SheetTitle>
        </VisuallyHidden>
            <Sidebar />
        </SheetContent>
        </Sheet>
    );
}

export default MobileSidebar;