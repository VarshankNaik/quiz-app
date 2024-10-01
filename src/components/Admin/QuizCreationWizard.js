import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function QuizCreationWizard() {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log('Form data:', data);

    if (step === 1) {

      console.log('Saving basic quiz information');

      setStep(2);
    } else if (step === 2) {

      console.log('Saving quiz questions');

      setStep(3);
    } else {

      console.log('Submitting entire quiz');
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {step === 1 && (
        <div>
          <h2>Step 1: Basic Quiz Information</h2>
          <input
            type="text"
            placeholder="Quiz Title"
            {...register("quizTitle", { required: "Quiz title is required" })}
          />
          {errors.quizTitle && <span>{errors.quizTitle.message}</span>}
          <textarea
            placeholder="Quiz Description"
            {...register("quizDescription", { required: "Quiz description is required" })}
          />
          {errors.quizDescription && <span>{errors.quizDescription.message}</span>}
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Step 2: Add Questions</h2>
          {/* Here you would typically map through an array of questions */}
          <input
            type="text"
            placeholder="Question"
            {...register("question", { required: "Question is required" })}
          />
          {errors.question && <span>{errors.question.message}</span>}
          {/* Add more inputs for answer options */}
        </div>
      )}

      {step === 3 && (
        <div>
          <h2>Step 3: Review and Submit</h2>
          {/* Display a summary of the quiz here */}
          <p>Review your quiz details before submitting.</p>
        </div>
      )}

      <button type="submit">
        {step < 3 ? "Next" : "Submit Quiz"}
      </button>
    </form>
  );

}

export default QuizCreationWizard;