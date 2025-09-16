import { useState } from "react";

function AddToPlaylistButton({ onAdd }) {
  const [message, setMessage] = useState("");

  const handleClick = () => {
    onAdd();
    setMessage("🎶 Adicionado com sucesso!");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <>
      <button className="adicionar-button" onClick={handleClick}>
        Adicionar à minha playlist
      </button>
      {message && <p className="success-message">{message}</p>}
    </>
  );
}

export default AddToPlaylistButton;
