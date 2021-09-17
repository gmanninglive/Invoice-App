export default function Button({text, click, styles}){

    return(
    <button className={`${styles} `} onClick={click}>
        {text}
    </button>

<button
className="absolute top-6 right-6 mx-auto rounded-xl border-2 py-2 px-4"
type="button"
onClick={() => router.back()}
>
Back
</button>
    )
}