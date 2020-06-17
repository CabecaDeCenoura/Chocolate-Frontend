import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import api from '../../services/api';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    backgroundImage: 'url(https://cdn.pixabay.com/photo/2020/04/27/18/44/seamless-5101105_960_720.jpg)',
    padding: theme.spacing(2, 1, 2),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#15489',
 
  },
  media: {
    height: 140,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },

}));


export default function Principal() {
  const classes = useStyles();
  const [grupos, setGrupo] = useState([]);
  const [loading, setLoading] = useState(false);
  const loginName = localStorage.getItem('pLogin');
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
 
  const handleToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      api.get('grupo').then(response => {
        console.log(response.data);
        setGrupo(response.data)
      });
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);

  }, []);

  function handleDeleteGrupo(id) {
    try {
      setGrupo(grupos.filter(item => item._id !== id));
      alert(`${id} deletado com sucesso`);
    } catch (err) {
      alert('Erro ao excluir');
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/grupos');
  }
  return (
    
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Amigo Chocolate Online
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography variant="h5" align="center" color="textPrimary" paragraph>
            <Box fontWeight="fontWeightBold" m={1}>
              Bem vindos(as) ao nosso site, onde o seu Amigo Chocolate fica muito mais gostoso e divertido!
              </Box>
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                <Button variant="contained">
                    <Link to={('cursos')}>
                      Cursos
                    </Link>
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <Typography variant="h5" align="center" color="textPrimary" paragraph>
              <Box fontWeight="fontWeightBold" m={1}>
              Abaixo podemos observar alguns grupos que você pode participar ou criar!
              </Box>
            </Typography>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
          >
            {!loading && grupos.map(grupo => (
              <Grid key={grupo._id} >
                <Card className={classes.card}>
                  <Card >
                    <CardContent className={classes.cardContent}>
                    <br></br>
                      <img alt="FotodoGrupo" width="300" height="200" src={grupo.imagem} />
                      <Typography gutterBottom variant="h5" component="h2">
                        <Box fontWeight="fontWeightBold" m={1}>
                          {grupo.nomeGrupo}
                        </Box>
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        <Box fontStyle="oblique" m={1}>
                          Descrição : {grupo.descricao}
                        </Box>
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        <Box fontStyle="oblique" m={1}>
                          Integrantes : {grupo.integrantes}
                        </Box>
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button onClick={handleToggle}>
                        Criar
                    </Button>
                      <Button onClick={handleToggle}>
                        Editar
                    </Button>
                      <Button onClick={handleToggle}>
                        Deletar
                    </Button>
                      <Button onClick={handleToggle}>
                        Lista de Desejo
                    </Button>
                    </CardActions>
                  </Card>
                </Card>
              </Grid>

            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}