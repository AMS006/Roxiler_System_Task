export const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];
  
export const columns = [
    {
        accessorKey:'id',
        header: 'Id',
    },
    {
        accessorKey:'title',
        header: 'Title',
    },
    {
        accessorKey:'description',
        header:'Description',
        
    },
    {
        accessorKey:'price',
        header:'Price',
        
    },
    {
        accessorKey:'category',
        lable:"Category",
        cell: info => info.getValue()[0].toUpperCase() + info.getValue().slice(1)
    },
    {
        accessorKey:'sold',
        header:"Sold",
        cell: info => info.getValue() ? "Sold": "Not Sold"
    },
    {
        accessorKey:'image',
        header:"Image",
        cell: info => <img src={info.getValue()} alt="Item" className="w-16 h-auto"></img>
    }
];