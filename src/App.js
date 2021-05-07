import React, { useState, useEffect } from "react";

import "./styles.css";

import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);
  async function loadRepositories() {
    const response = await api.get("/repositories");
    setRepositories(response.data);
  }
  useEffect(() => {
    loadRepositories();
  }, []);

  console.log(repositories);
  async function handleAddRepository() {
    const repository = await api.post("/repositories", {
      title: "Exercicicios JS",
      url: "https: //github.com/tatianasstavares/goStack-backEnd3",
      techs: ["node.js", "javaScript"],
    });
    setRepositories([...repositories, repository.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(
      repositories.filter((repository) => {
        return repository.id !== id;
      })
    );
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
