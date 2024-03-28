import React from "react";
import Link from "next/link";

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to My Website!</h1>
      <p>This is the homepage of my website built with Next.js.</p>
      <Link href="/signup">Cadastre-se</Link>
      <br />
      <Link href="/login">Entre</Link>
    </div>
  );
};

export default HomePage;
