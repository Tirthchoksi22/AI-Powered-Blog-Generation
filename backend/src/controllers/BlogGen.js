import blog from "../models/BlogSchema.js";
import groq from "../config/Ai.js"; // Ensure this is correctly configured for Groq
import user from "../models/UsersSchema.js";

const generateBlog = async (req, res) => {
  try {
    const { title, length, tone, keywords } = req.body; // Updated parameters to match frontend
    const userID = req.userId; // Extracted from authentication middleware

    // Check if title is provided
    if (!title) {
      return res.status(400).json({ error: "Blog title is required" });
    }

    // Generate upgraded prompt for AI model
    let prompt = `You are an expert content writer and professional blogger. 
Write a highly engaging and ${tone || "informative"} blog post about "${title}". 

Requirements:
- The blog must be approximately ${length || 500} words in length.
- Use a clear structure: an engaging introduction, well-organized body paragraphs with Markdown headings (##), and a strong conclusion.
- Use Markdown bolding (**text**) for emphasis where appropriate.
- Maintain a consistent ${tone || "informative"} tone throughout.`;

    // Add keywords to prompt if provided
    if (keywords && keywords.trim()) {
      prompt += `\n- Seamlessly and naturally integrate the following keywords: ${keywords}.`;
    }

    console.log("Sending prompt to Groq:", prompt);

    // Generate blog content using AI with robust fallback models
    const modelsToTry = [
      "openai/gpt-oss-120b",
      "llama-3.3-70b-versatile",
      "llama-3.1-8b-instant"
    ];

    let chatCompletion = null;
    let lastError = null;

    for (const modelName of modelsToTry) {
      try {
        console.log(`Attempting blog generation with model: ${modelName}`);
        chatCompletion = await groq.chat.completions.create({
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          model: modelName,
          temperature: 0.7,
          max_tokens: 2048,
          top_p: 1,
          stream: false,
        });
        console.log(`Successfully generated content using model: ${modelName}`);
        break;
      } catch (error) {
        console.error(`Failed generation with model ${modelName}:`, error.message);
        lastError = error;
      }
    }

    if (!chatCompletion) {
      throw new Error(`AI generation failed on all attempted models. Last error: ${lastError ? lastError.message : 'Unknown'}`);
    }

    // Get the blog content from the response
    const blogContent = chatCompletion.choices[0]?.message?.content || "Failed to generate content";

    // Save the generated blog to the database
    const newBlog = new blog({
      title: title,
      content: blogContent,
      tone: tone || "informative",
      length: length || 500,
      keywords: keywords || "",
      author: userID, // Assign the user ID as the author
    });
    await newBlog.save();

    // Update the user's blogs array with the new blog ID
    await user.findByIdAndUpdate(userID, { $push: { blogs: newBlog._id } });

    // Return the generated blog content
    return res.status(200).json({
      success: true,
      content: blogContent,
      blogId: newBlog._id
    });
  } catch (error) {
    console.error("Error generating blog:", error);
    return res.status(500).json({
      error: "Failed to generate blog content",
      details: error.message
    });
  }
};

export const getHistory = async (req, res) => {
  try {
    const userID = req.userId;
    const history = await blog.find({ author: userID }).sort({ createdAt: -1 });

    // Map the MongoDB objects to match the frontend BlogEntry interface
    const formattedHistory = history.map(item => ({
      id: item._id,
      title: item.title,
      content: item.content,
      tone: item.tone || 'informative',
      length: item.length || 500,
      keywords: item.keywords || 'None',
      date: item.createdAt || new Date().toISOString()
    }));

    return res.status(200).json(formattedHistory);
  } catch (error) {
    console.error("Error fetching history:", error);
    return res.status(500).json({ error: "Failed to fetch history" });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const userID = req.userId;

    // Delete the blog
    const deletedBlog = await blog.findOneAndDelete({ _id: id, author: userID });
    if (!deletedBlog) {
      return res.status(404).json({ error: "Blog not found or unauthorized" });
    }

    // Remove reference from user
    await user.findByIdAndUpdate(userID, { $pull: { blogs: id } });

    return res.status(200).json({ success: true, message: "Blog deleted" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return res.status(500).json({ error: "Failed to delete blog" });
  }
};

export const clearHistory = async (req, res) => {
  try {
    const userID = req.userId;

    // Delete all blogs by this user
    await blog.deleteMany({ author: userID });

    // Clear all blog references from the user
    await user.findByIdAndUpdate(userID, { $set: { blogs: [] } });

    return res.status(200).json({ success: true, message: "History cleared" });
  } catch (error) {
    console.error("Error clearing history:", error);
    return res.status(500).json({ error: "Failed to clear history" });
  }
};

export default generateBlog;
