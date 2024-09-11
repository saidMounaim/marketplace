import AdDetails from "./AdDetails";

interface AdDetailsPageProps {
  params: {
    slug: string;
  };
}

const AdDetailsPage = ({ params }: AdDetailsPageProps) => {
  const slug: string = params.slug;

  return <AdDetails slug={slug} />;
};

export default AdDetailsPage;
