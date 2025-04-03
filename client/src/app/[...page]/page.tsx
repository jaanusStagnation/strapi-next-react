import { GetOperationUrl, getPage } from "@/data/loaders";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<Record<string, string>>;
  searchParams: Promise<{ page?: string }>;
}

export default async function Page(props: PageProps) {
  // get next server side path name
  const params = await props.params;

  const page = `/${params.page}` as GetOperationUrl;

  console.log("Page path", page);
  const response = await getPage(page);
  const data = response.content?.data;



  function getComp() {
    switch (response.url) {
      case "/about":
        return <p>I am about </p>;
      
        case "/authors":
        case "/authors/{id}":
        return <p>I am about</p>;
    }
  }

  if (!data) {
    return notFound();
  }


  console.log("Page Data", data);

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 items-center sm:items-start">
        {getComp()}
        <pre>
          {JSON.stringify(data, null, 2)}
        </pre>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
