import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MainImage from "../components/MainImage";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";

interface Props {
  posts: [Post];
}

const Home = ({ posts }: Props) => {
  const sortedPosts = posts.sort((a, b) => {
    return new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime();
  });
  return (
    <div className="">
      <Head>
        <title>Justin Waves Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <MainImage />

      <div className="grid grid-cols-1 sm:gird-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6 bg-slate-200">
        {sortedPosts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div
              className="border rounded-lg group cursor-pointer overflow-hidden relative"
              data-cy="article"
            >
              <img
                className="absolute left-0 right-0 mx-auto top-0 bottom-20  my-auto opacity-30 group-hover:animate-ping  z-10 w-20 transition duration-300 ease-in-out "
                src="jw-logo-round.svg"
                alt=""
              />
              <img
                className="h-60 w-full object-cover group-hover:scale-110 transition-transform duration-200 ease-in-out "
                src={urlFor(post.mainImage).url()!}
                alt=""
              />
              <div className="flex justify-between p-5 bg-white">
                <div>
                  <p className="text-lg font-bold ">{post.title}</p>
                  <p className="text-xs">{post.description}</p>
                </div>
                <img
                  className="h-12 w-12 rounded-full"
                  src={urlFor(post.author.image).url()!}
                  alt=""
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    author -> {
    name,
    image
  },
  description, 
  mainImage,
  slug
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};
