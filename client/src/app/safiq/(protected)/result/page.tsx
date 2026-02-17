import dynamicImport from "next/dynamic";

export const dynamic = "force-dynamic";

const ResultClient = dynamicImport(() => import("./ResultClient"), { ssr: false });

const Page = () => {
  return <ResultClient />;
};

export default Page;
