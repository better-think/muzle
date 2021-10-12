import React from 'react';
import AdminLayout from '@/Components/AdminLayout';
import { usePage } from '@inertiajs/inertia-react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from '@material-ui/core';
import axios from "axios";

const Index = () => {
  const props = usePage().props;
  const [data, setData] = React.useState({
    games: [],
    categories: [],
    backgrounds: []
  });
  const [status, setStatus] = React.useState({ code: null });
  const formRef = React.useRef(null);
  const [backgrounds, setBackgrounds] = React.useState([]);
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    const { games, categories, backgrounds } = props;
    setData({ games, categories, backgrounds });
  }, []);

  const selectBackground = (background) => {
    if (backgrounds.map(bg => bg.id).includes(background.id)) {
      setBackgrounds(backgrounds.filter(bg => bg.id !== background.id));
    } else {
      setBackgrounds([
        ...backgrounds,
        background
      ]);
    }
  };

  const selectCategories = (category) => {
    if (categories.map(bg => bg.id).includes(category.id)) {
      setCategories(categories.filter(bg => bg.id !== category.id));
    } else {
      setCategories([
        ...categories,
        category
      ]);
    }
  };

  const submit = async () => {
    if (formRef.current) {
      setStatus({ code: null });

      const formData = new FormData(formRef.current);

      axios.post('/management/games', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
        formRef.current.reset();
        setData({
          ...data,
          games: [
            ...data.games,
            response.data.game
          ]
        });
        setStatus({ code: 'success' });
      }).catch(function (error) {
        setStatus({
          code: 'error',
          messages: _.flatten(_.values(error.response.data.errors))
        });
      });
    }
  };

  return (
    <AdminLayout title="Game">
      <div className="space-y-4">
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Categories</TableCell>
                <TableCell>Backgrounds</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.games.map(game =>
                <TableRow key={game.id}>
                  <TableCell>{game.name}</TableCell>
                  <TableCell>{game.description}</TableCell>
                  <TableCell>{game.categories_count}</TableCell>
                  <TableCell>{game.backgrounds_count}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Paper>
          <form className="bg-white rounded-sm p-4 space-y-4 shadow1" ref={formRef}>
            {status.code === 'success' &&
              <div className="py-2 text-green-600">
                New Game Created!
            </div>
            }
            {status.code === 'error' &&
              <div className="py-2 text-red-500">
                <div>Request Failed</div>
                <ul className="list-disc text-sm pl-6">
                  {status.messages.map(message =>
                    <li key={message}>{message}</li>
                  )}
                </ul>
              </div>
            }

            {/* name */}
            <label className="bock text-sm">
              <span>Name</span>
              <input className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" type="text" name="name" />
            </label>

            {/* description */}
            <label className="bock text-sm">
              <span>Description</span>
              <input className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" type="text" name="description" />
            </label>

            {/* backgrounds */}
            <label className="bock text-sm">
              <span>Backgrounds</span>
              <div className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 divide-y p-2">
                <div className="p-2 space-x-2">
                  {backgrounds.map((bg, index) =>
                    <span className="rounded-md bg-gray-300 px-2 py-1" key={bg.id}>
                      {index === 0 && <b>Default</b>} {bg.name}
                      <input type="hidden" name="backgrounds[]" value={bg.id} />
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap">
                  {data.backgrounds.map(background =>
                    <div className="m-2" key={background.id}>
                      <div
                        className="p-2 w-32 h-32 cursor-pointer rounded-md overflow-hidden border border-gray-50 hover:border-indigo-600 active:border-indigo-400"
                        onClick={() => selectBackground(background)}
                      >
                        <img className="w-full h-full object-cover" src={`/storage/${background.src}`} alt="" />
                      </div>
                      <div className="text-center">{background.name}</div>
                    </div>
                  )}
                </div>
              </div>
            </label>

            {/* categories */}
            <label className="bock text-sm">
              <span>Categories</span>
              <div className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 divide-y p-2">
                <div className="p-2 space-x-2">
                  {categories.map(cat =>
                    <span className="rounded-md bg-gray-300 px-2 py-1" key={cat.id}>
                      {cat.name}
                      <input type="hidden" name="categories[]" value={cat.id} />
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap">
                  {data.categories.map(category =>
                    <div className="m-2" key={category.id}>
                      <div
                        className="p-2 w-32 h-32 cursor-pointer rounded-md overflow-hidden border border-gray-50 hover:border-indigo-600 active:border-indigo-400"
                        onClick={() => selectCategories(category)}
                      >
                        <img className="w-full h-full object-cover" src={`/storage/${category.src}`} alt="" />
                      </div>
                      <div className="text-center">{category.name}</div>
                    </div>
                  )}
                </div>
              </div>
            </label>

            {/* helper */}
            <label className="bock text-sm">
              <span>Helper</span>
              <input className="mt-1 p-2 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" type="file" name="helper" />
            </label>

            {/* submit */}
            <Button variant="contained" color="default" fullWidth onClick={submit}>
              Submit
					  </Button>

          </form>
        </Paper>
      </div>
    </AdminLayout>
  );
};


export default Index;
