import Link from 'next/link'
export default function LinkButton({url, text, style}){
    
    return(
    
        <Link href={url}>
        <a
          className={`z-0 inline-flex justify-center px-4 py-2 text-sm 
          font-medium text-white bg-black/[0.8] rounded-md  
          hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 
          focus-visible:ring-white focus-visible:ring-opacity-75 ${style}`}
        >
          {text}
        </a>
      </Link>
      

    )
}