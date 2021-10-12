import React from 'react';
import AdminLayout from '@/Components/AdminLayout';
import CreateDialog from '@/Components/Page/Admin/Category/CreateDialog';
import { usePage } from '@inertiajs/inertia-react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from '@material-ui/core';

const Index = () => {

  const { categories } = usePage().props;
  const [data, setData] = React.useState([]);
  const [createForm, setCreateForm] = React.useState(false);

  React.useEffect(() => {
    setData(categories);
  }, []);

  return (
    <AdminLayout title="Category">
      <div className="space-y-4">

        <Button color="default" variant="contained" onClick={() => setCreateForm(true)}>
          New Category
        </Button>

        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(category =>
                <TableRow key={category.id}>
                  <TableCell>
                    <img className="w-12" src={`/storage/${category.src}`} alt="" />
                  </TableCell>
                  <TableCell>
                    {category.name}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <CreateDialog
          data={data}
          setData={setData}
          open={createForm}
          onClose={() => setCreateForm(false)}
        />

      </div>
    </AdminLayout>
  );
};


export default Index;
