// CustomerReviews.js
import React from 'react';

const reviews = [
  {
    id: 1,
    name: 'Emily Selman',
    rating: 5,
    text: 'This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.',
    avatar: 'https://images.unsplash.com/photo-1616478771951-84e112ae0d5b', // Example image URL
  },
  {
    id: 2,
    name: 'Hector Gibbons',
    rating: 5,
    text: 'Before getting the Ruck Snack, I struggled my whole life with pulverized snacks, endless crumbs, and other heartbreaking snack catastrophes. Now, I can stow my snacks with confidence and style!',
    avatar: 'https://images.unsplash.com/photo-1603415526960-f8fbb68f07a6', // Example image URL
  },
  {
    id: 3,
    name: 'Mark Edwards',
    rating: 4,
    text: 'I love how versatile this bag is. It can hold anything ranging from cookies that come in trays to cookies that come in tins.',
    avatar: 'https://images.unsplash.com/photo-1502764613149-7f1d229e2306', // Example image URL
  },
];

const CustomerReviews = () => {
  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        <div className="flex items-center mb-4">
          <div className="text-yellow-400 text-xl mr-2">
            ★★★★☆
          </div>
          <span>Based on 1624 reviews</span>
        </div>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="flex items-start space-x-4">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold">{review.name}</h3>
                  <div className="text-yellow-400">
                    {'★'.repeat(review.rating)}
                    {'☆'.repeat(5 - review.rating)}
                  </div>
                </div>
                <p>{review.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Share your thoughts</h3>
          <p>If you've used this product, share your thoughts with other customers</p>
          <button className="mt-2 px-4 py-2 border rounded-lg">Write a review</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;
