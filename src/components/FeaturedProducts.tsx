import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Custom T-Shirts",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80",
    price: "From $24.99",
    description: "Create your own unique t-shirt designs"
  },
  {
    id: 2,
    name: "Wall Art",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?auto=format&fit=crop&q=80",
    price: "From $29.99",
    description: "Transform your space with custom wall art"
  },
  {
    id: 3,
    name: "Photo Books",
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80",
    price: "From $39.99",
    description: "Preserve your memories in style"
  },
  {
    id: 4,
    name: "Custom Mugs",
    image: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&q=80",
    price: "From $14.99",
    description: "Start your day with personalized drinkware"
  },
  {
    id: 5,
    name: "Phone Cases",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&q=80",
    price: "From $19.99",
    description: "Protect your device with style"
  },
  {
    id: 6,
    name: "Canvas Prints",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80",
    price: "From $49.99",
    description: "Gallery-quality canvas prints"
  },
  {
    id: 7,
    name: "Hoodies",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80",
    price: "From $39.99",
    description: "Cozy custom hoodies for any occasion"
  },
  {
    id: 8,
    name: "Tote Bags",
    image: "https://images.unsplash.com/photo-1597484662317-9bd7bdda2907?auto=format&fit=crop&q=80",
    price: "From $16.99",
    description: "Eco-friendly custom tote bags"
  }
];

const FeaturedProducts = () => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          <p className="mt-4 text-lg text-gray-500">
            Discover our most popular customizable products
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.id}
              to="/products"
              className="group relative"
            >
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75 transition-opacity">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{product.price}</p>
                <p className="mt-2 text-sm text-gray-600">{product.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;