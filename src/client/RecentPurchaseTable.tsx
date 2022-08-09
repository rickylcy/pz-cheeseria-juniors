import * as React from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

// Column format
interface Column {
  id: "id" | "items" | "total";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

// Column styles
const columns: readonly Column[] = [
  { id: "id", label: "id", minWidth: 50 },
  { id: "items", label: "items", minWidth: 180 },
  {
    id: "total",
    label: "total",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
];

// Table fields
interface Data {
  id: number;
  items: string;
  total: number;
}

function createData(id: number, items: string, total: number): Data {
  return { id, items, total };
}

type Props = {
  recentPurchases: any;
};

const RecentPurchaseTable: React.FC<Props> = ({ recentPurchases }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState<Data[]>([]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Format the data from db for table use
  const generateData = (recentPurchases: any) => {
    recentPurchases?.forEach((purchase: any) => {
      const data = createData(purchase.id, purchase.items, purchase.total);
      setRows((rows) => [...rows, data]);
    });
  };

  // Fetch purchase record from database
  React.useEffect(() => {
    generateData(recentPurchases);
  }, []);

  return (
    <Paper>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default RecentPurchaseTable;
