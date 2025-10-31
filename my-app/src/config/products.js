// Centralized products data used by category and product detail pages
// If you later fetch from an API, replace this file and keep the same shape

export const PRODUCTS = {
  men: [
    {
      id: 1,
      name: "Gradient Graphic T-shirt",
      price: 145,
      rating: 3.5,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
        "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80",
      ],
      colors: ["white"],
      sizes: ["Small", "Medium", "Large", "X-Large"],
      type: "T-shirts",
      style: "Casual",
    },
    {
      id: 2,
      name: "Polo with Tipping Details",
      price: 180,
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&q=80",
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
        "https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=800&q=80",
      ],
      colors: ["pink"],
      sizes: ["Medium", "Large", "X-Large"],
      type: "Shirts",
      style: "Casual",
    },
    {
      id: 3,
      name: "Black Striped T-shirt",
      price: 120,
      originalPrice: 160,
      discount: 30,
      rating: 5.0,
      image:
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
        "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=800&q=80",
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
      ],
      colors: ["black", "white"],
      sizes: ["Small", "Medium", "Large"],
      type: "T-shirts",
      style: "Casual",
    },
    {
      id: 4,
      name: "Skinny Fit Jeans",
      price: 240,
      originalPrice: 260,
      discount: 20,
      rating: 3.5,
      image:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80",
        "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
        "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=800&q=80",
      ],
      colors: ["blue"],
      sizes: ["Small", "Medium", "Large", "X-Large", "XX-Large"],
      type: "Jeans",
      style: "Casual",
    },
    {
      id: 5,
      name: "Checkered Shirt",
      price: 180,
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
        "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=80",
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
      ],
      colors: ["red", "blue"],
      sizes: ["Medium", "Large", "X-Large"],
      type: "Shirts",
      style: "Formal",
    },
    {
      id: 6,
      name: "Sleeve Striped T-shirt",
      price: 130,
      originalPrice: 160,
      discount: 30,
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&q=80",
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
        "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=800&q=80",
      ],
      colors: ["orange", "black"],
      sizes: ["Small", "Medium", "Large", "X-Large"],
      type: "T-shirts",
      style: "Casual",
    },
    {
      id: 7,
      name: "Vertical Striped Shirt",
      price: 212,
      originalPrice: 232,
      discount: 20,
      rating: 5.0,
      image:
        "https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1?w=800&q=80",
        "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=800&q=80",
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
      ],
      colors: ["green"],
      sizes: ["Medium", "Large", "X-Large"],
      type: "Shirts",
      style: "Formal",
    },
    {
      id: 8,
      name: "Courage Graphic T-shirt",
      price: 145,
      rating: 4.0,
      image:
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
      ],
      colors: ["orange"],
      sizes: ["Small", "Medium", "Large"],
      type: "T-shirts",
      style: "Party",
    },
    {
      id: 9,
      name: "Loose Fit Bermuda Shorts",
      price: 80,
      rating: 3.0,
      image:
        "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80",
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
      ],
      colors: ["blue"],
      sizes: ["Small", "Medium", "Large", "X-Large"],
      type: "Shorts",
      style: "Casual",
    },
  ],
  women: [
    {
      id: 10,
      name: "Floral Summer Dress",
      price: 195,
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80",
        "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=800&q=80",
      ],
      colors: ["pink", "white"],
      sizes: ["Small", "Medium", "Large"],
      type: "T-shirts",
      style: "Party",
    },
    {
      id: 11,
      name: "Elegant Blazer",
      price: 280,
      rating: 5.0,
      image:
        "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800&q=80",
        "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800&q=80",
      ],
      colors: ["black"],
      sizes: ["Small", "Medium", "Large", "X-Large"],
      type: "Shirts",
      style: "Formal",
    },
    {
      id: 12,
      name: "Casual Denim Jacket",
      price: 165,
      originalPrice: 200,
      discount: 25,
      rating: 4.0,
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
        "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80",
        "https://images.unsplash.com/photo-1543076659-9380cdf10613?w=800&q=80",
      ],
      colors: ["blue"],
      sizes: ["Small", "Medium", "Large"],
      type: "Jeans",
      style: "Casual",
    },
  ],
  kids: [
    {
      id: 13,
      name: "Cartoon Print T-shirt",
      price: 65,
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=80",
        "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&q=80",
        "https://images.unsplash.com/photo-1622290319260-5b611d53429e?w=800&q=80",
      ],
      colors: ["yellow", "blue"],
      sizes: ["XX-Small", "X-Small", "Small"],
      type: "T-shirts",
      style: "Casual",
    },
    {
      id: 14,
      name: "Comfortable Joggers",
      price: 85,
      rating: 4.0,
      image:
        "https://images.unsplash.com/photo-1555274175-1612febedde0?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1555274175-1612febedde0?w=800&q=80",
        "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=80",
      ],
      colors: ["gray"],
      sizes: ["X-Small", "Small", "Medium"],
      type: "Shorts",
      style: "Gym",
    },
    {
      id: 15,
      name: "Colorful Hoodie",
      price: 95,
      originalPrice: 120,
      discount: 20,
      rating: 5.0,
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
        "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&q=80",
        "https://images.unsplash.com/photo-1622290319260-5b611d53429e?w=800&q=80",
      ],
      colors: ["red", "blue", "green"],
      sizes: ["X-Small", "Small", "Medium"],
      type: "Hoodie",
      style: "Casual",
    },
  ],
};

export const findProduct = (category, id) => {
  const list = PRODUCTS[category] || [];
  return list.find((p) => String(p.id) === String(id));
};
