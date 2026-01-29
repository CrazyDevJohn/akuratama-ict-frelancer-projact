import { BillingStoreInterface } from "@/types"
import axios from "axios"
import {create} from "zustand"

const useBillingStore = create<BillingStoreInterface>((set,get)=>({
    allBilling: [],
    getBills: async () => { 
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/billing`, { withCredentials: true });
        
        const requests = await res.data.requests;

        console.log(requests)

        set(state=>({allBilling:requests}))
    },
    aprureBill: async(billingId, studentId, courseId) => {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/apruve`, {
            billingId, studentId, courseId
        }, { withCredentials: true });

        const data = await res.data;

        console.log(data);

        return data;
     }
}))

export default useBillingStore