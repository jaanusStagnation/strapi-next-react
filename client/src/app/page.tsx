import { type BlocksContent } from '@strapi/blocks-react-renderer';
import { FeaturesBlock } from "@/components/blocks/features.block";
import { Hero } from "@/components/hero";
import { getHomePage } from "@/data/loaders";
import { notFound } from "next/navigation";


export default async function Home() {
  const response = await getHomePage();
  if (!response?.data) notFound();
  
  const data = response.data;
  console.log("Home Page Data", data);

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 items-center sm:items-start">
      <Hero background={data.background?.url} title={data.title} description={data.description as BlocksContent}></Hero>

      <div className="container mx-auto flex flex-col items-center justify-center gap-14 my-14">
        {data.blocks?.map((block, index) => {
            if(block.__component === "shared.featured-categories") {
              return <FeaturesBlock categories={block.categories} key={index}/>
            }
            return null
        }
        )}
        

        <div className="w-full">
          <h2 className="text-4xl font-bold text-center">Our Products</h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {Array.from({ length: 12 }).map((_, index) => (
              <div className="group relative" key={index}>
                <img src={`https://picsum.photos/380/480?random=${index}`} alt="img1" 
                className="aspect-square w-full bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80" />
                <div className=" flex flex-col bg-gray-100 p-4">
        
                    <h3 className="text-gray-700 text-2xl font-semibold">
                      <a href="#">
                        <span aria-hidden="true" className="absolute inset-0"></span>
                        Basic Tee
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">Stylish cafe chair</p>
                    <div className="mt-1 text-xl align-middle font-semibold text-gray-700 ">
                      Rp 2.500.000 <span className="line-through text-gray-500 text-base font-normal">Rp 3.500.000</span>
                    </div>
                </div>
              </div>
            ))}  
          </div>
        </div>
      </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
