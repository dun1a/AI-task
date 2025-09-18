const model = require("./gemini");


const generateHealthPlan = async (title, author, rating) => {
  const prompt = `
You are a certified librarian and you are meant to reccomend books according to the input of the user (title, author, rating).
 Based on the user's details, create a **personalized book recommendation**.

### Schema Requirements:
The JSON response should have the following structure:

[
  {
    "title": "title of book",
    "author": "author's name"
  }
]

### User Input:
The book I name I read was ${title} and the author was ${author}. This is my rating for the book: ${rating}.
I would like for you to recommend some book (10 to be exact) that would alighn with my preferences. 
Please take into consideration my rating of the book I read. 

Please:
- Return the response in the exact JSON format above.
`;

  try {
    const result = await model(prompt);
    return result.text;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = generateHealthPlan;