import React from 'react';
import Container from '../components/common/Container';
import Section01 from '../components/sections/Section01.jsx'; // 섹션 1 컴포넌트
import Section02 from '../components/sections/Section02.jsx'; // 섹션 2 컴포넌트

const Home = () => {
  return (
    <Container>
      <section className="hero">
        <Section01/>
        <Section02/>
      </section>
    </Container>
  );
};

export default Home;