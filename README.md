# E-Commerce Web Application

A modern, responsive e-commerce web application built with Next.js, TypeScript, and Tailwind CSS. This application features product browsing, shopping cart functionality, wishlist management, and a seamless checkout experience.

## 🚀 Live Demo

Check out the live application: [https://ecommerce-web-lemon-theta.vercel.app/](https://ecommerce-web-lemon-theta.vercel.app/)

## 📁 Repository

View the source code on GitHub: [https://github.com/Dolly-6232/ecommerce-web.git](https://github.com/Dolly-6232/ecommerce-web.git)

## ✨ Features

- **Product Catalog**: Browse products from Fake Store API with categories and search
- **Product Details**: View detailed product information with images and ratings
- **Shopping Cart**: Add/remove items, update quantities, and view cart total
- **Wishlist Management**: Save favorite products and move them to cart
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth transitions
- **TypeScript**: Full type safety for better development experience

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API**: Fake Store API
- **State Management**: React Hooks with Local Storage

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Dolly-6232/ecommerce-web.git
cd ecommerce-web
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🏗️ Project Structure

```
ecommerce-web/
├── app/                    # Next.js app router pages
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Checkout page
│   ├── products/[id]/     # Product detail page
│   ├── wishlist/          # Wishlist page
│   └── page.tsx           # Home page
├── components/            # Reusable React components
│   ├── ErrorMessage.tsx   # Error handling component
│   ├── Header.tsx         # Navigation header
│   ├── LoadingSpinner.tsx # Loading indicator
│   └── ProductCard.tsx    # Product card component
├── lib/                   # Utility libraries
│   ├── api.ts            # API functions
│   └── storage.ts        # Local storage utilities
├── types/                 # TypeScript type definitions
│   └── product.ts        # Product-related types
└── public/               # Static assets
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Fake Store API](https://fakestoreapi.com/) for providing the product data
- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the beautiful icon set
