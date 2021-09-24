import Link from "next/link";
import { useRouter } from "next/router";

export default function Header({ title, url, linkName, back }) {

  const router = useRouter();

  return (
    
      <div className="flex items-center justify-between py-6">
        <h1>{title}</h1>
        {url && (
          <Link href={url}>
            <a
              className="ml-10 font-bold
          rounded-xl border-2 
          py-2 px-6 bg-green-500 
          hover:bg-green-300"
            >
              {linkName}
            </a>
          </Link>
        )}
        {!!back &&
        <button
          className="rounded-xl border-2 py-2 px-4"
          type="button"
          onClick={() => router.back()}
        >
          Back
        </button>
        }   
    
    </div>
  );
}
