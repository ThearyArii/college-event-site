import React from 'react';


const galleryImages = [
  {
    id: 1,
    title: 'Campus Festival Highlights',
    url: '/images/image1.jpg',
  },
  {
    id: 2,
    title: 'Student Performances',
    url: '/images/image2.jpg',
  },
  {
    id: 3,
    // You can replace this URL with your local file like '/my-photo.png'
    title: 'Sokuntheary Sin Special Event', 
    url: '/images/image3.jpg',
  },
];

export default function Gallery() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Event Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {galleryImages.map((image) => (
          <div key={image.id} className="bg-white border rounded-lg overflow-hidden shadow-sm">
            <img 
              src={image.url} 
              alt={image.title} 
              className="w-[#100%] h-48 object-cover" 
            />
            <div className="p-3">
              <p className="font-medium text-sm text-gray-700">{image.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}