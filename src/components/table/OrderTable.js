import { useState, useEffect, useMemo } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { MaterialReactTable } from 'material-react-table';
import { Button, Avatar, CircularProgress, Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Alert, Snackbar } from '@mui/material';
import { HiOutlinePencilAlt, } from "react-icons/hi";
import { useOrder } from '../../contexts/OrderContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


// Styles for the modal

const OrderTable = ({ shopId }) => {

  const { orders, shopOrders, updateOrderStatus, loading, loadingFetch, fetchOrders } = useOrder();
  const [title, setTitle] = useState('Commandes');
  // const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: '' });

  const customIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  // if(loadingFetch){
  //   fetchOrders();
  // }

  useEffect(() => {
    if (shopId) {
      fetchOrders();
    }
  }, [shopId, fetchOrders]);

  console.log("Orders table", orders);
  // handleFetchOredresByShop();

  // console.log(ordersByShop);

  const filtredOrders = useMemo(() => {
    if (!orders || orders.length === 0) return [];
  
    // First find all orders that have shopOrders containing our shopId
    const relevantOrders = orders.filter(order => 
      order.shopOrders.some(shopOrder => shopOrder.shopId === shopId)
    );
  
    // Map these orders to the format we need while preserving the original order ID
    return relevantOrders.map(order => {
      const shopOrder = order.shopOrders.find(so => so.shopId === shopId);
      return {
        _id: order._id, // Keep the main order ID
        customer: order.customer,
        items: shopOrder.items,
        total: shopOrder.total,
        status: order.status,
        createdAt: order.createdAt,
        deliveryLocation: order.deliveryLocation,
        shopId: shopOrder.shopId
      };
    });
  }, [orders, shopId]);
  
  



  console.log("filtredOrders", filtredOrders);
  console.log("selected order", selectedOrder);
  const handleOpen = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  // Table columns definition
  const columns = useMemo(() => [
    {
      accessorKey: 'customer.name',
      header: 'Nom du client',
      size: 120,
    },
    {
      accessorKey: 'customer.phone',
      header: 'Numéro du client',
      size: 120,
    },
    {
      accessorKey: 'items', // Use 'items' as the key for the articles
      header: 'Articles',
      size: 120,
      Cell: ({ cell }) => (
        <>
          {cell.getValue().map((item) => (
            <p key={item?._id}>
              {item?.itemId?.name} x {item?.quantity}
            </p>
          ))}
        </>
      ),
    },
    {
      accessorKey: 'total',
      header: 'Prix total',
      size: 100,
      Cell: ({ cell }) => `${cell.getValue()} FCFA`,
    },
    {
      accessorKey: 'status',
      header: 'Statut',
      size: 100,
      Cell: ({ cell }) => renderStatus(cell.getValue()),
    },
    {
      accessorKey: 'createdAt',
      header: 'Date et heure',
      size: 100,
      Cell: ({ cell }) => formatDate(cell.getValue()),
    },
    {
      header: 'Actions',
      size: 100,
      Cell: ({ row }) => (
        <Box sx={{ display: 'flex', columnGap: 3 }}>
          <Avatar
            sx={{ width: '30px', height: '30px', cursor: 'pointer' }}
            onClick={() => handleOpen(row.original)}
          >
            <HiOutlinePencilAlt />
          </Avatar>
        </Box>
      ),
    },
  ], []);

  const handleUpdateStatus = () => {
    if (selectedOrder) {
      updateOrderStatus(selectedOrder._id, selectedOrder.status);
      setOpen(false);
      setSelectedOrder(null);
    }
  }
  console.log("selectedOrder", selectedOrder);
  // Articles are now rendered as part of the items inside each row

  const articles = filtredOrders?.flatMap(order => order?.items);
  console.log("articles", articles);


  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };
  const renderStatus = (status) => {
    let color = '';
    let label = '';

    switch (status) {
      case 'new':
        color = 'info.main';
        label = 'Nouvelle commande';
        break;
      case 'pending':
        color = 'text.secondary';
        label = 'Commande en attente';
        break;
      case 'processing':
        color = 'warning.main';
        label = 'Commande en cours de traitement';
        break;
      case 'completed':
        color = 'secondary.main';
        label = 'Commande envoyé';
        break;
      case 'canceled':
        color = 'error.main';
        label = 'Commande Annuler';
        break;
      default:
        color = 'text.secondary';
        label = 'Inconnu';
    }

    return (
      <Box
        sx={{
          backgroundColor: color,
          color: '#fff',
          px: 2,
          py: 0.5,
          borderRadius: '4px',
          textAlign: 'center',
        }}
      >
        {label}
      </Box>
    );
  };
  // console.log(ordersByShop)
  return (
    <div>

      {
        filtredOrders?.length < 1 ? (
          <p className="text-3xl font-bold text-orange-400 text-center py-14">Aucune commandes dans cette catégorie pour l'instant</p>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Liste des {title}</h2>
            <Box>
              <MaterialReactTable
                columns={columns.map((column) => ({
                  ...column,

                  muiTableBodyCellProps: {
                    sx: {
                      backgroundColor: 'rgba(0, 128, 128, 0.1)', // Appliquer une couleur de fond aux cellules du corps
                    },
                  },
                  muiTableHeadCellProps: {
                    sx: {
                      backgroundColor: 'teal', // Appliquer une couleur de fond aux en-têtes de colonnes
                      color: 'white', // Changer la couleur du texte pour une meilleure lisibilité
                    },
                  },
                }))}
                data={filtredOrders} // Filtrer les articles par url
                enableRowSelection={false}
                enablePagination
                muiTableProps={{
                  sx: {
                    tableLayout: 'fixed',
                  },
                }}
              />
            </Box>
          </>

        )
      }

      {/* Modal pour afficher les détails de la commande et mettre à jour le statut */}
      {selectedOrder && (
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="md"
          fullWidth
          className='bg-teal-300'
          sx={{
            backgroundColor: 'rgba(0, 128, 128, 0.1)', // Appliquer une couleur de fond aux cellules du corps
          }}

        >
          <DialogTitle
            sx={{
              backgroundColor: 'rgba(0, 128, 128,0.8)', // Appliquer une couleur de fond aux cellules du corps
            }}
            variant='h4'>Information de la commande</DialogTitle>
          <DialogContent
            sx={{
              backgroundColor: 'rgba(0, 128, 128, 0.1)', // Appliquer une couleur de fond aux cellules du corps
            }}>
            <Box
              sx={{ display: "flex", justifyContent: 'space-between',flexWrap: 'wrap', gap: '1rem' }}
            >

              <Box className='shadow-sm p-2 rounded ' sx={{ width: { xs: '100%', md: '30%' } }}>
                <p className='text-lg text-teal-700 mb-2'>Détails du client</p>
                <p className='mb-2'><b className=' text-emerald-600'>Nom du client</b> : {selectedOrder?.customer?.name}</p>
                <p className='mb-2'><b className=' text-emerald-600'>Numéro du client</b>: {selectedOrder?.customer?.phone}</p>
                <p className='mb-2'><b className=' text-emerald-600'>Email du client</b>: {selectedOrder?.customer?.email}</p>
              </Box>
              <Box className='shadow-sm p-2 rounded ' sx={{ width: { xs: '100%', md: '30%' } }}>
                <p className='text-lg text-teal-700 mb-2'>Détails de la commande</p>
                <p className='mb-2'><b className=' text-emerald-600'>ID</b>: {selectedOrder?._id}</p>
                <p className='mb-2'><b className=' text-emerald-600'>Date et heure de la commande</b> : {formatDate(selectedOrder?.createdAt)}</p>
                <p className='mb-2'><b className=' text-emerald-600'>Articles commander</b> :</p>
                {selectedOrder?.items.map((item) => (
                  <p className='' key={item?.itemId?._id}>
                    {item?.itemId?.name} - {item?.itemId?.price} FCFA x {item?.quantity}
                  </p>
                ))}
              </Box>
              <Box className='shadow-sm p-2 rounded ' sx={{ width: { xs: '100%', md: '30%' } }}>
                <p className='text-lg text-teal-700 mb-2'>Détails de la livraison</p>
                {selectedOrder?.deliveryLocation && (
                  <div style={{ height: '200px', width: '100%', marginTop: '10px' }}>
                    <MapContainer
                      center={[selectedOrder.deliveryLocation.lat, selectedOrder.deliveryLocation.lng]}
                      zoom={13}
                      style={{ height: '100%', width: '100%' }}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker
                        position={[selectedOrder.deliveryLocation.lat, selectedOrder.deliveryLocation.lng]}
                        icon={customIcon}
                      >
                        <Popup>
                          {selectedOrder.deliveryLocation.label || 'Point de livraison'}
                        </Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                )}
                
              </Box>
            </Box>


            <p className='text-xl text-red-600 my-3'>Coût total: {selectedOrder?.total} FCFA</p>
            <TextField
              select
              label="Statut de la commande"
              value={selectedOrder?.status}
              onChange={(e) => setSelectedOrder({ ...selectedOrder, status: e.target.value })}
              fullWidth
              margin="normal"
            >
              <MenuItem value="pending">En attente</MenuItem>
              <MenuItem value="processing">Confirmer</MenuItem>
              <MenuItem value="completed">Envoyé</MenuItem>
              <MenuItem value="canceled">Annulée</MenuItem>
            </TextField>
            <Button variant="contained" color="primary" className="mt-4" onClick={() => handleUpdateStatus()} >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Mettre à jour le statut'}
            </Button>
          </DialogContent>
          <DialogActions
            sx={{
              backgroundColor: 'rgba(0, 128, 128,0.8)', // Appliquer une couleur de fond aux cellules du corps
            }}
          >
            <Button onClick={handleClose} color="secondary">
              Fermer
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={alert.open} autoHideDuration={6000} onClose={() => setAlert({ ...alert, open: false })}>
        <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </div>


  );
};

export default OrderTable;
