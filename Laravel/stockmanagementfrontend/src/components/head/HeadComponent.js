export const metadata = {
    title: "Stock Management",
    description: "Stock Management",
  };
  
  export default function HeadComponent() {
    return (
      <>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </>
    );
  }