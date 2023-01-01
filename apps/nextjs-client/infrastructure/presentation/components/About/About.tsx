import Link from 'next/dist/client/link';
import { FC } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
export type AboutProps = {};

const About: FC<AboutProps> = (props: AboutProps) => {
  return (
    <>
      <a className="btn btn-primary" href="#" role="button">
        Link
      </a>
      <Link className="btn btn-primary" href="#">
        Add User
      </Link>
      <div>
        <div className="p-10 min-h-screen flex items-center justify-center bg-cool-gray-700">
          <h1 className="text-9xl font-black text-white text-center">
            <span className="bg-gradient-to-r text-transparent bg-clip-text from-green-400 to-purple-500">
              Simple React Typescript Tailwind Sample
            </span>
          </h1>
        </div>
        {/* <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <h1 className="text-3xl font-bold underline text-red-600">
          Simple React Typescript Tailwind Sample
        </h1> */}
      </div>
    </>
  );
};

export default About;
