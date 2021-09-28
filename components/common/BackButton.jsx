import { useRouter } from "next/router"

export default function BackButton({text, styles}){
    const router = useRouter();
    return(
    <button className={`${styles} inline-flex justify-center px-4 py-2 text-sm 
    font-medium text-white bg-black/[0.8] rounded-md  
    hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 
    focus-visible:ring-white focus-visible:ring-opacity-75`} onClick={() => router.back()}>
        Back
    </button>

    )
}