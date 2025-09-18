const generateHealthPlan = require("../services/healthPlan2");
console.log("generateHealthText2 route hit");
const generateHealthText = async (req, res) => {
  try {
    const { title, author, rating } = req.body;

    if (!title || !author || !rating) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const markdownResponse = await generateHealthPlan(
      title,
      author,
      rating
    );

    const jsonMatch = markdownResponse.match(/```json\s*([\s\S]*?)\s*```/);


    if (!jsonMatch) {
      return res.status(500).json({ error: "Invalid response format. No JSON found." });
    }

    let healthPlan;
    try {
      healthPlan = JSON.parse(jsonMatch[1]);

    } catch (parseError) {
      return res.status(500).json({ error: "Error parsing JSON response." });
    }

    res.json(healthPlan);
  } catch (err) {
    console.error("Error in bookrecs generation:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

module.exports = generateHealthText;