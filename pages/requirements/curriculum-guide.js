import DefaultLayout from "layouts/DefaultLayout";
import PageLayout from "layouts/PageLayout";
import {
  getContentCollection,
  getDirectorySlugs,
  getPropCollection,
} from "lib/get-collection";
import TableFromArray from "components/TableFromArray";
import Head from "next/head";
import csvToArrayOfObjects from "lib/csv-to-array";

const CurriculumGuide = ({ curriculumGuides }) => {
  return (
    <>
      <Head>
        <meta
          name="keywords"
          content="چارت, انجمن علمی کامپیوتر, دانشگاه صنعتی ارومیه"
        />
        <meta name="description" content="چارت درسی گروه کامپیوتر" />
        <title>چارت درسی | انجمن کامپیوتر صنعتی ارومیه</title>
      </Head>
      <h2>چارت</h2>
      {curriculumGuides.map((curriculumGuide, curriculumGuideIndex) => (
        <div key={curriculumGuideIndex}>
          {curriculumGuide.props.map((item, index) => (
            <TableFromArray
              array={curriculumGuide.contents[index]}
              comments={item.comments}
              key={index}
            />
          ))}
        </div>
      ))}
    </>
  );
};

CurriculumGuide.getLayout = function getLayout(content) {
  return (
    <DefaultLayout>
      <PageLayout>{content}</PageLayout>
    </DefaultLayout>
  );
};

export async function getStaticProps() {
  const curriculumGuideDirectories = await getDirectorySlugs(
    "collections/requirements/data/curriculum-guide"
  );
  const curriculumGuides = await Promise.all(
    curriculumGuideDirectories.map(async (curriculumGuide) => {
      const props = await getPropCollection(
        `collections/requirements/data/curriculum-guide/${curriculumGuide.params.slug}`
      );
      let contents = await getContentCollection(
        `collections/requirements/data/curriculum-guide/${curriculumGuide.params.slug}`
      );
      contents = contents.map((item) => csvToArrayOfObjects(item.content));
      return {
        props: props.reverse(),
        contents: contents.reverse(),
      };
    })
  );
  return {
    props: {
      curriculumGuides,
    },
  };
}

export default CurriculumGuide;
