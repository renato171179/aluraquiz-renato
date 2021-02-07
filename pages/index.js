/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React, { useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import Widget from '../src/components/Widget';
import Input from '../src/components/Input';
import Button from '../src/components/Button';

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  return (

    // eslint-disable-next-line react/jsx-filename-extension
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>AluraQuiz - Modelo</title>
      </Head>
      <QuizContainer>
        <Widget>
          <Widget.Header>
            <h1>#JavaScript Quiz</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={function (e) {
              e.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}
            >
              <Input
                name="nomeUsuario"
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite seu nome"
                value={name}
              />
              <Button type="submit" name={name} disabled={name.length === 0}>
                {`Jogar ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit recusandae aut reprehenderit quibusdam incidunt error ipsa laborum totam fugiat, eligendi eum ipsum perferendis. Magnam nisi consequuntur necessitatibus, facere maiores et.</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>

      <GitHubCorner projectUrl="https://github.com/renato171179" />

    </QuizBackground>
  );
}
