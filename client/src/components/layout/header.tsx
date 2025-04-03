import { FC } from "react";
import { StrapiImage } from "../strapiImage";

interface HeaderProps {
  title: string;
  description: string;
  logo?: string;
  logoWidth: number;
  logoHeight: number;
  logoAlt: string;
  logoLink: string;
  children?: React.ReactNode;
}

export const Header: FC<HeaderProps> = ({
  title,
  logo,
  logoAlt,
  logoLink,
  children,
}) => {
  return (
    <header className="flex items-center justify-between p-4 bg-white z-50 height-[100px]">
      <div className="flex items-center gap-2">
        <a href={logoLink}>
          {
            logo && <StrapiImage src={logo} alt={logoAlt} width={50} height={32}/>
          }
        </a>
        <h1 className="font-bold text-3xl">{title}</h1>
      </div>
      {children}
    </header>
  );
};
