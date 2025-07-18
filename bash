# Copy the template
cp src/.env.example .env

# Add your keys to .env file
VITE_HF_TOKEN=your_hugging_face_token
VITE_GROQ_TOKEN=your_groq_api_key

npx convex dev

# Add the GitHub remote (replace with your actual repo URL)
git remote add origin https://github.com/yethikrishna/yeti-ai.git

# Push to GitHub
git push -u origin main