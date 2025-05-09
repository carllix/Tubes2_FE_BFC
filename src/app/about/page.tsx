import ContributorCard from "@/components/ContributorCard";

export default function AboutPage() {
  return (
    <main className="min-h-screen px-6 pt-32 pb-16 text-[#e0e6f5] bg-[#1c1a33] space-y-24">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-[#f5c542]">
          What is Alchemy 2 Finder?
        </h2>
        <p className="text-lg text-[#e0e6f5]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a nisl
          eget libero gravida convallis non in nunc. Aenean nec aliquam lorem.
          Phasellus porttitor fermentum ante, nec tincidunt tortor ornare vel.
          Donec vulputate pulvinar dui, sed convallis dolor rutrum sed.
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
            quote="Lorem itu lorem."
            image="/image/king.jpg"
          />
          <ContributorCard
            name="Carlo"
            nim="13523091"
            github="https://github.com/carllix"
            quote="Lorem itu lorem."
            image="/image/king.jpg"
          />
          <ContributorCard
            name="Barru"
            nim="13523101"
            github="https://github.com/barruadi"
            quote="Lorem itu lorem."
            image="/image/king.jpg"
          />
        </div>
      </div>
    </main>
  );
}
