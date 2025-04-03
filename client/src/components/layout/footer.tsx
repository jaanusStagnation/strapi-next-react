import { FC } from "react";

interface FooterProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export const Footer: FC<FooterProps> = ({
    title,
    children,
}) => {
  return (
    <footer className="flex flex-col items-center gap-10 justify-between bg-white z-50 border-t-2 border-gray-200 px-26 py-10">
        <div className="flex flex-row gap-4 w-full justify-between">
            {children} 
        </div>
        <div className="border-gray-200 border-t mt-4 pt-8 text-center w-full flex items-start">
            <p> 2025 {title}. All rights reserved</p>
        </div>
    </footer>
  );
};
