import React from 'react';
import UserLayout from '@/Components/UserLayout';
import FormSelectNative from "@/Components/Form/FormSelectNative";
import Board from "@/Components/Page/User/Board";
import { usePage } from '@inertiajs/inertia-react';
import { Paper } from '@material-ui/core';
import axios from "axios";

const Index = () => {

  const { games } = usePage().props;
  const [data, setData] = React.useState(null);

  const handleGameSelect = event => {
    axios.get(`/games/getActive/${event.target.value}`).then(function (response) {
      const { game, backgrounds, categories } = response.data;
      setData({ game, backgrounds, categories });
    });
  };

  return (
    <UserLayout>
      <div className="container max-w-screen-xl mx-auto">
        <div className="py-2 space-y-2">
          <Paper>
            <div className="p-2 space-y-2">
              {games.length > 0 ?
                <div className="space-y-1">                  
                  <FormSelectNative
                    options={games}
                    valueKey="id"
                    labelKey="name"
                    onChange={handleGameSelect}
                    defaultValue={games[0].id}
                  />
                </div>
                :
                <div>No Game Exist</div>
              }
              {data &&
                <div>
                  <Board data={data} />
                </div>
              }
            </div>
          </Paper>
        </div>
      </div>
    </UserLayout>
  );
};


export default Index;
