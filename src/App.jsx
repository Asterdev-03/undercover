import React, { useState } from "react";

const wordPairs = [
  { word: "happy", opposite: "sad" },
  { word: "hot", opposite: "cold" },
  { word: "big", opposite: "small" },
  // Add more word pairs here
];

function App() {
  const [selectedPair, setSelectedPair] = useState(null);
  const [numMembers, setNumMembers] = useState(0);
  const [oppositePlayerCount, setOppositePlayerCount] = useState(0);
  const [members, setMembers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  const handleSetupComplete = () => {
    const randomIndex = Math.floor(Math.random() * wordPairs.length);
    setSelectedPair(wordPairs[randomIndex]);
  };

  const handleAddMember = () => {
    if (members.length < numMembers) {
      const memberName = prompt("Enter member name:");
      if (memberName) {
        const isOppositePlayer = members.length < oppositePlayerCount;
        const word = isOppositePlayer
          ? selectedPair.opposite
          : selectedPair.word;
        setMembers((prevMembers) => [
          ...prevMembers,
          { name: memberName, word },
        ]);
        alert(`${memberName} got the word "${word}"`);
      }
    } else {
      alert("All members added");
    }
  };

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleRemovePlayer = (index) => {
    const removedPlayer = members[index];
    setMembers((prevMembers) => prevMembers.filter((_, i) => i !== index));
    alert(`Removed ${removedPlayer.name} with word "${removedPlayer.word}"`);
  };

  return (
    <div>
      {!gameStarted && (
        <>
          <label>
            Number of members:
            <input
              type="number"
              value={numMembers}
              onChange={(e) => setNumMembers(parseInt(e.target.value))}
            />
          </label>
          <br />
          <label>
            Imposter count:
            <input
              type="number"
              value={oppositePlayerCount}
              onChange={(e) => setOppositePlayerCount(parseInt(e.target.value))}
            />
          </label>
          <br />
          <button onClick={handleSetupComplete}>Setup Complete</button>
          {selectedPair && (
            <>
              <p>
                Selected pair: {selectedPair.word} - {selectedPair.opposite}
              </p>
              {members.map((member, index) => (
                <p key={index}>
                  {member.name} got the word "{member.word}"
                </p>
              ))}
              {members.length < numMembers && (
                <button onClick={handleAddMember}>Add Member</button>
              )}
              {members.length === numMembers && (
                <button onClick={handleStartGame}>Start Game</button>
              )}
            </>
          )}
        </>
      )}
      {gameStarted && (
        <>
          <h2>Game Started</h2>
          {members.map((member, index) => (
            <div key={index}>
              <span>{member.name}</span>
              <button onClick={() => handleRemovePlayer(index)}>Remove</button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
