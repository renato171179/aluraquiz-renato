/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import AlternativesForm from '../src/components/AlternativesForm';
import Button from '../src/components/Button';

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Tela de Resultado:
      </Widget.Header>
      <Widget.Content>
        <p>
          Você acertou
          {' '}
          {results.reduce((somatoriaAtual, resulAtual) => {
            const isAcerto = resulAtual === true;
            if (isAcerto) {
              return somatoriaAtual + 1;
            }
            return somatoriaAtual;
          }, 0)}
          {' '}
          perguntas
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${result}`}>
              #
              {index + 1}
              {' '}
              Resultado:
              {result === true ? 'Acertou' : 'Errou'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando....
      </Widget.Header>
      <Widget.Content>
        [Desafio Loading]
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  totalQuestion,
  questionIndex,
  onSubmit,
  addResult,
}) {
  const [selectAlternative, setSelectAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState();
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectAlternative === question.answer;
  const hasAlternativeSelected = selectAlternative !== undefined;
  return (
    <Widget>
      <Widget.Header>
        <h2>Bem vindo ao jogo</h2>
        <h3>  </h3>
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestion}`}
        </h3>
      </Widget.Header>
      <img
        alt="Descricao"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <AlternativesForm onSubmit={(e) => {
          e.preventDefault();
          setIsQuestionSubmited(true);
          setTimeout(() => {
            addResult(isCorrect);
            onSubmit();
            setIsQuestionSubmited(false);
            setSelectAlternative(undefined);
          }, 3 * 1000);
        }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativesStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
                key={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativesStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  type="radio"
                  name={questionId}
                  onChange={() => setSelectAlternative(alternativeIndex)}
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
          {isQuestionSubmited && !isCorrect && <p>Você errou!</p>}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  RESULT: 'RESULT',
  LOADING: 'LOADING',
};

export default function QuizPage() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [results, setResults] = useState([]);
  const totalQuestion = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestion) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestion={totalQuestion}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}
        {screenState === screenStates.LOADING && <LoadingWidget />}
        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
      </QuizContainer>
    </QuizBackground>
  );
}
