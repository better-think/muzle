import React from 'react';
import AdminLayout from '@/Components/AdminLayout';
import CreateDialog from '@/Components/Page/Admin/User/CreateDialog';
import EditDialog from '@/Components/Page/Admin/User/EditDialog';
import { usePage } from '@inertiajs/inertia-react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from '@material-ui/core';
import { AiFillEdit } from 'react-icons/ai';

const Index = () => {
  const { users, tenants } = usePage().props;
  const [data, setData] = React.useState({
    users: [],
    tenants: []
  });
  const [createForm, setCreateForm] = React.useState(false);
  const [editForm, setEditForm] = React.useState({
    open: false,
    tenant: null
  });

  React.useEffect(() => {
    setData({
      users,
      tenants
    });
  }, []);

  return (
    <AdminLayout title="Users">
      <div className="space-y-4">

        <Button color="default" variant="contained" onClick={() => setCreateForm(true)}>
          Add User
        </Button>

        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Nickname</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Tenant</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.users.map(user =>
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.nickname}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.tenant.name}</TableCell>
                  <TableCell width={50}>
                    <IconButton onClick={() => setEditForm({ open: true, user })}>
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
          user={editForm.user}
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
