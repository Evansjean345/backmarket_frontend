import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
// import { USERS } from "../data";
import { useEffect, useMemo, useState } from "react";
import { Download, Search } from "lucide-react";
import DebouncedInput from "./DebouncedInput";
import { useOrder } from "../../contexts/OrderContext";
import { Avatar, Box } from "@mui/material";
import { HiOutlinePencilAlt } from "react-icons/hi";

const DataTable = ({ shopId }) => {

  const { orders, shopOrders, updateOrderStatus, loading, loadingFetch, fetchOrders } = useOrder();
  const [title, setTitle] = useState('Commandes');
  // const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: '' });

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

    // Step 1: Filter the shopOrders based on shopId
    const filtred = shopOrders.filter(item => item.shopId === shopId);

    // Step 2: Combine orders with the same createdAt and customer._id
    const combinedOrders = filtred.reduce((acc, order) => {
      const key = `${order?.createdAt}_${order?.customer?._id}`;

      if (!acc[key]) {
        // Use a deep copy to avoid mutating original objects
        acc[key] = {
          ...order,
          items: order.items ? [...order.items.map(item => ({ ...item }))] : []
        }; // Initialize the order in acc
      } else {
        acc[key].items = [...acc[key].items, ...order.items.map(item => ({ ...item }))]; // Combine items for the same order
      }

      return acc;
    }, {});

    // Convert the combined orders object back into an array
    return Object.values(combinedOrders);
  }, [orders, shopOrders, shopId]);



  // console.log("filtredOrders", filtredOrders);

  const handleOpen = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("customer.name", {
      header: "Nom du client",
    }),
    columnHelper.accessor("customer.phone", {
      header: "Numéro du client",
    }),
    columnHelper.accessor("items", {
      Cell: ({ cell }) => (
        <>
          {cell.getValue().map((item) => (
            <p key={item?._id}>
              {item?.itemId?.name} x {item?.quantity}
            </p>
          ))}
        </>
      ),
      header: "Articles",
    }),
    columnHelper.accessor("total", {
      Cell: ({ cell }) => `${cell.getValue()} FCFA`,
      header: "Prix total",
    }),
    columnHelper.accessor("status", {
      Cell: ({ cell }) => renderStatus(cell.getValue()),
      header: "Statut",
    }),
    columnHelper.accessor("createdAt", {
      Cell: ({ cell }) => formatDate(cell.getValue()),
      header: "Date et heure",
    }),
    columnHelper.accessor("", {
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
      header: "Actions",
    }),
    
  ];

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
      case "new":
        color = "bg-yellow-500";
        label = "Nouvelle commande";
        break;
      case "pending":
        color = "bg-gray-500";
        label = "Inconnu";
        break;
      case "processing":
        color = "bg-blue-500";
        label = "En cours";
        break;
      case "completed":
        color = "bg-green-500";
        label = "Complété";
        break;
      case "canceled":
        color = "bg-red-500";
        label = "Annulé";
        break;
      default:
        color = "bg-gray-500";
        label = "Inconnu";
        break;
    }
    return (
      <div className={`${color} text-white px-2 py-1 rounded-md`}>
        {label}
      </div>
    );
  }


    const [data] = useState(() => [...filtredOrders]);
    const [globalFilter, setGlobalFilter] = useState("");

    const table = useReactTable({
      data,
      columns,
      state: {
        globalFilter,
      },
      getFilteredRowModel: getFilteredRowModel(),
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    });

    return (
      <div className="p-2 max-w-5xl mx-auto text-white fill-gray-400">
        <div className="flex justify-between mb-2">
          <div className="w-full flex items-center gap-1">
            <Search />
            <DebouncedInput
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
              className="p-2 bg-transparent outline-none border-b-2 w-1/5 focus:w-1/3 duration-300 border-indigo-500"
              placeholder="Search all columns..."
            />
          </div>
          <Download data={data} fileName={"peoples"} />
        </div>
        <table className="border border-gray-700 w-full text-left">
          <thead className="bg-indigo-600">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="capitalize px-3.5 py-2">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  className={`
                ${i % 2 === 0 ? "bg-gray-900" : "bg-gray-800"}
                `}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-3.5 py-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="text-center h-32">
                <td colSpan={12}>No Recoard Found!</td>
              </tr>
            )}
          </tbody>
        </table>
        {/* pagination */}
        <div className="flex items-center justify-end mt-2 gap-2">
          <button
            onClick={() => {
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
            className="p-1 border border-gray-300 px-2 disabled:opacity-30"
          >
            {"<"}
          </button>
          <button
            onClick={() => {
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
            className="p-1 border border-gray-300 px-2 disabled:opacity-30"
          >
            {">"}
          </button>

          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            | Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border p-1 rounded w-16 bg-transparent"
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="p-2 bg-transparent"
          >
            {[10, 20, 30, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };

  export default DataTable;