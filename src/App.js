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
    const newRepositorie = {
      title: "Exercicicios JS",
      url: "https: //github.com/tatianasstavares/goStack-backEnd3",
      techs: ["node.js", "javaScript"],
    };

    await api.post("/repositories", newRepositorie);
    setRepositories([...repositories, newRepositorie]);
  }

  async function handleRemoveRepository(id) {
    // TODO
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(1)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
