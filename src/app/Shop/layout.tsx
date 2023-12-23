
import CategoriesSideBar from "@/app/Components/CategoriesSideBar/CategoriesSideBar";
import styles from  "./styles.module.css"
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Shopping Page',
}


export default function DashboardLayout({children}: {
    children: React.ReactNode
}) {
    return <>
        <div className={styles.sidecategorylayout}>
            {children}
        </div>
    </>
}