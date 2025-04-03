import type { FC } from "react";
import { components } from "@/data/schema";
import { StrapiImage } from "../strapiImage";
// import { StrapiImage } from "../strapiImage";

// use the same interface as the categories schema
export interface FeaturesBlockProps {
    className?: string;
    categories?: components["schemas"]["Category"][];
}

export const FeaturesBlock: FC<FeaturesBlockProps> = ({categories}) => {
    return <div className="flex flex-col items-center justify-center mx-6">
    <h2 className="text-4xl font-bold text-center">Browse The Range</h2>
    <p className="text-lg text-center ">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat.</p>
    <div className="flex flex-row gap-10 justify-between mt-15">
        {categories?.map((category) => (
          <div key={category.id} className="flex flex-col items-center justify-center gap-4">
            <div className="bg-gray-200 rounded-lg overflow-hidden relative w-[380px] h-[480px]">
                <StrapiImage src={category.image?.url} alt={category?.name} fill style={{objectFit: "cover", objectPosition: "center" }}/>
            </div>
            <p>{category.name}</p>
          </div>
        ))}
    </div>
  </div>;
};