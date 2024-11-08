import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import PortableText from 'react-portable-text';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { sanityClient, urlFor } from '../../sanity';
import { IPost, IComment } from '../../typings';
import { useForm, SubmitHandler } from 'react-hook-form';
import MenuButton from '../../components/NavBarItems';
import Comment from '../../components/Comment';

interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

interface Props {
  post: IPost;
}

function Post({ post }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data);
        setSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
        setSubmitted(false);
      });
  };

  return (
    <>
      <div className="fixed inset-0 z-0">
        <div className="absolute z-0 inset-0 bg-cover bg-center bg-main-bg" />
      </div>
      <main className="text-white relative min-h-screen">
        <div className="pb-[20px]">
          <MenuButton />
          <Header />

          <div className="h-20"></div>
          <img
            className="w-full h-40 object-cover"
            src={urlFor(post.mainImage).url()!}
            alt=""
          />

          <article className="max-w-3xl mx-auto p-5">
            <h1 className="text-4xl md:text-5xl mt-10 mb-3 font-bold text-center">
              {post.title}
            </h1>
            <h2 className="text-xl font-light text-white mb-2 text-center">
              {post.description}
            </h2>

            <div className="mt-10 grid place-content-center">
              <div
                className="mx-auto mb-5 text-center"
                dangerouslySetInnerHTML={{ __html: post.embed }}
              />

              <PortableText
                dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
                content={post.body}
                serializers={{
                  h1: (props: any) => (
                    <h1 className="my-5 text-2xl font-bold" {...props} />
                  ),
                  h2: (props: any) => (
                    <h1 className="my-5 text-xl font-bold" {...props} />
                  ),
                  li: ({ children }: any) => (
                    <li className="ml-4 list-disc">{children}</li>
                  ),
                  link: ({ href, children }: any) => (
                    <a
                      href={href}
                      className="text-sky-300 border border-sky-300 p-4 my-4 hover:bg-slate-900"
                    >
                      {children}
                    </a>
                  ),
                }}
              />
            </div>
          </article>

          {submitted ? (
            <div className="flex flex-col p-10 my-10 mx-auto bg-[#141C2F] bg-filter backdrop-blur-lg bg-opacity-30 md:rounded-xl border-white border text-white max-w-2xl">
              <h3 className="text-3xl font-thin text-center">
                Thank you for submitting your comment! 🎊
              </h3>
              <p className="font-thin text-center mt-2">
                Once it has been approved, it will appear below!
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col p-5 max-w-2xl mx-auto mb-10 text-black mt-5"
            >
              <h4 className="text-3xl text-slate-200 font-bold text-center">
                Leave a Comment
              </h4>
              <hr className="py-3 mt-2" />

              <input
                {...register('_id')}
                type="hidden"
                name="_id"
                value={post._id}
              />

              <label className="block mb-2">
                <input
                  {...register('name', { required: true })}
                  className={`${
                    errors.name && 'border-red-500 border-4'
                  } shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-slate-600 font-thin outline-none focus:ring bg-slate-200`}
                  placeholder="Name"
                  type="text"
                />
              </label>
              <label className="block mb-2">
                <input
                  {...register('email', { required: true })}
                  className={`${
                    errors.email && 'border-red-500 border-4'
                  } shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-slate-600 font-thin outline-none focus:ring bg-slate-200`}
                  placeholder="Email"
                  type="email"
                />
              </label>
              <label className="block mb-2">
                <textarea
                  {...register('comment', { required: true })}
                  className={`${
                    errors.comment && 'border-red-500 border-4'
                  } shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-slate-600 font-thin outline-none focus:ring bg-slate-200`}
                  placeholder="Enter Comment"
                  rows={8}
                />
              </label>

              <input
                type="submit"
                className="shadow bg-[#CC8470] hover:bg-slate-900 focus:shadow-outline focus:outline-none text-white font-thin py-4 px-4 rounded cursor-pointer w-2/3 mx-auto mt-5"
              />

              <div
                className={`flex flex-col p-5 r text-xl font-thin ${
                  errors && ' rounded-lg'
                }`}
              >
                {errors.name && (
                  <span className="text-white bg-red-500 bg-filter backdrop-blur-lg bg-opacity-50 w-full mx-auto mt-3 p-3 rounded-lg">
                    ⚠️ The Name field is required
                  </span>
                )}
                {errors.comment && (
                  <span className="text-white bg-red-500 bg-filter backdrop-blur-lg bg-opacity-50 w-full mx-auto mt-3 p-3 rounded-lg">
                    ⚠️ The Comment field is required
                  </span>
                )}
                {errors.email && (
                  <span className="text-white bg-red-500 bg-filter backdrop-blur-lg bg-opacity-50 w-full mx-auto mt-3 p-3 rounded-lg">
                    ⚠️ The Email field is required
                  </span>
                )}
              </div>
            </form>
          )}

          {post.comments.length > 0 && (
            <div className="my-10 mx-auto flex max-w-2xl flex-col space-y-2 p-5 border border-white bg-[#141C2F] bg-filter backdrop-blur-lg bg-opacity-30 md:rounded-xl relative">
              <h3 className="text-4xl font-bold text-center">Comments</h3>
              <hr />
              {post.comments.map((comment) => (
                <Comment key={comment._id} comment={comment} />
              ))}
            </div>
          )}
        </div>
        <Footer />
      </main>
    </>
  );
}

export default Post;

export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
    _id,
    slug{ current }
  }`;

  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: IPost) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    embed,
    author -> {
      name,
      image
    },
    "comments": *[
      _type == "comment" && post._ref == ^._id && approved == true
    ],
    description,
    mainImage,
    slug,
    body
  }`;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};
