import React, { useContext, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { CartContext } from '../../contexts/CartContext';  // Import du contexte
import { Link } from 'react-router-dom';
import { FiTrash } from "react-icons/fi";
import { useOrder } from '../../contexts/OrderContext';
import { UserContext } from '../../contexts/UserContext';
import MapComponent from './Map'; // Importez votre composant de carte

const Cart = ({ setOpenRegister }) => {

  const { cart, canceledCart, delivery, setDelivery, calculateTotal, updateCartItemQuantity, removeFromCart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const { createOrder, loading } = useOrder();
  const [open, setOpen] = useState(false);

  const [alert, setAlert] = useState({ open: false, message: '', severity: '' });

  // Gestion du changement des informations du client
  // const handleCustomerInfoChange = (e) => {
  //   const { name, value } = e.target;
  //   setCustomerInfo((prevInfo) => ({
  //     ...prevInfo,
  //     [name]: value
  //   }));
  // };
  const [deliveryLocation, setDeliveryLocation] = useState(null); // État pour stocker la localisation

  const handleLocationSelect = (latlng) => {
    console.log("Raw location data:", latlng);
    setDeliveryLocation(latlng);
    console.log("Updated deliveryLocation:", deliveryLocation);
  };

  const handleIncrease = (index) => {
    const currentItem = cart[index];
    updateCartItemQuantity(index, currentItem.quantity + 1); // Augmenter la quantité
  };

  const handleDecrease = (index) => {
    const currentItem = cart[index];
    if (currentItem.quantity > 1) {
      updateCartItemQuantity(index, currentItem.quantity - 1); // Diminuer la quantité
    }
  };

  const handleQuantityChange = (index, value) => {
    const quantity = parseInt(value, 10);
    if (!isNaN(quantity) && quantity >= 1) {
      updateCartItemQuantity(index, quantity); // Mettre à jour la quantité via le contexte
    }
  };
  console.log(cart);
  console.log("delivary location ",deliveryLocation);

  const handleSubmit = async () => {
    try {
      const items = cart.map((item) => ({
        itemId: item._id,
        quantity: item.quantity,
      }));

      const customer = user.id;

      console.log("cart order's items", items, customer, deliveryLocation);

      await createOrder(items, customer, deliveryLocation);

      setAlert({
        open: true,
        message: 'Commande créée avec succès',
        severity: 'success',
      });

      canceledCart();
    } catch (error) {
      setAlert({
        open: true,
        message: 'Une erreur est survenue lors de la création de la commande',
        severity: 'error',
      });
    }
  };

  return (
    <>
      <div className="bg-neutral-50 py-12  ">
        <div className="container mx-auto my-12">
          <div className="flex flex-col gap-6 md:flex-row">
            {cart.length === 0 ? (
              <p className='flex-1 shrink-0 rounded-lg border-neutral-200  bg-white px-4 py-8 shadow-lg'>Votre panier est vide</p>
            ) : (
              <div className="flex-1 shrink-0 max-h-screen overflow-auto rounded-lg shadow-lg border-neutral-200 bg-white px-4 py-8 ">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold">Vous avez {cart?.length} articles dans votre panier</h3>
                  <p>Bienvenue sur la page récapitulative de votre panier</p>
                </div>
                {cart.map((item, index) => (
                  <div className="rounded-3xl border-2 border-gray-200 p-4 lg:p-4 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4 ">
                    <div className="col-span-12 lg:col-span-2 img box">
                      <img
                        src={item?.imageUrls[0]}
                        alt={item?.name}
                        className="max-lg:w-full lg:w-[180px] h-[150px] rounded-lg object-cover"
                      />
                    </div>
                    <div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
                      <div className="flex items-center justify-between w-full mb-4">
                        <h5 className="font-manrope font-bold text-xl leading-9 text-gray-900">
                          {item?.name}
                        </h5>
                        <button onClick={() => removeFromCart(index)} className="bg-red-200 p-2 rounded-full group flex items-center justify-center focus-within:outline-red-500 fill-red-50 transition-all duration-500 group-hover:fill-red-400 hover:bg-red-500">
                          <FiTrash className='text-white' />
                        </button>
                      </div>
                      <p className="font-normal line-clamp-1 text-base leading-7 text-gray-500 mb-1">
                        {item?.subCategory}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <button onClick={() => handleDecrease(index)} className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300">
                            <svg
                              className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                              width={18}
                              height={19}
                              viewBox="0 0 18 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.5 9.5H13.5"
                                stroke=""
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                          <input
                            type="text"
                            id="number"
                            value={item?.quantity}
                            onChange={(e) => handleQuantityChange(index, e.target.value)}
                            className="border border-gray-200 rounded-full w-10 aspect-square outline-none text-gray-900 font-semibold text-sm py-1.5 px-3 bg-gray-100  text-center"

                          />
                          <button onClick={() => handleIncrease(index)} className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300">
                            <svg
                              className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                              width={18}
                              height={19}
                              viewBox="0 0 18 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M3.75 9.5H14.25M9 14.75V4.25"
                                stroke=""
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                        <div>
                          {item?.discount?.applyDiscount ? (
                            <>
                              <h6 className="text-indigo-600 font-manrope font-bold text-sm leading-9 text-right">
                                {item?.discount?.newPrice}FCFA x {item?.quantity}
                              </h6>
                              <h6 className="text-gray-600 font-manrope line-through font-bold text-sm leading-9 text-right">
                                {item?.price} FCFA
                              </h6>
                              <p className="text-xs font-bold font-manrope text-emerald-600">
                                TOTAL : {item?.discount?.newPrice * item?.quantity} FCFA
                              </p>
                            </>
                          ) : (
                            <>
                              <h6 className="text-indigo-600 font-manrope font-bold text-xl leading-9 text-right">
                                {item?.price}FCFA x {item?.quantity}
                              </h6>
                              <p className="text-xs font-bold font-manrope leading-9 text-emerald-600">
                                TOTAL : {item?.price * item?.quantity} FCFA
                              </p>
                            </>
                          )

                          }
                        </div>


                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="sticky space-y-4 rounded-lg shadow-lg  border-neutral-200 bg-white py-6 px-4 sm:px-6 md:w-1/3">
              <h4 className="text-2xl font-bold">Résumé</h4>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-base text-gray-900">
                  <p>Total articles</p>
                  <p>{calculateTotal()} FCFA</p>
                </div>
                <div className="flex justify-between text-base text-gray-900">
                  <p>Frais de livraison</p>
                  <p>{delivery ? delivery.cost + 'FCFA' : 'Calculé à la livraison'} </p>
                </div>
                <div>
                  <div className="my-2 w-full border-t border-gray-300" />
                  <div className="flex justify-between text-base font-bold text-gray-900">
                    <p>Total</p>
                    <p>{calculateTotal()} FCFA</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-400">Inclus TVA</p>
                </div>
                <div className="mt-4">
                <p>Lieu de la livraison</p>
                <MapComponent onLocationSelect={handleLocationSelect} />
                </div>
                <div className="mt-auto flex flex-col gap-2 pt-4">
                  <button
                    onClick={
                      user?.id ? handleSubmit : () => setOpenRegister(true)
                    }
                    className="flex items-center justify-center rounded-md border border-transparent bg-neutral-800 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-neutral-900"
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Valider la commande'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog fullWidth maxWidth="md" open={open} onClose={() => setOpen(false)} >
        <DialogTitle className="text-lg font-medium leading-6 text-gray-900">
          Loacalisation
        </DialogTitle>
        <DialogContent >

          <MapComponent className="h-[80%]" onLocationSelect={handleLocationSelect} />
          <div className="mt-4">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-100 px-4 "
            >
              <p>Valider</p>
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={alert.open} autoHideDuration={6000} onClose={() => setAlert({ ...alert, open: false })} >
        <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Cart;
