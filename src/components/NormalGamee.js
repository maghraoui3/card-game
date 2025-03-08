import React, { useState, useEffect } from 'react';
import '../app.css'
import data from '../data'

function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function NormalGame(props) {
  const [flipCard, setFlipCard] = useState(false);
  const [shuffledData, setShuffledData] = useState([]);

  useEffect(() => {
    // Shuffle the data when the component mounts or when the game type changes
    setShuffledData(shuffleArray(data));
  }, [props.gameType]);

  const getRandomText = (texts) => {
    if (texts.length === 0) {
      return "No items available";
    }

    const randomIndex = Math.floor(Math.random() * texts.length);
    const selectedText = texts[randomIndex].text;

    return selectedText;
  };

  const filterDataByGameType = () => {
    if (props.gameType === 'normal') {
      return shuffledData.filter(item => !item.adult);
    } else if (props.gameType === '+18') {
      return shuffledData.filter(item => item.adult);
    } else {
      return shuffledData;
    }
  };

  const filteredData = filterDataByGameType();

    return (
    <div>
        <div className="card-container">
        <div onClick={() => setFlipCard(!flipCard)} className={`normal-card ${flipCard ? 'frontCard' : 'backCard'}`}>
          {flipCard ? (
            <p>
              {filteredData.length > 0 ? getRandomText(filteredData) : "No items available"}
            </p>
          ) : null}
        </div>

        {<a href='https://www.instagram.com/malek_maghraoui/' target='blank_' className={`footer-card-instagram-name ${flipCard ? 'frontCard-title' : 'backCard-title'}`}>@malek_maghraoui</a>}
      </div>
    </div>
  )
}

export default NormalGame