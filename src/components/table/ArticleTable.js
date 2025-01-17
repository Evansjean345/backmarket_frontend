import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { MaterialReactTable } from 'material-react-table';
import { Button, Avatar, CircularProgress, Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { HiOutlinePencilAlt } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { deleteArticleUrl, getArticleUrl, updateArticleUrl } from '../../url';

const ArticleTable = ({shopId}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(getArticleUrl);
        setArticles(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${deleteArticleUrl}/${id}`);
      setArticles(articles.filter((article) => article._id !== id));
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  const handleOpen = (article) => {
    setSelectedArticle(article);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedArticle(null);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${updateArticleUrl}/${selectedArticle._id}`, selectedArticle);
      setArticles(articles.map((article) => (article._id === selectedArticle._id ? selectedArticle : article)));
      handleClose();
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

  const columns = useMemo(() => [
    {
      accessorKey: 'name',
      header: 'Designation',
      size: 120,
    },
    {
      accessorKey: 'type',
      header: 'Type',
      size: 120,
    },
    {
      accessorKey: 'pricePerKilo',
      header: 'Prix par kilo',
      size: 100,
    },
    {
      header: 'Actions',
      size: 100,
      Cell: ({ row }) => (
        <Box sx={{ display: 'flex', columnGap: 3 }}>
          <Avatar sx={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => handleOpen(row.original)}>
            <HiOutlinePencilAlt />
          </Avatar>
          <Avatar sx={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => handleDelete(row.original._id)}>
            <MdDelete />
          </Avatar>
        </Box>
      ),
    },
  ], [articles]);
  const types = ["agneau", "volaille", "arrière de bœuf", "avant de bœuf"];
  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      {types.map((type) => (
        <div key={type}>
          <h2 className="text-2xl font-bold mb-4">{`Articles - ${type}`}</h2>
          <Box>
            <MaterialReactTable
              columns={columns.map((column) => ({
                ...column,
                
                muiTableBodyCellProps: {
                  sx: {
                    backgroundColor: '#fd8c3063', // Appliquer une couleur de fond aux cellules du corps
                  },
                },
                muiTableHeadCellProps: {
                  sx: {
                    backgroundColor: '#ff7d13bc', // Appliquer une couleur de fond aux en-têtes de colonnes
                    color: 'white', // Changer la couleur du texte pour une meilleure lisibilité
                  },
                },
              }))}
              muiTableProps={{
                sx: {
                  tableLayout: 'fixed',
                },
              }}
              data={articles.filter((article) => article.type === type)} // Filtrer les articles par type
              initialState={{ pagination: { pageSize: 5 } }}
              enableRowSelection={false}
              enablePagination
              className="bg-teal-700"
            />
          </Box>

        </div>
      ))}

      {/* Dialog for editing article */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Modifier l'article</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Nom"
              value={selectedArticle?.name || ''}
              onChange={(e) => setSelectedArticle({ ...selectedArticle, name: e.target.value })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Prix par kilo"
              type="number"
              value={selectedArticle?.pricePerKilo || ''}
              onChange={(e) => setSelectedArticle({ ...selectedArticle, pricePerKilo: e.target.value })}
            />
            <Button variant="contained" color="primary" onClick={handleUpdate} className="mt-4">
              Mettre à jour
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ArticleTable;
