https://vector-database-visualization.vercel.app


Of course! Based on the provided images, here is a comprehensive and well-structured `README.md` text for the GitHub repository.

---

# VectorDB Browser

A client-side vector database with semantic search, built to run entirely in your browser. Store, search, and visualize text embeddings with zero setup and no backend required.

**Live Demo: [Launch VectorDB Browser](https://vector-database-visualization.vercel.app)** 


---

## ✨ Features

- **🖥️ 100% Client-Side:** All data processing and storage happens in your browser. No server, no setup, no API keys.
- **⚡ Instant Vectorization:** Convert text to 384-dimensional vectors instantly using a deterministic hash-based algorithm.
- **🔍 Semantic Search:** Find similar entries using fast and accurate cosine similarity ranking.
- **🔒 Privacy First:** Your data never leaves your computer. It's stored locally in your browser's session storage.
- **💾 Data Portability:** Easily import and export your entire database as JSON.
- **🚀 Modern Stack:** Built with React, TypeScript, and Vite for a smooth and reliable developer experience.

## 🛠️ Technical Specifications

| Component | Specification |
| :--- | :--- |
| **Vector Dimensions** | 384 (Fixed-length) |
| **Vectorization Algorithm** | Deterministic Hash |
| **Search Method** | Cosine Similarity |
| **Storage** | Browser `sessionStorage` |
| **Framework** | React + TypeScript |
| **Build Tool** | Vite |
| **Data Format** | JSON |

## 🚀 Getting Started

## 📖 How to Use

1.  **Add Data:** Type text into the "Enter text to vectorize and store..." field and click "Vectorize & Add".
2.  **Search:** Enter a query in the search bar to find the most semantically similar entries in your database.
3.  **Manage Data:** Use the controls to Export your data as a JSON file, Import a previous database, or Clear All entries.

## 🗂️ Project Structure

```
src/
├── components/          # React components (Search, DatabaseControls, etc.)
├── hooks/              # Custom React hooks (e.g., for vector operations)
├── utils/              # Core logic (vectorization, similarity search)
├── types/              # TypeScript type definitions
└── App.tsx             # Main application component
```
## 👨‍💻 Author

**Octavian Mihai**

- Portfolio: [your-portfolio-link]
- LinkedIn: [Your LinkedIn Profile]

---

## 💡 Motivation

VectorDB Browser was created to make vector databases and semantic search accessible for:
- **Prototyping** ideas quickly without backend infrastructure.
- **Learning** how embeddings and similarity search work.
- **Privacy-conscious applications** where data must remain on the client.

**Ready to explore?** [Try the Live Demo!](https://your-demo-link-here.com)
