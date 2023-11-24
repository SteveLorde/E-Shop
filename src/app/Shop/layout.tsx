import CategoriesSideBar from "@/app/Components/CategoriesSideBar/CategoriesSideBar";
import styles from  "./styles.module.css"

export default function DashboardLayout({children}: {
    children: React.ReactNode
}) {
    return <>
        <div className={styles.sidecategorylayout}>
            <CategoriesSideBar></CategoriesSideBar>
            {children}
        </div>
    </>
}