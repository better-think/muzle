import React from 'react';
import AdminLayout from '@/Components/AdminLayout';
import CreateDialog from '@/Components/Page/Admin/Tenant/CreateDialog';
import EditDialog from '@/Components/Page/Admin/Tenant/EditDialog';
import { usePage } from '@inertiajs/inertia-react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from '@material-ui/core';
import { AiFillEdit } from 'react-icons/ai';

const Index = () => {
  const { tenants } = usePage().props;
  const [data, setData] = React.useState([]);
  const [createForm, setCreateForm] = React.useState(false);
  const [editForm, setEditForm] = React.useState({
    open: false,
    tenant: null
  });

  React.useEffect(() => {
    setData(tenants);
  }, []);

  return (
    <AdminLayout title="Tenants">
      <div className="space-y-4">

        <Button color="default" variant="contained" onClick={() => setCreateForm(true)}>
          New Tenant
        </Button>

        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Code</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(tenant =>
                <TableRow key={tenant.id}>
                  <TableCell>
                    {tenant.name}
                  </TableCell>
                  <TableCell>
                    {tenant.code}
                  </TableCell>
                  <TableCell width={50}>
                    <IconButton onClick={() => setEditForm({ open: true, tenant })}>
                      <AiFillEdit />
                    </IconButton>
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

        <EditDialog
          tenant={editForm.tenant}
          data={data}
          setData={setData}
          open={editForm.open}
          onClose={() => setEditForm({ open: false })}
        />

      </div>
    </AdminLayout>
  );
};


export default Index;
