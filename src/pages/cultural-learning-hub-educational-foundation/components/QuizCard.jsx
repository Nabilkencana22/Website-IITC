import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuizCard = ({ quiz, onComplete, className = '' }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    quiz?.questions?.forEach((question, index) => {
      if (selectedAnswers?.[index] === question?.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const finalScore = Math.round((correctAnswers / quiz?.questions?.length) * 100);
    setScore(finalScore);
    setShowResults(true);
    
    if (onComplete) {
      onComplete(finalScore);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  if (showResults) {
    return (
      <div className={`bg-card border border-border rounded-xl p-6 shadow-cultural ${className}`}>
        <div className="text-center">
          <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
            score >= 80 ? 'bg-success/20' : score >= 60 ? 'bg-warning/20' : 'bg-error/20'
          }`}>
            <Icon 
              name={score >= 80 ? 'Trophy' : score >= 60 ? 'Award' : 'AlertCircle'} 
              size={32} 
              className={score >= 80 ? 'text-success' : score >= 60 ? 'text-warning' : 'text-error'}
            />
          </div>
          
          <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
            Quiz Complete!
          </h3>
          
          <div className="text-4xl font-bold mb-2">
            <span className={score >= 80 ? 'text-success' : score >= 60 ? 'text-warning' : 'text-error'}>
              {score}%
            </span>
          </div>
          
          <p className="text-muted-foreground mb-6">
            You got {Object.values(selectedAnswers)?.filter((answer, index) => 
              answer === quiz?.questions?.[index]?.correctAnswer
            )?.length} out of {quiz?.questions?.length} questions correct
          </p>

          <div className="flex space-x-3">
            <Button variant="outline" onClick={resetQuiz} className="flex-1">
              <Icon name="RotateCcw" size={16} className="mr-2" />
              Try Again
            </Button>
            <Button variant="default" className="flex-1">
              <Icon name="BookOpen" size={16} className="mr-2" />
              Continue Learning
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = quiz?.questions?.[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz?.questions?.length) * 100;

  return (
    <div className={`bg-card border border-border rounded-xl p-6 shadow-cultural ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-bold text-foreground">{quiz?.title}</h3>
          <p className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {quiz?.questions?.length}
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Clock" size={16} />
          <span>{quiz?.timeLimit} min</span>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary to-cultural-gold h-2 rounded-full transition-all duration-cultural-normal"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      {/* Question */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-foreground mb-4">
          {currentQ?.question}
        </h4>

        {/* Answer Options */}
        <div className="space-y-3">
          {currentQ?.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(currentQuestion, index)}
              className={`w-full p-4 text-left rounded-lg border transition-all duration-cultural-normal ${
                selectedAnswers?.[currentQuestion] === index
                  ? 'border-primary bg-primary/10 text-foreground'
                  : 'border-border bg-muted/30 text-muted-foreground hover:border-primary/50 hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswers?.[currentQuestion] === index
                    ? 'border-primary bg-primary' :'border-muted-foreground'
                }`}>
                  {selectedAnswers?.[currentQuestion] === index && (
                    <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                  )}
                </div>
                <span className="flex-1">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
          disabled={currentQuestion === 0}
        >
          <Icon name="ChevronLeft" size={16} className="mr-2" />
          Previous
        </Button>

        {currentQuestion === quiz?.questions?.length - 1 ? (
          <Button
            variant="default"
            onClick={handleSubmit}
            disabled={selectedAnswers?.[currentQuestion] === undefined}
            className="bg-gradient-to-r from-primary to-cultural-gold"
          >
            <Icon name="CheckCircle" size={16} className="mr-2" />
            Submit Quiz
          </Button>
        ) : (
          <Button
            variant="default"
            onClick={() => setCurrentQuestion(prev => prev + 1)}
            disabled={selectedAnswers?.[currentQuestion] === undefined}
          >
            Next
            <Icon name="ChevronRight" size={16} className="ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizCard;