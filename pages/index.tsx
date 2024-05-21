import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MainImage from "../components/MainImage";
import { sanityClient, urlFor } from "../sanity";
import { IPost, Release } from "../typings";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import StreamEmbed from "../components/StreamEmbed";
import MenuButton from "../components/NavBarItems";

interface Props {
  posts: [IPost];
  release: Release;
}

const Home = ({ posts, release }: Props) => {
  const [isShowModal, setIsShowModal] = useState<boolean>();
  const closeModal = () => {
    setIsShowModal(!isShowModal);
  };
  const sortedPosts = posts.sort((a, b) => {
    return new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime();
  });

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem("hasVisitedBefore");
    if (!hasVisitedBefore) {
      setIsShowModal(true);
      localStorage.setItem("hasVisitedBefore", "true");
    }
  }, []);
  console.log(release);
  return (
    <>
      {/* {isShowModal && <Modal closeModal={closeModal} />} */}
      <div className="relative">
        <Head>
          <title>Justin Waves</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="pb-[300px] md:pb-[350px] relative ">
          {/* background-image */}
        <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-main-bg"

        />
      </div>
          <MenuButton />
          <Header />
          <MainImage
            releaseName={release.releaseName}
            releaseType={release.releaseType}
            releaseUrl={release.releaseUrl}
            isDebut={release.isDebut}
          />
          {/* <StreamEmbed /> */}
          <h1 className="font-thin text-white text-center text-5xl py-4 pt-20 pb-20 relative">
            PURCHASE RELEASES
          </h1>
          {/* <p className="text-sm text-left text-[#A34141] animate-pulse px-5">
            Latest Release ⤵
          </p> */}
          <div className="grid grid-cols-1 sm:gird-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6   ">
            {sortedPosts.map((post) => (
              <Link key={post._id} href={`/post/${post.slug.current}`}>
                <div
                  className="border rounded-lg group cursor-pointer overflow-hidden relative  bg-filter bg-white backdrop-blur-xl bg-opacity-30 text-white"
                  data-cy="article"
                >
                  <img
                    className="h-60 w-full object-cover group-hover:scale-110 transition-transform duration-200 ease-in-out "
                    src={urlFor(post.mainImage).url()!}
                    alt=""
                  />
                  <div className="flex justify-between p-5 ">
                    <div>
                      <p className="text-xl font-bold mb-3">{post.title}</p>
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
          <img src="/secret.png" alt="" className=" w-72 mx-auto" />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const postQuery = `*[_type == "post"]{
    _id,
    title,
    _createdAt,
    author -> {
      name,
      image
    },
    description, 
    mainImage,
    slug
  }`;

  const mainImageQuery = `*[_type == "mainImage"]{
    releaseName,
    releaseUrl,
    releaseType,
    isDebut
  }`;

  const [posts, mainImage] = await Promise.all([
    sanityClient.fetch(postQuery),
    sanityClient.fetch(mainImageQuery),
  ]);

  return {
    props: {
      posts,
      release: mainImage[0] || {}, // Ensure release is an object
    },
  };
};
