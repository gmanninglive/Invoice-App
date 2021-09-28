import BackButton from "components/common/BackButton";
import LinkButton from "components/common/LinkButton";

export default function Header({ title, url, linkName, back, login }) {

  return (
    <div className="flex items-center justify-between py-6">
      <h1>{title}</h1>
      {url && <LinkButton url={url} text={linkName} />}
      {!!back && <BackButton />}
      {login && (
        <a
          href={"/api/auth/login"}
          className="ml-10 font-bold
          rounded-md border-2 
          py-2 px-6 text-white bg-black/[0.8] 
          hover:bg-black/[0.2]"
        >
          Log in
        </a>
      )}
    </div>
  );
}
