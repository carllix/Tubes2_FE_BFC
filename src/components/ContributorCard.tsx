import Image from "next/image";
import { FaGithub } from "react-icons/fa";

export default function ContributorCard({
  name,
  nim,
  github,
  quote,
  image,
}: {
  name: string;
  nim: string;
  github: string;
  quote: string;
  image: string;
}) {
  const githubUsername = github.replace("https://github.com/", "");

  return (
    <div className="bg-[#1c1a33]/80 border border-[#6b3fa0] text-white rounded-xl shadow-md p-4 flex flex-col items-center space-y-3 w-full md:w-1/3">
      <Image
        src={image}
        alt={name}
        width={120}
        height={120}
        className="rounded-full object-cover"
      />
      <h3 className="text-lg font-semibold text-[#f5c542]">{name}</h3>
      <p className="text-sm text-[#dbdbed]">{nim}</p>

      <a
        href={github}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-sm text-white hover:underline"
      >
        <FaGithub className="text-xl" />
        {githubUsername}
      </a>

      <p className="italic text-center text-sm">&quot;{quote}&quot;</p>
    </div>
  );
}