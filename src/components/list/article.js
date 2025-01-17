import { useState, useContext, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import { Avatar, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress, FormControlLabel, Checkbox, useMediaQuery } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { FileUploader } from 'react-drag-drop-files';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';
import { ArticleContext } from '../../contexts/ArticleContext';

const Article = ({ article = {}, onSuccess, shopId }) => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const { articles, fetchArticlesByShop, articlesByShop, updateArticle, deleteArticle } = useContext(ArticleContext);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);

  console.log('page', currentPage);

  // useEffect(() => {
  //   if (shopId) {
  //     fetchArticlesByShop(shopId);
  //   }
  // }, [shopId, fetchArticlesByShop,articlesByShop]);


  useEffect(() => {
    const uniqueCategories = [...new Set(articlesByShop.map(article => article.category))];
    setCategories(uniqueCategories);
  }, [articlesByShop]);

  const handleOpen = (article) => {
    setSelectedArticle(article);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedArticle(null);
  };


  // Watch values from the form
  const applyDiscount = selectedArticle?.discount?.applyDiscount;
  const price = selectedArticle?.price;
  const percentDiscount = selectedArticle?.discount?.percentDiscount;

  // Calculate new price based on discount
  const calculateDiscountedPrice = (price, discount) => {
    if (!price || !discount) return 0;
    const reduction = (price * discount) / 100;
    const newPrice = price - reduction;
    setSelectedArticle(
      { ...selectedArticle, discount: { ...selectedArticle?.discount, newPrice: newPrice } }
    );  // Set the new price in the form state
    return newPrice;
  };

  useEffect(() => {
    // Update the new price when the discount changes
    if (applyDiscount && percentDiscount > 0) {
      calculateDiscountedPrice(price, percentDiscount);
    }
  }, [applyDiscount, percentDiscount, price,]);

  const handleUpdate = async () => {
    setLoading(true);
    updateArticle(selectedArticle?._id, selectedArticle);
    setAlert({ open: true, message: 'Article mis à jour avec succès', severity: 'success' });
    setOpen(false);
    setLoading(false);
  };

  const handleCategoryChange = (category) => {
    setCurrentPage(1);
    if (category === 'Tous') {
      setCurrentArticles(articlesByShop.slice(indexOfFirstArticle, indexOfLastArticle));
    } else {
      setCurrentArticles(articlesByShop.filter(article => article.category === category).slice(indexOfFirstArticle, indexOfLastArticle));
    }
    // setCurrentArticles(articlesByShop.filter(article => article.category === category).slice(indexOfFirstArticle, indexOfLastArticle));
  };

  // Utilisation de useMediaQuery pour gérer la réactivité
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const isMediumScreen = useMediaQuery('(min-width: 601px) and (max-width: 1024px)');
  const isLargeScreen = useMediaQuery('(mix-width: 1025px)');


  // Déterminer le nombre d'articles par page en fonction de la taille de l'écran
  const articlesPerPage = isSmallScreen ? 2 : isMediumScreen ? 2 : isLargeScreen ? 4 : 5;


  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const [currentArticles, setCurrentArticles] = useState(articlesByShop.slice(indexOfFirstArticle, indexOfLastArticle));

  useEffect(() => {
    setCurrentArticles(articlesByShop.slice(indexOfFirstArticle, indexOfLastArticle));
  }, [articlesByShop, currentPage, articlesPerPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleDelete = async (articleId) => {
    setLoading(true);
    await deleteArticle(articleId);
    setLoading(false);
    fetchArticlesByShop(shopId);
    setCurrentArticles(articlesByShop.filter(article => article._id !== articleId));
    setCurrentArticles(articlesByShop.slice(indexOfFirstArticle, indexOfLastArticle));
    setAlert({ open: true, message: 'Article supprimé avec succès', severity: 'success' });
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };
  return (
    <>
      {/* Category Filter */}

      {/* Liste des articles */}
      {articlesByShop.length === 0 ? (
        <div className='text-3xl font-bold text-orange-400 text-center py-14 '>Aucun article ajouter.</div>
      ) : (
        <>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Catégories</h2>
            <div className="flex gap-4">
              <Button
                variant="outlined"
                onClick={() => handleCategoryChange('Tous')}
              >
                Tous
              </Button>
              {categories.map(category => (
                <Button
                  key={category}
                  variant="outlined"
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <section className="">
            <div className=" max-w-7xl ">
              <h4 className="font-manrope font-bold text-lg  text-black mb-8 ">
                Liste des articles
              </h4>
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                {currentArticles.map(article => (
                  <div className="relative m-2 flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md  w-full "> {/* Taille fixée à 200px */}
                    <div className="relative mx-3 mt-3 flex h-40 overflow-hidden rounded-xl"> 
                      <img
                        src={article?.imageUrls[0]}
                        alt={article?.name}
                        className="w-full h-full rounded-xl object-cover"
                      />
                      {article.discount.applyDiscount ? (
                        <span className="py-1 px-2 cursor-pointer rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 font-medium text-base text-white absolute top-3 right-3 z-10">
                          {article.discount.percentDiscount}%
                        </span>
                      ) : ("")}
                    </div>
                    <div className="mt-5 flex items-center justify-between p-3">
                      <div>
                        <h6 className="text-xs tracking-tight text-slate-900">
                          {article?.name}
                        </h6>
                        <h6 className="font-semibold text-sm leading-8 text-indigo-600">
                          {article.discount.applyDiscount ? article.discount.newPrice : article.price} FCFA
                        </h6>
                      </div>
                      <Avatar sx={{ padding: '2px', width: '24px', height: '24px', cursor: 'pointer' }} onClick={() => handleOpen(article)}>
                        <HiOutlinePencilAlt />
                      </Avatar>
                      <Avatar sx={{ width: '24px', height: '24px', cursor: 'pointer' }} onClick={() => handleDelete(article?._id)}>
                        <MdDelete />
                      </Avatar>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <Pagination
              count={Math.ceil(articlesByShop.length / articlesPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
              shape="rounded"
            />
          </div>
        </>
      )

      }


      {/* Dialog for editing article */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Modifier l'article</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="normal" label="Nom" value={selectedArticle?.name || ''} onChange={(e) => setSelectedArticle({ ...selectedArticle, name: e.target.value })} />
          <TextField fullWidth margin="normal" label="Description" value={selectedArticle?.description || ''} onChange={(e) => setSelectedArticle({ ...selectedArticle, description: e.target.value })} />
          <TextField fullWidth margin="normal" label="Prix" value={selectedArticle?.price || ''} onChange={(e) => setSelectedArticle({ ...selectedArticle, price: e.target.value })} />
          <FormControlLabel label="Appliquer une réduction" control={<Checkbox checked={selectedArticle?.discount?.applyDiscount || false} onChange={(e) => setSelectedArticle({ ...selectedArticle, discount: { ...selectedArticle?.discount, applyDiscount: e.target.checked } })} />} />
          {selectedArticle?.discount?.applyDiscount && (
            <>
              <TextField fullWidth margin="normal" label="Pourcentage de réduction" value={selectedArticle?.discount?.percentDiscount} onChange={(e) => setSelectedArticle({ ...selectedArticle, discount: { ...selectedArticle?.discount, percentDiscount: e.target.value } })} />
              <TextField fullWidth margin="normal" label="Nouveau prix après réduction" value={selectedArticle?.discount?.newPrice || ''} aria-readonly />
            </>
          )}
          <TextField fullWidth margin="normal" label="Stock" value={selectedArticle?.stock || ''} onChange={(e) => setSelectedArticle({ ...selectedArticle, stock: e.target.value })} />
          <div className="mb-4">
            <label className="block text-primary-marineBlue font-semibold mb-2">Ajouter des images</label>
            <FileUploader handleChange={(fileList) => setSelectedArticle({ ...selectedArticle, imageUrls: fileList })} name="images" types={["JPG", "PNG", "GIF"]} multiple />
          </div>
          <Button variant="contained" color="primary" className="mt-4" onClick={() => handleUpdate()}>{loading ? <CircularProgress size={24} color="inherit" /> : 'Sauvegarder'}</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Fermer</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar open={alert.open} autoHideDuration={6000} onClose={() => setAlert({ ...alert, open: false })}>
        <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Article;
