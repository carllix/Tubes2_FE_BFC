import ContributorCard from "@/components/ContributorCard";

export default function AboutPage() {
  return (
    <main className="min-h-screen px-6 pt-32 pb-16 text-[#e0e6f5] bg-[#27104d] space-y-24">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-[#f5c542]">
          What is Alchemy 2 Finder?
        </h2>
        <p className="text-lg text-[#e0e6f5] text-justify">
          <strong>Alchemy 2 Finder</strong> is a web application that helps
          players of <em>Little Alchemy 2</em> discover the correct element
          combinations using smart search algorithms like BFS, DFS, and
          Bidirectional Search. Built with Next.js and Golang, this app presents
          search results in a visual tree format. All data is sourced from the
          official fandom site, and the system is containerized with Docker for
          smooth deployment using Vercel and Railway.
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-10">
        <h2 className="text-3xl font-bold text-[#f5c542] text-center">
          Contributors
        </h2>
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
          <ContributorCard
            name="Fawwaz"
            nim="13523065"
            github="https://github.com/WwzFwz"
            quote="Kata mamah webnya bagus"
            image="/image/Fawwaz.jpg"
          />
          <ContributorCard
            name="Carlo"
            nim="13523091"
            github="https://github.com/carllix"
            quote="Semua yang kau lakukan is magic"
            image="/image/Carlo.jpg"
          />
          <ContributorCard
            name="Barru"
            nim="13523101"
            github="https://github.com/barruadi"
            quote="Motivasiku membeli kulkas"
            image="/image/Barru.jpg"
          />
        </div>
      </div>
    </main>
  );
}
