'use client'


import {useState} from "react";
import {PurchaseLog} from "@/app/Data/Models/PurchaseLog";

export default function UserPanel() {

    const [purchaselogs, setPurchaseLogs] = useState<PurchaseLog[]>([])



    return <>

        <div>
            {/* user purchases log TO BE MADE LATER */}
            <h2>Purchases Log</h2>
            <div>

            </div>
        </div>
    </>
}