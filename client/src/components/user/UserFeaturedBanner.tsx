import React from "react";

type Props = {};

const UserFeaturedBanner = (props: Props) => {
  return (
    <div>
      <section>
        <div className="w-full px-4 py-[20px] sm:px-6 sm:py-12 lg:px-[20px]">
          <ul className="grid grid-cols-1 gap-4 lg:grid-cols-4">
            <li>
              <a href="#" className="relative block group">
                <img
                  src="https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  className="object-cover w-full transition duration-500 aspect-square group-hover:opacity-90"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6"></div>
              </a>
            </li>
            <li>
              <a href="#" className="relative block group">
                <img
                  src="https://images.unsplash.com/photo-1526657782461-9fe13402a841?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  className="object-cover w-full transition duration-500 aspect-square group-hover:opacity-90"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6"></div>
              </a>
            </li>
            <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <a href="#" className="relative block group">
                <img
                  src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1736&q=80"
                  className="object-cover w-full transition duration-500 aspect-square group-hover:opacity-90"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6"></div>
              </a>
            </li>
            <li>
              <a href="#" className="relative block group">
                <img
                  src="https://plus.unsplash.com/premium_photo-1681160405580-a68e9c4707f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGFwdG9wfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                  className="object-cover w-full transition duration-500 aspect-square group-hover:opacity-90"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6"></div>
              </a>
            </li>
            <li>
              <a href="#" className="relative block group">
                <img
                  src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                  className="object-cover w-full transition duration-500 aspect-square group-hover:opacity-90"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6"></div>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default UserFeaturedBanner;
