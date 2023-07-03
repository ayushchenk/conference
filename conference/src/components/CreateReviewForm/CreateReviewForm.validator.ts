import * as yup from "yup";

export const validationSchema = yup.object({
  evaluation: yup.string().trim().required("Evaluation is required"),
  score: yup.number().min(-10).max(10).required("Score is required"),
  confidence: yup.number().oneOf([1, 2, 3, 4, 5]).required("Confidence is required"),
});
