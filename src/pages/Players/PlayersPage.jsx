import { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import {
  VerticalContainer,
  HorizontalContainer
} from '../../config/GlobalStyle';
import Input from '../../components/Input/Input';
import LoadingProgress from '../../components/Loading/LoadingProgress';
import { getPlayersData } from '../../services/axios';

export default function PlayersPage() {
  const [playersData, setPlayersData] = useState([]);
  const [player, setPlayer] = useState({
    name: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // Para procurar todos os jogadores ao carregar a página
  const fetchAllPlayersData = async () => {
    setIsLoading(true);
    const responsePlayers = await getPlayersData('profile/all-players');
    setPlayersData(responsePlayers);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllPlayersData();
  }, []);

  useEffect(() => {
    const fetchPlayerData = async () => {
      // Pesquisa apenas se o usuário tiver digitado um nome
      if (player.name !== '') {
        setIsLoading(true);
        const responsePlayers = await getPlayersData(`profile/${player?.name}`);
        setPlayersData(responsePlayers);
        setIsLoading(false);
      } else {
        fetchAllPlayersData();
      }
    };
    fetchPlayerData();
  }, [player]);

  const notFound = '\u0250';

  // Configurações de estilos dos Cards
  const variantTitle = 'h4';
  const variantSubtitle = 'h5';
  const cardWidth = 400;
  const cardHeight = 350;

  return (
    <VerticalContainer style={{ padding: '2rem' }}>
      {/* Input (Pesquisar Jogador pelo nome) */}
      <Card>
        <CardContent>
          <Input
            data={player}
            setData={setPlayer}
            keyName="name"
            label="Nome do Jogador"
          />
        </CardContent>
      </Card>
      {isLoading ? (
        <LoadingProgress />
      ) : (
        <HorizontalContainer>
          {playersData.map((player) => {
            return (
              <Card
                sx={{ width: cardWidth, height: cardHeight }}
                key={player?._id}
              >
                <CardContent>
                  <Typography variant={variantTitle} gutterBottom>
                    {player?.nickname ?? notFound}
                  </Typography>
                  <Typography variant={variantSubtitle} gutterBottom>
                    Level: {player?.level ?? notFound}
                  </Typography>
                  <Typography variant={variantSubtitle} gutterBottom>
                    Troféus: {player?.trophies ?? notFound}
                  </Typography>
                  <Typography variant={variantSubtitle} gutterBottom>
                    Partidas Jogadas: {player?.totalGames ?? notFound}
                  </Typography>
                  <Typography variant={variantSubtitle} gutterBottom>
                    Vitórias: {player?.wins ?? notFound}
                  </Typography>
                  <Typography variant={variantSubtitle} gutterBottom>
                    Derrotas: {player?.losses ?? notFound}
                  </Typography>
                  <Typography variant={variantSubtitle} gutterBottom>
                    Clã: {player?.clan ?? notFound}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </HorizontalContainer>
      )}
    </VerticalContainer>
  );
}
