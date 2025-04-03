"use client";

import { FC } from "react";
import { StrapiImage } from "./strapiImage";
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';

interface HeroProps {
  title?: string;
  description: BlocksContent;
  background?: string;
  children?: React.ReactNode;
}

export const Hero: FC<HeroProps> = ({
  title,
  background,
  description,
}) => {


  return (
      // <div className="flex items-center min-h-[812px] w-full overflow-hidden relative">
      //   <StrapiImage src={background} alt="background" fill className="object-cover" />
      //   <h1 className="font-bold text-3xl">{title}</h1>
      // </div>
    <div className="relative px-6 pt-14 lg:px-8 w-full font-poppins">
      <StrapiImage src={background} alt="background" fill className="object-cover" />
      <div className="ml-auto mr-auto lg:mr-10 max-w-2xl py-32 sm:py-48 lg:py-56 relative">
        <div className="text-left bg-theme-200 rounded-lg p-8">
          <p className="tracking-wider font-poppins">New Arrival</p>
          <h1 className="text-5xl font-bold tracking-tight text-balance text-theme-400 sm:text-7xl">{title}</h1>
          <BlocksRenderer
            content={description}
            blocks={{
              paragraph: ({ children }) => <p className="mt-6 text-lg font-medium text-pretty text-gray-800 sm:text-xl/8">{children}</p>,
              heading: ({ children }) => <h2 className="mt-6 text-3xl font-bold text-pretty text-gray-800 sm:text-4xl/8">{children}</h2>,
            }}
          />
          <p className="mt-8 text-lg font-medium text-pretty text-gray-800 sm:text-xl/8">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat.
            </p>
          <div className="mt-10 flex items-center justify-start gap-x-6">
            <a href="#" className="bg-theme-400 px-17 py-6 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get started</a>
          </div>
        </div>
      </div>
      
    </div>
  );
};
