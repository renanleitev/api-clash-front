import { useEffect, useState } from 'react';
import {
  VerticalContainer,
  HorizontalContainer
} from '../../config/GlobalStyle';
import DashboardWindow from '../../components/Dashboard/DashboardWindow';
import { getPlayersData } from '../../services/axios';

export default function HomePage() {
  const [playersStatus, setPlayersStatus] = useState({});
  const [battlesStatus, setBattlesStatus] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const responsePlayers = await getPlayersData(
        'profile/all-players/status'
      );
      setPlayersStatus(responsePlayers);
      const responseBattles = await getPlayersData(
        'battles/all-battles/status'
      );
      setBattlesStatus(responseBattles);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <VerticalContainer>
      <VerticalContainer
        style={{ alignItems: 'flex-start', marginTop: '2rem' }}
      >
        <h2>Visão Geral</h2>
        <HorizontalContainer>
          <DashboardWindow
            title="Jogadores"
            quantity={playersStatus?.playersNumber}
            isLoading={isLoading}
          />
          <DashboardWindow
            title="Batalhas"
            quantity={battlesStatus?.battlesNumber}
            isLoading={isLoading}
          />
        </HorizontalContainer>
        <h2>Jogadores</h2>
        {/* Level */}
        <HorizontalContainer>
          <DashboardWindow
            title="Level Mínimo"
            quantity={playersStatus?.levelMin}
            isLoading={isLoading}
          />
          <DashboardWindow
            title="Level Máximo"
            quantity={playersStatus?.levelMax}
            isLoading={isLoading}
          />
          <DashboardWindow
            title="Média de Level"
            quantity={Number.parseInt(playersStatus?.levelAvg)}
            isLoading={isLoading}
          />
        </HorizontalContainer>
        {/* Média de Vitórias/Derrotas */}
        <HorizontalContainer>
          <DashboardWindow
            title="Média de Vitórias por Jogador"
            quantity={Number.parseInt(playersStatus?.winsAvg)}
            isLoading={isLoading}
          />
          <DashboardWindow
            title="Média de Derrotas por Jogador"
            quantity={Number.parseInt(playersStatus?.lossesAvg)}
            isLoading={isLoading}
          />
          <DashboardWindow
            title="Média de Partidas por Jogador"
            quantity={Number.parseInt(playersStatus?.totalGamesAvg)}
            isLoading={isLoading}
          />
          <DashboardWindow
            title="Média de Troféus por Jogador"
            quantity={Number.parseInt(playersStatus?.trophiesAvg)}
            isLoading={isLoading}
          />
        </HorizontalContainer>
        <h2>Batalhas</h2>
        {/* Quantidade de Vitórias/Troféus */}
        <HorizontalContainer>
          <DashboardWindow
            title="Jogador 1 venceu"
            quantity={battlesStatus?.winsPlayer1}
            isLoading={isLoading}
          />
          <DashboardWindow
            title="Jogador 2 venceu"
            quantity={battlesStatus?.winsPlayer2}
            isLoading={isLoading}
          />
          <DashboardWindow
            title="Média de troféus do Jogador 1"
            quantity={Number.parseInt(battlesStatus?.player1TrophiesAvg)}
            isLoading={isLoading}
          />
          <DashboardWindow
            title="Média de troféus do Jogador 2"
            quantity={Number.parseInt(battlesStatus?.player2TrophiesAvg)}
            isLoading={isLoading}
          />
        </HorizontalContainer>
      </VerticalContainer>
    </VerticalContainer>
  );
}
