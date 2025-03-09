import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import AirHockeyBoard from '@/components/AirHockeyBoard';

const Container = styled.div`
  min-height: 100vh;
  height: 100vh; /* Фиксируем высоту на 100% видимой области */
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #1e1e1e;
  overflow: hidden; /* Предотвращаем скролл */
`;

const HomePage: React.FC = () => {
  return (
    <Container>
      <Head>
        <title>Air Hockey Game</title>
        <meta name="description" content="Modern Air Hockey game built with Next.js and TypeScript" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <AirHockeyBoard />
      </main>
    </Container>
  );
};

export default HomePage; 