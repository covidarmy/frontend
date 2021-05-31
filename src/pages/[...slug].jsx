import { Dashboard } from "~/components/Dashboard";
import Navbar from "~/components/Navbar";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { camelize } from "~/lib/utils";

const CityPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  if (slug === undefined) {
    return (
      <>
        <Navbar />
        <Dashboard city={null} resource={null} />
      </>
    );
  }

  const title = Array.isArray(slug)
    ? slug
        .map((i) => {
          return i[0].toUpperCase() + i.slice(1);
        })
        .join(" - ")
    : "";

  const city = camelize(slug[0]);
  const resource = typeof slug[1] === "string" ? camelize(slug[1]) : null;
  const pageTitle = `Covid.army${title !== "" ? ` - ${title}` : ""}`;
  const desc = `Covid Resources Leads${title !== "" ? ` For ${title}` : ""}`;

  return (
    <>
      <NextSeo
        title={pageTitle}
        openGraph={{
          title: pageTitle,
          description: desc,
        }}
      />
      <>
        <Navbar />
        <Dashboard city={city} resource={resource} />
      </>
    </>
  );
};

export default CityPage;
