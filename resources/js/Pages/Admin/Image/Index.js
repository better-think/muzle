import React from 'react';
import AdminLayout from '@/Components/AdminLayout';
import CreateDialog from '@/Components/Page/Admin/Image/CreateDialog';
import CategoryBox from '@/Components/Page/Admin/Image/CategoryBox';
import { usePage } from '@inertiajs/inertia-react';
import { Button, Paper, List } from '@material-ui/core';

const Index = () => {

  const { images, categories } = usePage().props;
  const [data, setData] = React.useState({
    images: [],
    categories: []
  });
  const [createForm, setCreateForm] = React.useState(false);

  React.useEffect(() => {
    setData({ images, categories });
  }, []);

  return (
    <AdminLayout title="Image">
      <div className="space-y-4">

        <Button color="default" variant="contained" onClick={() => setCreateForm(true)}>
          Upload Images
        </Button>

        <Paper>
          <List disablePadding>
            {data.categories.map(category =>
              <CategoryBox
                category={category}
                images={data.images}
                key={category.id}
              />
            )}
          </List>
        </Paper>

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