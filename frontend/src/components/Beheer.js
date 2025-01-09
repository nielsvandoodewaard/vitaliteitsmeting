import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import "../styles/Dashboard.css"; // Importeer de CSS
import Sidebar from "./Sidebar";

const QuestionnaireForm = () => {
  const { register, handleSubmit, control, reset, getValues, setValue } = useForm({
    defaultValues: {
      questions: [
        { questionText: "", questionType: "text", options: [{ value: "" }] },
      ],
    },
  });

  const { fields: questionFields, append: addQuestion, remove: removeQuestion } =
    useFieldArray({
      control,
      name: "questions",
    });

  const onSubmit = (data) => {
    console.log("Vragenlijst ingediend:", data);
    reset(); // Reset het formulier na indienen
  };

  const addOption = (questionIndex) => {
    const questions = getValues("questions");
    questions[questionIndex].options.push({ value: "" });
    setValue("questions", questions);
  };

  const removeOption = (questionIndex, optionIndex) => {
    const questions = getValues("questions");
    questions[questionIndex].options.splice(optionIndex, 1);
    setValue("questions", questions);
  };

  // Zorg ervoor dat de velden altijd correct zijn gesynchroniseerd
  useEffect(() => {
    setValue("questions", questionFields);
  }, [questionFields, setValue]);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Maak een vragenlijst</h2>
      <Sidebar />
      <form onSubmit={handleSubmit(onSubmit)}>
        {questionFields.map((question, questionIndex) => (
          <div key={question.id} style={{ marginBottom: "20px" }}>
            <label>
              Vraagtekst:
              <input
                {...register(`questions.${questionIndex}.questionText`)}
                placeholder="Typ je vraag hier..."
                style={{ width: "100%", margin: "5px 0", padding: "8px" }}
              />
            </label>
            <label>
              Vraagtype:
              <select
                {...register(`questions.${questionIndex}.questionType`)}
                style={{ width: "100%", margin: "5px 0", padding: "8px" }}
              >
                <option value="text">Open vraag</option>
                <option value="multipleChoice">Meerkeuzevraag</option>
              </select>
            </label>

            {getValues(`questions.${questionIndex}.questionType`) === "multipleChoice" && (
              <>
                <h4>Opties</h4>
                {getValues(`questions.${questionIndex}.options`)?.map((option, optionIndex) => (
                  <div key={optionIndex} style={{ display: "flex", gap: "10px" }}>
                    <input
                      {...register(
                        `questions.${questionIndex}.options.${optionIndex}.value`
                      )}
                      placeholder="Typ een optie"
                      style={{ flex: 1, padding: "8px" }}
                    />
                    <button
                      type="button"
                      onClick={() => removeOption(questionIndex, optionIndex)}
                    >
                      Verwijder
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addOption(questionIndex)}
                  style={{ marginTop: "10px" }}
                >
                  Optie toevoegen
                </button>
              </>
            )}
            <button
              type="button"
              onClick={() => removeQuestion(questionIndex)}
              style={{ marginTop: "10px", color: "red" }}
            >
              Vraag verwijderen
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            addQuestion({ questionText: "", questionType: "text", options: [] })
          }
          style={{ marginTop: "10px" }}
        >
          Vraag toevoegen
        </button>
        <button type="submit" style={{ marginTop: "20px" }}>
          Vragenlijst opslaan
        </button>
      </form>
    </div>
  );
};

export default QuestionnaireForm;
