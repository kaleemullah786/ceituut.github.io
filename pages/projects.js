import { getContentCollection, getPropCollection } from "lib/get-collection";
import DefaultLayout from "layouts/DefaultLayout";
import Head from "next/head";
import PageLayout from "layouts/PageLayout";
import TableFromArray from "components/TableFromArray";
import csvToArrayOfObjects from "lib/csv-to-array";

export default function Projects({
  projectPropCollection,
  projectContentCollection,
}) {
  return (
    <>
      <Head>
        <meta
          name="keywords"
          content="پروژه‌ها, انجمن علمی کامپیوتر, دانشگاه صنعتی ارومیه"
        />
        <meta
          name="description"
          content="پروژه‌های پایانی دانشجویان و پروژه‌های تیمی انجمن"
        />
        <title>پروژه‌ها | انجمن کامپیوتر صنعتی ارومیه</title>
      </Head>
      <h1>پروژه‌ها</h1>
      <div>
        {projectPropCollection.map((item, index) => (
          <TableFromArray
            array={projectContentCollection[index]}
            comments={item.comments}
            key={index}
          />
        ))}
      </div>
    </>
  );
}

Projects.getLayout = function getLayout(content) {
  return (
    <DefaultLayout>
      <PageLayout>{content}</PageLayout>;
    </DefaultLayout>
  );
};

export async function getStaticProps() {
  const projectPropCollection = await getPropCollection(
    "collections/projects/projects/"
  );
  let projectContentCollection = await getContentCollection(
    "collections/projects/projects/"
  );
  projectContentCollection = projectContentCollection.map((item) =>
    csvToArrayOfObjects(item.content)
  );
  return {
    props: {
      projectPropCollection,
      projectContentCollection,
    },
  };
}
