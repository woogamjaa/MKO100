import React from 'react';
import Container from '../components/common/Container';
// 올바른 코드 (대문자 S)
import Section01 from '../components/sections/Section01.jsx'; // 섹션 1 컴포넌트

const Home = () => {
  return (
    <Container>
      <section className="hero">
        <Section01/>
      </section>
    </Container>
  );
};

export default Home;