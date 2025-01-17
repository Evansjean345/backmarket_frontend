// ArticleForm.js
import { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CircularProgress from '@mui/material/CircularProgress';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import { FileUploader } from 'react-drag-drop-files';
import { ArticleContext } from '../../contexts/ArticleContext';
// import categories from '../data/categories';
import { CategoryContext } from '../../contexts/CategoryContext';

const ArticleForm = ({ article = {}, onSuccess, shopId }) => {
  const { categories } = useContext(CategoryContext);
  const { register, watch, reset, setValue, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: article.name || "",
      price: article.price || "",
      category: article.category || "",
      subCategory: article.subCategory || "",
      description: article.description || "",
      stock: article.stock || "",
      shop: shopId || "",
      discount: {
        applyDiscount: article.applyDiscount || false,
        percentDiscount: article.percentDiscount || 0,
        newPrice: article.newPrice || 0,
      }
    }
  });



  const [loading, setLoading] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: '' });
  const { createArticle } = useContext(ArticleContext);
  const [discount, setDiscount] = useState(0);


  useEffect(() => {
    setValue('shop', shopId);
  }, [setValue, shopId]);

  const handleOpen = (article) => {
    setSelectedArticle(article);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedArticle(null);
  };

  const fileTypes = ["JPG", "PNG", "JPEG"];

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      const config = {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      };

      await createArticle(data, config);

      setLoading(false);
      reset();
      setImages([]);
      setImagePreviews([]);
      setUploadProgress(0);
      setAlert({ open: true, message: 'Article sauvegardé avec succès!', severity: 'success' });
      handleClose();
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      setLoading(false);
      setAlert({ open: true, message: 'Erreur lors de la sauvegarde de l\'article.', severity: 'error' });
      console.error('Erreur lors de la sauvegarde de l\'article:', error);
    }
  };

  // const handleChangeFile = (fileList) => {
  //   const files = Array.from(fileList);
  //   setImages(files);
  //   const previews = files.map(file => URL.createObjectURL(file));
  //   setImagePreviews(previews);
  //   setValue('imageUrls', files);
  // };
  const handleChangeFile = (fileList) => {
    const newFiles = Array.from(fileList);

    // Concaténer les nouvelles images avec celles déjà présentes
    setImages(prevImages => [...prevImages, ...newFiles]);

    // Concaténer les nouveaux aperçus avec ceux déjà présents
    const newPreviews = newFiles.map(file => URL.createObjectURL(file));
    setImagePreviews(prevPreviews => [...prevPreviews, ...newPreviews]);

    // Ici vous pouvez définir les valeurs du formulaire si nécessaire
    setValue('imageUrls', [...images, ...newFiles]); // Optionnel, selon la structure de votre formulaire
  };

  // Watch values from the form
  const applyDiscount = watch('discount.applyDiscount');
  const price = watch('price');
  const category = watch('category');
  const percentDiscount = watch('discount.percentDiscount');

  // Calculate new price based on discount
  const calculateDiscountedPrice = (price, discount) => {
    if (!price || !discount) return 0;
    const reduction = (price * discount) / 100;
    const newPrice = price - reduction;
    setValue('discount.newPrice', newPrice); // Set the new price in the form state
    return newPrice;
  };

  useEffect(() => {
    // Update the new price when the discount changes
    if (applyDiscount && percentDiscount > 0) {
      calculateDiscountedPrice(price, percentDiscount);
    }
  }, [applyDiscount, percentDiscount, price, setValue]);


  return (
    <>
      <button type="button" className="bg-orange-400 hover:bg-orange-300 rounded-lg text-white px-4 py-2 mb-3 " onClick={handleOpen}>
        Ajouter un article
      </button>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Ajouter un nouvel article</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)} className="p-4 mb-4">
            {/* Nom de l'article */}
            <div className="mb-4">
              <label className="block text-primary-marineBlue font-semibold mb-2">Nom de l'article</label>
              <input
                {...register('name', { required: true })}
                type="text"
                placeholder="Nom de l'article"
                className={`w-full border rounded p-3 ${errors.name ? "border-red-500" : ""}`}
              />
              {errors.name && <p className="text-red-500">Ce champ est requis</p>}
            </div>

            {/* Description de l'article */}
            <div className="mb-4">
              <label className="block text-primary-marineBlue font-semibold mb-2">Description de l'article</label>
              <input
                {...register('description', { required: true })}
                type="text"
                placeholder="Description de l'article"
                className={`w-full border rounded p-3 ${errors.description ? "border-red-500" : ""}`}
              />
              {errors.description && <p className="text-red-500">Ce champ est requis</p>}
            </div>

            {/* Catégorie */}
            <div className="mb-4">
              <label className="block text-primary-marineBlue font-semibold mb-2">Catégorie</label>
              <select
                {...register('category', { required: true })}
                className={`w-full border rounded p-3 ${errors.category ? "border-red-500" : ""}`}
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map(category => (
                  <option key={category._id} value={category.category}>
                    {category.category}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-red-500">Ce champ est requis</p>}
            </div>

            {/* Sous Catégorie */}
            <div className="mb-4">
              <label className="block text-primary-marineBlue font-semibold mb-2">Sous Catégorie</label>
              <select
                {...register('subCategory', { required: true })}
                className={`w-full border rounded p-3 ${errors.subCategory ? "border-red-500" : ""}`}
              >
                <option value="">Sélectionner une sous catégorie</option>
                {categories.filter(item => item.category === category).flatMap(item => item.subCategories).map(subCategory => (
                  <option key={subCategory} value={subCategory}>
                    {subCategory}
                  </option>
                ))}
              </select>
              {errors.subCategory && <p className="text-red-500">Ce champ est requis</p>}
            </div>

            {/* Prix */}
            <div className="mb-4">
              <label className="block text-primary-marineBlue font-semibold mb-2">Prix</label>
              <input
                {...register('price', { required: true })}
                type="number"
                placeholder="Prix de l'article"
                className={`w-full border rounded p-3 ${errors.price ? "border-red-500" : ""}`}
              />
              {errors.price && <p className="text-red-500">Ce champ est requis</p>}
            </div>

            {/* Appliquer une réduction */}
            <div className="mb-4 flex items-center gap-2">
              <label className="text-primary-marineBlue font-semibold">Appliquer une réduction</label>
              <input
                type="checkbox"
                {...register('discount.applyDiscount')}
              />
            </div>

            {/* Pourcentage de réduction */}
            {applyDiscount && (
              <div className="mb-4">
                <label className="block text-primary-marineBlue font-semibold mb-2">Pourcentage de réduction</label>
                <input
                  type="number"
                  {...register('discount.percentDiscount', { min: 1, max: 100 })}
                  className={`w-full border rounded p-3 ${errors.discount?.percentDiscount ? "border-red-500" : ""}`}
                  placeholder="Pourcentage de réduction"
                />
                {errors.discount?.percentDiscount && <p className="text-red-500">Ce champ est requis</p>}
              </div>
            )}

            {/* Prix après réduction */}
            {applyDiscount && percentDiscount > 0 && (
              <div className="mb-4">
                <label className="block text-primary-marineBlue font-semibold mb-2">Nouveau prix après réduction</label>
                <input
                  type="number"
                  {...register('discount.newPrice')}
                  value={calculateDiscountedPrice(price, percentDiscount)}
                  readOnly
                  className="w-full border rounded p-3 bg-gray-100"
                />
              </div>
            )}

            {/* Stock */}
            <div className="mb-4">
              <label className="block text-primary-marineBlue font-semibold mb-2">Stock</label>
              <input
                {...register('stock', { required: true })}
                type="number"
                placeholder="Stock de l'article"
                className={`w-full border rounded p-3 ${errors.stock ? "border-red-500" : ""}`}
              />
              {errors.stock && <p className="text-red-500">Ce champ est requis</p>}
            </div>

            {/* Images */}
            <div className="mb-4">
              <label className="block text-primary-marineBlue font-semibold mb-2">Ajouter des images</label>
              <FileUploader
                handleChange={handleChangeFile}
                name="images"
                types={fileTypes}
                multiple
              />
              <div className="mt-2 flex gap-4 flex-wrap">
                {imagePreviews.map((preview, index) => (
                  <img key={index} src={preview} alt="Preview" className="w-20 h-20 object-cover rounded" />
                ))}
              </div>
            </div>

            {/* Loading and Progress */}
            {loading && (
              <div className="mb-4">
                <CircularProgress />
                <LinearProgress variant="determinate" value={uploadProgress} className="mt-2" />
              </div>
            )}

            {/* Boutons */}
            <div className="flex justify-end gap-4 mt-8">
              <button type="button" className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleClose}>
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-orange-400 text-white px-4 py-2 rounded"
              >
                {article._id ? "Mettre à jour l'article" : "Ajouter l'article"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Snackbar Alerts */}
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ArticleForm;
