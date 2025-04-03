import { Poppins } from "next/font/google";
import "./globals.css";
import { getGlobalSettings } from "@/data/loaders";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import { Cart, Heart, Person, Search } from "akar-icons";
import { Footer } from "@/components/layout/footer";

/* istanbul ignore next */
const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800"],
});


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const globalSettings = await getGlobalSettings();

  console.log("Global Settings:", globalSettings); // Log the global settings object

  if(!globalSettings?.data) {
    return (
      <html lang="en"
        /* istanbul ignore next */
        className={`${poppins.variable} antialiased`}
        suppressHydrationWarning
      >
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="Loading..." />
        </head>
        <body className={`${poppins.variable} antialiased`}>
          {children}
        </body>
      </html>
    );
  }

  const { siteName, siteDescription, favIco } = globalSettings?.data;
  
  return (
    <html lang="en"
      /* istanbul ignore next */
      className={`${poppins.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={siteDescription} />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${poppins.variable} antialiased`}
      >
        <Header
        logo={favIco?.url}
        logoWidth={50}
        logoHeight={32}
        logoAlt="Logo"
        logoLink="/"
        title={siteName}
        description={siteDescription}
        >
          <nav className="flex gap-18">
            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <div className="flex flex-row gap-9">
            <Person />
            <Search />
            <Heart />
            <Cart />
          </div>
        </Header>
        {children}
        <Footer title={siteName} description={siteDescription}>
          <div className="flex-col gap-4 flex-1/3">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold">{siteName}</h2>
              <p className="text-sm text-gray-300">
              400 University Drive Suite 200 Coral <br/>
              Gables,<br/>
              FL 33134 USA
              </p>
            </div>
          </div>
          <div className="flex-2/3 w-full [&_a]:font-medium [&_a]:hover:text-gray-500 flex flex-row gap-20">
          <div className="flex-1/2 flex justify-between">
            <div >
              <p className="text-lg text-gray-300">Links</p>
              <div className="flex flex-col gap-10 mt-12">
                <Link href="/">Home</Link>
                <Link href="/shop">Shop</Link>
                <Link href="/about">About</Link>
                <Link href="/contact">Contact</Link>
              </div>
            </div>
            <div>
              <p className="text-lg text-gray-300">Help</p>
              <div className="flex flex-col gap-10 mt-12">
                <Link href="/">Payment Options</Link>
                <Link href="/shop">Returns</Link>
                <Link href="/about">Privacy Policies</Link>
              </div>
            </div>
          </div>  
            <div className="flex-1/2">
              <p className="text-lg text-gray-300">Newsletter</p>
              <div className="flex flex-col gap-10 mt-12">
                <form className="flex flex-row gap-4">
                  <input placeholder="Enter Your Email Address" className="border-b border-b-gray-800 text-sm"/>
                  <button className="underline underline-offset-6 tracking-tight text-sm">
                    SUBSCRIBE
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Footer>
      </body>
    </html>
  );
}
