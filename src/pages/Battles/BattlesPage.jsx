import { useEffect, useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  Collapse,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Paper,
  TablePagination
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  VerticalContainer,
  HorizontalContainer
} from '../../config/GlobalStyle';
import { getPlayersData } from '../../services/axios';
import LoadingProgress from '../../components/Loading/LoadingProgress';
import DeckList from '../../components/Deck/DeckList';
import Input from '../../components/Input/Input';

export default function BattlesPage() {
  const [battlesData, setBattlesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [player, setPlayer] = useState({
    name: ''
  });

  // Para procurar todos as batalhas ao carregar a página
  const fetchAllBattlesData = async () => {
    setIsLoading(true);
    const responseBattles = await getPlayersData('battles/all-battles');
    setBattlesData(responseBattles);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllBattlesData();
  }, []);

  useEffect(() => {
    const fetchPlayerData = async () => {
      // Pesquisa apenas se o usuário tiver digitado um nome
      if (player.name !== '') {
        setIsLoading(true);
        const responsePlayers = await getPlayersData(`battles/${player?.name}`);
        setBattlesData(responsePlayers);
        setIsLoading(false);
      } else {
        fetchAllBattlesData();
      }
    };
    fetchPlayerData();
  }, [player]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleBattles = useMemo(
    () =>
      [...battlesData].slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [battlesData, page, rowsPerPage]
  );

  const fontSize = 'h6';
  const iconWidth = '30px';

  return (
    <VerticalContainer style={{ padding: '4rem' }}>
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
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650, '& > *': { borderBottom: 'unset' } }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Jogador 1</TableCell>
                  <TableCell>Torres Destruídas</TableCell>
                  <TableCell />
                  <TableCell>Jogador 2</TableCell>
                  <TableCell>Torres Destruídas</TableCell>
                  <TableCell>Vencedor</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleBattles.map((battle) => (
                  <>
                    {/* Linha principal da tabela */}
                    <TableRow
                      key={battle._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      {/* Para abrir a linha secundária da tabela */}
                      <TableCell>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => setOpen(!open)}
                        >
                          {open ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </IconButton>
                      </TableCell>
                      {/* Nome - Jogador 1 */}
                      <TableCell>
                        <Typography variant={fontSize}>
                          {battle.player1}
                        </Typography>
                      </TableCell>
                      {/* Número de Torres Destruídas - Jogador 1 */}
                      <TableCell>
                        <Typography variant={fontSize}>
                          <HorizontalContainer
                            style={{ justifyContent: 'flex-start' }}
                          >
                            {battle.player1TowersDestroyed}
                            <img
                              src="https://cdns3.royaleapi.com/cdn-cgi/image/w=64,h=64,format=auto/static/img/ui/crown-blue.png"
                              width={iconWidth}
                            />
                          </HorizontalContainer>
                        </Typography>
                      </TableCell>
                      {/* Imagem de Versus */}
                      <TableCell>
                        {' '}
                        <img
                          src="https://cdn.royaleapi.com/static/img/ui/battle.png?t=0c9253cbc"
                          width={iconWidth}
                        />
                      </TableCell>
                      {/* Nome - Jogador 2 */}
                      <TableCell>
                        <Typography variant={fontSize}>
                          {battle.player2}
                        </Typography>
                      </TableCell>
                      {/* Número de Torres Destruídas - Jogador 2 */}
                      <TableCell>
                        <Typography variant={fontSize}>
                          <HorizontalContainer
                            style={{ justifyContent: 'flex-start' }}
                          >
                            {battle.player2TowersDestroyed}
                            <img
                              src="https://cdns3.royaleapi.com/cdn-cgi/image/w=64,h=64,format=auto/static/img/ui/crown-blue.png"
                              width={iconWidth}
                            />
                          </HorizontalContainer>
                        </Typography>
                      </TableCell>
                      {/* Vencedor */}
                      <TableCell>
                        <Typography variant={fontSize}>
                          {battle.winner === 'player1'
                            ? battle.player1
                            : battle.player2}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    {/* Linha secundária - escondida */}
                    <TableRow>
                      <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={6}
                      >
                        <Collapse in={open} timeout="auto" unmountOnExit>
                          <HorizontalContainer style={{ flexWrap: 'nowrap' }}>
                            <DeckList deckList={battle.player1Deck} />
                            <img src="https://cdn.royaleapi.com/static/img/ui/battle.png?t=0c9253cbc" />
                            <DeckList deckList={battle.player2Deck} />
                          </HorizontalContainer>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* Paginação */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component={Paper}
            count={battlesData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </VerticalContainer>
  );
}
