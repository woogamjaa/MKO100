import React from 'react';
import Container from '../components/common/Container';
import Section01 from '../components/sections/section01';

const Home = () => {
  return (
    <Container>
      <section className="hero">
        <Section01 />
      </section>
    </Container>
  );
};

export default Home;