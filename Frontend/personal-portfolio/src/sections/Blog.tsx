import React from 'react';
import { activitiesOop } from '../constants';
// Your activitiesOop array


const Blog: React.FC = () => {
  return (
    <section className="min-h-screen md:pl-0 pl-[80px] w-full bg-darkbg text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="md:text-4xl text-2xl font-bold text-center mb-8">
          IT-2105 Activities
        </h1>
        <div className="flex items-center flex-wrap justify-center gap-6">
        {activitiesOop.map((activity, index) => (
  <a
    key={index}
    href={activity.link}
    target="_blank"
    rel="noopener noreferrer"
    className="border border-gray-700 transition duration-300 
    hover:shadow-[0_0_20px_rgba(0,255,255,0.7)] rounded-lg p-4 flex flex-col items-center justify-center text-center shadow-lg transform hover:scale-105 w-[200px] h-[200px] md:w-[400px] md:h-[300px]"
  >
    {activity.img ? (
      <img
        src={activity.img}
        alt={activity.title}
        className="w-full h-3/5 object-cover rounded-t-lg"
      />
    ) : (
      <div className="flex items-center justify-center w-full h-3/5  text-white rounded-t-lg">
        Voucher
      </div>
    )}
    <h2 className="text-xl font-semibold mt-4">{activity.title}</h2>
  </a>
))}

        </div>
      </div>
    </section>
  );
};

export default Blog;
