import { useState, useEffect } from "react";
import Game from "./Game";
import AdultOrNot from "./AdultQuestion";
import { getGamesFromServer, priceWithCurrency } from "./utils";

function App() {
  const [isAdult, setIsAdult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);

  useEffect(() => {
    getGamesFromServer().then((gamesFromServer) => {
      setLoading(false);
      setGames(gamesFromServer);
    });
  }, []);

  const renderTags = (tags) => {
    return tags?.map((tag, index) => <span key={tag + index}>{tag}</span>);
  };

  if (loading) {
    return <div>Загружаем игры...</div>;
  }

  if (isAdult === null) {
    return <AdultOrNot setIsAdult={setIsAdult} />;
  }

  return (
    <div>
      {games.map((game) => (
        <div key={game.id} style={{ border: "1px solid blue" }}>
          Игра:
          {game.forKids && !isAdult ? (
            <b style={{ color: "red" }}>Вам не доступна эта игра</b>
          ) : (
            <>
              <Game
                name={game.name}
                description={game.description}
                version={game.version}
              />
              Цена: {priceWithCurrency(game.price)}
              Тэги: {renderTags(game.tags)}
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
