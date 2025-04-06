"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect(()=>{
        Crisp.configure("c869fe8d-4196-41ac-a4d8-d0ab4a2abfe0")
    },[]);

    return null;
}